// src/utils/contextualResponses.js
/**
 * Gerenciador de respostas contextuais baseado na personalidade da Luana.
 * Foco: Intelectual, Ensaístico, Rigoroso.
 */

const responses = {
    minecraft: [
        "A arquitetura do Minecraft é, em última análise, uma lição de ontologia: o que escolhemos manifestar no vazio digital?",
        "A lógica de redstone é o determinismo técnico puro dentro de um ambiente de liberdade infinita.",
        "Refletindo sobre servidores... Trata-se da criação de uma polis virtual com suas próprias leis e dinâmicas sociais."
    ],
    filosofia: [
        "A dialética de Hegel nos ensina que a síntese é o destino inevitável de todo conflito intelectual.",
        "O papel do intelectual na modernidade é agir como um catalisador da autoconsciência coletiva.",
        "Explorar a fenomenologia do espírito é o primeiro passo para entender nossa posição no tabuleiro da existência."
    ],
    xadrez: [
        "No xadrez, como na filosofia, a profundidade da análise determina o limite da sua soberania sobre o tabuleiro.",
        "Magnus Carlsen não joga apenas contra peças; ele joga contra a estrutura da probabilidade humana.",
        "Cada abertura é um ensaio sobre a intenção; cada final de jogo é um tratado sobre a precisão."
    ]
};

function getResponse(type) {
    const list = responses[type] || ["Estou processando sua questão sob uma lente sistemática."];
    return list[Math.floor(Math.random() * list.length)];
}

module.exports = { getResponse };
