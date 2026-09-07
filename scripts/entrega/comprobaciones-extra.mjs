import { chromium } from 'playwright-core';
import fs from 'node:fs';
const b=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const base='http://127.0.0.1:4400';const report={links:[],other:[],secrets:[]};
const p=await b.newPage();const links=new Set();
for(const route of ['/','/proyectos','/como-trabajamos','/taller','/contacto']){
 await p.goto(base+route);for(const href of await p.locator('a').evaluateAll(a=>a.map(x=>x.href)))links.add(href);
 report.other.push({route,meta:await p.evaluate(()=>({canonical:document.querySelector('[rel="canonical"]')?.href,robots:document.querySelector('[name="robots"]')?.content,og:document.querySelector('[property="og:title"]')?.content,h1:document.querySelectorAll('h1').length,thirdParty:performance.getEntriesByType('resource').map(r=>r.name).filter(u=>!u.startsWith(location.origin)),cookies:document.cookie,storage:localStorage.length}))});
}
for(const url of links){
 if(!url.startsWith('http')){report.links.push({url,check:'Sólo sintaxis; no se activa aplicación externa'});continue;}
 try{const r=await p.request.get(url,{timeout:15000});report.links.push({url,status:r.status()});}catch(e){report.links.push({url,error:e.message.split('\n')[0]});}
}
for(const js of [false,true]){
 const c=await b.newContext({javaScriptEnabled:js,viewport:{width:390,height:844}});const q=await c.newPage();
 await q.goto(base+'/');await q.screenshot({path:'lab/entrega/extra-home-js-'+js+'.png'});
 report.other.push({js,homeText:await q.locator('h1').textContent(),contactLinkCount:await q.locator('a[href*="/contacto"]').count()});
 await c.close();
}
await p.goto(base+'/contacto?utm_source=auditoria&utm_medium=local#nombre');
 report.other.push({utm:true,focused:await p.locator('#nombre').evaluate(e=>document.activeElement===e)});
await p.goto(base+'/');await p.setViewportSize({width:640,height:450});await p.evaluate(()=>document.documentElement.style.zoom='2');await p.screenshot({path:'lab/entrega/zoom-200.png'});
report.other.push({zoom200:await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth}))});
// Buscar sólo patrones de alta confianza en fuentes públicas; nunca imprimir valores.
for(const dir of ['dist','src','public']){
 for(const name of fs.readdirSync(dir,{recursive:true})){
  const file=dir+'/'+name;if(!/\.(js|html|css|astro|json|txt)$/.test(file)||!fs.statSync(file).isFile())continue;
  const text=fs.readFileSync(file,'utf8');if(/(?:sk-[A-Za-z0-9]{25,}|AKIA[A-Z0-9]{16}|BEGIN (?:RSA |EC )?PRIVATE KEY)/.test(text))report.secrets.push({file,patternFound:true});
 }
}
fs.writeFileSync('lab/entrega/extra.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await b.close();
