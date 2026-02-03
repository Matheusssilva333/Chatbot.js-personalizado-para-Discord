// index.js - Ponto de entrada e inicialização do Bot
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');
const express = require('express');

// Carrega variáveis de ambiente
dotenv.config();

// Verificação de variáveis críticas
const REQUIRED_VARS = ['DISCORD_TOKEN', 'CLIENT_ID'];
const missingVars = REQUIRED_VARS.filter(v => !process.env[v]);
if (missingVars.length > 0) {
    console.error(`[ERRO CRÍTICO] Variáveis de ambiente faltando: ${missingVars.join(', ')}`);
    console.error('Certifique-se de configurar estas variáveis no painel do Render ou no arquivo .env');
    // Não encerramos o processo aqui para permitir que o servidor Web suba e o Render não marque como falha de "port" imediatamente
}

// --- Servidor Web para Render (Keep-Alive e Health Check) ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot Luana status: Servidor Web Ativo. Verifique o status do Gateway no log.');
});

// Endpoint de Interações (Opcional - apenas se usar Interactions Endpoint URL)
app.post('/api/interactions', (req, res) => {
    // Se o usuário configurar o URL no portal do Discord, o bot receberá comandos aqui via HTTP
    // Por enquanto, apenas registramos que algo chegou.
    console.log('[HTTP] Requisição recebida em /api/interactions');
    res.status(200).send({ type: 1 }); // PING responder PONG
});

const server = app.listen(PORT, () => {
    console.log(`[HTTP] Servidor ouvindo na porta ${PORT}`);

    // Auto-ping para evitar hibernação no Render Free
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
    if (RENDER_URL) {
        setInterval(() => {
            const https = require('https');
            https.get(RENDER_URL, (res) => {
                console.log(`[PING] Auto-ping enviado para ${RENDER_URL} - Status: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error('[PING] Erro no auto-ping:', err.message);
            });
        }, 840000); // 14 minutos
    }
});

// --- Configuração do Cliente Discord (Gateway) ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.Message],
});

client.commands = new Collection();

// Database initialization
try {
    client.db = require('./database/sqlite-manager');
} catch (e) {
    console.error("[DB] Erro ao carregar banco de dados:", e.message);
}

// --- Carregamento de Comandos ---
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        try {
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(`[COMANDO] Carregado: ${command.data.name}`);
            }
        } catch (error) {
            console.error(`[ERRO] Falha ao carregar comando ${file}:`, error.message);
        }
    }
}

// --- Carregamento de Eventos ---
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        try {
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(`[EVENTO] Carregado: ${event.name}`);
        } catch (error) {
            console.error(`[ERRO] Falha ao carregar evento ${file}:`, error.message);
        }
    }
}

// --- Inicialização ---
if (process.env.DISCORD_TOKEN) {
    console.log('[BOT] Tentando logar no Discord...');
    client.login(process.env.DISCORD_TOKEN).catch(err => {
        console.error('[ERRO] Falha no login do Discord:', err.message);
        if (err.message.includes('Used disallowed intents')) {
            console.error('--- AJUDA CRÍTICA ---');
            console.error('Você precisa ativar "Message Content Intent" no Discord Developer Portal.');
            console.error('1. Vá em https://discord.com/developers/applications');
            console.error('2. Vá em Bot -> Privileged Gateway Intents');
            console.error('3. Ative: Presence, Server Members e Message Content.');
            console.error('4. Salve as alterações.');
        } else if (err.message.includes('TOKEN_INVALID')) {
            console.error('DICA: Seu DISCORD_TOKEN está incorreto.');
        }
    });
} else {
    console.error('[ERRO] DISCORD_TOKEN não encontrado.');
}

// Anti-crash
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});
