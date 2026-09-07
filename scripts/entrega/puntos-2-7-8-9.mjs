import { chromium, webkit, firefox, devices } from '../../lab/entrega/tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../../lab/entrega/tools/node_modules/@axe-core/playwright/dist/index.mjs';
import fs from 'node:fs';
const dir='entrega-evidencias/revision-2-7-8-9';fs.mkdirSync(dir,{recursive:true});
const report={date:new Date().toISOString(),conditions:'Emulación/engines sobre Windows; no dispositivos físicos ni lector de pantalla real.',engines:[],pages:[],states:[],errors:[]};
const save=()=>fs.writeFileSync(dir+'/resultados.json',JSON.stringify(report,null,2));
const base='http://127.0.0.1:4400';
for(const [name,engine] of [['chromium',chromium],['webkit',webkit],['firefox',firefox]]){
 if(process.argv.includes('--sin-firefox') && name==='firefox')continue;
 let browser;
 try{browser=await engine.launch(name==='chromium'?{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true}:{headless:true});report.engines.push({name,version:browser.version(),status:'running'});}
 catch(e){report.engines.push({name,status:'blocked',reason:e.message});save();continue;}
 for(const width of [390,768,1440]){
  const ctx=await browser.newContext({viewport:{width,height:844},hasTouch:width<1000,...(name!=='firefox'?{isMobile:width<1000}:{}),reducedMotion:'reduce'});
  const p=await ctx.newPage();p.on('pageerror',e=>report.errors.push({name,width,error:e.message}));
  for(const route of ['/','/proyectos','/como-trabajamos','/taller','/contacto','/aviso-legal','/privacidad','/cookies','/404.html']){
   try{
    const response=await p.goto(base+route,{waitUntil:'networkidle',timeout:20000});
    const axe=await new AxeBuilder({page:p}).analyze();
    report.pages.push({name,width,route,status:response.status(),overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
    if(route==='/'){
     for(let i=0;i<4;i++){
      await p.locator(width<861?'.recorrido button':'#mapa button').nth(i).click();await p.waitForTimeout(1000);
      if(width===390){const a=await new AxeBuilder({page:p}).analyze();report.states.push({name,width,stop:i,violations:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});}
     }
     await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(400);
     await p.screenshot({path:dir+'/'+name+'-'+width+'-cierre.png'});
     report.states.push({name,width,closure:await p.locator('#cierre').isVisible(),iframeBeforeClick:await p.locator('iframe').count()});
    }
    if(route==='/proyectos'){await p.locator('[data-abrir-visor]').first().click();await p.keyboard.press('ArrowRight');await p.keyboard.press('Escape');report.states.push({name,width,dialogClosed:await p.locator('dialog').evaluate(d=>!d.open),focusRestored:await p.locator('[data-abrir-visor]').first().evaluate(e=>e===document.activeElement)});}
    if(route==='/aviso-legal'){await p.screenshot({path:dir+'/'+name+'-'+width+'-legal.png'});}
    save();
   }catch(e){report.errors.push({name,width,route,error:e.message});save();}
  }
  await ctx.close();
 }
 await browser.close();report.engines.find(e=>e.name===name).status='completed';save();console.log(name+' completo');
}
console.log(JSON.stringify({engines:report.engines.map(e=>({name:e.name,status:e.status})),pages:report.pages.length,violations:report.pages.filter(p=>p.violations.length),states:report.states.filter(s=>s.violations?.length),errors:report.errors},null,2));
