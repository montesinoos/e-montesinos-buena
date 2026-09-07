import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='entrega-evidencias/revision-2-7-8-9';
fs.mkdirSync(dir,{recursive:true});
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const results=[];
const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
const requests=[];
await p.route('https://www.google.com/**',async route=>{requests.push(route.request().url());await route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Mapa simulado localmente</title><p>Mapa de prueba</p>'});});
await p.goto('http://127.0.0.1:4400/',{waitUntil:'networkidle'});
await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(500);
assert.equal(requests.length,0);
assert.equal(await p.locator('iframe').count(),0);
await p.locator('[data-cargar-mapa]').click();
await p.locator('iframe').waitFor();await p.waitForTimeout(200);
assert.equal(requests.length,1);
await p.locator('[data-cerrar-mapa]').click();
assert.equal(await p.locator('iframe').count(),0);
assert.equal(await p.locator('[data-cargar-mapa]').evaluate(e=>e===document.activeElement),true);
results.push({privacy:'PASS',googleBeforeAction:0,googleAfterAction:1,externalMap:'interceptado y sustituido por HTML local',closeRestoresFocus:true});
for(const route of ['/aviso-legal','/privacidad','/cookies']){
 await p.goto('http://127.0.0.1:4400'+route);assert.match(await p.locator('meta[name="robots"]').getAttribute('content'),/noindex/);
 assert.match(await p.locator('.legal__borrador').textContent(),/Borrador/);
 results.push({route,draft:true,noindex:true});
}
await p.goto('http://127.0.0.1:4400/');
await p.locator('.recorrido button').last().click();await p.locator('#pais-mapa-salida').waitFor();
await p.locator('#pais-mapa-salida').selectOption('LU');await p.waitForTimeout(500);
assert.match(await p.locator('#ficha-pie').textContent(),/Luxemburgo/);
results.push({countrySelect:'PASS',country:'Luxemburgo'});
await p.screenshot({path:dir+'/selector-paises.png'});
for(const viewport of [{width:844,height:390},{width:390,height:844},{width:320,height:568}]){
 await p.setViewportSize(viewport);await p.waitForTimeout(700);
 results.push({orientation:viewport,overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
}
await p.close();
const fallback=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return String(type).includes('webgl')?null:original.call(this,type,...args)};});
await fallback.goto('http://127.0.0.1:4400/');await fallback.locator('#mapa button').last().click();
await fallback.locator('.globo__indice--alternativa').waitFor();
await fallback.locator('.globo__indice--alternativa button').filter({hasText:'Luxemburgo'}).click();await fallback.waitForTimeout(500);
assert.match(await fallback.locator('#ficha-pie').textContent(),/Luxemburgo/);
results.push({noWebGL:'PASS',country:'Luxemburgo'});
await fallback.screenshot({path:dir+'/sin-webgl.png'});
fs.writeFileSync(dir+'/privacidad-alternativas.json',JSON.stringify(results,null,2));
await b.close();console.log(results);
