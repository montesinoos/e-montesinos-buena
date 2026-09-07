import { chromium } from 'playwright-core';
import lighthouse from '../../lab/entrega/tools/node_modules/lighthouse/core/index.js';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--remote-debugging-port=9223']});
for(const mode of ['mobile','desktop']){
 const result=await lighthouse('http://127.0.0.1:4400/',{port:9223,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(mode==='desktop'?{formFactor:'desktop',screenEmulation:{mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}}:{})});
 fs.writeFileSync('lab/entrega/lighthouse-'+mode+'.json',result.report);
 console.log(mode,JSON.stringify({scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,v.score])),lcp:result.lhr.audits['largest-contentful-paint'].displayValue,cls:result.lhr.audits['cumulative-layout-shift'].displayValue,tbt:result.lhr.audits['total-blocking-time'].displayValue}));
}
await browser.close();
