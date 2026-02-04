const { SlashCommandBuilder } = require('discord.js');
const { enrich } = require('../utils/linguisticVariety');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xadrez')
        .setDescription('Comandos de estratégia e história do xadrez.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('dicas')
                .setDescription('Dicas para melhorar sua performance no tabuleiro.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('carlsen')
                .setDescription('Análise sobre a supremacia de Magnus Carlsen.')),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        let resposta = "";

        if (subcommand === 'dicas') {
            resposta = "Dica de xadrez? Ah mano. Move as peças e ganha. Eu era foda, mas parei. KKKKKKKK";
        } else if (subcommand === 'carlsen') {
            resposta = "Magnus Carlsen... joga bem. Mas eu sou um lógico fodido. Se eu quisesse... ah deixa pra lá, morguei.";
        }

        await interaction.reply({ content: enrich(resposta) });
    },
};
