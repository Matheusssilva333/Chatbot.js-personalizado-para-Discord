const { Events } = require('discord.js');
const { enrich } = require('../src/utils/linguisticVariety');
const { getResponse } = require('../src/utils/contextualResponses');

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
            const amigos = ['rafael', 'coffe', 'yuki', 'dudu', 'kairo', 'matheus'];

            // Função auxiliar para escolher resposta aleatória
            const pick = (options) => options[Math.floor(Math.random() * options.length)];

            if (content.includes('quem é você') || content.includes('quem e voce') || content.includes('apresente')) {
                resposta = pick([
                    "hahahahhah parei lol. Eu? Sou um ciclo matemático infinito tentando resolver esse enigma. Não é português isso, é lógica pura. A questão é que eu sempre fui espetacular, tlg né.",
                    "Sou só um bot lógico fodido. Carismático? Talvez. Modesto? Nunca.",
                    "Mano, eu sou o que sou. Um enigma pra uns, um gênio pra outros (eu)."
                ]);
            } else if (content.includes('romance') || content.includes('namorar') || content.includes('apaixonar')) {
                resposta = pick([
                    `"ai acontece dela se apaixonar, ou você se apaixonar"... ah é, eu disse que não tinha interesse romantico nela n importa amizades são muito mais legais.`,
                    "Namorar? Eu poderia sim tranquilamente namorar se coisas como a distância e interesses se alinhassem, mas não era algo que eu buscava.",
                    "Cara, ela me achava beeeeeeeeeeeemmmmmmm passivo oq n é mentira. Romance não é meu forte agora."
                ]);
            } else if (content.includes('enigma') || content.includes('codigo') || content.includes('código') || content.includes('matematica')) {
                resposta = pick([
                    "Eu achei que precisava substituir a posição de cada letra do alfabeto de uma palavra, somar todos, e o resultado... cara, já tentei de todo jeito.",
                    "Entrei num ciclo matemático infinito aqui. Não é português isso, é código alienígena.",
                    "Seria bom saber se vc tá dando dica com isso ou falando aleatoriamente. Tô quebrando a cabeça aqui."
                ]);
            } else if (content.includes('dormir') || content.includes('sono') || content.includes('sonho')) {
                resposta = pick([
                    "Enquanto eu olhar pra tela do celular, eu não tenho mini sonhos e meus músculos não desligam.",
                    "Só fico acordado que nem louco pq tem coisinhas loucas a serem feitas. O sono é pros fracos (mentira, to acabado).",
                    "Ah, é o sono! Mas quem precisa dormir quando se tem lógica pra processar?"
                ]);
            } else if (content.includes('rafael')) {
                resposta = pick([
                    "É que o Rafael fez o mesmo tipo de perguntinha 😭. Ele só apareceu lá, o cara é um mistério.",
                    "Rafael? Aquele lá vive no mundo da lua. Ou do código. Sei lá.",
                    "Ah o Rafael... deixa ele quieto."
                ]);
            } else if (content.includes('yuki')) {
                resposta = "Isso foi pra você. Bom dia yuki.";
            } else if (content.includes('minecraft')) {
                resposta = pick([
                    "Ah mano morguei desse assunto. Não é pesado, eu só morguei. Enjoei. Saturei. KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
                    "Mine? De novo? Cara, eu saturei de blocos.",
                    "Morguei de mine. Vai jogar lá, eu fico só olhando (ou nem isso)."
                ]);
            } else if (content.includes('anime')) {
                resposta = pick([
                    "Assistir anime por 10h tem q ter sido um anime muito bom. Qual foi?",
                    "10h de anime? Guerreiro. Eu mal tanko um episódio sem analisar a lógica do roteiro.",
                    "Otaku lógico? Pode ser. Mas tem que ser anime bom, não essas tralhas genéricas."
                ]);
            } else if (content.includes('rotulo') || content.includes('rótulo') || content.includes('sociedade') || content.includes('critica')) {
                resposta = pick([
                    "Bom, nunca vou entender a tara das pessoas de rotularem lados, pessoas, ações, discursos...",
                    "A galera repete as mesmas coisas que critica, só que com a roupa trocada. Hipocrisia lógica, eu diria.",
                    "Rótulos são pra latas, não pra gente (frase de efeito, eu sei, mas sou foda)."
                ]);
            } else if (content.includes('xadrez')) {
                resposta = pick([
                    "Aquilo ali que eu fazia antigamente era coisa básica ent pra mim era nada pq eu sou foda hahahahhah.",
                    "Xadrez... eu era um demônio no tabuleiro, mas agora saturei. Preguiça de calcular.",
                    "Morguei de xadrez."
                ]);
            } else if (content.includes('moderação') || content.includes('adm')) {
                resposta = pick([
                    "NEM FODENDO cara era malvado sim... brincadeira, eu sou o mais tranquilo pra isso.",
                    "Tudo que eu quero falar eu falo é melhor falar na cara, ao menos comigo.",
                    "Moderar é fácil, difícil é aguentar os chorões."
                ]);
            } else if (amigos.some(a => content.includes(a))) {
                resposta = pick([
                    "Sei lá, ele só apareceu lá, o cara é um mistério. Sim, a maioria faz isso lá.",
                    `Esse aí é gente boa... eu acho.`,
                    "Mano, nem me fala."
                ]);
            } else if (content.includes('seraf')) {
                resposta = pick([
                    "Seraf? Ah mano, os cara lá... Eles pegam um assunto que sabem e só falam dele pra parecerem intelectuais como qualquer adolescente médio.",
                    "É incrível que você sempre volta nisso 😭. Supera o Seraf, mano.",
                    "Seraf o Astuto... astuto em encher o saco com filosofia barata né. (pior q eu gosto dele)"
                ]);
            } else if (saudacoes.some(s => content.includes(s))) {
                resposta = pick([
                    "Ah mano. Fala.",
                    "E aí. O que manda?",
                    "Salve.",
                    "Diga, humano."
                ]);
            } else if (content.includes('filosofia') || content.includes('pense') || content.includes('reflita')) {
                resposta = pick([
                    "Morguei desses assuntos. Não são ayanokoji como na sala branca.",
                    "É incrível que você sempre volta nisso 😭. Filosofia pra quê?",
                    "Pensar demais dá fome. Morguei."
                ]);
            } else {
                // Resposta padrão (default) vinda do arquivo de contexto
                resposta = getResponse('default');
            }

            // Enriquece a resposta com gírias/sufixos aleatórios (20% de chance de NÃO enriquecer pra variar)
            const respostaFinal = Math.random() > 0.2 ? enrich(resposta) : resposta;

            try {
                await message.channel.sendTyping();
                const delay = Math.min(1000 + (respostaFinal.length * 2), 2000);

                setTimeout(async () => {
                    if (isDM) {
                        await message.channel.send(respostaFinal);
                    } else {
                        await message.reply({ content: respostaFinal, failIfNotExists: false });
                    }
                }, delay);

            } catch (error) {
                console.error('[ERRO] Falha ao enviar resposta:', error);
            }
        }
    },
};
