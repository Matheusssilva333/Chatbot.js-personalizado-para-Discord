const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Verifica o estado de saúde e latência do bot.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Monitorando sistemas...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        let statusColor = '🟢';
        if (apiLatency > 200) statusColor = '🟡';
        if (apiLatency > 500) statusColor = '🔴';

        const response = [
            `**Status do Sistema Bot Luana**`,
            `${statusColor} **Latência da API:** ${apiLatency}ms`,
            `⚡ **Latência de Resposta:** ${latency}ms`,
            `🕒 **Uptime:** ${Math.round(process.uptime() / 60)} minutos`,
            `🛠️ **Ambiente:** ${process.env.NODE_ENV || 'produção'}`,
            `\n*O sistema está operando dentro dos parâmetros de eficiência.*`
        ].join('\n');

        await interaction.editReply({ content: response });
    },
};
