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
            resposta = "Hegel nos apresenta a Fenomenologia do Espírito como o caminho da consciência em direção ao Saber Absoluto. A dialética — tese, antítese e síntese — não é apenas um método, mas a própria estrutura da realidade em constante devir.";
        } else if (subcommand === 'intelectual') {
            resposta = "Ser um intelectual exige mais do que acúmulo de dados; exige rigor metodológico e a coragem de submeter a realidade ao crivo da razão crítica. O intelectual é aquele que traduz o caos da experiência na ordem do pensamento.";
        }

        await interaction.reply({ content: enrich(resposta) });
    },
};
