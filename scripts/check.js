const fs = require('fs');
const x = fs.readFileSync(process.env.TEMP + '/zp.html', 'utf8');
console.log('dark:', x.includes('bg-zenicorp-black'));
console.log('hero réseau:', x.includes('Notre réseau'));
console.log('305$:', x.includes('305'));
console.log('70%:', x.includes('70'));
console.log('Header Z:', x.includes('>ZeniCorp<'));
console.log('gold badge:', x.includes('badge-gold'));
console.log('Hero Sième division badge:', x.includes('Division ZeniCorp'));