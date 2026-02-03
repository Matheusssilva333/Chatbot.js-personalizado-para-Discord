const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

if (!fs.existsSync(commandsPath)) {
    console.error('[ERRO] Pasta de comandos src/commands não encontrada.');
    process.exit(1);
}

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(path.join(commandsPath, file));
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            console.log(`[DEPLOY] Preparando: ${command.data.name}`);
        }
    } catch (err) {
        console.error(`[ERRO] Falha ao ler ${file}:`, err.message);
    }
}

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
    console.error('[ERRO] Variáveis ambientais críticas faltando.');
    process.exit(1);
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`[DEPLOY] Iniciando registro de ${commands.length} comandos slash.`);

        // Deploy global
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('[DEPLOY] Sucesso: Comandos registrados globalmente.');
    } catch (error) {
        console.error('[ERRO] Falha no deploy:', error.message);
    }
})();
