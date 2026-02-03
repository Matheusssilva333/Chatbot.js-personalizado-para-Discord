const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { enrich } = require('../utils/linguisticVariety');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderacao')
        .setDescription('Ferramentas de governança e ordem do servidor.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addSubcommand(subcommand =>
            subcommand
                .setName('timeout')
                .setDescription('Aplica um período de reflexão obrigatória (timeout).')
                .addUserOption(option => option.setName('usuario').setDescription('O membro a ser moderado').setRequired(true))
                .addIntegerOption(option => option.setName('tempo').setDescription('Tempo em minutos').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('limpar')
                .setDescription('Remove o excesso de ruído informacional (limpar mensagens).')
                .addIntegerOption(option => option.setName('quantidade').setDescription('Número de mensagens (1-100)').setRequired(true))),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'timeout') {
            const user = interaction.options.getMember('usuario');
            const minutes = interaction.options.getInteger('tempo');

            if (!user) return interaction.reply({ content: "Membro não encontrado nesta estrutura social.", ephemeral: true });

            await user.timeout(minutes * 60 * 1000, "Necessidade de reajuste comportamental sob análise da administração.");
            await interaction.reply({ content: enrich(`O usuário ${user.user.tag} foi colocado em suspensão temporal por ${minutes} minutos para análise ética.`) });
        } else if (subcommand === 'limpar') {
            const amount = interaction.options.getInteger('quantidade');

            if (amount < 1 || amount > 100) return interaction.reply({ content: "A quantidade deve estar entre 1 e 100 por limitações técnicas.", ephemeral: true });

            await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ content: enrich(`Foram removidas ${amount} instâncias de ruído informacional deste canal.`), ephemeral: true });
        }
    },
};
