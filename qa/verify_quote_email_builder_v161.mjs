import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import worker from '../Top_Notch_Quote_Email_Worker_V1.mjs';
globalThis.crypto ||= webcrypto;
const source=fs.readFileSync('Top_Notch_Sim_Builder_CONSOLIDATED_V1_61.js','utf8');
const env={RESEND_API_KEY:'test-only',TURNSTILE_SECRET_KEY:'test-only'};
const common={roomW:16,roomD:25,roomH:11,step:6,enclosureKey:'Sportscreen Parlour 13H__3-ply',launchMonitorPlacement:'floor',launchMonitorId:'mevo2',projectorId:'ah30',computerId:'own',monitorId:'own',matId:'hotshot-standard',matSizeId:'4x5',softwareIds:['gspro'],floorBase:'tiles-full',acousticEnabled:true,acousticSqft:150,padsEnabled:true,padsQty:4};
function harness(){
 const els=new Map(),events=[],requests=[],emails=[];
 const element=id=>{
  if(!els.has(id))els.set(id,{id,innerHTML:'',textContent:'Request My Quote + See Total',value:'',style:{},dataset:{},clientWidth:260,classList:{toggle(){},add(){},remove(){}},querySelectorAll(){return[]},querySelector(){return null},addEventListener(type,fn){this.events??={};this.events[type]=fn;},removeEventListener(){},appendChild(){},setAttribute(){},focus(){},getBoundingClientRect(){return{top:0,bottom:800,width:390,height:800}},remove(){}});
  return els.get(id);
 };
 let widgetOptions,shopStatus=200,emailStatus=200,networkFailure=false,shopHook=null;
 const ctx={console,URL,AbortController,Uint8Array,Image:function(){},setTimeout(){return 1},clearTimeout(){},localStorage:{removeItem(){}},sessionStorage:{removeItem(){}},window:{crypto:webcrypto,location:{origin:'https://topnotchgolf.ca',protocol:'https:'},innerHeight:844,devicePixelRatio:1,addEventListener(){},setInterval(){},gtag:(c,n,p)=>events.push({name:n,payload:p}),matchMedia(){return{matches:true,addEventListener(){}}},turnstile:{render(el,options){widgetOptions=options;return'widget-id'},reset(){}}},document:{visibilityState:'visible',addEventListener(){},getElementById:id=>id==='tnsb-consolidated-styles'?null:element(id),createElement:tag=>element(tag),querySelector(){return null},head:{appendChild(){}},body:{appendChild(){}}}};
 ctx.fetch=async(url,options)=>{
  requests.push({url,options});
  if(url.includes('formspree')){if(shopHook)await shopHook();return Response.json(shopStatus===200?{}:{errors:[{message:'mock failure'}]},{status:shopStatus});}
  if(networkFailure)throw new Error('mock network error');
  if(emailStatus!==200)return Response.json({error:'mock failure'},{status:emailStatus});
  const savedFetch=globalThis.fetch;
  globalThis.fetch=async(target,opts)=>{
   if(target.includes('siteverify'))return Response.json({success:true,hostname:'topnotchgolf.ca',action:'quote_email'});
   emails.push(JSON.parse(opts.body));return Response.json({id:'test-id'});
  };
  try{return await worker.fetch(new Request(url,{...options,headers:{...options.headers,Origin:'https://topnotchgolf.ca'}}),env);}
  finally{globalThis.fetch=savedFetch;}
 };
 const expose='state,quoteVerification,initQuoteVerification,submitQuote,retryCustomerQuoteEmail,save,renderReview,analytics,totalLabel,pricingNote,get lastSubmittedQuote(){return lastSubmittedQuote},get busy(){return quoteSubmitting}';
 vm.runInNewContext(source.replace('    initVisualizer();',`    window.test={${expose}};return true;\n    initVisualizer();`),ctx);
 const a=ctx.window.test;Object.assign(a.state,common);a.analytics.ready=true;
 element('tnsb-q-name').value='Test Customer';element('tnsb-q-email').value='customer@example.invalid';element('tnsb-q-phone').value='9025550123';
 return{a,ctx,element,events,requests,emails,token(){widgetOptions.callback('mock-token')},async ready(){await a.initQuoteVerification();this.token()},setShopStatus(s){shopStatus=s},setEmailStatus(s){emailStatus=s},setOffline(s){networkFailure=s},onShop(fn){shopHook=fn},get options(){return widgetOptions}};
}
const shopCount=h=>h.requests.filter(r=>r.url.includes('formspree')).length;
const emailCount=h=>h.requests.filter(r=>r.url.includes('workers.dev')).length;
const settle=async h=>{for(let i=0;i<30&&h.a.busy;i++)await new Promise(resolve=>setImmediate(resolve));assert(!h.a.busy);};

