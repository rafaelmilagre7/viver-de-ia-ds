import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('http://localhost:5372/components/cards',{waitUntil:'networkidle'});
for (const t of ['light','dark']){
  await p.evaluate(x=>document.documentElement.setAttribute('data-theme',x),t);
  await p.waitForTimeout(250);
  const v = await p.evaluate(()=>{
    const cs=getComputedStyle(document.documentElement);
    return ['03','06','10','14','20','30','40','60'].map(k=>k+'='+cs.getPropertyValue('--via-shadow-ink-'+k).trim()).join('  ');
  });
  console.log(t.toUpperCase().padEnd(5), v);
}
await b.close();
