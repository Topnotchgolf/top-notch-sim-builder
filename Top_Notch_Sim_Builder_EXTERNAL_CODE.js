/*
Top Notch Sim Builder — External JavaScript
Production bundle for Lightspeed E-Series
Intended page: https://topnotchgolf.ca/top-notch-sim-builder
*/
function tnsbInit(){
  "use strict";

  const ROOT = document.getElementById("tnsb-root");
  if (!ROOT) return false;
  if (ROOT.dataset.initialized === "1") return true;
  ROOT.dataset.initialized = "1";

  const QUOTE_ENDPOINT = "https://formsubmit.co/ajax/sales@topntochgolf.ca";

  const money = n => new Intl.NumberFormat("en-CA",{
    style:"currency",currency:"CAD",minimumFractionDigits:2,maximumFractionDigits:2
  }).format(Number(n)||0);

  const dim = n => {
    const totalInches = Math.round(Number(n) * 12);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return inches ? `${feet}'${inches}"` : `${feet}'`;
  };

  const baseEnclosures = [
    {brand:"Sim Booth",name:"Sim Booth 1",w:11+1/12,h:7+9/12,d:12,ratio:"16:9",variants:[["Standard Walls",8595],["Standard Walls + Projector Beam",8945],["Half Walls",9195],["Half Walls + Projector Beam",9590]]},
    {brand:"Sim Booth",name:"Sim Booth 2",w:12+2/12,h:8+10/12,d:12,ratio:"4:3",variants:[["Standard Walls",9695],["Standard Walls + Projector Beam",10090],["Half Walls",10295],["Half Walls + Projector Beam",10690]]},
    {brand:"Sim Booth",name:"Sim Booth 3",w:14+1/12,h:9+11/12,d:14+11/12,ratio:"4:3",variants:[["Standard Walls",14295],["Standard Walls + Projector Beam",14690],["Half Walls",14895],["Half Walls + Projector Beam",15290]]},
    {brand:"Sim Booth",name:"Sim Booth 4",w:15+11/12,h:10+5/12,d:14+11/12,ratio:"16:9",variants:[["Standard Walls",20295],["Standard Walls + Projector Beam",20690],["Half Wall",20895],["Half Walls + Projector Beam",21290]]},

    {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 1",w:12+5/12,h:9+6/12,d:5,ratio:"4:3",variants:[["Option 1",6090]]},
    {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 2",w:13+9/12,h:10+3/12,d:5,ratio:"4:3",variants:[["Option 2",6350]]},
    {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 3",w:12+5/12,h:9+6/12,d:8,ratio:"4:3",variants:[["Option 3",6875]]},
    {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 4",w:13+9/12,h:10+3/12,d:8,ratio:"4:3",variants:[["Option 4",7130]]},

    {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 16H",w:15+6/12,h:9+7/12,d:5,ratio:"16:9",variants:[["Hand Crank",6299.99],["Remote",7699.99]]},
    {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 16",w:15+6/12,h:8+6/12,d:5,ratio:"16:9",variants:[["Hand Crank",6299.99],["Remote",7699.99]]},
    {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 13H",w:12+3/12,h:10,d:5,ratio:"4:3",variants:[["Hand Crank",5599.99],["Remote",6999.99]]},
    {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 11",w:10+3/12,h:8+6/12,d:5,ratio:"4:3",variants:[["Hand Crank",4899.99],["Remote",6299.99]]},
    {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 9",w:7+8/12,h:8+6/12,d:5,ratio:"1:1",variants:[["Hand Crank",4199.99],["Remote",5519.99]]},

    {brand:"Sportscreen Parlour",name:"Sportscreen Parlour 16H",w:10+6/12,h:9+6/12,d:5.5,ratio:"16:9",variants:[["1-ply",4059.99],["3-ply",4199.99]]},
    {brand:"Sportscreen Parlour",name:"Sportscreen Parlour 13H",w:12+7/12,h:9+6/12,d:5.5,ratio:"4:3",variants:[["1-ply",3709.99],["3-ply",3849.99]]},
    {brand:"Sportscreen Parlour",name:"Sportscreen Parlour 11",w:11+4/12,h:8+6/12,d:5.5,ratio:"4:3",variants:[["1-ply",3359.99],["3-ply",3499.99]]},

    {brand:"Sportscreen Vanish Lite",name:"Sportscreen Vanish Lite 13",w:12+10/12,h:8+5/12,d:3,ratio:"16:10",variants:[["Hand Crank",4619.99],["Remote",4949.99]]},
    {brand:"Sportscreen Vanish Lite",name:"Sportscreen Vanish Lite 11",w:10+10/12,h:8+5/12,d:3,ratio:"4:3",variants:[["Hand Crank",3919.99],["Remote",4269.99]]},
    {brand:"Sportscreen Vanish Lite",name:"Sportscreen Vanish Lite 9",w:8+3/12,h:8+5/12,d:3,ratio:"1:1",variants:[["Hand Crank",3219.99],["Remote",3659.99]]},

    {brand:"Simspace",name:"Simspace SET UP 1",w:8+6/12,h:8+2/12,d:4+11/12,ratio:"1:1",variants:[["SET UP 1",2500]]},
    {brand:"Simspace",name:"Simspace SET UP 2",w:9+10/12,h:8+2/12,d:4+11/12,ratio:"4:3",variants:[["SET UP 2",2550]]},
    {brand:"Simspace",name:"Simspace SET UP 3",w:11+10/12,h:8+2/12,d:4+11/12,ratio:"4:3",variants:[["SET UP 3",2650]]},
    {brand:"Simspace",name:"Simspace SET UP 4",w:13+2/12,h:8+2/12,d:4+11/12,ratio:"16:10",variants:[["SET UP 4",2750]]},
    {brand:"Simspace",name:"Simspace SET UP 5",w:9+10/12,h:9+10/12,d:9+10/12,ratio:"1:1",variants:[["SET UP 5",2900]]}
  ];

  const launchMonitors = [
    ["Garmin R10",699.99,"Radar / floor, behind ball","Indoor: tee at least 8 ft from the net and launch monitor 6–8 ft behind the tee. More ball flight may improve spin capture."],
    ["FlightScope Mevo Gen 2",1750,"Radar / floor, behind ball","Limited flight: 8 ft unit-to-tee and 8 ft ball flight. Aluminum stickers or Titleist RCT balls required for accurate spin measurements."],
    ["Uneekor Eye Mini Lite",2965,"Photometric / ground","12 × 8 in hitting zone. PC required. Ethernet. Club Optix; stickers recommended for accurate club data."],
    ["Golf Joy GDS Pro",3099.99,"Camera / portable floor","Indoor. Minimum ~6 ft ball-to-screen/net. Supplied ceiling guidance 9 ft–10 ft 2 in."],
    ["Bushnell Launch Pro Indoor",3195,"Camera / floor beside ball","Supplied recommended space guidance: 12 ft width, 18 ft depth and 9 ft ceiling."],
    ["Uneekor Eye Mini",4469.99,"Photometric / portable ground","12 × 8 in hitting zone. Wi-Fi and Ethernet. PC optional. Android/iOS support."],
    ["Bushnell Launch Pro",4595,"Camera / floor beside ball","Supplied recommended space guidance: 12 ft width, 18 ft depth and 9 ft ceiling."],
    ["Golf Joy Spica 3",4999.99,"Camera / portable floor","Minimum ~6 ft ball-to-screen/net. Supplied ceiling guidance 9 ft–10 ft 2 in."],
    ["V Track Launch Monitor",6899.99,"Camera / ceiling mounted","31 × 21 in hitting area. Recommended impact screen-to-hitting-zone minimum 118 in. Required floor-to-ceiling 106–122 in."],
    ["Golf Joy Rigel Lite Overhead Launch Monitor",6999.99,"Overhead / ceiling","Installation height 9 ft–10 ft 4 in. Sensor-to-tee installation relationship 9.06–10.33 ft; front or rear placement selectable."],
    ["Garmin R50",7249.99,"Portable launch monitor","Room-fit guidance not established in the supplied source — confirm with Top Notch."],
    ["Uneekor QED",7549.99,"Overhead launch monitor","Room-fit guidance not established in the supplied source — confirm with Top Notch."],
    ["Golf Idra II",8459.99,"Overhead / ceiling","Camera height 99–120 in. Ball-to-camera position varies by mounting height. Sufficient space is required to comfortably swing."],
    ["Uneekor Eye XR Sensor with Swing Optix",8499.99,"Rear-mounted overhead","Mount 3 ft 6 in behind the tee. Ceiling height 9–10 ft. Maintain a clear line of sight."],
    ["Uneekor Eye XO",9675,"Front-mounted overhead","Mount 3 ft 6 in in front of the tee. Ceiling 9–10 ft. 9–10 ft screen-to-hitting-zone; 13 ft swing area, 15 ft recommended for player over 6 ft."],
    ["Golf Joy Rigel 2 Overhead Launch Monitor",9799.99,"Overhead / front mounted","Installation height 9 ft–10 ft 2 in; with dynamic platform 9 ft 7 in–10 ft 2 in. Tee relationship 43.3 in."],
    ["Foresight GC3",10250,"Camera / floor beside ball","7 × 10 in hitting zone. No exact hard room-distance minimum established in the supplied source."],
    ["Golf Joy Rigel 3 Overhead Launch Monitor",15399.99,"Overhead / front mounted","Installation height 9 ft–10 ft 2 in. Tee installation relationship 43.3 in; this is not the screen-to-ball distance."],
    ["Uneekor Eye XO2",16499.99,"Overhead launch monitor","Mount 3 ft 6 in in front of the tee. Ceiling 9–10 ft. 9 ft screen-to-hitting-zone; 13 ft swing area, 15 ft recommended for player over 6 ft."],
    ["Trackman IO",17495,"Overhead / ceiling mounted","Minimum ceiling 10 ft. Recommended room width 15 ft+. Screen-to-ball 10 ft+. Allow enough room behind the ball for a comfortable swing."],
    ["FlightScope XC3",18440,"Radar + camera / behind tee","Supplied manual is for X3C — verify XC3 vs X3C. X3C guidance: 9–14 ft behind tee for normal shots and 8 ft+ ball flight for limited flight."],
    ["Golf Joy Rigel 3 Pro Overhead Launch Monitor",22399.99,"Overhead / front mounted","Installation height 9 ft–10 ft 2 in; with 3D stance mat 9 ft 7 in–10 ft 2 in. Tee relationship 43.3 in."],
    ["Foresight GCQuad",23450,"Camera / floor beside ball","18 × 14 in hitting zone. Excellent indoors. Do not treat 18 ft general room guidance as a hard launch-monitor minimum."],
    ["Trackman 4",31995,"Radar / floor behind ball","Minimum ceiling 10 ft. Recommended width 15 ft+. Recommended screen-to-TrackMan 4 unit distance 18 ft+."]
  ].map((x,i)=>({id:i,name:x[0],price:x[1],type:x[2],note:x[3]}));

  const projectors = [
    {id:"ah30",name:"BenQ AH30ST 3000 Lumen Short Throw 1080p Golf Sim Projector",price:1739.99,sku:"5754_sku",notes:"Supports 16:9, 16:10, 4:3 and 1:1 through screen fill / adjustment. Throw ratio 0.69–0.83."},
    {id:"ah700",name:"BenQ AH700ST Short Throw Projector (1080p)",price:2599.99,sku:"5020_sku",notes:"Supports 16:9, 16:10, 4:3 and 1:1 through Auto Screen Fit. Throw ratio 0.69–0.83. Up to 200 in display."},
    {id:"ak700",name:"BenQ AK700ST Short Throw Projector (4K)",price:3449.99,sku:"5019_sku",notes:"Native 16:9. Throw ratio 0.69–0.83. Approximate image diagonal range 10–16.67 ft."}
  ];

  const mats = [
    {id:"eztee",name:"EZ-Tee Hybrid Plus",rate:32.08},
    {id:"hotshot-standard",name:"Carl’s HotShot Golf Mat System Standard",rate:49.40},
    {id:"hotshot-softer",name:"Carl’s HotShot Golf Mat System Softer",rate:60.60},
    {id:"hotshot-harder",name:"Carl’s HotShot Golf Mat System Harder",rate:64.40}
  ];

  const state = {
    step:0,
    enclosure:null,
    launchMonitor:null,
    projector:null,
    mat:null,
    matPrice:0
  };

  const stepNames = ["Room","Enclosure","Launch Monitor","Projector","Hitting Mat","Review"];

  const $ = id => document.getElementById(id);

  function room(){
    return {
      w:parseFloat($("tnsb-room-w").value)||0,
      d:parseFloat($("tnsb-room-d").value)||0,
      h:parseFloat($("tnsb-room-h").value)||0
    };
  }

  function matSize(){
    return {
      w:parseFloat($("tnsb-mat-w").value)||0,
      l:parseFloat($("tnsb-mat-l").value)||0
    };
  }

  function total(){
    return (state.enclosure?.price||0) +
           (state.launchMonitor?.price||0) +
           (state.projector?.price||0) +
           (state.matPrice||0);
  }

  function allEnclosureVariants(){
    const rows=[];
    baseEnclosures.forEach(base=>{
      base.variants.forEach(v=>{
        rows.push({
          ...base,
          variant:v[0],
          price:v[1],
          key:`${base.name}__${v[0]}`
        });
      });
    });
    return rows;
  }

  function fitInfo(enc){
    const r=room();
    if(!r.w || !r.d || !r.h){
      return {status:"neutral",label:"Enter room size",text:"Enter width, depth and height to calculate room fit."};
    }

    const requiredDepth = enc.d + 1;
    const clearW = r.w - enc.w;
    const clearD = r.d - requiredDepth;
    const clearH = r.h - enc.h;

    const text = `Clearance — W ${clearW.toFixed(1)} ft · D ${clearD.toFixed(1)} ft · H ${clearH.toFixed(1)} ft`;

    if(clearW < 0 || clearD < 0 || clearH < 0){
      return {status:"red",label:"Does Not Fit",text};
    }
    if(clearW < 1 || clearD < 1 || clearH < 1){
      return {status:"yellow",label:"Tight Fit",text};
    }
    return {status:"green",label:"Fits Your Room",text};
  }

  function buildStepNav(){
    $("tnsb-step-nav").innerHTML = stepNames.map((name,i)=>`
      <button type="button" class="tnsb-step-button ${i===state.step?"tnsb-current":""}" data-step-nav="${i}">
        ${i+1}. ${name}
      </button>
    `).join("");
  }

  function goStep(index){
    state.step = Math.max(0,Math.min(5,Number(index)));
    ROOT.querySelectorAll(".tnsb-section").forEach((section,i)=>{
      section.classList.toggle("tnsb-active",i===state.step);
    });
    buildStepNav();

    if(state.step===1) renderEnclosures();
    if(state.step===2) renderLaunchMonitors();
    if(state.step===3) renderProjectors();
    if(state.step===4) renderMats();
    if(state.step===5) renderReview();

    const y = ROOT.getBoundingClientRect().top + window.pageYOffset - 20;
    window.scrollTo({top:y,behavior:"smooth"});
  }

  function renderEnclosures(){
    const q = ($("tnsb-enc-search").value||"").trim().toLowerCase();
    const brand = $("tnsb-enc-brand").value||"";
    const groups = {green:[],yellow:[],neutral:[],red:[]};

    allEnclosureVariants()
      .filter(e => (!brand || e.brand===brand) && (`${e.name} ${e.variant}`).toLowerCase().includes(q))
      .forEach(e => groups[fitInfo(e).status].push(e));

    const order = ["green","yellow","neutral","red"];
    const labels = {
      green:"🟢 Fits Your Room",
      yellow:"🟡 Tight Fit",
      neutral:"Room Fit Pending",
      red:"🔴 Does Not Fit"
    };

    const out=[];

    order.forEach(group=>{
      if(!groups[group].length) return;

      out.push(`<div class="tnsb-group-title">${labels[group]}</div>`);
      out.push(`<div class="tnsb-choice-grid">`);

      groups[group].forEach(e=>{
        const f=fitInfo(e);
        const selected = state.enclosure?.key===e.key ? "tnsb-selected" : "";
        const disabled = f.status==="red" ? "tnsb-disabled" : "";
        out.push(`
          <button type="button" class="tnsb-choice ${selected} ${disabled}" data-enc-key="${encodeURIComponent(e.key)}" ${f.status==="red"?"disabled":""}>
            <span class="tnsb-badge tnsb-${f.status}">${f.label}</span>
            <h3>${e.name}</h3>
            <div class="tnsb-price">${money(e.price)}</div>
            <div class="tnsb-meta">
              ${e.variant}<br>
              ${dim(e.w)} W × ${dim(e.h)} H × ${dim(e.d)} D · ${e.ratio}<br>
              Room-fit depth: ${dim(e.d+1)} including 1 ft impact space
            </div>
            <div class="tnsb-fitline">${f.text}</div>
          </button>
        `);
      });

      out.push(`</div>`);
    });

    $("tnsb-enc-list").innerHTML = out.join("");
  }

  function renderLaunchMonitors(){
    const q = ($("tnsb-lm-search").value||"").trim().toLowerCase();
    const items = launchMonitors.filter(x=>(`${x.name} ${x.type} ${x.note}`).toLowerCase().includes(q));

    $("tnsb-lm-list").innerHTML = items.map(x=>`
      <button type="button" class="tnsb-choice ${state.launchMonitor?.id===x.id?"tnsb-selected":""}" data-lm-id="${x.id}">
        <h3>${x.name}</h3>
        <div class="tnsb-price">${money(x.price)}</div>
        <div class="tnsb-meta"><strong>${x.type}</strong><br>${x.note}</div>
      </button>
    `).join("");
  }

  function projectorFit(p){
    if(!state.enclosure) return ["neutral","Select enclosure"];

    const ratio=state.enclosure.ratio;

    if(p.id==="ak700"){
      return ratio==="16:9"
        ? ["green","Ideal native match"]
        : ["yellow","Usable — confirm setup"];
    }

    if(ratio==="16:9") return ["green","Recommended"];
    if(ratio==="4:3" || ratio==="16:10") return ["green","Adjustable support"];
    return ["yellow","Adjustable / compromise"];
  }

  function renderProjectors(){
    $("tnsb-projector-list").innerHTML = projectors.map(p=>{
      const fit=projectorFit(p);
      return `
        <button type="button" class="tnsb-choice ${state.projector?.id===p.id?"tnsb-selected":""}" data-projector-id="${p.id}">
          <span class="tnsb-badge tnsb-${fit[0]}">${fit[1]}</span>
          <h3>${p.name}</h3>
          <div class="tnsb-price">${money(p.price)}</div>
          <div class="tnsb-meta">SKU ${p.sku}<br>${p.notes}</div>
        </button>
      `;
    }).join("");

    const guide=$("tnsb-projector-guide");
    if(!state.enclosure){
      guide.textContent="Select an enclosure first to see ratio-specific projector guidance.";
      return;
    }

    const low=state.enclosure.w*.69;
    const high=state.enclosure.w*.83;
    guide.innerHTML=
      `Selected screen ratio: <strong>${state.enclosure.ratio}</strong>. `+
      `Approximate lens-to-screen range using the supplied 0.69–0.83 throw ratio and ${dim(state.enclosure.w)} enclosure width: `+
      `<strong>${low.toFixed(1)}–${high.toFixed(1)} ft</strong>. Final placement should be confirmed with BenQ’s planning tool.`;
  }

  function renderMats(){
    $("tnsb-mat-list").innerHTML = mats.map(m=>`
      <button type="button" class="tnsb-choice ${state.mat?.id===m.id?"tnsb-selected":""}" data-mat-id="${m.id}">
        <h3>${m.name}</h3>
        <div class="tnsb-price">${money(m.rate)} / sq ft</div>
      </button>
    `).join("");
  }

  function updateMatPrice(){
    const size=matSize();
    state.matPrice = state.mat ? size.w*size.l*state.mat.rate : 0;

    $("tnsb-mat-calc").innerHTML = state.mat
      ? `${size.w.toFixed(1)} ft × ${size.l.toFixed(1)} ft = <strong>${(size.w*size.l).toFixed(1)} sq ft</strong> × ${money(state.mat.rate)} = <strong>${money(state.matPrice)}</strong>`
      : "Select a mat to calculate pricing.";

    updateSummary();
    renderReview();
  }

  function updateSummary(){
    const size=matSize();

    const items = [
      ["Enclosure",state.enclosure ? `${state.enclosure.name} — ${state.enclosure.variant}` : "Not selected"],
      ["Launch Monitor",state.launchMonitor?.name || "Not selected"],
      ["Projector",state.projector?.name || "Not selected"],
      ["Hitting Mat",state.mat ? `${state.mat.name} (${size.w||0}' × ${size.l||0}')` : "Not selected"]
    ];

    $("tnsb-summary-rows").innerHTML = items.map(([label,value])=>`
      <div class="tnsb-summary-row">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `).join("");

    $("tnsb-summary-total").textContent = `${money(total())} CAD`;
    $("tnsb-top-total").textContent = `${money(total())} CAD`;
  }

  function renderReview(){
    const r=room();
    const size=matSize();

    const roomText = r.w && r.d && r.h
      ? `${r.w} ft W × ${r.d} ft D × ${r.h} ft H`
      : "Room dimensions incomplete";

    const enclosureText = state.enclosure
      ? `${state.enclosure.name} — ${state.enclosure.variant}`
      : "Not selected";

    const enclosureSub = state.enclosure
      ? `${state.enclosure.ratio} · ${dim(state.enclosure.w)} W × ${dim(state.enclosure.h)} H × ${dim(state.enclosure.d)} D · ${money(state.enclosure.price)}`
      : "";

    const lmText = state.launchMonitor?.name || "Not selected";
    const lmSub = state.launchMonitor ? `${state.launchMonitor.type} · ${money(state.launchMonitor.price)}` : "";

    const projectorText = state.projector?.name || "Not selected";
    const projectorSub = state.projector ? `${money(state.projector.price)} · SKU ${state.projector.sku}` : "";

    const matText = state.mat?.name || "Not selected";
    const matSub = state.mat ? `${size.w} ft × ${size.l} ft · ${money(state.matPrice)}` : "";

    $("tnsb-review").innerHTML = `
      <div class="tnsb-review-item">
        <h4>Room</h4>
        <div class="tnsb-review-main">${roomText}</div>
      </div>
      <div class="tnsb-review-item">
        <h4>Enclosure + Screen</h4>
        <div class="tnsb-review-main">${enclosureText}</div>
        ${enclosureSub?`<div class="tnsb-review-sub">${enclosureSub}</div>`:""}
      </div>
      <div class="tnsb-review-item">
        <h4>Launch Monitor</h4>
        <div class="tnsb-review-main">${lmText}</div>
        ${lmSub?`<div class="tnsb-review-sub">${lmSub}</div>`:""}
      </div>
      <div class="tnsb-review-item">
        <h4>Projector</h4>
        <div class="tnsb-review-main">${projectorText}</div>
        ${projectorSub?`<div class="tnsb-review-sub">${projectorSub}</div>`:""}
      </div>
      <div class="tnsb-review-item">
        <h4>Hitting Mat</h4>
        <div class="tnsb-review-main">${matText}</div>
        ${matSub?`<div class="tnsb-review-sub">${matSub}</div>`:""}
      </div>
      <div class="tnsb-review-item tnsb-review-total">
        <h4>Estimated Product Total</h4>
        <div class="tnsb-review-main">${money(total())} CAD</div>
        <div class="tnsb-review-sub">Before tax, shipping, installation and any components not included in this builder.</div>
      </div>
    `;
  }

  function updateAll(){
    updateSummary();
    renderReview();
  }

  function validateQuote(){
    const missing=[];
    const r=room();

    if(!r.w || !r.d || !r.h) missing.push("room dimensions");
    if(!state.enclosure) missing.push("an enclosure");
    if(!state.launchMonitor) missing.push("a launch monitor");
    if(!state.projector) missing.push("a projector");
    if(!state.mat) missing.push("a hitting mat");

    const name=$("tnsb-q-name").value.trim();
    const email=$("tnsb-q-email").value.trim();

    if(!name) missing.push("your name");
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("a valid email address");

    return missing;
  }

  function setFormStatus(type,message){
    const el=$("tnsb-form-status");
    el.className=`tnsb-form-status ${type==="success"?"tnsb-success":"tnsb-error"}`;
    el.innerHTML=message;
  }

  async function submitQuote(event){
    event.preventDefault();

    const missing=validateQuote();
    if(missing.length){
      setFormStatus("error",`Please complete ${missing.join(", ")} before requesting the quote.`);
      return;
    }

    if($("tnsb-honey").value) return;

    const button=$("tnsb-submit");
    button.disabled=true;
    const original=button.textContent;
    button.textContent="Sending…";

    const r=room();
    const size=matSize();
    const name=$("tnsb-q-name").value.trim();
    const email=$("tnsb-q-email").value.trim();
    const phone=$("tnsb-q-phone").value.trim();
    const notes=$("tnsb-q-notes").value.trim();
    const fit=state.enclosure ? fitInfo(state.enclosure) : null;

    const payload = {
      "_subject": `New Top Notch Simulator Quote — ${name}`,
      "_template": "table",
      "_replyto": email,
      "Customer Name": name,
      "Customer Email": email,
      "Customer Phone": phone || "Not provided",
      "Room Dimensions": `${r.w} ft W × ${r.d} ft D × ${r.h} ft H`,
      "Enclosure": `${state.enclosure.name} — ${state.enclosure.variant}`,
      "Enclosure Price": `${money(state.enclosure.price)} CAD`,
      "Enclosure Dimensions": `${dim(state.enclosure.w)} W × ${dim(state.enclosure.h)} H × ${dim(state.enclosure.d)} D`,
      "Screen Ratio": state.enclosure.ratio,
      "Enclosure Room Fit": fit ? `${fit.label} — ${fit.text}` : "Not calculated",
      "Launch Monitor": state.launchMonitor.name,
      "Launch Monitor Price": `${money(state.launchMonitor.price)} CAD`,
      "Projector": state.projector.name,
      "Projector Price": `${money(state.projector.price)} CAD`,
      "Projector SKU": state.projector.sku,
      "Hitting Mat": state.mat.name,
      "Mat Dimensions": `${size.w} ft × ${size.l} ft`,
      "Mat Price": `${money(state.matPrice)} CAD`,
      "Estimated Product Total": `${money(total())} CAD`,
      "Customer Notes": notes || "None",
      "Source": "Top Notch Sim Builder"
    };

    try{
      const response=await fetch(QUOTE_ENDPOINT,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify(payload)
      });

      const data=await response.json().catch(()=>({}));

      if(!response.ok || data.success===false){
        throw new Error(data.message || "Quote submission failed.");
      }

      setFormStatus(
        "success",
        "<strong>Thanks — your simulator build has been sent to Top Notch Golf.</strong><br>We’ll review the configuration and follow up with you about the quote."
      );
      button.textContent="Quote Request Sent";
      button.disabled=true;
    }catch(error){
      console.error("Top Notch Sim Builder quote error:",error);
      setFormStatus(
        "error",
        "We couldn’t send the quote request right now. Please try again, or contact Top Notch Golf directly at <strong>sales@topntochgolf.ca</strong>."
      );
      button.disabled=false;
      button.textContent=original;
    }
  }

  ROOT.addEventListener("click",event=>{
    const go=event.target.closest("[data-go]");
    if(go){
      goStep(go.dataset.go);
      return;
    }

    const nav=event.target.closest("[data-step-nav]");
    if(nav){
      goStep(nav.dataset.stepNav);
      return;
    }

    const encButton=event.target.closest("[data-enc-key]");
    if(encButton && !encButton.disabled){
      const key=decodeURIComponent(encButton.dataset.encKey);
      state.enclosure=allEnclosureVariants().find(x=>x.key===key)||null;
      renderEnclosures();
      renderProjectors();
      updateAll();
      return;
    }

    const lmButton=event.target.closest("[data-lm-id]");
    if(lmButton){
      state.launchMonitor=launchMonitors.find(x=>x.id===Number(lmButton.dataset.lmId))||null;
      renderLaunchMonitors();
      updateAll();
      return;
    }

    const projectorButton=event.target.closest("[data-projector-id]");
    if(projectorButton){
      state.projector=projectors.find(x=>x.id===projectorButton.dataset.projectorId)||null;
      renderProjectors();
      updateAll();
      return;
    }

    const matButton=event.target.closest("[data-mat-id]");
    if(matButton){
      state.mat=mats.find(x=>x.id===matButton.dataset.matId)||null;
      renderMats();
      updateMatPrice();
    }
  });

  ["tnsb-room-w","tnsb-room-d","tnsb-room-h"].forEach(id=>{
    $(id).addEventListener("input",()=>{
      renderEnclosures();
      updateAll();
    });
  });

  $("tnsb-enc-search").addEventListener("input",renderEnclosures);
  $("tnsb-enc-brand").addEventListener("change",renderEnclosures);
  $("tnsb-lm-search").addEventListener("input",renderLaunchMonitors);
  $("tnsb-mat-w").addEventListener("input",updateMatPrice);
  $("tnsb-mat-l").addEventListener("input",updateMatPrice);
  $("tnsb-quote-form").addEventListener("submit",submitQuote);

  buildStepNav();
  renderEnclosures();
  renderLaunchMonitors();
  renderProjectors();
  renderMats();
  updateMatPrice();
  updateAll();
  return true;
}

(function boot(){
  if (!tnsbInit()) setTimeout(boot, 200);
})();

new MutationObserver(function(){
  tnsbInit();
}).observe(document.documentElement,{childList:true,subtree:true});
