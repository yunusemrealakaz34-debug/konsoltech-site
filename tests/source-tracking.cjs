const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const script = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');
function run(search, saved, blocked = false) {
 const links = ['https://wa.me/905454562041', 'hizmetler.html', 'https://example.com/', 'https://wa.me/905454562041?text=PS5%20HDMI'].map(href => ({href, getAttribute() {return this.href;}}));
 const store = {value:saved};
 const document = {createElement:()=>({setAttribute(){},addEventListener(){}}),body:{appendChild(){}},querySelector:()=>null,querySelectorAll:s=>s==='a[href]'?links:[]};
 const location=new URL('https://playstationtamir.com/'+search);
 const window={location,addEventListener(){},sessionStorage:{getItem(){if(blocked)throw Error();return store.value;},setItem(k,v){if(blocked)throw Error();store.value=v;}}};
 vm.runInNewContext(script,{document,window,URL,URLSearchParams});
 return {links,store};
}
const query='?utm_source=meta&utm_medium=paid_social&utm_campaign=120253825252350747&utm_content=120254749494740747&kt_source=META-SITE-KARGO01';
for(const blocked of [false,true]) {
 const r=run(query,undefined,blocked);
 assert.match(new URL(r.links[0].href).searchParams.get('text'),/Kaynak: META-SITE-KARGO01$/);
 assert.match(r.links[1].href,/kt_source=META-SITE-KARGO01/);
 assert.equal(r.links[2].href,'https://example.com/');
 assert.match(new URL(r.links[3].href).searchParams.get('text'),/^PS5 HDMI\nKaynak:/);
}
assert.match(new URL(run('', 'META-SITE-KARGO01').links[0].href).searchParams.get('text'),/META-SITE-KARGO01$/);
for(const q of ['', '?kt_source=META-SITE-KARGO01', '?utm_source=meta&utm_campaign=905454562041&utm_content=secret&kt_source=name@example.com']) {
 const msg=new URL(run(q,'name@example.com').links[0].href).searchParams.get('text');
 assert.match(msg,/SITE-DOGRUDAN$/); assert.ok(!msg.includes('name@example')); assert.ok(!msg.includes('secret'));
}
console.log('Kaynak aktarımı senaryoları başarılı.');
