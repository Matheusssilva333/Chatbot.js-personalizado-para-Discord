const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`[READY] Sistema operacional. Logado como ${client.user.tag}`);

        const activities = [
            { name: 'Minecraft (mas morguei)', type: ActivityType.Playing },
            { name: 'Morgado com a vida', type: ActivityType.Listening },
            { name: 'Sendo foda e carismático', type: ActivityType.Playing },
            { name: 'Te ignorando (mentira, leio tudo)', type: ActivityType.Watching }
        ];

        let i = 0;
        setInterval(() => {
            client.user.setPresence({
                activities: [activities[i]],
                status: 'online',
            });
            i = (i + 1) % activities.length;
        }, 15000); // Troca a cada 15 segundos
    },
};
