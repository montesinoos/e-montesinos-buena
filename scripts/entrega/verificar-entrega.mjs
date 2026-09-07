import { chromium } from 'playwright-core';
import AxeBuilder from '../../lab/entrega/tools/node_modules/@axe-core/playwright/dist/index.mjs';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const report={date:new Date().toISOString(),browser:browser.version(),checks:[],axe:[],network:[]};
const base='http://127.0.0.1:4400';
for(const width of [390,768,1440]){
 const ctx=await browser.newContext({viewport:{width,height:900}});
 const p=await ctx.newPage();
 p.on('pageerror',e=>report.network.push({width,error:e.message}));
 p.on('response',r=>{if(r.status()>=400)report.network.push({width,status:r.status(),url:r.url()})});
 for(const route of ['/','/proyectos','/como-trabajamos','/taller','/contacto','/404.html']){
  await p.goto(base+route,{waitUntil:'networkidle'});
  await p.waitForTimeout(400);
  const axe=await new AxeBuilder({page:p}).analyze();
  report.axe.push({width,route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  if(route==='/'){
   for(let i=0;i<4;i++){
    const button=p.locator(width<=860?'.recorrido button':'#mapa button').nth(i);
    await button.click();await p.waitForTimeout(1800);
    await p.screenshot({path:'lab/entrega/final-'+width+'-parada-'+i+'.png'});
    report.checks.push({width,stop:i,scroll:await p.evaluate(()=>scrollY),active:await button.getAttribute('aria-current')});
    if(i===1){const wood=p.locator('.muestra__pieza').first();await wood.click();await p.keyboard.press('Escape');}
    if(i===3&&width<=860){const zoom=p.locator('.mapa-salida__zoom');await zoom.click();await zoom.click();const country=p.locator('.svgMap-country[role="button"]').first();await country.focus();await p.keyboard.press('Enter');await p.screenshot({path:'lab/entrega/final-'+width+'-mapa-ficha.png'});}
   }
  }else{
   const height=await p.evaluate(()=>document.documentElement.scrollHeight);
   for(let y=0;y<height;y+=750){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(180);await p.screenshot({path:'lab/entrega/final-'+width+'-'+route.slice(1)+'-'+y+'.png'});}
  }
  if(route==='/proyectos'){
   for(const filter of await p.locator('#filtros button').all()){await filter.click();report.checks.push({width,filter:await filter.textContent(),count:await p.locator('.obra:visible').count()});}
   await p.locator('#filtros button').first().click();const opener=p.locator('[data-abrir-visor]').first();await opener.focus();await p.keyboard.press('Enter');const initial=await p.locator('#visor-img').getAttribute('src');await p.keyboard.press('ArrowRight');const next=await p.locator('#visor-img').getAttribute('src');await p.keyboard.press('Escape');report.checks.push({width,viewerChanges:initial!==next,focusRestored:await opener.evaluate(e=>e===document.activeElement)});
  }
  if(route==='/contacto'){
   let posts=0;p.on('request',r=>{if(r.method()==='POST')posts++});
   await p.locator('#nombre').fill('Prueba local');await p.locator('#email').fill('prueba@example.invalid');
   await p.locator('form').evaluate(f=>f.dispatchEvent(new Event('submit',{cancelable:true,bubbles:true})));
   report.checks.push({width,disabled:await p.locator('button[type="submit"]').isDisabled(),message:await p.locator('#recado').textContent(),namePreserved:await p.locator('#nombre').inputValue(),posts});
   await p.screenshot({path:'lab/entrega/final-'+width+'-contacto.png',fullPage:true});
  }
 }
 await ctx.close();
}
const p=await browser.newPage();
for(const url of [base+'/ruta-inexistente',base+'/estudio',base+'/robots.txt',base+'/sitemap.xml','https://e-montesinos-buena.paraspotu.workers.dev/']){
 try{const r=await p.goto(url,{waitUntil:'networkidle',timeout:30000});report.checks.push({url,status:r.status(),final:p.url(),headers:await r.allHeaders()});}catch(e){report.checks.push({url,error:e.message})}
}
fs.writeFileSync('lab/entrega/verificacion.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));await browser.close();
