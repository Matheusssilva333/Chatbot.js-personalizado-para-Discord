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
            resposta = "A fundação de uma boa partida reside no controle do centro e no desenvolvimento harmônico das peças. Analise as linhas de tensão: cada peão movido é uma concessão estrutural definitiva. Estude finais antes de se perder em aberturas complexas.";
        } else if (subcommand === 'carlsen') {
            resposta = "Magnus Carlsen representa o ápice da precisão posicional. Sua genialidade não reside apenas no cálculo bruto, mas na intuição técnica de simplificar posições complexas onde ele detém vantagens microscópicas, forçando o oponente ao erro sob pressão constante.";
        }

        await interaction.reply({ content: enrich(resposta) });
    },
};
