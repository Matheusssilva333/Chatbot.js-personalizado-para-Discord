const { SlashCommandBuilder } = require('discord.js');
const { enrich } = require('../utils/linguisticVariety');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('Comandos analíticos sobre o universo dos blocos.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('servidor')
                .setDescription('Metodologia para criação de comunidades Minecraft.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('dicas')
                .setDescription('Perspectivas técnicas sobre sobrevivência e construção.')),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        let resposta = "";

        if (subcommand === 'servidor') {
            resposta = "Para erguer um servidor resiliente, você deve priorizar a estabilidade do hardware e a governança das regras. Utilize plugins que permitam a auditoria de ações (como CoreProtect) e defina claramente os limites da economia para evitar a inflação de itens.";
        } else if (subcommand === 'dicas') {
            resposta = "O domínio do Minecraft exige compreensão técnica: entenda o spawn de mobs via níveis de luz (agora 0) e otimize suas fazendas usando mecânicas de processamento de chunks. A construção estética deve seguir princípios de profundidade e contraste, tal qual uma obra de arte ensaística.";
        }

        await interaction.reply({ content: enrich(resposta) });
    },
};
