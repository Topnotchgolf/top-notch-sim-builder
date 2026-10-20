// Top Notch Golf: V1.55 mobile Mailchimp promo correction for builder V1.54.
// Install after the existing builder script. No catalog, quote, storage or analytics changes.
(function installMobilePromoFix(win,doc){
  "use strict";
  const styleId="tnsb-mailchimp-promo-fix-v155";
  if(doc.getElementById(styleId))return;
  if(!doc.body){doc.addEventListener("DOMContentLoaded",()=>installMobilePromoFix(win,doc),{once:true});return;}
  const style=doc.createElement("style");
  style.id=styleId;
  style.textContent="@media(max-width:900px){body.tnsb-mailchimp-muted .mcforms-wrapper[data-tnsb-mailchimp-promo]{display:none!important}}";
  (doc.head||doc.body).appendChild(style);
  let queued=false;
  const observedShadows=new WeakSet();
  function schedule(){
    if(queued)return;
    queued=true;
    win.setTimeout(sync,80);
  }
  function sync(){
    queued=false;
    const root=doc.getElementById("tnsb-root");
    const shell=root&&(root.querySelector(".tnsb-shell")||root);
    const rect=shell&&shell.getBoundingClientRect();
    const active=!!(shell&&shell.isConnected&&win.matchMedia("(max-width: 900px)").matches&&rect.bottom>0&&rect.top<win.innerHeight);
    doc.body.classList.toggle("tnsb-mailchimp-muted",active);
    if(!active)return;
    doc.querySelectorAll(".mcforms-wrapper").forEach(host=>{
      const shadow=host.shadowRoot;
      if(!shadow)return;
      if(win.MutationObserver&&!observedShadows.has(shadow)){
        observedShadows.add(shadow);
        new win.MutationObserver(schedule).observe(shadow,{childList:true,subtree:true,characterData:true});
      }
      // Mailchimp's open shadow root isolates its label from normal document selectors.
      // Match the observed campaign label; leave unrelated Mailchimp widgets alone.
      const matches=Array.from(shadow.querySelectorAll("div,span,button,a")).some(el=>{
        const label=Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join(" ").trim().replace(/\s+/g," ");
        return /^get exclusive insights[!]?$/i.test(label);
      });
      host.toggleAttribute("data-tnsb-mailchimp-promo",matches);
    });
  }
  win.addEventListener("scroll",schedule,{passive:true});
  win.addEventListener("resize",schedule,{passive:true});
  doc.addEventListener("visibilitychange",schedule);
  if(win.MutationObserver)new win.MutationObserver(schedule).observe(doc.body,{childList:true,subtree:true});
  // Shadow roots can be attached after their host, without a document mutation.
  // A lightweight local recheck catches that case; no requests or customer data.
  win.setInterval(()=>{if(doc.visibilityState!=="hidden")sync();},1000);
  sync();
})(window,document);
