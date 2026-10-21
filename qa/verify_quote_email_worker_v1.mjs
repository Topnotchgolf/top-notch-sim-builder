import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import worker from '../Top_Notch_Quote_Email_Worker_V1.mjs';
globalThis.crypto ||= webcrypto;
const env = {RESEND_API_KEY:'test-only', TURNSTILE_SECRET_KEY:'test-only'};
const quote = {name:'Test <Customer>', email:'test@example.invalid', phone:'9025550123',
 'Room Dimensions':'16 ft W × 25 ft D × 11 ft H', 'Golfer Setup':'Left + Right',
 'Enclosure / Screen':'Example enclosure — 3-ply', 'Enclosure / Screen Price':'$5,000.00 CAD',
 'Launch Monitor':'Mevo Gen 2', 'Launch Monitor Price':'$1,799.99 CAD',
 'Projector':'Example projector', 'Projector Price':'Price on request CAD',
 'Hitting Surface':'Example mat', 'Hitting Surface Price':'$500.00 CAD',
 'Software Add-ons':'GS Pro — $369.99 CAD / year', 'Annual Software Renewal':'$369.99 CAD / year',
 'Estimated Product Total':'$7,669.98 CAD + items awaiting price', 'Pricing Note':'Before tax, shipping, duty, and installation.'};
const payload = {requestId:'12345678-1234-4123-8123-123456789abc', token:'test-token', quote};
let calls = [], challenge = {success:true, hostname:'topnotchgolf.ca', action:'quote_email'}, sendStatus=200, offline=false;
globalThis.fetch = async (url, options) => {
 calls.push({url, options});
 if (offline) throw new Error('network');
 return url.includes('siteverify') ? Response.json(challenge) : Response.json(sendStatus===200 ? {id:'mock-email-id'} : {message:'private failure'}, {status:sendStatus});
};
function request(body=payload, origin='https://topnotchgolf.ca', method='POST') {
 return new Request('https://worker.invalid/quote-email', {method, headers:{Origin:origin, 'Content-Type':'application/json'}, ...(method==='POST'?{body:JSON.stringify(body)}:{})});
}
assert.equal((await worker.fetch(request(), {})).status,503);
assert.equal(calls.length,0);
assert.equal((await worker.fetch(request(payload,'https://evil.invalid'),env)).status,403);
assert.equal(calls.length,0);
assert.equal((await worker.fetch(request({...payload,quote:{...quote,email:'one@example.invalid,two@example.invalid'}}),env)).status,400);
assert.equal((await worker.fetch(request({...payload,quote:{...quote,name:'x'.repeat(25000)}}),env)).status,400);
assert.equal(calls.length,0);
for (const bad of [{success:false}, {success:true,hostname:'evil.invalid',action:'quote_email'}, {success:true,hostname:'topnotchgolf.ca',action:'login'}]) {
 challenge=bad; calls=[];
 assert.equal((await worker.fetch(request(),env)).status,403);
 assert.equal(calls.length,1,'Unverified requests never reach Resend');
}
challenge={success:true,hostname:'www.topnotchgolf.ca',action:'quote_email'}; calls=[];
const response=await worker.fetch(request({...payload,quote:{...quote,html:'<script>evil</script>',subject:'Untrusted subject',to:['wrong@example.invalid']}}),env);
assert.equal(response.status,200); assert.equal((await response.json()).status,'accepted');
assert.equal(response.headers.get('Access-Control-Allow-Origin'),'https://topnotchgolf.ca');
const sent=JSON.parse(calls[1].options.body);
assert.deepEqual(sent.to,['test@example.invalid']);
assert.equal(sent.reply_to,'sales@topnotchgolf.ca');
assert.equal(sent.subject,'Your Top Notch Golf simulator quote');
assert(sent.html.includes('Test &lt;Customer&gt;'));
assert(!sent.html.includes('<script>') && !sent.html.includes('Test <Customer>'));
assert(sent.text.includes('Price on request') && sent.text.includes('$369.99 CAD / year') && sent.text.includes('discounts and promotions'));
const firstKey=calls[1].options.headers['Idempotency-Key']; calls=[];
await worker.fetch(request({...payload,token:'fresh-token'}),env);
assert.equal(calls[1].options.headers['Idempotency-Key'],firstKey,'Retries use the same email idempotency key with a fresh challenge');
calls=[]; await worker.fetch(request({...payload,quote:{...quote,email:'changed@example.invalid'}}),env);
assert.notEqual(calls[1].options.headers['Idempotency-Key'],firstKey,'Changed content never reuses a conflicting idempotency key');
sendStatus=429; assert.equal((await worker.fetch(request(),env)).status,502);
offline=true; assert.equal((await worker.fetch(request(),env)).status,503);
const preflight=await worker.fetch(request(payload,'https://topnotchgolf.ca','OPTIONS'),env);
assert.equal(preflight.status,204);
console.log('PASS: validation, body limits, origin restrictions, Turnstile failure/hostname/action, escaped content, fixed recipient routing, estimates and renewals, idempotent retries, and provider/network failures. No real emails sent.');
