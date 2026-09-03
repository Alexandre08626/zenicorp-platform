const fs = require('fs');
let c = fs.readFileSync('src/app/epoxy/page.tsx', 'utf8');
c = c.split("getDivisionBySlug('toiture')").join("getDivisionBySlug('epoxy')");
fs.writeFileSync('src/app/epoxy/page.tsx', c, 'utf8');
const v = fs.readFileSync('src/app/epoxy/page.tsx', 'utf8');
console.log('epoxy ok:', v.includes("getDivisionBySlug('epoxy')"));