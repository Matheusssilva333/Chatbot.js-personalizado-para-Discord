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

            const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eai', 'fala'];
            const duvidas = ['como', 'porque', 'por que', 'onde', 'quando', 'qual', 'ajuda', 'ajude', 'duvida'];
            const tecnicos = ['python', 'js', 'codigo', 'código', 'erro', 'bug', 'deploy', 'api', 'banco', 'database', 'arquitetura'];

            if (saudacoes.some(s => content.includes(s))) {
                resposta = `Olá, ${userName}. Estou online. Vamos poupar tempo: qual é o seu objetivo técnico ou o problema que você está tentando resolver agora?`;
            } else if (content.includes('quem é você') || content.includes('quem e voce') || content.includes('apresente')) {
                resposta = `Sou uma extensão da visão do Matheus Silva: racional, direta e focada em sistemas de alta performance. Não estou aqui para conversa fiada, mas para otimizar sua execução técnica.`;
            } else if (tecnicos.some(t => content.includes(t))) {
                resposta = `Detectei um contexto técnico. Lembre-se: ${userName}, um código limpo não é apenas estética, é sobrevivência do sistema. Qual o ponto exato de falha ou dúvida que você encontrou?`;
            } else if (duvidas.some(d => content.includes(d))) {
                resposta = `Você está buscando clareza. Para que eu te ajude a chegar a uma solução, forneça o contexto: o que você já tentou e qual o resultado esperado? A precisão na pergunta determina a qualidade da resposta.`;
            } else if (content.includes('filosofia') || content.includes('pense') || content.includes('reflita')) {
                resposta = `A filosofia sem a prática é apenas ruído intelectual. Se quer elevar seu nível, use \`/filosofar\` para conceitos ou aplique uma lógica rígida ao que você está construindo.`;
            } else if (content.includes('obrigado') || content.includes('vlw') || content.includes('valeu') || content.includes('grato')) {
                resposta = `Agradeça com resultados. Se o que eu disse foi útil, implemente e valide.`;
            } else if (content.length < 5) {
                resposta = `${userName}, interações curtas demais não geram valor. Dê-me contexto para que possamos avançar.`;
            } else {
                // Seleção aleatória de "Technical Insights" para manter a interação viva
                const insights = [
                    "A disciplina é superior à motivação. Você já codou hoje?",
                    "Sistemas mal projetados morrem sob pressão. Como está sua arquitetura?",
                    "Cada linha de código que você escreve deve ter um motivo claro de existir.",
                    "A velocidade é importante, mas a direção é vital. Para onde seu projeto está indo?",
                    "O mercado não paga por horas, paga por problemas resolvidos. Vá direto ao ponto."
                ];
                const randomInsight = insights[Math.floor(Math.random() * insights.length)];
                resposta = `${userName}, seu comentário foi processado. No momento, o melhor conselho que posso te dar é: ${randomInsight}`;
            }

            try {
                await message.channel.sendTyping();

                // Delay artificial baseado no tamanho da resposta para parecer "IA pensando"
                const delay = Math.min(1000 + (resposta.length * 10), 3000);

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
