const fs = require('fs');
const files = ['src/app/entrepreneur/page.tsx', 'src/app/projet/page.tsx'];

const map = [
  ['text-zenicorp-black', 'text-zenicorp-text'],
  ['bg-white', 'bg-zenicorp-darkGray'],
  ['text-zenicorp-mediumGray', 'text-zenicorp-dim'],
  ['bg-zenicorp-lightGray', 'bg-zenicorp-darkGray/50'],
  ['border-zenicorp-border', 'border-zenicorp-line'],
  ['text-zenicorp-silver', 'text-zenicorp-dim'],
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  map.forEach(([a, b]) => {
    c = c.split(a).join(b);
  });
  fs.writeFileSync(f, c, 'utf8');
  console.log('converti:', f);
});