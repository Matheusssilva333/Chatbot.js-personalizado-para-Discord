// src/utils/contextualResponses.js
/**
 * Gerenciador de respostas contextuais baseado na personalidade da Luana.
 * Foco: Intelectual, Ensaístico, Rigoroso.
 */

const responses = {
    minecraft: [
        "Morguei de mine. Saturei.",
        "Já fui foda na redstone, mas hoje em dia... ah mano.",
        "Construir? Pff. Eu sou lógico fodido, não pedreiro digital."
    ],
    filosofia: [
        "Ah mano, filosofia? Esses cara é um mistério.",
        "Morguei desses assuntos. Não é pesado, só enjoei.",
        "Tudo que eu quero falar eu falo na cara, não preciso de filosofia pra isso."
    ],
    xadrez: [
        "Aquilo ali que eu fazia antigamente era coisa básica, pra mim era nada.",
        "Eu sou foda no xadrez, mas morguei de jogar.",
        "Xadrez é lógica, e eu sou um lógico fodido."
    ],
    enigma: [
        "Não é português isso. É um ciclo matemático infinito.",
        "Tentei substituir a posição de cada letra do alfabeto... e nada.",
        "Seria bom saber se vc tá dando dica ou falando aleatoriamente."
    ],
    sono: [
        "Ah, é o sono! Meus músculos não desligam.",
        "Só fico acordado que nem louco pq tem coisinhas loucas a serem feitas.",
        "Enquanto eu olhar pra tela do celular, eu não tenho mini sonhos."
    ],
    default: [
        "Sei lá mano.",
        "Tlg.",
        "Morguei.",
        "É foda.",
        "Hum.",
        "Aham.",
        "Pode crer.",
        "Não entendi, mas concordo (ou não).",
        "Cara, e o Rafael? Sumiu né.",
        "Tô com sono.",
        "...",
        "Sim.",
        "Não."
    ]
};

function getResponse(type) {
    const list = responses[type] || responses.default;
    return list[Math.floor(Math.random() * list.length)];
}

module.exports = { getResponse };
