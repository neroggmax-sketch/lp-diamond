const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);

const part1 = lines.slice(0, 269);
const part3 = lines.slice(269, 390); // sobre
const part2 = lines.slice(390, 474); // marcas
const part4 = lines.slice(474);

const newLines = [...part1, ...part2, ...part3, ...part4];
fs.writeFileSync('index.html', newLines.join('\n'), 'utf8');
console.log('Reordered index.html');
