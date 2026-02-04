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
    ]
};

function getResponse(type) {
    const list = responses[type] || ["Estou processando sua questão sob uma lente sistemática."];
    return list[Math.floor(Math.random() * list.length)];
}

module.exports = { getResponse };
