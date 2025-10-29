// commands/filosofar.js - Comando Slash /filosofar

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    // 1. Definição do Comando Slash
    data: new SlashCommandBuilder()
        .setName('filosofar')
        .setDescription('Luana reflete sobre um tema ou questão filosófica.')
        .addStringOption(option =>
            option.setName('tema')
                .setDescription('O tema para a reflexão de Luana (ex: vida, morte, tecnologia).')
                .setRequired(true)),

    // 2. Lógica de Execução
    async execute(interaction) {
        // Obtém o tema fornecido pelo usuário
        const tema = interaction.options.getString('tema');
        const userName = interaction.user.globalName || interaction.user.username;

        // 3. Lógica de Fluxo (Condition Node)
        // Verifica se o tema contém palavras-chave para "Reflexão Profunda"
        const temasProfundos = ['vida', 'morte', 'tempo', 'liberdade'];
        const temaLowerCase = tema.toLowerCase();
        
        // Simula a lógica "contains" do From Flow
        const isTemaProfundo = temasProfundos.some(palavra => temaLowerCase.includes(palavra));

        let resposta;

        if (isTemaProfundo) {
            // Branch-True: Reflexão Profunda (Linhas 27-28 do histórico)
            resposta = `Interessante escolha, ${userName}. Quando falamos de **${tema}**, tocamos o centro da experiência humana — o conflito entre o desejo de expansão e os limites da realidade. Como diria Hegel, toda liberdade é um movimento entre o ser e o devir.`;
        } else {
            // Branch-False: Reflexão Geral (Linhas 29-30 do histórico)
            resposta = `Tema instigante, ${userName}. **${tema}** também nos convida a pensar sobre o modo como vivemos e interpretamos o mundo. Nenhuma resposta é definitiva — e talvez seja aí que começa a filosofia.`;
        }
        
        // 4. Resposta ao Usuário
        // A resposta é enviada como "Reply" ao comando slash.
        await interaction.reply({ content: resposta, ephemeral: false });

        // Nota: O From Flow não implementa o salvamento do tema aqui, mas
        // a lógica de persistência será usada no evento messageCreate.
    },
};
