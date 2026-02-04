const { SlashCommandBuilder } = require('discord.js');
const { enrich } = require('../utils/linguisticVariety');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filosofia')
        .setDescription('Comandos de filosofia intelectual.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('hegel')
                .setDescription('Reflexões sobre a filosofia de Hegel.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('intelectual')
                .setDescription('O papel do intelectual na sociedade.')),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        let resposta = "";

        if (subcommand === 'hegel') {
            resposta = "Hegel? Aquele papo de tese, antítese e síntese... mano, morguei desses assuntos. Não é pesado, só enjoei.";
        } else if (subcommand === 'intelectual') {
            resposta = "Intelectual? Sei lá, os cara é um mistério. Eles pegam um assunto que sabem e só falam dele pra parecerem intelectuais como qualquer adolescente médio.";
        }

        await interaction.reply({ content: enrich(resposta) });
    },
};
