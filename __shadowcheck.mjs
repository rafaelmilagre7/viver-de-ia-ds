import { chromium } from 'playwright';
const routes = ['/components/cards','/components/table','/components/chat','/components/more','/components/more-2','/components/media','/components/form','/components/modal','/components/buttons'];
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
let bad = [];
for (const r of routes) {
  await p.goto('http://localhost:5372'+r, {waitUntil:'networkidle'});
  await p.evaluate(()=>document.documentElement.setAttribute('data-theme','dark'));
  await p.waitForTimeout(600);
  const res = await p.evaluate(()=>{
    const out=[];
    for (const el of document.querySelectorAll('*')) {
      const bs = getComputedStyle(el).boxShadow;
      if (!bs || bs==='none') continue;
      // split layers on top-level commas
      let d=0,cur='',layers=[];
      for (const ch of bs){ if(ch==='(')d++; else if(ch===')')d--; if(ch===','&&d===0){layers.push(cur);cur='';} else cur+=ch; }
      layers.push(cur);
      for (const L of layers) {
        if (L.includes('inset')) continue;
        const nums = L.replace(/rgba?\([^)]*\)/,'').match(/-?[\d.]+px/g)||[];
        if (nums.length<3) continue;             // ring/line, not elevation
        if (parseFloat(nums[2])===0) continue;   // blur 0 => ring
        const m = L.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
        if(!m) continue;
        const [r,g,bl]=[+m[1],+m[2],+m[3]];
        const lum = 0.2126*r+0.7152*g+0.0722*bl;
        if (lum > 90) out.push({cls:(el.className||'').toString().slice(0,60), tag:el.tagName, layer:L.trim()});
      }
    }
    return out;
  });
  for (const x of res) bad.push({route:r,...x});
}
// sample proof: measure a known migrated element
await p.goto('http://localhost:5372/components/cards',{waitUntil:'networkidle'});
await p.evaluate(()=>document.documentElement.setAttribute('data-theme','dark'));
await p.waitForTimeout(400);
const sample = await p.evaluate(()=>{
  const el=document.querySelector('.vds-card, [class*="card"]');
  return el?{cls:el.className.toString(),bs:getComputedStyle(el).boxShadow}:null;
});
console.log('SAMPLE dark:', JSON.stringify(sample));
console.log('LIGHT-DROP-SHADOW OFFENDERS:', bad.length);
console.log(JSON.stringify(bad.slice(0,25),null,1));
await b.close();
