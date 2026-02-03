const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`[READY] Sistema operacional. Logado como ${client.user.tag}`);

        const activities = [
            { name: '/mentoria para conselhos', type: ActivityType.Listening },
            { name: 'Sistemas de alta performance', type: ActivityType.Watching },
            { name: 'Otimização técnica', type: ActivityType.Playing },
            { name: '/filosofar para clareza', type: ActivityType.Listening }
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
