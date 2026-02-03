// index.js - Ponto de entrada e inicialização do Bot
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');
const express = require('express');

// Carrega variáveis de ambiente
dotenv.config();

// --- Servidor Web para Render (Keep-Alive e Webhooks) ---
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

if (!process.env.PUBLIC_KEY) {
    console.warn('[AVISO] PUBLIC_KEY não definida. O endpoint de interações não funcionará corretamente.');
}

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is online!');
});

// Endpoint de Interações (HTTP Webhook)
// Nota: Para usar isso no portal do Discord, você precisa definir PUBLIC_KEY no .env
app.post('/api/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY || ''), (req, res) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        // Nota: Processar comandos aqui requer lógica diferente do Gateway.
        // Para que o bot responda via HTTP, o código abaixo é o básico.
        console.log(`[HTTP] Comando recebido via Webhook: ${interaction.data.name}`);
        return res.status(200).send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: 'Interação recebida via Webhook!' }
        });
    }
});

// Linked Roles Verification URL
app.get('/verify-user', (req, res) => {
    res.send('Página de Verificação de Usuário (Linked Roles). Em desenvolvimento.');
});

// Termos de Serviço e Privacidade
app.get('/terms-of-service', (req, res) => {
    res.send('<h1>Termos de Serviço</h1><p>Conteúdo dos termos de serviço...</p>');
});

app.get('/privacy-policy', (req, res) => {
    res.send('<h1>Política de Privacidade</h1><p>Página de política de privacidade...</p>');
});

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor ouvindo na porta ${PORT}`);

    // Auto-ping para manter o bot online no Render (evita hibernação)
    const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
    if (RENDER_EXTERNAL_URL) {
        setInterval(() => {
            const https = require('https');
            https.get(RENDER_EXTERNAL_URL, (res) => {
                console.log(`[PING] Auto-ping enviado para ${RENDER_EXTERNAL_URL} - Status: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error('[PING] Erro no auto-ping:', err.message);
            });
        }, 840000); // 14 minutos (Render hiberna após 15)
    }
});

// --- Configuração do Cliente Discord ---
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
// Database Check (optional usage in commands)
try {
    client.db = require('./database/sqlite-manager');
} catch (e) {
    console.error("[DB] Erro ao carregar banco de dados:", e);
}

// --- Carregamento de Comandos ---
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[COMANDO] Carregado: ${command.data.name}`);
        } else {
            console.log(`[AVISO] O comando em ${filePath} falta "data" ou "execute".`);
        }
    }
} else {
    console.warn("[AVISO] Pasta 'commands' não encontrada.");
}

// --- Carregamento de Eventos ---
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        console.log(`[EVENTO] Carregado: ${event.name}`);
    }
} else {
    console.warn("[AVISO] Pasta 'events' não encontrada.");
}

// --- Inicialização ---
if (!process.env.DISCORD_TOKEN) {
    console.error('[ERRO] DISCORD_TOKEN não definido nas variáveis de ambiente.');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);

// Anti-crash
process.on('unhandledRejection', error => console.error('Unhandled promise rejection:', error));
process.on('uncaughtException', error => console.error('Uncaught exception:', error));
