const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`[READY] Luana Operacional. Logada como ${client.user.tag}`);

        const activities = [
            { name: 'Xadrez com Hegel', type: ActivityType.Playing },
            { name: 'Sistemas de Moderação', type: ActivityType.Watching },
            { name: 'Filosofia Alemã', type: ActivityType.Listening },
            { name: 'Minecraft (Redstone Logic)', type: ActivityType.Competing }
        ];

        let i = 0;
        setInterval(() => {
            client.user.setPresence({
                activities: [activities[i]],
                status: 'online',
            });
            i = (i + 1) % activities.length;
        }, 15000);
    },
};
