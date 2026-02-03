const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[AVISO] O comando em ${file} está faltando "data" ou "execute".`);
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Iniciando refresh de ${commands.length} comandos de aplicativo (/).`);

        // CLIENT_ID deve estar no .env
        const clientId = process.env.CLIENT_ID;

        if (!clientId) {
            console.error('Erro: CLIENT_ID não encontrado no arquivo .env');
            process.exit(1);
        }

        // Deploy global (pode levar 1h para propagar)
        // Para desenvolvimento rápido, use Routes.applicationGuildCommands(clientId, guildId)
        console.log('Enviando comandos globalmente...');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Comandos de aplicativo (/) recarregados com sucesso.');
    } catch (error) {
        console.error(error);
    }
})();
