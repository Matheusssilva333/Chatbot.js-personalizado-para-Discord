// index.js - Ponto de entrada e inicialização do Bot
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');
const express = require('express');

// Carrega variáveis de ambiente
dotenv.config();

// --- Servidor Web para Render (Keep-Alive) ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is online!');
});

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor ouvindo na porta ${PORT}`);
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
client.login(process.env.DISCORD_TOKEN);

// Anti-crash
process.on('unhandledRejection', error => console.error('Unhandled promise rejection:', error));
process.on('uncaughtException', error => console.error('Uncaught exception:', error));
