// index.js - Ponto de entrada e inicialização do Bot Luana

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// --- 1. Configuração do Cliente Discord ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent, // Necessário para ler o conteúdo das mensagens
    ],
    partials: [Partials.Channel, Partials.Message], // Necessário para DMs e mensagens em cache
});

// Coleções para armazenar comandos e dados
client.commands = new Collection();
client.db = require('./database/sqlite-manager'); // Gerenciador de Banco de Dados

// --- 2. Carregamento de Comandos ---
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Define um novo item na Collection com a chave sendo o nome do comando e o valor sendo o módulo exportado
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`[COMANDO] Carregado: ${command.data.name}`);
    } else {
        console.log(`[AVISO] O comando em ${filePath} está faltando a propriedade "data" ou "execute" obrigatória.`);
    }
}

// --- 3. Carregamento de Eventos ---
const eventsPath = path.join(__dirname, 'events');
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

// --- 4. Inicialização do Bot ---
client.login(process.env.DISCORD_TOKEN);

// Tratamento de erros para evitar que o bot caia
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});
