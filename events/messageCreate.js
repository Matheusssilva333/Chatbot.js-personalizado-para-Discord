const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        // Ignora mensagens de bots (incluindo ele mesmo)
        if (message.author.bot) return;

        // Ativa apenas se o bot for mencionado ou em DMs
        const isMentioned = message.mentions.has(client.user.id);
        const isDM = !message.guild;

        if (isMentioned || isDM) {
            const content = message.content.toLowerCase();
            const userName = message.author.globalName || message.author.username;

            console.log(`[MESSAGE] Interação com ${userName}: "${message.content}"`);

            // Persona: Luana/Matheus Silva (Racional, Direta, Focada em Valor)
            let resposta = "";

            if (content.includes('oi') || content.includes('olá') || content.includes('ola')) {
                resposta = `Olá, ${userName}. Vamos ser objetivos: qual é o seu desafio técnico ou estratégico de hoje?`;
            } else if (content.includes('quem é você') || content.includes('quem e voce')) {
                resposta = `Sou uma assistente de IA projetada para elevar o nível de execução e clareza técnica. Meu foco é disciplina, sistemas e geração de valor real.`;
            } else if (content.includes('ajuda') || content.includes('ajude') || content.includes('socorro')) {
                resposta = `A ajuda que você precisa depende da sua capacidade de definir o problema. Use \`/mentoria\` para tópicos específicos de carreira e tecnologia, ou descreva sua dificuldade técnica atual.`;
            } else if (content.includes('filosofia') || content.includes('pense') || content.includes('reflita')) {
                resposta = `A reflexão sem execução é ruído. Se quer filosofar, use \`/filosofar\`. Se quer construir algo, me dê um contexto técnico.`;
            } else if (content.includes('obrigado') || content.includes('vlw') || content.includes('valeu')) {
                resposta = `Não agradeça, execute. O valor está no resultado, não na conversa.`;
            } else {
                // Resposta padrão "fria" e racional
                resposta = `${userName}, seu comentário foi registrado. Para que eu possa ser útil, conecte essa ideia a um sistema de ação ou dúvida técnica específica. A profundidade gera valor; a superficialidade é perda de tempo.`;
            }

            try {
                // Simula um pequeno delay para parecer mais "natural" (opcional)
                await message.channel.sendTyping();
                setTimeout(async () => {
                    await message.reply(content.length > 100 ? { content: resposta, failIfNotExists: false } : resposta);
                }, 1000);
            } catch (error) {
                console.error('[ERRO] Falha ao enviar resposta:', error);
            }
        }
    },
};
