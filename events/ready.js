const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Pronto! Logado como ${client.user.tag}`);

        // Define status
        client.user.setPresence({
            activities: [{ name: '/mentoria para conselhos', type: ActivityType.Listening }],
            status: 'online',
        });
    },
};
