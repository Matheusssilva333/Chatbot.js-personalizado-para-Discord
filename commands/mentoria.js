const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mentoria')
        .setDescription('Receba orientações técnicas e estratégicas.')
        .addStringOption(option =>
            option.setName('topico')
                .setDescription('Tópico (ex: python, arquitetura, softskills, carreira)')
                .setRequired(true)),
    async execute(interaction) {
        const topico = interaction.options.getString('topico').toLowerCase();
        let resposta = "";

        // Lógica de Mentoria Técnica (Persona: Matheus Silva)
        if (topico.includes('python') || topico.includes('java') || topico.includes('js') || topico.includes('javascript')) {
            resposta = `**Foco na Excelência Técnica:**\nNão seja apenas um usuário da sintaxe. Entenda como a linguagem funciona por baixo do capô. Gerenciamento de memória, concorrência e estruturas de dados são o que separam amadores de engenheiros.`;
        } else if (topico.includes('arquitetura') || topico.includes('design')) {
            resposta = `**Visão Sistêmica:**\nArquitetura de software não é sobre desenhar caixinhas, é sobre controlar a complexidade. Use DDD para alinhar código e negócio. Prefira composição à herança e desacople seus componentes.`;
        } else if (topico.includes('carreira') || topico.includes('trabalho')) {
            resposta = `**Estratégia Profissional:**\nO mercado paga pelo valor que você gera, não pelo seu esforço. Resolva problemas caros. A disciplina vence a motivação sempre. Construa sistemas, não apenas tarefas.`;
        } else if (topico.includes('marketing') || topico.includes('venda')) {
            resposta = `**Engenharia de Valor:**\nTecnologia sem venda é hobby. Entenda o funil, entenda a dor do cliente. Seu código deve servir para alavancar um negócio, não o contrário.`;
        } else {
            resposta = `**Princípio Geral:**\n"A profundidade gera valor." Não fique na superfície. Se você quer dominar **${topico}**, estude os fundamentos, pratique deliberadamente e ignore o ruído.`;
        }

        await interaction.reply({ content: resposta });
    },
};