const good=harness();await good.ready();
assert.equal(good.options.sitekey,'0x4AAAAAAFfJ0oyubY09t0nG');assert.equal(good.options.action,'quote_email');assert.equal(good.options.size,'compact');
good.a.renderReview();assert(!good.element('tnsb-review').innerHTML.includes('$'),'Review does not expose prices');
good.element('tnsb-q-phone').value='';await good.a.submitQuote();assert.equal(good.requests.length,0,'Required fields block both sends');
good.element('tnsb-q-phone').value='9025550123';await good.a.submitQuote();
assert.equal(shopCount(good),1);assert.equal(emailCount(good),1);assert.equal(good.emails.length,1);
assert(good.emails[0].text.includes('GSPro'));assert(good.emails[0].text.includes('Annual Software Renewal: $369.99 CAD / year'));
assert(good.emails[0].text.includes('150 sq ft requested'));assert(good.emails[0].text.includes(good.a.totalLabel()));
assert(good.element('tnsb-form-status').innerHTML.includes('on its way'));assert(good.element('tnsb-form-status').innerHTML.includes('tnsb-revealed-total'));
await good.a.submitQuote();assert.equal(shopCount(good),1);assert.equal(emailCount(good),1,'Same quote cannot double-send');
assert(!/customer@example|9025550123|Test Customer/.test(JSON.stringify(good.events)),'Analytics contains no contact details');

const shopFailed=harness();await shopFailed.ready();shopFailed.setShopStatus(500);await shopFailed.a.submitQuote();
assert.equal(emailCount(shopFailed),0);assert(!shopFailed.element('tnsb-form-status').innerHTML.includes('tnsb-revealed-total'));assert(!shopFailed.element('tnsb-submit').disabled);

const emailFailed=harness();await emailFailed.ready();emailFailed.setEmailStatus(502);await emailFailed.a.submitQuote();
assert.equal(shopCount(emailFailed),1);assert.equal(emailCount(emailFailed),1);assert(emailFailed.element('tnsb-form-status').innerHTML.includes('tnsb-revealed-total'));
assert(emailFailed.element('tnsb-form-status').innerHTML.includes('Retry Email Copy'));assert(!emailFailed.element('tnsb-form-status').innerHTML.includes('on its way'));
const requestId=JSON.parse(emailFailed.requests.at(-1).options.body).requestId;
emailFailed.setEmailStatus(200);emailFailed.token();await emailFailed.a.retryCustomerQuoteEmail();
assert.equal(shopCount(emailFailed),1,'Email-only retry never duplicates the shop request');assert.equal(emailCount(emailFailed),2);
assert.equal(JSON.parse(emailFailed.requests.at(-1).options.body).requestId,requestId);

const blocked=harness();await blocked.a.initQuoteVerification();await blocked.a.submitQuote();
assert.equal(shopCount(blocked),1);assert.equal(emailCount(blocked),0);assert(blocked.element('tnsb-form-status').innerHTML.includes('Complete the email verification'));
blocked.token();await settle(blocked);assert.equal(emailCount(blocked),1,'Completing verification automatically sends the pending copy');assert.equal(shopCount(blocked),1);

const changed=harness();await changed.ready();changed.onShop(async()=>{changed.a.state.qEmail='different@example.invalid';changed.a.save()});await changed.a.submitQuote();
assert(changed.element('tnsb-form-status').innerHTML.includes('previous configuration'));assert(!changed.element('tnsb-form-status').innerHTML.includes('tnsb-revealed-total'));assert(!changed.element('tnsb-submit').disabled);
assert.equal(changed.emails[0].to[0],'customer@example.invalid','In-flight email uses the submitted snapshot');

const network=harness();await network.ready();network.setOffline(true);await network.a.submitQuote();assert.equal(network.a.lastSubmittedQuote.emailStatus,'failed');assert.equal(shopCount(network),1);assert(network.element('tnsb-form-status').innerHTML.includes('Retry Email Copy'));
console.log('PASS: real builder payload accepted by Worker; required contacts; pre-submit price hiding; software renewals/accessories; shop failure; email partial failure/retry; duplicate prevention; late verification; in-flight edits; no PII analytics. All network calls mocked; no emails sent.');
