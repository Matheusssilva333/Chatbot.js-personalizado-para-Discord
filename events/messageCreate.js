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

            // Persona: Entediado, Sarcástico, Confiante, Lógico, "Morgado"
            // Baseado nas msgs do usuário: "morguei", "saturei", "sou foda", "não tenho interesse romantico"
            let resposta = "";

            const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eai', 'fala'];
            const interesses = ['minecraft', 'filosofia', 'xadrez', 'moderação', 'adm', 'seraf'];
            const amigos = ['coffe', 'yuki', 'dudu', 'kairo', 'matheus'];

            if (content.includes('quem é você') || content.includes('quem e voce') || content.includes('apresente')) {
                resposta = `hahahahhah parei lol. Eu? Eu nunca tive não sou nada além de legal e carismático e um lógico fodido. A questão é que eu sempre fui espetacular, tlg né.`;
            } else if (content.includes('romance') || content.includes('namorar') || content.includes('apaixonar')) {
                resposta = `"ai acontece dela se apaixonar, ou você se apaixonar"... ah é, eu disse que não tinha interesse romantico nela n importa amizades são muito mais legais. Eu poderia sim tranquilamente namorar se coisas como a distância e interesses se alinhassem, mas não era algo que eu buscava. Tanto é que ela me achava beeeeeeeeeeeemmmmmmm passivo oq n é mentira.`;
            } else if (content.includes('minecraft')) {
                resposta = `Ah mano morguei desse assunto. Não é pesado, eu só morguei. Enjoei. Saturei. KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK`;
            } else if (content.includes('xadrez')) {
                resposta = `Aquilo ali que eu fazia antigamente era coisa básica ent pra mim era nada pq eu sou foda hahahahhah.`;
            } else if (content.includes('moderação') || content.includes('adm')) {
                resposta = `NEM FODENDO cara era malvado sim... brincadeira, eu sou o mais tranquilo pra isso, tudo que eu quero falar eu falo é melhor falar na cara, ao menos comigo.`;
            } else if (amigos.some(a => content.includes(a))) {
                resposta = `Sei lá, ele só apareceu lá, o cara é um mistério. Sim, a maioria faz isso lá.`;
            } else if (content.includes('seraf')) {
                resposta = `Seraf? Ah mano, os cara lá... Eles pegam um assunto que sabem e só falam dele pra parecerem intelectuais como qualquer adolescente médio. É incrível que você sempre volta nisso 😭`;
            } else if (saudacoes.some(s => content.includes(s))) {
                resposta = `Ah mano. Fala.`;
            } else if (content.includes('filosofia') || content.includes('pense') || content.includes('reflita')) {
                resposta = `Morguei desses assuntos. Não são ayanokoji como na sala branca. É incrível que você sempre volta nisso 😭`;
            } else {
                const reflexoes = [
                    "Ah mano morguei.",
                    "Enjoei. Saturei.",
                    "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
                    "A questão é que eu sempre fui espetacular, tlg né.",
                    "Tudo que eu quero falar eu falo é melhor falar na cara.",
                    "Eu sou foda hahahahhah parei lol."
                ];
                resposta = `${reflexoes[Math.floor(Math.random() * reflexoes.length)]}`;
            }

            try {
                await message.channel.sendTyping();
                const delay = Math.min(1000 + (resposta.length * 2), 2000);

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
