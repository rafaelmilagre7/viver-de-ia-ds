import { chromium } from 'playwright';
const targets = [
  ['/components/table','.vds-tbl-wrap','table.css glass (token)'],
  ['/components/table','td.user i, .vds-tbl td.user i','table.css:566 avatar ring'],
  ['/components/more','.vds-avgroup-more','more-components.css:531'],
  ['/components/chat','.vds-chat-input .ico','chat.css:310'],
  ['/components/more-2','.vds-comments-input button','more-components-2.css:455'],
  ['/components/media','.vds-mp-card','media-players.css'],
];
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1440,height:900}});
for (const [r,sel,label] of targets){
  await p.goto('http://localhost:5372'+r,{waitUntil:'networkidle'});
  for (const theme of ['light','dark']){
    await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
    await p.waitForTimeout(300);
    const v = await p.evaluate(s=>{const e=document.querySelector(s);return e?getComputedStyle(e).boxShadow:'(not found)';},sel);
    console.log(`${theme.padEnd(5)} | ${label.padEnd(34)} | ${v}`);
  }
  console.log('');
}
await b.close();
