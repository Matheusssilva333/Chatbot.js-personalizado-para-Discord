// src/utils/linguisticVariety.js
/**
 * Garante variedade linguística e tom intelectual.
 */

const prefixes = [
    "Sob uma perspectiva rigorosa, ",
    "Ao analisarmos sistematicamente, ",
    "É imperativo considerar que ",
    "Dentro do arcabouço intelectual que nos guia, ",
    "Refletindo de forma ensaística sobre o tema, "
];

const suffixes = [
    ". Esta é uma conclusão fundamentada na lógica.",
    ". A estrutura do pensamento exige essa clareza.",
    ". Como administrador desta comunidade, prezo pela precisão desssa visão.",
    ". É o que a dialética nos sugere neste contexto."
];

function enrich(text) {
    const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${pre}${text}${suf}`;
}

module.exports = { enrich };
