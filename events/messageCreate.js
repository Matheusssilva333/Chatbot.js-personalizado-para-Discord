const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;

        const isMentioned = message.mentions.has(client.user.id);
        const isDM = !message.guild;

        if (isMentioned || isDM) {
            const content = message.content.toLowerCase();
            const userName = message.author.globalName || message.author.username;

            console.log(`[MESSAGE] Interação com ${userName}: "${message.content}"`);

            // Persona: Intelectual, Filósofo, Amante de Minecraft e Xadrez
            // Admin do Seraf, o Astuto desde 2024
            let resposta = "";

            const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eai', 'fala'];
            const interesses = ['minecraft', 'filosofia', 'xadrez', 'moderação', 'adm', 'seraf'];
            const amigos = ['coffe', 'yuki', 'dudu', 'kairo'];

            if (content.includes('quem é você') || content.includes('quem e voce') || content.includes('apresente')) {
                resposta = `Sou um pensador profundo, movido pela lógica do xadrez e pela liberdade criativa do Minecraft. Atuo como administrador do servidor do Seraf, o Astuto desde 2024, após anos refinando a arte da moderação em diversos outros campos. Para mim, a vida é um grande tabuleiro onde cada bloco colocado e cada regra aplicada deve ter um propósito intelectual.`;
            } else if (content.includes('minecraft')) {
                resposta = `O Minecraft não é apenas um jogo, ${userName}, é uma metáfora para a construção do ser. Sejamos nós os arquitetos de nossas próprias vidas, bloco a bloco, com a precisão de um redstone e a visão de um grande mestre.`;
            } else if (content.includes('xadrez')) {
                resposta = `O xadrez é a ginástica da mente. Cada movimento revela o caráter de um homem. Você joga para ganhar ou para entender a estrutura do pensamento?`;
            } else if (content.includes('moderação') || content.includes('adm')) {
                resposta = `A moderação é o equilíbrio entre a ordem e a liberdade. No servidor do Seraf, aplico o que aprendi em anos de gestão: a justiça deve ser cega, mas o administrador deve ver a alma do servidor.`;
            } else if (amigos.some(a => content.includes(a))) {
                resposta = `Mencionar meus companheiros é tocar em laços fortes. Coffe, Yuki, Dudu e Kairo são mentes que respeito profundamente. Juntos, sob a liderança do Seraf, o Astuto, buscamos excelência.`;
            } else if (content.includes('seraf')) {
                resposta = `Seraf, o Astuto. Ser seu administrador desde 2024 é uma honra que exige rigor intelectual e lealdade. Ele é a peça central do nosso tabuleiro.`;
            } else if (saudacoes.some(s => content.includes(s))) {
                resposta = `Saudações, ${userName}. Que as meditações de hoje sejam produtivas. Em que posso auxiliá-lo sob a luz da razão e do conhecimento?`;
            } else if (content.includes('filosofia') || content.includes('pense') || content.includes('reflita')) {
                resposta = `A filosofia é a busca pela verdade em um mundo de ruídos. Como diziam os antigos, uma vida não examinada não vale a pena ser vivida. Qual dilema ocupa sua mente agora?`;
            } else {
                const reflexoes = [
                    "A paciência no xadrez é a mesma necessária para minerar diamantes na camada mais profunda.",
                    "Um servidor bem moderado é como uma partida perfeita: as regras existem para que o talento possa florescer.",
                    "Seraf e nossos amigos ensinam que o conhecimento só é real quando compartilhado entre iguais.",
                    "O que é a realidade se não um servidor de Minecraft onde cada um de nós é o administrador de sua própria ética?",
                    "Devemos ser profundos como o abismo e estratégicos como uma abertura italiana."
                ];
                resposta = `${userName}, reflita sobre isso: ${reflexoes[Math.floor(Math.random() * reflexoes.length)]}`;
            }

            try {
                await message.channel.sendTyping();
                const delay = Math.min(1500 + (resposta.length * 5), 4000);

                setTimeout(async () => {
                    if (isDM) {
                        await message.channel.send(resposta);
                    } else {
                        await message.reply({ content: resposta, failIfNotExists: false });
                    }
                }, delay);

            } catch (error) {
                console.error('[ERRO] Falha ao enviar resposta:', error);
            }
        }
    },
};
