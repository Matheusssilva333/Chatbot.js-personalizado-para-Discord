// index.js - Ponto de entrada ajustado para o novo arcabouço técnico
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

// --- Servidor Web para Render ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('A estrutura analítica da Luana está ativa e operacional.');
});

app.listen(PORT, () => {
    console.log(`[HTTP] Monitoramento ativo na porta ${PORT}`);
});

// --- Cliente Discord ---
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

// --- Carregamento Dinâmico (src/) ---
const commandsPath = path.join(__dirname, 'src/commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[SISTEMA] Comando carregado: ${command.data.name}`);
        }
    }
}

const eventsPath = path.join(__dirname, 'src/events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        console.log(`[SISTEMA] Evento carregado: ${event.name}`);
    }
}

// --- Inicialização ---
if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN).catch(err => {
        console.error('[ERRO] Falha na autenticação do Gateway:', err.message);
    });
} else {
    console.error('[ERRO] Ausência de DISCORD_TOKEN no ambiente.');
}

process.on('unhandledRejection', error => console.error('Abstração de erro não tratada:', error));
