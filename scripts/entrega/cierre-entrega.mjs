import { chromium } from 'playwright-core';
import fs from 'node:fs';
const b=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const r={console:[],checks:[]};const p=await b.newPage({viewport:{width:390,height:900}});
p.on('console',m=>{if(['error','warning'].includes(m.type()))r.console.push({type:m.type(),message:m.text()})});
p.on('pageerror',e=>r.console.push({type:'exception',message:e.message}));
await p.goto('http://127.0.0.1:4400/',{waitUntil:'networkidle'});
await p.locator('.recorrido button').last().click();await p.waitForTimeout(2000);
const country=p.locator('.svgMap-country[role="button"]').first();await country.focus();await p.keyboard.press('Enter');await p.waitForTimeout(800);
r.checks.push({mapCaption:await p.locator('#ficha-pie').textContent(),mapImage:await p.locator('#ficha-laminas img').evaluateAll(imgs=>imgs.map(i=>({alt:i.alt,loaded:i.complete&&i.naturalWidth>0})))});
await p.screenshot({path:'lab/entrega/cierre-mapa.png'});
await p.goto('http://127.0.0.1:4400/contacto#nombre');await p.waitForTimeout(500);
r.checks.push({noWhatsApp:await p.locator('.wasap').count()===0,noInvalidPhone:await p.locator('a[href="tel:+07473029106"]').count()===0,submitDisabled:await p.locator('button[type="submit"]').isDisabled()});
await p.screenshot({path:'lab/entrega/cierre-contacto.png'});
for(const route of ['/proyectos','/como-trabajamos','/taller','/contacto']){
 await p.locator('#abrir-menu').click();await p.locator('#menu-paginas a[href="'+route+'"]').click();await p.waitForLoadState('networkidle');r.checks.push({navigation:route,url:p.url()});
}
await p.locator('.chrome__marca').click();await p.waitForLoadState('networkidle');
await p.setViewportSize({width:320,height:225});await p.goto('http://127.0.0.1:4400/');await p.waitForTimeout(400);
r.checks.push({shortScreen:await p.locator('.umbral__copia').evaluate(e=>({height:e.clientHeight,scrollHeight:e.scrollHeight,overflow:getComputedStyle(e).overflowY,top:e.getBoundingClientRect().top}))});
await p.screenshot({path:'lab/entrega/cierre-pantalla-baja.png'});
await p.setViewportSize({width:640,height:450});await p.evaluate(()=>document.documentElement.style.zoom='2');await p.screenshot({path:'lab/entrega/cierre-zoom.png'});
fs.writeFileSync('lab/entrega/cierre.json',JSON.stringify(r,null,2));console.log(JSON.stringify(r,null,2));await b.close();
