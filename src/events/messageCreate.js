const { Events } = require('discord.js');
const { getResponse } = require('../utils/contextualResponses');
const { enrich } = require('../utils/linguisticVariety');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;

        // Ativa se o bot for mencionado, se DMs ou se a palavra "luana" aparecer (conforme pedido)
        const isMentioned = message.mentions.has(client.user.id);
        const isDM = !message.guild;
        const containsName = message.content.toLowerCase().includes('luana');

        if (isMentioned || isDM || containsName) {
            const content = message.content.toLowerCase();
            const userName = message.author.globalName || message.author.username;

            console.log(`[MESSAGE] Processamento analítico para ${userName}: "${message.content}"`);

            let type = "geral";
            if (content.includes('minecraft') || content.includes('bloco') || content.includes('servidor')) type = "minecraft";
            else if (content.includes('filosofia') || content.includes('hegel') || content.includes('pensar')) type = "filosofia";
            else if (content.includes('xadrez') || content.includes('tabuleiro') || content.includes('carlsen')) type = "xadrez";

            let resposta = getResponse(type);

            // Persona complementar baseada no Seraf e amigos (da versão anterior que o usuário gostou)
            if (content.includes('seraf') || content.includes('astuto')) {
                resposta = "Seraf, o Astuto, é a peça central do nosso tabuleiro social. Como sua administradora, prezo pelo rigor e pela ordem que sua liderança exige.";
            } else if (content.includes('coffe') || content.includes('yuki') || content.includes('dudu') || content.includes('kairo')) {
                resposta = "Estes são companheiros valorosos. A amizade intelectual que compartilhamos é o que fundamenta a estrutura deste servidor.";
            }

            try {
                await message.channel.sendTyping();
                const delay = Math.min(2000 + (resposta.length * 5), 5000);

                setTimeout(async () => {
                    const finalResponse = enrich(resposta);
                    if (isDM) {
                        await message.channel.send(finalResponse);
                    } else {
                        await message.reply({ content: finalResponse, failIfNotExists: false });
                    }
                }, delay);

            } catch (error) {
                console.error('[ERRO] Falha na emissão de resposta analítica:', error);
            }
        }
    },
};
