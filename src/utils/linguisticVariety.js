// src/utils/linguisticVariety.js
/**
 * Garante variedade linguística e tom intelectual.
 */

const prefixes = [
    "Mano, ",
    "Na moral, ",
    "Sinceramente, ",
    "Tipo assim, ",
    "Ah mano, ",
    ""
];

const suffixes = [
    ", tlg né?",
    " hahahahhah",
    " KKKKKKKKKKK",
    " lol",
    ".",
    ", eu sou foda."
];

function enrich(text) {
    const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
    // As vezes nem usa prefixo/sufixo pra ser mais seco
    if (Math.random() > 0.7) return text;
    return `${pre}${text}${suf}`;
}

module.exports = { enrich };
