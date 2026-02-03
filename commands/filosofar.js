const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filosofar')
        .setDescription('Reflexão profunda sobre a existência, o xadrez e a construção em blocos.')
        .addStringOption(option =>
            option.setName('tema')
                .setDescription('O tema para a reflexão (ex: ordem, caos, amizade).')
                .setRequired(true)),

    async execute(interaction) {
        const tema = interaction.options.getString('tema').toLowerCase();
        const userName = interaction.user.globalName || interaction.user.username;

        let resposta = "";

        if (tema.includes('amizade') || tema.includes('amigo')) {
            resposta = `${userName}, a amizade é o bioma mais raro da existência. Ter por perto mentes como Coffe, Yuki, Dudu e Kairo é como encontrar uma fortaleza em um deserto infinito. Sob a astúcia de Seraf, aprendemos que ninguém constrói um império sozinho.`;
        } else if (tema.includes('ordem') || tema.includes('caos') || tema.includes('regras')) {
            resposta = `A ordem é a estrutura do xadrez, enquanto o caos é o Nether sem bússola. Como administrador desde 2024, entendo que as regras são os blocos que sustentam a catedral da convivência. Sem ordem, o tabuleiro colapsa.`;
        } else if (tema.includes('tempo') || tema.includes('morte') || tema.includes('fim')) {
            resposta = `O tempo é um relógio de xadrez que nunca para. Cada segundo é um tick de redstone em nossa jornada. O fim não é o vazio, mas o último bloco colocado em nossa obra.`;
        } else {
            resposta = `Sobre **${tema}**, ${userName}, eu diria: toda grande questão é como uma abertura de xadrez — o segredo não está no primeiro movimento, mas na profundidade da sua visão. Como administrador do Seraf, busco encontrar o equilíbrio entre a teoria filosófica e a prática da moderação.`;
        }

        await interaction.reply({ content: resposta });
    },
};
