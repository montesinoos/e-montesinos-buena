import { chromium } from 'playwright-core';
import fs from 'node:fs';
const dir='lab/entrega'; fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const report={date:new Date().toISOString(),browser:browser.version(),base:'http://127.0.0.1:4400',pages:[],interactions:[]};
const widths=[320,390,600,768,859,861,1024,1440,1920];
for(const width of widths){
 const context=await browser.newContext({viewport:{width,height:width===600?360:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const route of ['/','/proyectos','/como-trabajamos','/taller','/contacto','/404.html']){
  const errors=[],failed=[]; const err=e=>errors.push(e.message);const fail=r=>failed.push(r.url());page.on('pageerror',err);page.on('requestfailed',fail);
  const response=await page.goto(report.base+route,{waitUntil:'networkidle'});
  await page.waitForTimeout(250);
  const data=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,description:document.querySelector('meta[name="description"]')?.content,overflow:document.documentElement.scrollWidth>innerWidth,links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),broken:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.src)}));
  if([390,768,1440].includes(width)) await page.screenshot({path:dir+'/'+width+'-'+(route==='/'?'home':route.slice(1))+'.png',fullPage:route!=='/'});
  if(route==='/proyectos'){
   await page.locator('[data-sector="oficinas"] button,button[data-sector="oficinas"]').first().click();
   const count=await page.locator('.obra:visible').count();
   await page.locator('.obra:visible [data-abrir-visor]').first().click();
   const opened=await page.locator('dialog').evaluate(d=>d.open);
   await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');
   report.interactions.push({width,filterCount:count,dialogOpened:opened,dialogClosed:await page.locator('dialog').evaluate(d=>!d.open)});
  }
  if(await page.locator('#abrir-menu').isVisible()){
   await page.locator('#abrir-menu').click();const open=await page.locator('#abrir-menu').getAttribute('aria-expanded');await page.keyboard.press('Escape');report.interactions.push({width,route,menuOpen:open,menuClosed:await page.locator('#abrir-menu').getAttribute('aria-expanded')});
  }
  report.pages.push({width,route,status:response.status(),...data,errors,failed});page.off('pageerror',err);page.off('requestfailed',fail);
 }
 await context.close();
}
fs.writeFileSync(dir+'/barrido.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages.length,issues:report.pages.filter(p=>p.overflow||p.broken.length||p.errors.length||p.failed.length),interactions:report.interactions},null,2));
await browser.close();
