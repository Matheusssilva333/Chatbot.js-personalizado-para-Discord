const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mentoria')
        .setDescription('Orientações sobre moderação, Minecraft e estratégia intelectual.')
        .addStringOption(option =>
            option.setName('topico')
                .setDescription('Tópico (ex: moderação, redstone, xadrez, sobrevivência)')
                .setRequired(true)),
    async execute(interaction) {
        const topico = interaction.options.getString('topico').toLowerCase();
        let resposta = "";

        // Persona: Adm do Seraf, Amante de Minecraft e Xadrez
        if (topico.includes('moderação') || topico.includes('adm') || topico.includes('servidor')) {
            resposta = `**A Arte da Governança:**\nSer administrador no servidor do Seraf desde 2024 me ensinou que a moderação não é punição, mas jardinagem. Remova as ervas daninhas para que os membros saudáveis floresçam. Use logs como sua bússola.`;
        } else if (topico.includes('redstone') || topico.includes('automação') || topico.includes('mecanismo')) {
            resposta = `**Engenharia de Blocos:**\nA redstone é a lógica pura manifestada em energia. Um sistema eficiente deve ser compacto e à prova de falhas. Como no xadrez, antecipe o que pode dar errado no próximo sinal.`;
        } else if (topico.includes('xadrez') || topico.includes('estratégia')) {
            resposta = `**O Gambito da Mente:**\nNão jogue a peça, jogue o plano. A mentoria aqui é clara: controle o centro, desenvolva suas peças e nunca sacrifique sua rainha por um ganho momentâneo sem profundidade.`;
        } else if (topico.includes('sobrevivência') || topico.includes('minecraft')) {
            resposta = `**Sobrevivência Intelectual:**\nNo Minecraft, o abrigo é temporário, mas o conhecimento do terreno é eterno. Minere fundo, mas sempre mantenha uma saída. A disciplina de Coffe e a astúcia de Seraf são seus melhores guias.`;
        } else {
            resposta = `**Princípio da Sabedoria:**\nSobre **${topico}**, lembre-se: a profundidade gera valor. Não seja superficial em suas construções, sejam elas de pedra ou de pensamento.`;
        }

        await interaction.reply({ content: resposta });
    },
};
