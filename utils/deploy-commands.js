const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, '../commands');

if (!fs.existsSync(commandsPath)) {
    console.error('[ERRO] Pasta de comandos não encontrada.');
    process.exit(1);
}

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(path.join(commandsPath, file));
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            console.log(`[DEPLOY] Preparando comando: ${command.data.name}`);
        }
    } catch (err) {
        console.error(`[ERRO] Falha ao ler comando ${file}:`, err.message);
    }
}

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; // Opcional: para registro instantâneo em um servidor

if (!token || !clientId) {
    console.error('[ERRO] DISCORD_TOKEN ou CLIENT_ID faltando no ambiente.');
    process.exit(1);
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`[DEPLOY] Iniciando atualização de ${commands.length} comandos (/).`);

        if (guildId) {
            console.log(`[DEPLOY] Registrando comandos para o servidor: ${guildId}`);
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
        } else {
            console.log('[DEPLOY] Registrando comandos globalmente (pode levar até 1 hora).');
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
        }

        console.log('[DEPLOY] Sucesso: Comandos de aplicativo (/) registrados.');
    } catch (error) {
        console.error('[ERRO] Falha ao registrar comandos:', error.message);
    }
})();
