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
            resposta = "Servidor bom tinha que ser o meu. Mas saturei. A maioria faz isso lá de criar polis virtual... KKKKKKK ah mano, fala sério.";
        } else if (subcommand === 'dicas') {
            resposta = "Dica de construção? Pff. Eu sempre fui espetacular na redstone, aquilo ali era básico pra mim. Mas morguei de mine.";
        }

        await interaction.reply({ content: enrich(resposta) });
    },
};
