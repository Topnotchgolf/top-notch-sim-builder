/*
Top Notch Golf Simulator Builder — Consolidated Production Build
Generated for Lightspeed E-Series
Includes: room fit, enclosures + standalone screens, launch monitors, projectors,
hitting mats, flooring/turf, flooring bases, gaming towers, monitors, accessories,
product detail links, dynamic compatibility guidance, review + Formspree quote submission.
*/
(function(){
  "use strict";

  const VERSION = "2026-09-23-consolidated-v1.7";
  const STORAGE_KEY = "tnsb-consolidated-v1";
  const FORM_ENDPOINT = "https://formspree.io/f/mgaveeol";
  const DISCLAIMER = "Price is before tax, shipping, duty, and installation if required. Thank you for your submission, We will respond within 24 hours with finalized pricing including any discounts, promotions, shipping, duty, installation, and taxes.";

  function init(){
    const ROOT = document.getElementById("tnsb-root");
    if(!ROOT) return false;
    if(ROOT.dataset.consolidatedInit === VERSION) return true;
    ROOT.dataset.consolidatedInit = VERSION;

    const money = n => new Intl.NumberFormat("en-CA",{
      style:"currency",currency:"CAD",minimumFractionDigits:2,maximumFractionDigits:2
    }).format(Number(n)||0);

    const esc = value => String(value ?? "")
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#039;");

    const dim = n => {
      const totalInches = Math.round(Number(n||0)*12);
      const feet = Math.floor(totalInches/12);
      const inches = totalInches%12;
      return inches ? `${feet}'${inches}\"` : `${feet}'`;
    };

    const round1 = n => Math.round((Number(n)||0)*10)/10;
    const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
    const ceilPack = (qty,pack) => Math.ceil(Math.max(0,qty)/pack);

    const URLS = {
      simbooth1:"https://topnotchgolf.ca/products/SIMBOOTH-1-SIMULATOR-ENCLOSURE-p815778501",
      simbooth2:"https://topnotchgolf.ca/products/SIMBOOTH-2-SIMULATOR-ENCLOSURE-p815778268",
      simbooth3:"https://topnotchgolf.ca/products/SIMBOOTH-3-SIMULATOR-ENCLOSURE-p851626511",
      simbooth4:"https://topnotchgolf.ca/products/SIMBOOTH-4-SIMULATOR-ENCLOSURE-p851626512",
      carlsEnclosure:"https://topnotchgolf.ca/products/CARLS-C-SERIES-PRO-GOLF-SIMULATOR-ENCLOSURE-8-DEPTH-W-IMPACT-SCREEN-p824514648",
      vanish:"https://topnotchgolf.ca/products/THE-SPORTSCREEN-VANISH-SERIES-RETRACTABLE-GOLF-ENCLOSURE-p859266422",
      parlour:"https://topnotchgolf.ca/products/THE-SPORTSCREEN-PARLOUR-SERIES-GOLF-ENCLOSURE-p859256576",
      vanishLite:"https://topnotchgolf.ca/products/THE-SPORTSCREEN-VANISH-LITE-HYBRID-RETRACTABLE-GOLF-ENCLOSURE-p859247568",
      simspace:"https://topnotchgolf.ca/products/SIM-SPACE-ENCLOSURE-p800152949",
      hcFlaps:"https://topnotchgolf.ca/products/CARLS-PLACE-HIGH-CONTRAST-GREY-SCREEN-CLASSIC-W-FLAPS-p824751647",
      premiumFlaps:"https://topnotchgolf.ca/products/CARLS-PLACE-PREMIUM-GOLF-IMPACT-SCREEN-CLASSIC-W-FLAPS-p824751587",
      hcLoop:"https://topnotchgolf.ca/products/CARLS-PLACE-HIGH-CONTRAST-GREY-SCREEN-CLASSIC-W-LOOP-FASTENERS-p824751649",
      premiumLoop:"https://topnotchgolf.ca/products/CARLS-PLACE-PREMIUM-GOLF-IMPACT-SCREEN-CLASSIC-W-LOOP-FASTENER-p824743435",
      hcClassic:"https://topnotchgolf.ca/products/CARLS-PLACE-HIGH-CONTRAST-GREY-SCREEN-CLASSIC-p822766492",
      premiumClassic:"https://topnotchgolf.ca/products/CARLS-PLACE-PREMIUM-GOLF-IMPACT-SCREEN-CLASSIC-p824743400",
      trackman4:"https://topnotchgolf.ca/products/TRACKMAN-4-INDOOR-OUTDOOR-p819672867",
      x3c:"https://topnotchgolf.ca/products/FLIGHTSCOPE-X3C-p814107856",
      trackmanIo:"https://topnotchgolf.ca/products/TRACKMAN-IO-LAUNCH-MONITOR-HOME-p819669992",
      gcquad:"https://topnotchgolf.ca/products/FORESIGHT-GCQUAD-LAUNCH-MONITOR-p853641286",
      rigel3Pro:"https://topnotchgolf.ca/products/GOLFJOY-RIGEL-3-PRO-OVERHEAD-LAUNCH-MONITOR-p815775921",
      eyeXo2:"https://topnotchgolf.ca/products/UNEEKOR-EYE-XO2-LAUNCH-MONITOR-p822759826",
      rigel3:"https://topnotchgolf.ca/products/GOLFJOY-RIGEL-3-OVERHEAD-LAUNCH-MONITOR-p815778732",
      gc3:"https://topnotchgolf.ca/products/FORESIGHT-GC3-LAUNCH-MONITOR-p859282372",
      rigel2:"https://topnotchgolf.ca/products/GOLFJOY-RIGEL-2-OVERHEAD-LAUNCH-MONITOR-p815783152",
      eyeXo:"https://topnotchgolf.ca/products/UNEEKOR-EYE-XO-p726370746",
      eyeXr:"https://topnotchgolf.ca/products/UNEEKOR-EYE-XR-SENSOR-WITH-SWING-OPTIX-p815173045",
      idra2:"https://topnotchgolf.ca/products/GOLFIN-IDRA-II-LAUNCH-MONITOR-p814101179",
      qed:"https://topnotchgolf.ca/products/UNEEKOR-QED-LAUNCH-MONITOR-p726673550",
      rigelLite:"https://topnotchgolf.ca/products/GOLFJOY-RIGEL-LITE-OVERHEAD-LAUNCH-MONITOR-p815775917",
      vtrack:"https://topnotchgolf.ca/products/V-TRACK-LAUNCH-MONITOR-p792899389",
      r50:"https://topnotchgolf.ca/products/GARMIN-R50-LAUNCH-MONITOR-p709244753",
      spica3:"https://topnotchgolf.ca/products/GOLFJOY-SPICA-3-LAUNCH-MONITOR-p815778717",
      launchPro:"https://topnotchgolf.ca/products/BUSHNELL-LAUNCH-PRO-p808192049",
      eyeMini:"https://topnotchgolf.ca/products/UNEEKOR-EYE-MINI-p726671570",
      launchProIndoor:"https://topnotchgolf.ca/products/BUSHNELL-LAUNCH-PRO-INDOOR-p808183929",
      gdsPro:"https://topnotchgolf.ca/products/GOLFJOY-GDS-PRO-LAUNCH-MONITOR-p815783148",
      eyeMiniLite:"https://topnotchgolf.ca/products/UNEEKOR-EYE-MINI-LITE-p853205331",
      mevo2:"https://topnotchgolf.ca/products/FLIGHTSCOPE-MEVO-GEN-2-p814108996",
      r10:"https://topnotchgolf.ca/products/GARMIN-R10-LAUNCH-MONITOR-p683964171",
      lk936:"https://topnotchgolf.ca/products/BENQ-4K-HDR-SHORT-THROW-LASER-PROJECTOR-BLACK-LK936ST-p866602548",
      ak700:"https://topnotchgolf.ca/products/BENQ-AK700ST-SHORT-THROW-PROJECTOR-4K-p794667234",
      ah700:"https://topnotchgolf.ca/products/BENQ-AH700ST-SHORT-THROW-PROJECTOR-1080P-p794670142",
      ah30:"https://topnotchgolf.ca/products/BENQ-AH30ST-3000-LUMEN-SHORT-THROW-1080P-LED-GOLF-SIM-PROJECTOR-p818838455",
      hotshot:"https://topnotchgolf.ca/products/CARLS-HOTSHOT-GOLF-MAT-SYSTEM-4-X-5-p821750359",
      eztee:"https://topnotchgolf.ca/products/EZ-TEE-HYBRID-PLUS-p819236735",
      np45:"https://topnotchgolf.ca/products/NP45-GOLF-PUTTING-TURF-p818838465",
      rough:"https://topnotchgolf.ca/products/SYNTHETIC-TURF-BERMUDA-BLEND-p866619180",
      floorTiles:"https://topnotchgolf.ca/products/CARLS-PLACE-FLOOR-TILE-SYSTEM-p822766267",
      hotshotBase:"https://topnotchgolf.ca/products/CARLS-HOTSHOT-GOLF-MAT-BASE-p824466237",
      pads:"https://topnotchgolf.ca/products/Your-Swing-Wall-Ceiling-Protection-Pads-p859889214",
      acoustic:"https://topnotchgolf.ca/products/GOLF-ROOM-ACOUSTIC-TILES-25qty-p866619190",
      tower5080:"https://topnotchgolf.ca/products/Gaming-Tower-5080-p866655305",
      tower5070ti:"https://topnotchgolf.ca/products/Gaming-Tower-5070-Ti-p866619202",
      tower5060:"https://topnotchgolf.ca/products/Gaming-Tower-5060-p866657554",
      mon24Touch:"https://topnotchgolf.ca/products/24-FHD-Touch-Monitor-p866655365",
      mon27Dual:"https://topnotchgolf.ca/products/27-4K-320Hz-Dual-Resolution-Gaming-Monitor-p866619215",
      mon27Qhd:"https://topnotchgolf.ca/products/27-QHD-300Hz-Gaming-Monitor-p866672787",
      mon25Fhd:"https://topnotchgolf.ca/products/25-FHD-320Hz-Gaming-Monitor-p866655308",
      mon21Touch:"https://topnotchgolf.ca/products/21-5-FHD-Touch-Monitor-p866657580",
      projectorMount:"https://topnotchgolf.ca/products/PROJECTOR-MOUNT-p866619235",
      simrail:"https://topnotchgolf.ca/products/SIMRAIL-p814074271"
    };

    const baseEnclosures = [
      {brand:"Sim Booth",name:"Sim Booth 1",w:11+1/12,h:7+9/12,d:12,ratio:"16:9",url:URLS.simbooth1,variants:[["Standard Walls",8595],["Standard Walls + Projector Beam",8945],["Half Walls",9195],["Half Walls + Projector Beam",9590]]},
      {brand:"Sim Booth",name:"Sim Booth 2",w:12+2/12,h:8+10/12,d:12,ratio:"4:3",url:URLS.simbooth2,variants:[["Standard Walls",9695],["Standard Walls + Projector Beam",10090],["Half Walls",10295],["Half Walls + Projector Beam",10690]]},
      {brand:"Sim Booth",name:"Sim Booth 3",w:14+1/12,h:9+11/12,d:14+11/12,ratio:"4:3",url:URLS.simbooth3,variants:[["Standard Walls",14295],["Standard Walls + Projector Beam",14690],["Half Walls",14895],["Half Walls + Projector Beam",15290]]},
      {brand:"Sim Booth",name:"Sim Booth 4",w:15+11/12,h:10+5/12,d:14+11/12,ratio:"16:9",url:URLS.simbooth4,variants:[["Standard Walls",20295],["Standard Walls + Projector Beam",20690],["Half Wall",20895],["Half Walls + Projector Beam",21290]]},
      {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 1",w:12+5/12,h:9+6/12,d:5,ratio:"4:3",url:URLS.carlsEnclosure,variants:[["Option 1",6090]]},
      {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 2",w:13+9/12,h:10+3/12,d:5,ratio:"4:3",url:URLS.carlsEnclosure,variants:[["Option 2",6350]]},
      {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 3",w:12+5/12,h:9+6/12,d:8,ratio:"4:3",url:URLS.carlsEnclosure,variants:[["Option 3",6875]]},
      {brand:"Carl's Place",name:"Carl's Place Pro Golf Enclosure Option 4",w:13+9/12,h:10+3/12,d:8,ratio:"4:3",url:URLS.carlsEnclosure,variants:[["Option 4",7130]]},
      {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 16H",w:15+6/12,h:9+7/12,d:5,ratio:"16:9",url:URLS.vanish,variants:[["Hand Crank",6299.99],["Remote",7699.99]]},
      {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 16",w:15+6/12,h:8+6/12,d:5,ratio:"16:9",url:URLS.vanish,variants:[["Hand Crank",6299.99],["Remote",7699.99]]},
      {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 13H",w:12+3/12,h:10,d:5,ratio:"4:3",url:URLS.vanish,variants:[["Hand Crank",5599.99],["Remote",6999.99]]},
      {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 11",w:10+3/12,h:8+6/12,d:5,ratio:"4:3",url:URLS.vanish,variants:[["Hand Crank",4899.99],["Remote",6299.99]]},
      {brand:"Sportscreen Vanish",name:"Sportscreen Vanish 9",w:7+8/12,h:8+6/12,d:5,ratio:"1:1",url:URLS.vanish,variants:[["Hand Crank",4199.99],["Remote",5519.99]]},
      {brand:"Sportscreen Parlour",name:"Sportscreen Parlour 16H",w:10+6/12,h:9+6/12,d:5.5,ratio:"16:9",url:URLS.parlour,variants:[["1-ply",4059.99],["3-ply",4199.99]]},
      {brand:"Sportscreen Parlour",name:"Sportscreen Parlour 13H",w:12+7/12,h:9+6/12,d:5.5,ratio:"4:3",url:URLS.parlour,variants:[["1-ply",3709.99],["3-ply",3849.99]]},
      {brand:"Sportscreen Parlour",name:"Sportscreen Parlour 11",w:11+4/12,h:8+6/12,d:5.5,ratio:"4:3",url:URLS.parlour,variants:[["1-ply",3359.99],["3-ply",3499.99]]},
      {brand:"Sportscreen Vanish Lite",name:"Sportscreen Vanish Lite 13",w:12+10/12,h:8+5/12,d:3,ratio:"16:10",url:URLS.vanishLite,variants:[["Hand Crank",4619.99],["Remote",4949.99]]},
      {brand:"Sportscreen Vanish Lite",name:"Sportscreen Vanish Lite 11",w:10+10/12,h:8+5/12,d:3,ratio:"4:3",url:URLS.vanishLite,variants:[["Hand Crank",3919.99],["Remote",4269.99]]},
      {brand:"Sportscreen Vanish Lite",name:"Sportscreen Vanish Lite 9",w:8+3/12,h:8+5/12,d:3,ratio:"1:1",url:URLS.vanishLite,variants:[["Hand Crank",3219.99],["Remote",3659.99]]},
      {brand:"Simspace",name:"Simspace SET UP 1",w:8+6/12,h:8+2/12,d:4+11/12,ratio:"1:1",url:URLS.simspace,variants:[["SET UP 1",2500]]},
      {brand:"Simspace",name:"Simspace SET UP 2",w:9+10/12,h:8+2/12,d:4+11/12,ratio:"4:3",url:URLS.simspace,variants:[["SET UP 2",2550]]},
      {brand:"Simspace",name:"Simspace SET UP 3",w:11+10/12,h:8+2/12,d:4+11/12,ratio:"4:3",url:URLS.simspace,variants:[["SET UP 3",2650]]},
      {brand:"Simspace",name:"Simspace SET UP 4",w:13+2/12,h:8+2/12,d:4+11/12,ratio:"16:10",url:URLS.simspace,variants:[["SET UP 4",2750]]},
      {brand:"Simspace",name:"Simspace SET UP 5",w:9+10/12,h:9+10/12,d:9+10/12,ratio:"1:1",url:URLS.simspace,variants:[["SET UP 5",2900]]}
    ];

    const allEnclosures = baseEnclosures.flatMap(base => base.variants.map(v => ({
      ...base,variant:v[0],price:v[1],key:`${base.name}__${v[0]}`
    })));

    const screenFamilies = [
      {id:"hc-flaps",family:"High-Contrast Grey – Classic w/ Flaps",url:URLS.hcFlaps,sizes:[[8,8,859.99],[9,9,942.99],[10,10,1048.99],[12,10,1230.99],[14,10,1386.99],[16,10,1549.99]]},
      {id:"premium-flaps",family:"Premium Golf Impact Screen – Classic w/ Flaps",url:URLS.premiumFlaps,sizes:[[8,8,794.99],[9,9,905.99],[12,9,1449.99]]},
      {id:"hc-loop",family:"High-Contrast Grey – Classic w/ Loop Fasteners",url:URLS.hcLoop,sizes:[[8,8,770.99],[9,9,867.99],[10,10,951.99],[12,10,1113.99],[14,10,1285.99],[16,10,1440.99]]},
      {id:"premium-loop",family:"Premium Golf Impact Screen – Classic w/ Loop Fastener",url:URLS.premiumLoop,sizes:[[8,8,763.99],[9,9,861.99],[12,9,1084.99]]},
      {id:"hc-classic",family:"High-Contrast Grey Screen – Classic",url:URLS.hcClassic,sizes:[[8,8,758.99],[9,9,854.99],[10,10,940.99],[12,10,1086.99],[14,10,1258.99],[16,10,1418.99]]},
      {id:"premium-classic",family:"Premium Golf Impact Screen – Classic",url:URLS.premiumClassic,sizes:[[8,8,744.99],[9,9,822.99],[12,9,1073.99]]}
    ];

    function ratioFor(w,h){
      const g=(a,b)=>b?g(b,a%b):a;
      const wi=Math.round(w*12), hi=Math.round(h*12), div=g(wi,hi);
      return `${wi/div}:${hi/div}`;
    }

    const standaloneScreens = screenFamilies.flatMap(f => f.sizes.map((s,i)=>({
      id:`${f.id}-${i}`,family:f.family,name:`Carl's Place ${f.family}`,w:s[0],h:s[1],price:s[2],ratio:ratioFor(s[0],s[1]),url:f.url
    })));

    const launchMonitors = [
      {id:"r10",name:"Garmin R10",price:699.99,type:"Radar / floor, behind ball",mount:"rear",pcProfile:"optional",url:URLS.r10,note:"Indoor: tee at least 8 ft from the net and launch monitor 6–8 ft behind the tee. More ball flight may improve spin capture."},
      {id:"mevo2",name:"FlightScope Mevo Gen 2",price:1799.99,type:"Radar / floor, behind ball",mount:"rear",pcProfile:"flightscope",url:URLS.mevo2,note:"Limited flight: 8 ft unit-to-tee and 8 ft ball flight. Aluminum stickers or Titleist RCT balls required for accurate spin measurements."},
      {id:"eye-mini-lite",name:"Uneekor Eye Mini Lite",price:2965,type:"Photometric / ground",mount:"side",pcProfile:"uneekor",url:URLS.eyeMiniLite,note:"12 × 8 in hitting zone. PC required. Ethernet. Club Optix; stickers recommended for accurate club data."},
      {id:"gds-pro",name:"Golf Joy GDS Pro",price:3099.99,type:"Camera / portable floor",mount:"side",pcProfile:"golfjoy",url:URLS.gdsPro,note:"Indoor. Minimum ~6 ft ball-to-screen/net. Supplied ceiling guidance 9 ft–10 ft 2 in."},
      {id:"launch-pro-indoor",name:"Bushnell Launch Pro Indoor",price:3195,type:"Camera / floor beside ball",mount:"side",pcProfile:"foresight",url:URLS.launchProIndoor,note:"Supplied recommended space guidance: 12 ft width, 18 ft depth and 9 ft ceiling."},
      {id:"eye-mini",name:"Uneekor Eye Mini",price:4469.99,type:"Photometric / portable ground",mount:"side",pcProfile:"optional",url:URLS.eyeMini,note:"12 × 8 in hitting zone. Wi-Fi and Ethernet. PC optional. Android/iOS support."},
      {id:"launch-pro",name:"Bushnell Launch Pro",price:4595,type:"Camera / floor beside ball",mount:"side",pcProfile:"foresight",url:URLS.launchPro,note:"Supplied recommended space guidance: 12 ft width, 18 ft depth and 9 ft ceiling."},
      {id:"spica3",name:"Golf Joy Spica 3",price:4999.99,type:"Camera / portable floor",mount:"side",pcProfile:"golfjoy",url:URLS.spica3,note:"Minimum ~6 ft ball-to-screen/net. Supplied ceiling guidance 9 ft–10 ft 2 in."},
      {id:"vtrack",name:"V Track Launch Monitor",price:6899.99,type:"Camera / ceiling mounted",mount:"overhead",pcProfile:"standard",url:URLS.vtrack,note:"31 × 21 in hitting area. Recommended impact screen-to-hitting-zone minimum 118 in. Required floor-to-ceiling 106–122 in."},
      {id:"rigel-lite",name:"Golf Joy Rigel Lite Overhead Launch Monitor",price:6999.99,type:"Overhead / ceiling",mount:"overhead",pcProfile:"golfjoy",url:URLS.rigelLite,note:"Installation height 9 ft–10 ft 4 in. Sensor-to-tee installation relationship 9.06–10.33 ft; front or rear placement selectable."},
      {id:"r50",name:"Garmin R50",price:7249.99,type:"Portable launch monitor",mount:"side",pcProfile:"optional",url:URLS.r50,note:"Portable all-in-one launch monitor. PC is not required for the core device; simulator software requirements vary."},
      {id:"qed",name:"Uneekor QED",price:7549.99,type:"Overhead launch monitor",mount:"overhead",pcProfile:"uneekor",url:URLS.qed,note:"Overhead launch monitor. Confirm final mounting and PC setup with Top Notch during quote review."},
      {id:"idra2",name:"Golf Idra II",price:8459.99,type:"Overhead / ceiling",mount:"overhead",pcProfile:"standard",url:URLS.idra2,note:"Camera height 99–120 in. Ball-to-camera position varies by mounting height. Sufficient space is required to comfortably swing."},
      {id:"eye-xr",name:"Uneekor Eye XR Sensor with Swing Optix",price:8499.99,type:"Rear-mounted overhead",mount:"overhead",pcProfile:"uneekor",url:URLS.eyeXr,note:"Mount 3 ft 6 in behind the tee. Ceiling height 9–10 ft. Maintain a clear line of sight."},
      {id:"eye-xo",name:"Uneekor Eye XO",price:9675,type:"Front-mounted overhead",mount:"overhead",pcProfile:"uneekor",url:URLS.eyeXo,note:"Mount 3 ft 6 in in front of the tee. Ceiling 9–10 ft. 9–10 ft screen-to-hitting-zone; 13 ft swing area, 15 ft recommended for player over 6 ft."},
      {id:"rigel2",name:"Golf Joy Rigel 2 Overhead Launch Monitor",price:9799.99,type:"Overhead / front mounted",mount:"overhead",pcProfile:"golfjoy",url:URLS.rigel2,note:"Installation height 9 ft–10 ft 2 in; with dynamic platform 9 ft 7 in–10 ft 2 in. Tee relationship 43.3 in."},
      {id:"gc3",name:"Foresight GC3",price:10250,type:"Camera / floor beside ball",mount:"side",pcProfile:"foresight",url:URLS.gc3,note:"7 × 10 in hitting zone. No exact hard room-distance minimum established in the supplied source."},
      {id:"rigel3",name:"Golf Joy Rigel 3 Overhead Launch Monitor",price:15399.99,type:"Overhead / front mounted",mount:"overhead",pcProfile:"golfjoy",url:URLS.rigel3,note:"Installation height 9 ft–10 ft 2 in. Tee installation relationship 43.3 in; this is not the screen-to-ball distance."},
      {id:"eye-xo2",name:"Uneekor Eye XO2",price:16499.99,type:"Overhead launch monitor",mount:"overhead",pcProfile:"uneekor",url:URLS.eyeXo2,note:"Mount 3 ft 6 in in front of the tee. Ceiling 9–10 ft. 9 ft screen-to-hitting-zone; 13 ft swing area, 15 ft recommended for player over 6 ft."},
      {id:"trackman-io",name:"Trackman IO",price:17495,type:"Overhead / ceiling mounted",mount:"overhead",pcProfile:"trackman",url:URLS.trackmanIo,note:"Minimum ceiling 10 ft. Recommended room width 15 ft+. Screen-to-ball 10 ft+. Allow enough room behind the ball for a comfortable swing."},
      {id:"x3c",name:"FlightScope X3C",price:18440,type:"Radar + camera / behind tee",mount:"rear",pcProfile:"flightscope",url:URLS.x3c,note:"X3C guidance: 9–14 ft behind tee for normal shots and 8 ft+ ball flight for limited flight."},
      {id:"rigel3-pro",name:"Golf Joy Rigel 3 Pro Overhead Launch Monitor",price:22399.99,type:"Overhead / front mounted",mount:"overhead",pcProfile:"golfjoy",url:URLS.rigel3Pro,note:"Installation height 9 ft–10 ft 2 in; with 3D stance mat 9 ft 7 in–10 ft 2 in. Tee relationship 43.3 in."},
      {id:"gcquad",name:"Foresight GCQuad",price:23450,type:"Camera / floor beside ball",mount:"side",pcProfile:"foresight",url:URLS.gcquad,note:"18 × 14 in hitting zone. Excellent indoors. Do not treat 18 ft general room guidance as a hard launch-monitor minimum."},
      {id:"trackman4",name:"Trackman 4",price:31995,type:"Radar / floor behind ball",mount:"rear",pcProfile:"trackman",url:URLS.trackman4,note:"Minimum ceiling 10 ft. Recommended width 15 ft+. Recommended screen-to-Trackman 4 unit distance 18 ft+."}
    ];

    const projectors = [
      {id:"ah30",name:"BenQ AH30ST 3000 Lumen Short Throw 1080p Golf Sim Projector",price:1739.99,sku:"5754_sku",resolution:"1080p",throw:[.69,.83],fitMode:"flex",url:URLS.ah30,notes:"3000 lm · 1080p LED · Supports 16:9, 16:10, 4:3 and 1:1 through screen fill / adjustment."},
      {id:"ah700",name:"BenQ AH700ST Short Throw Projector (1080p)",price:2599.99,sku:"5020_sku",resolution:"1080p",throw:[.69,.83],fitMode:"flex",url:URLS.ah700,notes:"4000 lm · 1080p laser · Auto Screen Fit for 16:9, 16:10, 4:3 and 1:1 · Up to 200 in display."},
      {id:"ak700",name:"BenQ AK700ST Short Throw Projector (4K)",price:3449.99,sku:"5019_sku",resolution:"4K",throw:[.69,.83],fitMode:"native16",url:URLS.ak700,notes:"4K UHD · Native 16:9 · short throw · HDR10/HLG."},
      {id:"lk936",name:"BenQ LK936ST 4K HDR Short-Throw Laser Projector",price:5299.99,sku:"",resolution:"4K",throw:[.81,.89],fitMode:"native16",url:URLS.lk936,notes:"5100 lm · 4K UHD · Native 16:9 · 1.1× zoom · large H/V lens shift · 20,000-hour laser."}
    ];

    const mats = [
      {id:"eztee",name:"EZ-Tee Hybrid Plus",rate:32.08,url:URLS.eztee},
      {id:"hotshot-standard",name:"Carl’s HotShot Golf Mat System Standard",rate:49.40,url:URLS.hotshot},
      {id:"hotshot-softer",name:"Carl’s HotShot Golf Mat System Softer",rate:60.60,url:URLS.hotshot},
      {id:"hotshot-harder",name:"Carl’s HotShot Golf Mat System Harder",rate:64.40,url:URLS.hotshot}
    ];

    const towers = [
      {id:"5060",name:"Gaming Tower 5060",price:2599,cpu:"Intel Core Ultra 5 225F",gpu:"NVIDIA GeForce RTX 5060 8GB GDDR7",ram:16,storage:"1TB PCIe Gen4 SSD",rank:1,vram:8,url:URLS.tower5060},
      {id:"5070ti",name:"Gaming Tower 5070 Ti",price:4750,cpu:"Intel Core Ultra 9 285K",gpu:"NVIDIA GeForce RTX 5070 Ti 16GB GDDR7",ram:32,storage:"1TB PCIe Gen4 SSD",rank:2,vram:16,url:URLS.tower5070ti},
      {id:"5080",name:"Gaming Tower 5080",price:5815,cpu:"Intel Core Ultra 7 265K",gpu:"NVIDIA GeForce RTX 5080 16GB GDDR7",ram:32,storage:"2TB PCIe Gen4 SSD",rank:3,vram:16,url:URLS.tower5080}
    ];

    const monitors = [
      {id:"25-fhd",name:'25" FHD 320Hz Gaming Monitor',price:264.99,size:'24.5"',resolution:"1920 × 1080 FHD",refresh:"320Hz",role:"gaming",tier:1,url:URLS.mon25Fhd,notes:"IPS · 0.5ms MPRT · HDR10 · FreeSync Premium · G-SYNC Compatible"},
      {id:"27-qhd",name:'27" QHD 300Hz Gaming Monitor',price:474.99,size:'27"',resolution:"2560 × 1440 QHD",refresh:"300Hz",role:"gaming",tier:2,url:URLS.mon27Qhd,notes:"IPS · 0.5ms MPRT · HDR10 · FreeSync Premium · G-SYNC Compatible"},
      {id:"27-dual",name:'27" 4K / 320Hz Dual-Resolution Gaming Monitor',price:559.99,size:'27"',resolution:"3840 × 2160 4K / 1920 × 1080 FHD",refresh:"160Hz 4K / 320Hz FHD",role:"gaming",tier:3,url:URLS.mon27Dual,notes:"IPS · 0.5ms MPRT · HDR10 · FreeSync Premium · G-SYNC Compatible"},
      {id:"21-touch",name:'21.5" FHD Touch Monitor',price:469.99,size:'21.5"',resolution:"1920 × 1080 FHD",refresh:"",role:"control",tier:0,url:URLS.mon21Touch,notes:"10-point touch · built-in camera, microphone and speakers · eye-care display"},
      {id:"24-touch",name:'24" FHD Touch Monitor',price:579.99,size:'23.8"',resolution:"1920 × 1080 FHD",refresh:"48–120Hz",role:"control",tier:0,url:URLS.mon24Touch,notes:"Touchscreen · USB-C one-cable docking · up to 100W power delivery · 99% sRGB"}
    ];

    const accessories = {
      acoustic:{id:"acoustic",name:"Golf Room Acoustic Tiles",price:279.95,unit:"pack",coverage:100,url:URLS.acoustic,notes:"25 adhesive-backed 2' × 2' tiles per pack · 100 sq ft coverage · 9 mm thick."},
      pads:{id:"pads",name:"Wall / Ceiling Protection Pads",price:149,unit:"each",url:URLS.pads,notes:"3' × 6' · 1 in thick · Velcro installation · vinyl finish · can be cut to fit."},
      projectorMount:{id:"projector-mount",name:"Universal Ceiling & Wall Projector Mount",price:69.99,unit:"each",url:URLS.projectorMount,notes:"3/4-hole compatibility · 225–316 mm hole distance · 44 lb / 20 kg load · ±8° swivel · ±15° tilt · 16.9–25.6 in height adjustment."},
      simrail:{id:"simrail",name:"SimRail",price:1095,unit:"each",url:URLS.simrail,notes:"Motorized rail for compatible ceiling launch monitors · GSPro integration · Bluetooth · voice control · left/right/center positions · Windows 10+."}
    };

    const hotshotBases = [
      {id:"4x5",name:"4' × 5'",w:4,l:5,price:552.95},
      {id:"5x7",name:"5' × 7'",w:5,l:7,price:965.95},
      {id:"4x9",name:"4' × 9'",w:4,l:9,price:972.95}
    ];

    const stepNames = ["Room","Enclosure + Screen","Launch Monitor","Projector","Hitting Mat","Flooring / Turf","Computer","Monitor","Accessories","Review"];

    const defaultState = {
      step:0,
      roomW:0,roomD:0,roomH:0,handedness:"right",
      frontMode:"enclosure",enclosureKey:null,screenId:null,
      launchMonitorId:null,projectorId:null,
      matId:null,matW:5,matL:7,
      puttingTurf:"none",puttingMode:"full",puttingW:0,puttingL:0,roughEnabled:false,roughSqft:0,
      floorBase:"none",hotshotBaseId:"4x5",
      computerId:null,monitorId:null,
      acousticEnabled:false,acousticSqft:0,
      padsEnabled:false,padsQty:0,
      projectorMountEnabled:false,simrailEnabled:false,
      qName:"",qEmail:"",qPhone:"",qNotes:""
    };

    let state = {...defaultState};
    try{
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
      if(saved && typeof saved==="object") state={...state,...saved};
    }catch(e){}

    function save(){
      try{ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }catch(e){}
    }

    function selectedEnclosure(){ return allEnclosures.find(x=>x.key===state.enclosureKey)||null; }
    function simBoothFlooringIncluded(){
      const e=selectedEnclosure();
      return state.frontMode==="enclosure" && !!e && e.brand==="Sim Booth";
    }
    function clearAdditionalFlooringForSimBooth(){
      if(!simBoothFlooringIncluded()) return;
      state.puttingTurf="none";
      state.roughEnabled=false;
      state.roughSqft=0;
      state.floorBase="none";
    }
    function selectedScreen(){ return standaloneScreens.find(x=>x.id===state.screenId)||null; }
    function selectedFront(){
      const x=state.frontMode==="screen"?selectedScreen():selectedEnclosure();
      if(!x) return null;
      return state.frontMode==="screen" ? {...x,kind:"Screen Only",d:0,variant:"Screen Only"} : {...x,kind:"Enclosure + Screen"};
    }
    function selectedLM(){ return launchMonitors.find(x=>x.id===state.launchMonitorId)||null; }
    function selectedProjector(){ return projectors.find(x=>x.id===state.projectorId)||null; }
    function selectedMat(){ return mats.find(x=>x.id===state.matId)||null; }
    function selectedTower(){ return towers.find(x=>x.id===state.computerId)||null; }
    function selectedMonitor(){ return monitors.find(x=>x.id===state.monitorId)||null; }

    function room(){ return {w:Number(state.roomW)||0,d:Number(state.roomD)||0,h:Number(state.roomH)||0}; }
    function matPrice(){ const m=selectedMat(); return m ? (Number(state.matW)||0)*(Number(state.matL)||0)*m.rate : 0; }

    function puttingCoverage(){
      const r=room();
      if(state.puttingMode==="custom"){
        return {w:Math.max(0,Number(state.puttingW)||0),l:Math.max(0,Number(state.puttingL)||0),mode:"custom"};
      }
      return {w:Math.max(0,r.w),l:Math.max(0,r.d),mode:"full"};
    }

    function puttingInfo(turfOverride){
      const turf=turfOverride||state.puttingTurf;
      if(simBoothFlooringIncluded()) return {price:0,length:0,strips:0,material:"Included with Sim Booth",name:"Flooring / Turf Included with Sim Booth",coverageW:0,coverageL:0,coverageSqft:0,suppliedSqft:0};
      if(turf==="none") return {price:0,length:0,strips:0,material:"None",name:"No Putting Turf",coverageW:0,coverageL:0,coverageSqft:0,suppliedSqft:0};
      const c=puttingCoverage();
      const coverageW=c.w, coverageL=c.l, coverageSqft=coverageW*coverageL;
      const name=turf==="green"?"NP45 Putting Green Turf – Green":"NP45 Putting Green Turf – Black";
      if(!(coverageW>0&&coverageL>0)) return {price:0,length:0,strips:0,material:"Enter coverage dimensions",name,coverageW,coverageL,coverageSqft:0,suppliedSqft:0};
      const base=turf==="green"?1550:1850;
      const extra=turf==="green"?150:185;
      const plan=(width,length)=>{
        const strips=Math.max(1,Math.ceil(width/15));
        const rollLength=Math.max(10,Math.ceil(length));
        const perStrip=base+Math.max(0,rollLength-10)*extra;
        return {strips,rollLength,price:strips*perStrip,suppliedSqft:strips*15*rollLength};
      };
      const a=plan(coverageW,coverageL);
      const b=plan(coverageL,coverageW);
      const best=(b.price<a.price || (b.price===a.price && b.suppliedSqft<a.suppliedSqft))?b:a;
      const material=`${best.strips} × 15' W × ${best.rollLength}' L${best.strips>1?" rolls":" roll"}`;
      return {...best,length:best.rollLength,material,name,coverageW,coverageL,coverageSqft};
    }

    function roughRecommendedSqft(){
      if(simBoothFlooringIncluded()) return 0;
      const r=room();
      const roomArea=Math.max(0,r.w*r.d);
      const p=puttingInfo();
      const covered=state.puttingTurf==="none"?0:Math.min(roomArea,p.coverageSqft||0);
      return Math.max(0,roomArea-covered);
    }
    function roughPrice(){ return simBoothFlooringIncluded()?0:(state.roughEnabled ? Math.max(0,Number(state.roughSqft)||0)*9 : 0); }

    const TILE_FT = 40.25/12;
    function floorTilePackCost(tileCount){
      if(tileCount<=0) return {packs5:0,packs6:0,supplied:0,cost:0};
      let best=null;
      for(let p5=0;p5<=Math.ceil(tileCount/5)+1;p5++){
        for(let p6=0;p6<=Math.ceil(tileCount/6)+1;p6++){
          const supplied=p5*5+p6*6;
          if(supplied<tileCount) continue;
          const cost=p5*229.95+p6*275.95;
          const waste=supplied-tileCount;
          if(!best || cost<best.cost-.001 || (Math.abs(cost-best.cost)<.001 && waste<best.waste)) best={packs5:p5,packs6:p6,supplied,cost,waste};
        }
      }
      return best||{packs5:0,packs6:0,supplied:0,cost:0,waste:0};
    }

    function floorBaseInfo(){
      if(simBoothFlooringIncluded()) return {name:"Flooring Base Included with Sim Booth",price:0,detail:"No additional flooring base required."};
      if(state.floorBase==="none") return {name:"No Flooring Base",price:0,detail:""};
      if(state.floorBase==="hotshot"){
        const b=hotshotBases.find(x=>x.id===state.hotshotBaseId)||hotshotBases[0];
        return {name:`Carl’s HotShot Golf Mat Base — ${b.name}`,price:b.price,detail:`${b.name} hitting-area base`,url:URLS.hotshotBase};
      }
      const r=room();
      const full=state.floorBase==="tiles-full";
      const w=full?r.w:Number(state.matW)||0;
      const d=full?r.d:Number(state.matL)||0;
      if(!w||!d) return {name:full?"Carl’s Floor Tile System — Full Floor":"Carl’s Floor Tile System — Hitting Space",price:0,detail:"Enter room and hitting-mat dimensions to calculate.",url:URLS.floorTiles};
      const across=Math.ceil(w/TILE_FT), deep=Math.ceil(d/TILE_FT), tileCount=across*deep;
      const packs=floorTilePackCost(tileCount);
      const widthPieces=across*2, depthPieces=deep*2;
      const widthPacks=ceilPack(widthPieces,6), depthPacks=ceilPack(depthPieces,6);
      const edgeCost=(widthPacks+depthPacks)*109.95;
      const cornerCost=59.95;
      const price=packs.cost+edgeCost+cornerCost;
      const packsText=[packs.packs5?`${packs.packs5}× 5-tile pack`:"",packs.packs6?`${packs.packs6}× 6-tile pack`:""].filter(Boolean).join(" + ");
      return {
        name:full?"Carl’s Floor Tile System — Full Floor":"Carl’s Floor Tile System — Hitting Space",
        price,
        url:URLS.floorTiles,
        detail:`Coverage ${round1(w)}' × ${round1(d)}' · ${across} × ${deep} tile grid (${tileCount} tiles needed) · ${packsText} · Width edge packs ${widthPacks} · Depth edge packs ${depthPacks} · 1 corner pack`
      };
    }

    function acousticPrice(){ return state.acousticEnabled ? Math.ceil(Math.max(0,Number(state.acousticSqft)||0)/100)*279.95 : 0; }
    function screenWidth(){ const f=selectedFront(); return f?f.w:0; }
    function recommendedPads(){
      const r=room();
      const sw=screenWidth();
      if(!r.h || !sw) return 0;
      return 2*Math.ceil(r.h/6)+Math.ceil(sw/6);
    }
    function padsPrice(){ return state.padsEnabled ? Math.max(0,Math.floor(Number(state.padsQty)||0))*149 : 0; }
    function projectorMountPrice(){ return state.projectorMountEnabled?69.99:0; }
    function simrailPrice(){ return state.simrailEnabled?1095:0; }
    function computerPrice(){ const t=selectedTower(); return t?t.price:0; }
    function monitorPrice(){ const m=selectedMonitor(); return m?m.price:0; }
    function frontPrice(){ const f=selectedFront(); return f?f.price:0; }
    function lmPrice(){ const x=selectedLM(); return x?x.price:0; }
    function projectorPrice(){ const x=selectedProjector(); return x?x.price:0; }

    function total(){
      return frontPrice()+lmPrice()+projectorPrice()+matPrice()+puttingInfo().price+roughPrice()+floorBaseInfo().price+computerPrice()+monitorPrice()+acousticPrice()+padsPrice()+projectorMountPrice()+simrailPrice();
    }

    function frontFit(item){
      const r=room();
      if(!r.w||!r.h||(state.frontMode==="enclosure"&&!r.d)) return {status:"neutral",label:"Enter room size",text:"Enter room dimensions to calculate fit."};
      if(state.frontMode==="screen"){
        const cw=r.w-item.w, ch=r.h-item.h;
        const text=`Clearance — W ${cw.toFixed(1)} ft · H ${ch.toFixed(1)} ft`;
        if(cw<0||ch<0) return {status:"red",label:"Does Not Fit",text};
        if(cw<1||ch<1) return {status:"yellow",label:"Tight Fit",text};
        return {status:"green",label:"Fits Your Room",text};
      }
      const cd=r.d-(item.d+1), cw=r.w-item.w, ch=r.h-item.h;
      const text=`Clearance — W ${cw.toFixed(1)} ft · D ${cd.toFixed(1)} ft · H ${ch.toFixed(1)} ft`;
      if(cw<0||cd<0||ch<0) return {status:"red",label:"Does Not Fit",text};
      if(cw<1||cd<1||ch<1) return {status:"yellow",label:"Tight Fit",text};
      return {status:"green",label:"Fits Your Room",text};
    }

    function projectorFit(p){
      const f=selectedFront();
      if(!f) return {status:"neutral",label:"Select screen"};
      const ratio=f.ratio;
      if(p.fitMode==="flex"){
        return ["16:9","16:10","4:3","1:1"].includes(ratio)
          ? {status:"green",label:"Recommended Fit"}
          : {status:"yellow",label:"Supported"};
      }
      return ratio==="16:9" ? {status:"green",label:"Recommended Fit"} : {status:"yellow",label:"Supported"};
    }

    function is4KSetup(){ const p=selectedProjector(); return !!p && p.resolution==="4K"; }

    function pcFit(tower){
      const lm=selectedLM();
      if(!lm) return {status:"neutral",label:"Select launch monitor",text:"Select a launch monitor to see computer guidance."};
      const fourK=is4KSetup();
      const profile=lm.pcProfile;
      if(profile==="optional"){
        if(fourK){
          if(tower.rank>=3) return {status:"green",label:"Recommended",text:"Launch monitor PC is optional; this tower is the strongest match for a 4K simulator workload."};
          if(tower.rank>=2) return {status:"yellow",label:"Supported",text:"Launch monitor PC is optional; this tower can support a premium simulator setup, but 4K benefits from more GPU headroom."};
          return {status:"yellow",label:"Supported",text:"Launch monitor PC is optional. This tower is best suited to 1080p simulator use."};
        }
        return {status:"green",label:"Recommended",text:"PC is not required for the core launch monitor, but this tower provides ample power for simulator software."};
      }
      if(profile==="flightscope"){
        if(fourK && tower.rank===1) return {status:"yellow",label:"Supported",text:"Comfortably exceeds FlightScope PC requirements; 4K course rendering may benefit from a higher GPU tier."};
        return {status:"green",label:"Recommended",text:"Comfortably exceeds FlightScope PC software requirements."};
      }
      if(profile==="foresight"){
        if(tower.rank===1) return {status:fourK?"yellow":"yellow",label:"Supported",text:"Exceeds FSX Play minimum requirements; higher tiers offer more headroom for high-resolution and multi-display use."};
        return {status:"green",label:"Recommended",text:"Strong match for FSX Play and premium simulator rendering."};
      }
      if(profile==="golfjoy"){
        if(tower.rank===1) return {status:"yellow",label:"Supported",text:"Meets the current GOLFJOY minimum class; 32GB RAM and RTX 5070-class graphics are recommended for the full experience."};
        return {status:"green",label:"Recommended",text:"Meets or exceeds current GOLFJOY recommended computer guidance."};
      }
      if(profile==="uneekor"){
        if(tower.rank===1) return {status:"red",label:"Not Recommended",text:"Current Uneekor guidance favors 32GB RAM and RTX 4070 Ti-class graphics for premium software/AI workloads."};
        return {status:"green",label:"Recommended",text:"Meets the current Uneekor recommended performance class for VIEW / AI and third-party simulator software."};
      }
      if(profile==="trackman"){
        if(tower.rank===1) return {status:"red",label:"Not Recommended",text:"Trackman recommends 32GB RAM and a stronger GPU class for its simulator software."};
        if(fourK && tower.rank===2) return {status:"yellow",label:"Supported",text:"Excellent HD setup; Trackman recommends RTX 5080-class graphics for 4K."};
        return {status:"green",label:"Recommended",text:fourK?"Matches Trackman’s current 4K GPU class recommendation.":"Matches Trackman’s current HD computer recommendation class."};
      }
      if(tower.rank===1) return {status:"yellow",label:"Supported",text:"Strong modern gaming PC; higher tiers provide additional simulator headroom."};
      return {status:"green",label:"Recommended",text:"Strong performance headroom for this simulator setup."};
    }

    function monitorFit(mon){
      if(mon.role==="control") return {status:"green",label:"Recommended",text:"Designed as a control/touch display; it does not need to match the projector resolution."};
      const tower=selectedTower();
      if(!tower) return {status:"neutral",label:"Select computer",text:"Select a Gaming Tower to see display guidance."};
      if(mon.tier===1){
        return tower.rank===1?{status:"green",label:"Recommended",text:"Excellent FHD pairing for the Gaming Tower 5060."}:{status:"green",label:"Recommended",text:"Easy-to-drive FHD control/gaming display for this tower."};
      }
      if(mon.tier===2){
        return tower.rank===1?{status:"yellow",label:"Supported",text:"The 5060 can drive QHD; higher towers provide more performance headroom."}:{status:"green",label:"Recommended",text:"Strong QHD pairing for this Gaming Tower."};
      }
      if(tower.rank===1) return {status:"yellow",label:"Supported",text:"Works as a display, but the 5060 is better matched to FHD/QHD for demanding simulator rendering."};
      if(tower.rank===2) return {status:"green",label:"Recommended",text:"Strong fit for 4K / high-refresh display use."};
      return {status:"green",label:"Recommended",text:"Best match for the premium 4K / high-refresh display."};
    }

    function detailLink(url){
      return url?`<a class="tnsb-detail-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">View Full Product Details ↗</a>`:"";
    }

    function badge(status,label){ return `<span class="tnsb-badge tnsb-${status}">${esc(label)}</span>`; }

    function injectStyles(){
      if(document.getElementById("tnsb-consolidated-styles")) return;
      const style=document.createElement("style");
      style.id="tnsb-consolidated-styles";
      style.textContent=`
#tnsb-root{--tn-bg:#08100b;--tn-panel:#0e1711;--tn-card:#151f18;--tn-card2:#101713;--tn-border:#2a3930;--tn-text:#f5f7f5;--tn-muted:#a8b5ab;--tn-accent:#d8ff4f;--tn-green:#70e28a;--tn-yellow:#ffd45c;--tn-red:#ff8585;--tn-radius:18px;color:var(--tn-text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
#tnsb-root *{box-sizing:border-box}
#tnsb-root a{color:inherit}
#tnsb-root .tnsb-shell{max-width:1200px;margin:0 auto;padding:18px 0 36px}
#tnsb-root .tnsb-topbar{display:flex;align-items:center;gap:12px;justify-content:space-between;padding:11px;border:1px solid var(--tn-border);border-radius:18px;background:rgba(10,16,12,.96);position:sticky;top:8px;z-index:10;backdrop-filter:blur(10px)}
#tnsb-root .tnsb-step-nav{display:flex;gap:7px;overflow-x:auto;padding-bottom:1px;scrollbar-width:none}
#tnsb-root .tnsb-step-nav::-webkit-scrollbar{display:none}
#tnsb-root .tnsb-step-button{border:1px solid var(--tn-border);background:#111914;color:var(--tn-muted);padding:9px 11px;border-radius:999px;font-size:11px;font-weight:900;white-space:nowrap;cursor:pointer}
#tnsb-root .tnsb-step-button.tnsb-current{background:var(--tn-accent);border-color:var(--tn-accent);color:#08100b}
#tnsb-root .tnsb-total-pill{background:#fff;color:#0d130f;padding:10px 14px;border-radius:999px;font-size:12px;font-weight:950;white-space:nowrap}
#tnsb-root .tnsb-section{display:none;margin-top:16px;border:1px solid var(--tn-border);border-radius:22px;padding:24px;background:linear-gradient(180deg,#0e1711,#0a120d)}
#tnsb-root .tnsb-section.tnsb-active{display:block}
#tnsb-root .tnsb-kicker{font-size:11px;color:var(--tn-accent);font-weight:950;letter-spacing:.15em;margin-bottom:8px}
#tnsb-root h2{font-size:34px;line-height:1.08;letter-spacing:-.025em;margin:0 0 9px;color:var(--tn-text)}
#tnsb-root .tnsb-lead{color:var(--tn-muted);line-height:1.55;margin:0 0 19px;max-width:900px}
#tnsb-root .tnsb-input-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
#tnsb-root .tnsb-field label{display:block;font-size:11px;font-weight:900;color:#d7dfd8;margin-bottom:6px}
#tnsb-root input,#tnsb-root select,#tnsb-root textarea{width:100%;border:1px solid var(--tn-border);background:#09110c;color:var(--tn-text);border-radius:12px;padding:12px;min-height:46px;font:inherit;outline:none}
#tnsb-root textarea{resize:vertical}
#tnsb-root input:focus,#tnsb-root select:focus,#tnsb-root textarea:focus{border-color:#72855f;box-shadow:0 0 0 2px rgba(216,255,79,.08)}
#tnsb-root .tnsb-mode-tabs{display:flex;gap:8px;margin-bottom:15px;flex-wrap:wrap}
#tnsb-root .tnsb-mode{border:1px solid var(--tn-border);background:#111914;color:var(--tn-muted);padding:10px 13px;border-radius:12px;font-weight:900;cursor:pointer}
#tnsb-root .tnsb-mode.tnsb-selected{background:rgba(216,255,79,.09);border-color:var(--tn-accent);color:#fff}
#tnsb-root .tnsb-toolbar{display:grid;grid-template-columns:1.4fr 1fr;gap:10px;margin-bottom:14px}
#tnsb-root .tnsb-group-title{font-size:13px;font-weight:950;margin:18px 0 9px;color:#eaf0eb}
#tnsb-root .tnsb-choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#tnsb-root .tnsb-card{position:relative;display:flex;flex-direction:column;border:1px solid var(--tn-border);border-radius:17px;background:var(--tn-card);overflow:hidden;min-width:0}
#tnsb-root .tnsb-card.tnsb-selected{border-color:var(--tn-accent);box-shadow:0 0 0 1px var(--tn-accent) inset}
#tnsb-root .tnsb-card.tnsb-disabled{opacity:.55}
#tnsb-root .tnsb-card-main{display:block;flex:1 1 auto;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:15px 15px 11px;cursor:pointer;min-height:0}
#tnsb-root .tnsb-card-main:disabled{cursor:not-allowed}
#tnsb-root .tnsb-card h3{font-size:15px;line-height:1.3;margin:0 0 6px;color:var(--tn-text);padding-right:132px}
#tnsb-root .tnsb-price{font-size:17px;font-weight:950;color:#fff;margin:3px 0 7px}
#tnsb-root .tnsb-meta{font-size:12px;color:#bdc7bf;line-height:1.52}
#tnsb-root .tnsb-fitline{font-size:11px;color:#d3dbd5;margin-top:8px;line-height:1.4}
#tnsb-root .tnsb-badge{position:absolute;right:12px;top:12px;border:1px solid;border-radius:999px;padding:5px 7px;font-size:9px;font-weight:950;line-height:1.1;max-width:120px;text-align:center}
#tnsb-root .tnsb-green{color:var(--tn-green);border-color:rgba(112,226,138,.38);background:rgba(112,226,138,.08)}
#tnsb-root .tnsb-yellow{color:var(--tn-yellow);border-color:rgba(255,212,92,.38);background:rgba(255,212,92,.07)}
#tnsb-root .tnsb-red{color:var(--tn-red);border-color:rgba(255,133,133,.4);background:rgba(255,133,133,.07)}
#tnsb-root .tnsb-neutral{color:#c6d0c8;border-color:#3c4a40;background:#1b251e}
#tnsb-root .tnsb-detail-link{display:inline-flex;align-items:center;align-self:flex-start;position:relative;z-index:3;margin:2px 15px 15px;padding:8px 11px;border:1px solid rgba(216,255,79,.5);border-radius:9px;background:rgba(216,255,79,.08);color:#d8ff4f;text-decoration:none;font-size:11px;font-weight:900;line-height:1.2}
#tnsb-root .tnsb-detail-link:hover{background:rgba(216,255,79,.12);border-color:rgba(216,255,79,.7);text-decoration:none}
#tnsb-root .tnsb-guide,#tnsb-root .tnsb-info{margin-top:15px;border:1px dashed #3b4d40;background:#0b130e;border-radius:14px;padding:13px 14px;color:#c3cec5;font-size:12px;line-height:1.55}
#tnsb-root .tnsb-subsection{margin-top:20px;padding-top:18px;border-top:1px solid var(--tn-border)}
#tnsb-root .tnsb-subsection h3{margin:0 0 7px;font-size:18px}
#tnsb-root .tnsb-subsection>p{margin:0 0 13px;color:var(--tn-muted);font-size:12px;line-height:1.5}
#tnsb-root .tnsb-inline-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:12px 0}
#tnsb-root .tnsb-option-line{display:flex;align-items:center;gap:10px;border:1px solid var(--tn-border);border-radius:13px;background:#0e1611;padding:11px 12px;margin-top:9px}
#tnsb-root .tnsb-option-line input[type=checkbox]{width:18px;min-height:auto;height:18px;accent-color:#d8ff4f}
#tnsb-root .tnsb-option-line strong{font-size:13px}
#tnsb-root .tnsb-option-line span{display:block;color:var(--tn-muted);font-size:11px;line-height:1.4}
#tnsb-root .tnsb-calc{border:1px solid var(--tn-border);border-radius:13px;padding:12px;background:#0b130e;font-size:12px;line-height:1.55;color:#c7d0c9;margin-top:10px}
#tnsb-root .tnsb-btnrow{display:flex;justify-content:space-between;gap:10px;margin-top:20px}
#tnsb-root .tnsb-btn{border:1px solid var(--tn-border);background:#1a241d;color:#fff;padding:12px 17px;border-radius:12px;font-weight:950;cursor:pointer}
#tnsb-root .tnsb-btn.tnsb-primary{background:var(--tn-accent);border-color:var(--tn-accent);color:#071008}
#tnsb-root .tnsb-btn:disabled{opacity:.5;cursor:not-allowed}
#tnsb-root .tnsb-mini-btn{border:1px solid #55665a;background:#121c15;color:#f2f5f2;border-radius:9px;padding:8px 10px;font-size:10px;font-weight:900;cursor:pointer}
#tnsb-root .tnsb-review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
#tnsb-root .tnsb-review-item{border:1px solid var(--tn-border);background:#101713;border-radius:14px;padding:13px}
#tnsb-root .tnsb-review-item h4{margin:0 0 5px;font-size:10px;color:var(--tn-muted);text-transform:uppercase;letter-spacing:.08em}
#tnsb-root .tnsb-review-main{font-size:14px;font-weight:900;line-height:1.35}
#tnsb-root .tnsb-review-sub{font-size:11px;color:#aeb9b1;line-height:1.45;margin-top:4px}
#tnsb-root .tnsb-review-total{grid-column:1/-1;border-color:#63714f}
#tnsb-root .tnsb-review-total .tnsb-review-main{font-size:23px;color:#fff}
#tnsb-root .tnsb-quote-box{margin-top:19px;border-top:1px solid var(--tn-border);padding-top:18px}
#tnsb-root .tnsb-quote-box h3{margin:0 0 12px;font-size:20px}
#tnsb-root .tnsb-quote-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
#tnsb-root .tnsb-submit-area{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-top:14px;border:1px solid var(--tn-border);border-radius:14px;padding:13px;background:#0c140f}
#tnsb-root .tnsb-submit-copy strong{display:block;font-size:13px}
#tnsb-root .tnsb-submit-copy span{display:block;color:var(--tn-muted);font-size:11px;margin-top:3px}
#tnsb-root .tnsb-form-status{margin-top:11px;font-size:12px;line-height:1.5}
#tnsb-root .tnsb-success{color:#9af2ae}
#tnsb-root .tnsb-error{color:#ffb3b3}
#tnsb-root .tnsb-privacy-note{font-size:10px;color:#869188;margin:9px 0 0}
#tnsb-root .tnsb-radio-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
#tnsb-root .tnsb-radio{border:1px solid var(--tn-border);border-radius:12px;background:#101713;padding:11px;cursor:pointer}
#tnsb-root .tnsb-radio.tnsb-selected{border-color:var(--tn-accent);background:rgba(216,255,79,.05)}
#tnsb-root .tnsb-radio strong{display:block;font-size:12px}
#tnsb-root .tnsb-radio span{display:block;font-size:10px;color:var(--tn-muted);margin-top:3px;line-height:1.35}
#tnsb-root .tnsb-disclaimer{margin-top:10px;color:#95a099;font-size:10px;line-height:1.5}
@media(max-width:820px){#tnsb-root .tnsb-choice-grid,#tnsb-root .tnsb-review-grid{grid-template-columns:1fr}#tnsb-root .tnsb-input-grid,#tnsb-root .tnsb-quote-grid{grid-template-columns:1fr}#tnsb-root .tnsb-toolbar,#tnsb-root .tnsb-inline-controls{grid-template-columns:1fr}#tnsb-root .tnsb-topbar{position:relative;top:auto;align-items:flex-start}#tnsb-root .tnsb-total-pill{font-size:10px}#tnsb-root .tnsb-section{padding:18px}#tnsb-root h2{font-size:28px}}
@media(max-width:560px){#tnsb-root .tnsb-radio-grid{grid-template-columns:1fr}#tnsb-root .tnsb-submit-area{align-items:stretch;flex-direction:column}#tnsb-root .tnsb-card h3{padding-right:0;margin-top:26px}#tnsb-root .tnsb-badge{left:12px;right:auto;max-width:calc(100% - 24px)}}
      `;
      document.head.appendChild(style);
    }

    injectStyles();

    ROOT.innerHTML=`
      <div class="tnsb-shell">
        <div class="tnsb-topbar">
          <div id="tnsb-step-nav" class="tnsb-step-nav"></div>
          <div id="tnsb-top-total" class="tnsb-total-pill">${money(total())} CAD</div>
        </div>

        <section class="tnsb-section" data-step="0">
          <div class="tnsb-kicker">STEP 1 OF 10</div><h2>Room Dimensions</h2>
          <p class="tnsb-lead">Start with the usable simulator-room dimensions. These measurements drive enclosure fit, screen fit, flooring quantities, and product guidance.</p>
          <div class="tnsb-input-grid">
            <div class="tnsb-field"><label for="tnsb-room-w">Room Width (ft)</label><input id="tnsb-room-w" type="number" min="1" step="0.1" value="${esc(state.roomW||"")}" placeholder="Example: 14"></div>
            <div class="tnsb-field"><label for="tnsb-room-d">Room Depth (ft)</label><input id="tnsb-room-d" type="number" min="1" step="0.1" value="${esc(state.roomD||"")}" placeholder="Example: 20"></div>
            <div class="tnsb-field"><label for="tnsb-room-h">Ceiling Height (ft)</label><input id="tnsb-room-h" type="number" min="1" step="0.1" value="${esc(state.roomH||"")}" placeholder="Example: 10"></div>
          </div>
          <div class="tnsb-subsection"><h3>Who will use the simulator?</h3><p>This helps us recommend options such as SimRail for overhead launch monitors.</p><div id="tnsb-handedness" class="tnsb-radio-grid"></div></div>
          <div class="tnsb-btnrow"><span></span><button class="tnsb-btn tnsb-primary" data-go="1">Enclosure + Screen →</button></div>
        </section>

        <section class="tnsb-section" data-step="1">
          <div class="tnsb-kicker">STEP 2 OF 10</div><h2>Enclosure + Screen</h2>
          <p class="tnsb-lead">Choose a complete enclosure or switch to Screen Only if you already have the room structure handled.</p>
          <div class="tnsb-mode-tabs"><button class="tnsb-mode" data-front-mode="enclosure">Complete Enclosure + Screen</button><button class="tnsb-mode" data-front-mode="screen">Screen Only / I Don’t Need an Enclosure</button></div>
          <div class="tnsb-toolbar"><input id="tnsb-front-search" placeholder="Search products"><select id="tnsb-front-filter"></select></div>
          <div id="tnsb-front-list"></div>
          <div class="tnsb-info">Complete enclosures are checked using product dimensions plus 1 ft of impact space behind the screen. Screen-only fit is based on room width and ceiling height; final mounting and impact clearance are handled during installation planning.</div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="0">← Back</button><button class="tnsb-btn tnsb-primary" data-go="2">Launch Monitor →</button></div>
        </section>

        <section class="tnsb-section" data-step="2">
          <div class="tnsb-kicker">STEP 3 OF 10</div><h2>Launch Monitor</h2>
          <p class="tnsb-lead">Choose the tracking system for your simulator. Room and installation notes are shown directly on each card.</p>
          <div class="tnsb-toolbar"><input id="tnsb-lm-search" placeholder="Search launch monitors"><select id="tnsb-lm-mount"><option value="">All types</option><option value="overhead">Ceiling / Overhead</option><option value="side">Beside Ball / Portable</option><option value="rear">Behind Ball / Radar</option></select></div>
          <div id="tnsb-lm-list" class="tnsb-choice-grid"></div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="1">← Back</button><button class="tnsb-btn tnsb-primary" data-go="3">Projector →</button></div>
        </section>

        <section class="tnsb-section" data-step="3">
          <div class="tnsb-kicker">STEP 4 OF 10</div><h2>Projector</h2>
          <p class="tnsb-lead">Projector guidance updates from the selected enclosure or standalone screen ratio. Throw-distance estimates use each projector’s actual throw-ratio range.</p>
          <div id="tnsb-projector-list" class="tnsb-choice-grid"></div>
          <div id="tnsb-projector-guide" class="tnsb-guide"></div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="2">← Back</button><button class="tnsb-btn tnsb-primary" data-go="4">Hitting Mat →</button></div>
        </section>

        <section class="tnsb-section" data-step="4">
          <div class="tnsb-kicker">STEP 5 OF 10</div><h2>Hitting Mat</h2>
          <p class="tnsb-lead">Choose the hitting surface and the area you want covered. Pricing is calculated by square footage.</p>
          <div id="tnsb-mat-list" class="tnsb-choice-grid"></div>
          <div class="tnsb-inline-controls"><div class="tnsb-field"><label>Mat Width (ft)</label><input id="tnsb-mat-w" type="text" inputmode="decimal" value="${esc(state.matW)}"></div><div class="tnsb-field"><label>Mat Length (ft)</label><input id="tnsb-mat-l" type="text" inputmode="decimal" value="${esc(state.matL)}"></div></div>
          <div id="tnsb-mat-calc" class="tnsb-calc"></div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="3">← Back</button><button class="tnsb-btn tnsb-primary" data-go="5">Flooring / Turf →</button></div>
        </section>

        <section class="tnsb-section" data-step="5">
          <div class="tnsb-kicker">STEP 6 OF 10</div><h2>Flooring / Turf</h2>
          <p class="tnsb-lead">Build the finished floor in layers. Putting turf, rough turf, and the base are independent choices so customers only buy what they want.</p>
          <div id="tnsb-simbooth-flooring-note" class="tnsb-info" style="display:none;margin-bottom:18px"><strong>Flooring &amp; Turf Included with Sim Booth</strong><br>Your selected Sim Booth already includes its flooring/turf package. No additional putting turf, rough turf, or flooring base is required, and none will be added to the estimate.</div>
          <div id="tnsb-flooring-options-wrap">
          <div class="tnsb-subsection"><h3>Putting Turf</h3><p>Choose full-room coverage generated from the room dimensions, or enter your own custom coverage dimensions. NP45 is supplied in 15 ft roll widths with a 10 ft minimum roll length.</p><div id="tnsb-putting-list" class="tnsb-choice-grid"></div><div id="tnsb-putting-options" style="display:none"><div class="tnsb-inline-controls"><div class="tnsb-field"><label>Putting Turf Coverage</label><select id="tnsb-putting-mode"><option value="full">Full Room Coverage (Recommended)</option><option value="custom">Custom Dimensions</option></select></div><div class="tnsb-field" id="tnsb-putting-custom-w-wrap" style="display:none"><label>Custom Width (ft)</label><input id="tnsb-putting-w" type="text" inputmode="decimal" value="${esc(state.puttingW)}"></div><div class="tnsb-field" id="tnsb-putting-custom-l-wrap" style="display:none"><label>Custom Length (ft)</label><input id="tnsb-putting-l" type="text" inputmode="decimal" value="${esc(state.puttingL)}"></div></div></div><div id="tnsb-putting-calc" class="tnsb-calc"></div></div>
          <div class="tnsb-subsection"><h3>Optional Rough Turf</h3><p>Rough turf is a separate optional purchase at $9.00/sq ft. If the room is wider than 15 ft, the builder can suggest coverage for the width outside the NP45 putting turf.</p><div class="tnsb-option-line"><input id="tnsb-rough-enabled" type="checkbox"><div><strong>Add Rough Turf</strong><span>Field / Olive · 3/4 in pile height · 15 ft untrimmed roll width.<br><strong style="color:var(--tn-accent)">Recommended to cover up empty floor space on outer edges.</strong></span></div></div><div class="tnsb-inline-controls"><div class="tnsb-field"><label>Rough Turf Coverage (sq ft)</label><input id="tnsb-rough-sqft" type="text" inputmode="decimal" value="${esc(state.roughSqft)}"></div><div class="tnsb-field"><label>Recommended From Room</label><div class="tnsb-calc" style="margin:0"><span id="tnsb-rough-recommended"></span> <button id="tnsb-use-rough-rec" class="tnsb-mini-btn" type="button">Use Recommended</button></div></div></div><div id="tnsb-rough-calc" class="tnsb-calc"></div>${detailLink(URLS.rough)}</div>
          <div class="tnsb-subsection"><h3>Optional Flooring Base</h3><p>Choose no base, a dedicated HotShot hitting-area base, or Carl’s interlocking floor tiles for the hitting space or full room.</p><div id="tnsb-base-list" class="tnsb-choice-grid"></div><div id="tnsb-base-options"></div><div id="tnsb-base-calc" class="tnsb-calc"></div></div>
          </div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="4">← Back</button><button class="tnsb-btn tnsb-primary" data-go="6">Computer →</button></div>
        </section>

        <section class="tnsb-section" data-step="6">
          <div class="tnsb-kicker">STEP 7 OF 10</div><h2>Computer</h2>
          <p class="tnsb-lead">Computer recommendations respond to the selected launch monitor and projector resolution. Manufacturer branding is intentionally omitted from the customer-facing product names.</p>
          <div id="tnsb-computer-list" class="tnsb-choice-grid"></div>
          <div class="tnsb-info">Compatibility guidance uses current simulator-software requirements and resolution workload. Top Notch Golf will verify final ports, network connections, software subscriptions, and any special requirements before the quote is finalized.</div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="5">← Back</button><button class="tnsb-btn tnsb-primary" data-go="7">Monitor →</button></div>
        </section>

        <section class="tnsb-section" data-step="7">
          <div class="tnsb-kicker">STEP 8 OF 10</div><h2>Monitor</h2>
          <p class="tnsb-lead">Choose a gaming display or touchscreen control monitor. Recommendations update from the selected Gaming Tower.</p>
          <div id="tnsb-monitor-list" class="tnsb-choice-grid"></div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="6">← Back</button><button class="tnsb-btn tnsb-primary" data-go="8">Accessories →</button></div>
        </section>

        <section class="tnsb-section" data-step="8">
          <div class="tnsb-kicker">STEP 9 OF 10</div><h2>Accessories</h2>
          <p class="tnsb-lead">Optional finishing, protection, mounting, and left/right-handed accessories. Nothing is automatically added to the quote.</p>
          <div id="tnsb-accessories"></div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="7">← Back</button><button class="tnsb-btn tnsb-primary" data-go="9">Review →</button></div>
        </section>

        <section class="tnsb-section" data-step="9">
          <div class="tnsb-kicker">STEP 10 OF 10</div><h2>Review + Request a Quote</h2>
          <p class="tnsb-lead">Review the selected setup below. Product pricing is an estimate and will be finalized by Top Notch Golf.</p>
          <div id="tnsb-review" class="tnsb-review-grid"></div>
          <div class="tnsb-quote-box"><h3>Request Your Quote</h3><div class="tnsb-quote-grid"><div class="tnsb-field"><label>Name</label><input id="tnsb-q-name" value="${esc(state.qName)}"></div><div class="tnsb-field"><label>Email</label><input id="tnsb-q-email" type="email" value="${esc(state.qEmail)}"></div><div class="tnsb-field"><label>Phone</label><input id="tnsb-q-phone" value="${esc(state.qPhone)}"></div></div><div class="tnsb-field" style="margin-top:10px"><label>Notes / Questions</label><textarea id="tnsb-q-notes" rows="4" placeholder="Anything else we should know about the room, installation or preferred setup?">${esc(state.qNotes)}</textarea></div><div class="tnsb-submit-area"><div class="tnsb-submit-copy"><strong>Ready to talk through the build?</strong><span>Your full configuration and estimated product total will be sent to Top Notch Golf.</span></div><button id="tnsb-submit" class="tnsb-btn tnsb-primary" type="button">Request My Quote</button></div><div id="tnsb-form-status" class="tnsb-form-status" role="status" aria-live="polite"></div><p class="tnsb-privacy-note">By submitting, you agree that Top Notch Golf may contact you about this simulator quote request.</p></div>
          <div class="tnsb-btnrow"><button class="tnsb-btn" data-go="8">← Back</button><span></span></div>
        </section>
      </div>
    `;

    const $ = id => document.getElementById(id);

    function buildNav(){
      $("tnsb-step-nav").innerHTML=stepNames.map((name,i)=>`<button type="button" class="tnsb-step-button ${i===state.step?"tnsb-current":""}" data-step-nav="${i}">${i+1}. ${esc(name)}</button>`).join("");
    }

    function goStep(index){
      state.step=clamp(Number(index)||0,0,9); save();
      ROOT.querySelectorAll(".tnsb-section").forEach((s,i)=>s.classList.toggle("tnsb-active",i===state.step));
      buildNav(); renderForStep(state.step);
      const y=ROOT.getBoundingClientRect().top+window.pageYOffset-12;
      window.scrollTo({top:y,behavior:"smooth"});
    }

    function renderHandedness(){
      const opts=[
        ["right","Right-Handed Only","Standard single-handed setup"],
        ["left","Left-Handed Only","Standard single-handed setup"],
        ["both","Both Left + Right","Useful for family / multi-player simulators"]
      ];
      $("tnsb-handedness").innerHTML=opts.map(o=>`<div class="tnsb-radio ${state.handedness===o[0]?"tnsb-selected":""}" data-handed="${o[0]}"><strong>${o[1]}</strong><span>${o[2]}</span></div>`).join("");
    }

    function frontFilterOptions(){
      const sel=$("tnsb-front-filter");
      if(state.frontMode==="enclosure"){
        const brands=[...new Set(baseEnclosures.map(x=>x.brand))];
        sel.innerHTML=`<option value="">All brands</option>${brands.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")}`;
      }else{
        sel.innerHTML=`<option value="">All screen families</option>${screenFamilies.map(x=>`<option value="${esc(x.id)}">${esc(x.family)}</option>`).join("")}`;
      }
    }

    function renderFront(){
      ROOT.querySelectorAll("[data-front-mode]").forEach(b=>b.classList.toggle("tnsb-selected",b.dataset.frontMode===state.frontMode));
      const q=($("tnsb-front-search").value||"").trim().toLowerCase();
      const filter=$("tnsb-front-filter").value||"";
      let items=[];
      if(state.frontMode==="enclosure") items=allEnclosures.filter(x=>(!filter||x.brand===filter)&&(`${x.name} ${x.variant}`).toLowerCase().includes(q));
      else items=standaloneScreens.filter(x=>(!filter||x.id.startsWith(filter+"-")||x.id===filter)&&(`${x.family} ${x.w} ${x.h}`).toLowerCase().includes(q));
      const groups={green:[],yellow:[],neutral:[],red:[]}; items.forEach(x=>groups[frontFit(x).status].push(x));
      const labels={green:"🟢 Fits Your Room",yellow:"🟡 Tight Fit",neutral:"Room Fit Pending",red:"🔴 Does Not Fit"};
      const out=[];
      ["green","yellow","neutral","red"].forEach(group=>{
        if(!groups[group].length) return;
        out.push(`<div class="tnsb-group-title">${labels[group]}</div><div class="tnsb-choice-grid">`);
        groups[group].forEach(x=>{
          const fit=frontFit(x); const selected=state.frontMode==="enclosure"?state.enclosureKey===x.key:state.screenId===x.id;
          const title=state.frontMode==="enclosure"?x.name:x.family;
          const sub=state.frontMode==="enclosure"?`${x.variant}<br>${dim(x.w)} W × ${dim(x.h)} H × ${dim(x.d)} D · ${x.ratio}<br>Room-fit depth: ${dim(x.d+1)} including 1 ft impact space`:`${dim(x.w)} W × ${dim(x.h)} H · ${x.ratio} aspect ratio`;
          const attrs=state.frontMode==="enclosure"?`data-enclosure-key="${encodeURIComponent(x.key)}"`:`data-screen-id="${x.id}"`;
          out.push(`<div class="tnsb-card ${selected?"tnsb-selected":""} ${fit.status==="red"?"tnsb-disabled":""}">${badge(fit.status,fit.label)}<button type="button" class="tnsb-card-main" ${attrs} ${fit.status==="red"?"disabled":""}><h3>${esc(title)}</h3><div class="tnsb-price">${money(x.price)}</div><div class="tnsb-meta">${sub}</div><div class="tnsb-fitline">${esc(fit.text)}</div></button>${detailLink(x.url)}</div>`);
        });
        out.push(`</div>`);
      });
      $("tnsb-front-list").innerHTML=out.join("")||`<div class="tnsb-info">No matching products found.</div>`;
    }

    function renderLM(){
      const q=($("tnsb-lm-search").value||"").trim().toLowerCase(); const mount=$("tnsb-lm-mount").value||"";
      const items=launchMonitors.filter(x=>(!mount||x.mount===mount)&&(`${x.name} ${x.type} ${x.note}`).toLowerCase().includes(q));
      $("tnsb-lm-list").innerHTML=items.map(x=>`<div class="tnsb-card ${state.launchMonitorId===x.id?"tnsb-selected":""}"><button type="button" class="tnsb-card-main" data-lm-id="${x.id}"><h3>${esc(x.name)}</h3><div class="tnsb-price">${money(x.price)}</div><div class="tnsb-meta"><strong>${esc(x.type)}</strong><br>${esc(x.note)}</div></button>${detailLink(x.url)}</div>`).join("");
    }

    function renderProjectors(){
      const f=selectedFront();
      $("tnsb-projector-list").innerHTML=projectors.map(p=>{
        const fit=projectorFit(p), selected=state.projectorId===p.id;
        let range="";
        if(f){ const lo=f.w*p.throw[0], hi=f.w*p.throw[1]; range=`<br>Approx. lens-to-screen: ${lo.toFixed(1)}–${hi.toFixed(1)} ft`;
        }
        return `<div class="tnsb-card ${selected?"tnsb-selected":""}">${badge(fit.status,fit.label)}<button type="button" class="tnsb-card-main" data-projector-id="${p.id}"><h3>${esc(p.name)}</h3><div class="tnsb-price">${money(p.price)}</div><div class="tnsb-meta">${p.sku?`SKU ${esc(p.sku)}<br>`:""}${esc(p.notes)}<br>Throw ratio ${p.throw[0].toFixed(2)}–${p.throw[1].toFixed(2)}${range}</div></button>${detailLink(p.url)}</div>`;
      }).join("");
      if(!f) $("tnsb-projector-guide").textContent="Select an enclosure or screen first to see ratio-specific guidance and throw-distance estimates.";
      else $("tnsb-projector-guide").innerHTML=`Selected front: <strong>${esc(f.kind)}</strong> · ratio <strong>${esc(f.ratio)}</strong> · screen width <strong>${dim(f.w)}</strong>. Each projector card uses its own throw-ratio range for the lens-to-screen estimate.`;
    }

    function renderMats(){
      $("tnsb-mat-list").innerHTML=mats.map(m=>`<div class="tnsb-card ${state.matId===m.id?"tnsb-selected":""}"><button type="button" class="tnsb-card-main" data-mat-id="${m.id}"><h3>${esc(m.name)}</h3><div class="tnsb-price">${money(m.rate)} / sq ft</div><div class="tnsb-meta">Customer-selected coverage area. Price updates from the width and length entered below.</div></button>${detailLink(m.url)}</div>`).join("");
      const m=selectedMat(); const area=(Number(state.matW)||0)*(Number(state.matL)||0);
      $("tnsb-mat-calc").innerHTML=m?`${round1(state.matW)} ft × ${round1(state.matL)} ft = <strong>${round1(area)} sq ft</strong> × ${money(m.rate)} = <strong>${money(matPrice())}</strong>`:"Select a hitting mat to calculate pricing.";
    }

    function renderFlooring(){
      const included=simBoothFlooringIncluded();
      const includedNote=$("tnsb-simbooth-flooring-note");
      const optionsWrap=$("tnsb-flooring-options-wrap");
      if(includedNote) includedNote.style.display=included?"block":"none";
      if(optionsWrap) optionsWrap.style.display=included?"none":"block";
      if(included){
        clearAdditionalFlooringForSimBooth();
        save();
        return;
      }
      const p=puttingInfo();
      const green=puttingInfo("green"), black=puttingInfo("black");
      const puttingOptions=[
        {id:"none",name:"No Additional Putting Turf",price:0,meta:"Choose this if putting/flooring turf is not needed."},
        {id:"green",name:"NP45 Putting Green Turf – Green",price:green.price,meta:"Nylon · 3/8 in pile height · 15 ft roll width · Forest/Olive"},
        {id:"black",name:"NP45 Putting Green Turf – Black",price:black.price,meta:"Nylon · 3/8 in pile height · 15 ft roll width · Black"}
      ];
      $("tnsb-putting-list").innerHTML=puttingOptions.map(o=>`<div class="tnsb-card ${state.puttingTurf===o.id?"tnsb-selected":""}"><button type="button" class="tnsb-card-main" data-putting="${o.id}"><h3>${esc(o.name)}</h3><div class="tnsb-price">${money(o.price)}</div><div class="tnsb-meta">${esc(o.meta)}</div></button>${o.id==="none"?"":detailLink(URLS.np45)}</div>`).join("");

      const r=room();
      const hasPutting=state.puttingTurf!=="none";
      $("tnsb-putting-options").style.display=hasPutting?"block":"none";
      $("tnsb-putting-mode").value=state.puttingMode||"full";
      const custom=state.puttingMode==="custom";
      $("tnsb-putting-custom-w-wrap").style.display=custom?"block":"none";
      $("tnsb-putting-custom-l-wrap").style.display=custom?"block":"none";
      $("tnsb-putting-w").value=state.puttingW||"";
      $("tnsb-putting-l").value=state.puttingL||"";

      if(!hasPutting){
        $("tnsb-putting-calc").innerHTML="No putting turf selected.";
      }else if(!(p.coverageW>0&&p.coverageL>0)){
        $("tnsb-putting-calc").innerHTML="Enter custom putting turf width and length to calculate coverage and pricing.";
      }else{
        const fitDirect=p.coverageW<=r.w+0.001 && p.coverageL<=r.d+0.001;
        const fitRotated=p.coverageL<=r.w+0.001 && p.coverageW<=r.d+0.001;
        const fitNote=custom && r.w>0 && r.d>0 && !(fitDirect||fitRotated)?`<br><span style="color:#ffd45c"><strong>Note:</strong> These custom dimensions are larger than the entered room footprint.</span>`:"";
        const coverageLabel=custom?"Custom coverage":"Full room coverage";
        $("tnsb-putting-calc").innerHTML=`${coverageLabel}: <strong>${round1(p.coverageW)}' W × ${round1(p.coverageL)}' L = ${round1(p.coverageSqft)} sq ft</strong><br>Material supplied: <strong>${esc(p.material)}</strong> · Estimated putting turf price: <strong>${money(p.price)}</strong>${fitNote}<br><span style="color:#93a098">The builder chooses the most efficient roll orientation for pricing. Turf is cut to fit during installation, so some excess material may remain.</span>`;
      }

      $("tnsb-rough-enabled").checked=!!state.roughEnabled;
      $("tnsb-rough-sqft").disabled=!state.roughEnabled;
      const rec=roughRecommendedSqft();
      $("tnsb-rough-recommended").innerHTML=rec>0?`<strong>${round1(rec)} sq ft</strong> recommended to cover remaining empty floor space`:`<strong>0 sq ft</strong> — selected putting turf already covers the full room floor`;
      $("tnsb-rough-calc").innerHTML=state.roughEnabled?`${round1(state.roughSqft)} sq ft × $9.00 = <strong>${money(roughPrice())}</strong>`:"Rough turf is not included.";
      renderBase();
    }

    function renderBase(){
      const options=[
        {id:"none",name:"No Flooring Base",meta:"No additional base material."},
        {id:"hotshot",name:"Carl’s HotShot Golf Mat Base",meta:"Dedicated base under the hitting area."},
        {id:"tiles-hit",name:"Carl’s Floor Tile System — Hitting Space Only",meta:"Automatically sized from the hitting-mat dimensions."},
        {id:"tiles-full",name:"Carl’s Floor Tile System — Full Floor",meta:"Automatically sized from the full room dimensions."}
      ];
      $("tnsb-base-list").innerHTML=options.map(o=>{
        let price=0; if(o.id===state.floorBase) price=floorBaseInfo().price;
        return `<div class="tnsb-card ${state.floorBase===o.id?"tnsb-selected":""}"><button type="button" class="tnsb-card-main" data-floor-base="${o.id}"><h3>${esc(o.name)}</h3><div class="tnsb-price">${state.floorBase===o.id?money(price):o.id==="none"?money(0):"Calculated after selection"}</div><div class="tnsb-meta">${esc(o.meta)}</div></button>${o.id==="hotshot"?detailLink(URLS.hotshotBase):(o.id.startsWith("tiles")?detailLink(URLS.floorTiles):"")}</div>`;
      }).join("");
      if(state.floorBase==="hotshot"){
        $("tnsb-base-options").innerHTML=`<div class="tnsb-inline-controls"><div class="tnsb-field"><label>HotShot Base Size</label><select id="tnsb-hotshot-base-size">${hotshotBases.map(x=>`<option value="${x.id}" ${state.hotshotBaseId===x.id?"selected":""}>${x.name} — ${money(x.price)}</option>`).join("")}</select></div></div>`;
        $("tnsb-hotshot-base-size").addEventListener("change",e=>{state.hotshotBaseId=e.target.value;save();renderFlooring();updateTotals();});
      }else $("tnsb-base-options").innerHTML="";
      const info=floorBaseInfo();
      $("tnsb-base-calc").innerHTML=state.floorBase==="none"?"No flooring base selected.":`${esc(info.name)}<br>${esc(info.detail)}<br><strong>${money(info.price)}</strong>`;
    }

    function renderComputers(){
      const ownSelected=state.computerId==="own";
      const own=`<div class="tnsb-card ${ownSelected?"tnsb-selected":""}"><button type="button" class="tnsb-card-main" data-computer-id="own"><h3>I Already Have a Computer</h3><div class="tnsb-price">$0.00</div><div class="tnsb-meta">Top Notch Golf can review your existing system specifications for compatibility during the quote process.</div></button></div>`;
      const cards=towers.map(t=>{const f=pcFit(t);return `<div class="tnsb-card ${state.computerId===t.id?"tnsb-selected":""}">${badge(f.status,f.label)}<button type="button" class="tnsb-card-main" data-computer-id="${t.id}"><h3>${esc(t.name)}</h3><div class="tnsb-price">${money(t.price)}</div><div class="tnsb-meta"><strong>${esc(t.gpu)}</strong><br>${esc(t.cpu)}<br>${t.ram}GB DDR5 · ${esc(t.storage)}<br><span style="color:#d0d8d2">${esc(f.text)}</span></div></button>${detailLink(t.url)}</div>`;}).join("");
      $("tnsb-computer-list").innerHTML=own+cards;
    }

    function renderMonitors(){
      const ownSelected=state.monitorId==="own";
      const own=`<div class="tnsb-card ${ownSelected?"tnsb-selected":""}"><button type="button" class="tnsb-card-main" data-monitor-id="own"><h3>I Already Have a Monitor</h3><div class="tnsb-price">$0.00</div><div class="tnsb-meta">Keep your existing display and Top Notch can confirm connections during quote review.</div></button></div>`;
      $("tnsb-monitor-list").innerHTML=own+monitors.map(m=>{const f=monitorFit(m);return `<div class="tnsb-card ${state.monitorId===m.id?"tnsb-selected":""}">${badge(f.status,f.label)}<button type="button" class="tnsb-card-main" data-monitor-id="${m.id}"><h3>${esc(m.name)}</h3><div class="tnsb-price">${money(m.price)}</div><div class="tnsb-meta">${esc(m.size)} · ${esc(m.resolution)}${m.refresh?` · ${esc(m.refresh)}`:""}<br>${esc(m.notes)}<br><span style="color:#d0d8d2">${esc(f.text)}</span></div></button>${detailLink(m.url)}</div>`;}).join("");
    }

    function renderAccessories(){
      const lm=selectedLM(), p=selectedProjector(), recPads=recommendedPads();
      const simRec=!!(lm&&lm.mount==="overhead"&&state.handedness==="both");
      $("tnsb-accessories").innerHTML=`
        <div class="tnsb-subsection" style="margin-top:0;padding-top:0;border-top:0"><h3>Golf Room Acoustic Tiles</h3><p>${esc(accessories.acoustic.notes)}</p><div class="tnsb-option-line"><input id="tnsb-acoustic-enabled" type="checkbox" ${state.acousticEnabled?"checked":""}><div><strong>Add Acoustic Tiles — ${money(accessories.acoustic.price)} / 100 sq ft pack</strong><span>Enter the wall/ceiling coverage you want treated.</span></div></div><div class="tnsb-inline-controls"><div class="tnsb-field"><label>Desired Coverage (sq ft)</label><input id="tnsb-acoustic-sqft" type="text" inputmode="decimal" value="${esc(state.acousticSqft)}" ${state.acousticEnabled?"":"disabled"}></div><div class="tnsb-calc" style="margin:0">${state.acousticEnabled?`${Math.ceil((Number(state.acousticSqft)||0)/100)} pack(s) · <strong>${money(acousticPrice())}</strong>`:"Not selected."}</div></div>${detailLink(accessories.acoustic.url)}</div>
        <div class="tnsb-subsection"><h3>Wall / Ceiling Protection Pads</h3><p>${esc(accessories.pads.notes)}</p><div class="tnsb-option-line"><input id="tnsb-pads-enabled" type="checkbox" ${state.padsEnabled?"checked":""}><div><strong>Add Protection Pads — ${money(accessories.pads.price)} each</strong><span>Recommended quantity is based on both screen sides plus the top of the selected screen.</span></div></div><div class="tnsb-inline-controls"><div class="tnsb-field"><label>Quantity</label><input id="tnsb-pads-qty" type="text" inputmode="numeric" pattern="[0-9]*" value="${esc(state.padsQty)}" ${state.padsEnabled?"":"disabled"}></div><div class="tnsb-calc" style="margin:0">Recommended: <strong>${recPads||"—"}</strong> pad(s) ${recPads?`<button id="tnsb-use-pads-rec" class="tnsb-mini-btn" type="button">Use Recommended</button>`:""}<br>${state.padsEnabled?`Selected total: <strong>${money(padsPrice())}</strong>`:"Not selected."}</div></div>${detailLink(accessories.pads.url)}</div>
        <div class="tnsb-subsection"><h3>Universal Ceiling & Wall Projector Mount</h3><p>${esc(accessories.projectorMount.notes)}</p><div class="tnsb-option-line"><input id="tnsb-projector-mount-enabled" type="checkbox" ${state.projectorMountEnabled?"checked":""}><div><strong>Add Projector Mount — ${money(accessories.projectorMount.price)}</strong><span>${p?"Recommended when a compatible ceiling/wall mount is needed. Confirm the 225–316 mm mounting-hole pattern before finalizing.":"Select a projector first to determine whether a mount is needed."}</span></div></div>${detailLink(accessories.projectorMount.url)}</div>
        <div class="tnsb-subsection"><h3>SimRail</h3><p>${esc(accessories.simrail.notes)}</p><div class="tnsb-option-line"><input id="tnsb-simrail-enabled" type="checkbox" ${state.simrailEnabled?"checked":""} ${lm&&lm.mount==="overhead"?"":"disabled"}><div><strong>SimRail — ${money(accessories.simrail.price)} ${simRec?'<span class="tnsb-badge tnsb-green" style="position:static;margin-left:7px">Recommended</span>':""}</strong><span>${lm&&lm.mount==="overhead"?(simRec?"Recommended because both left- and right-handed golfers are selected with an overhead launch monitor.":"Available for compatible overhead launch-monitor installations."):"Choose an overhead launch monitor to make SimRail available."}</span></div></div>${detailLink(accessories.simrail.url)}</div>
      `;
      const ae=$("tnsb-acoustic-enabled"), as=$("tnsb-acoustic-sqft"), pe=$("tnsb-pads-enabled"), pq=$("tnsb-pads-qty"), pm=$("tnsb-projector-mount-enabled"), sr=$("tnsb-simrail-enabled");
      ae.addEventListener("change",()=>{state.acousticEnabled=ae.checked;save();renderAccessories();updateTotals();});
      as.addEventListener("input",()=>{state.acousticSqft=Number(as.value)||0;save();renderAccessories();updateTotals();});
      pe.addEventListener("change",()=>{state.padsEnabled=pe.checked;save();renderAccessories();updateTotals();});
      pq.addEventListener("input",()=>{state.padsQty=Math.max(0,Math.floor(Number(pq.value)||0));save();renderAccessories();updateTotals();});
      if($("tnsb-use-pads-rec")) $("tnsb-use-pads-rec").addEventListener("click",()=>{state.padsEnabled=true;state.padsQty=recommendedPads();save();renderAccessories();updateTotals();});
      pm.addEventListener("change",()=>{state.projectorMountEnabled=pm.checked;save();renderAccessories();updateTotals();});
      sr.addEventListener("change",()=>{state.simrailEnabled=sr.checked;save();renderAccessories();updateTotals();});
    }

    function reviewItem(label,main,sub){ return `<div class="tnsb-review-item"><h4>${esc(label)}</h4><div class="tnsb-review-main">${esc(main)}</div>${sub?`<div class="tnsb-review-sub">${esc(sub)}</div>`:""}</div>`; }

    function renderReview(){
      const r=room(), f=selectedFront(), lm=selectedLM(), pr=selectedProjector(), m=selectedMat(), put=puttingInfo(), base=floorBaseInfo(), t=selectedTower(), mon=selectedMonitor();
      const floorParts=[];
      if(simBoothFlooringIncluded()) floorParts.push("Included with selected Sim Booth — no additional flooring or turf required");
      else{
        if(state.puttingTurf!=="none") floorParts.push(`${put.name} — ${round1(put.coverageSqft)} sq ft — ${money(put.price)}`);
        if(state.roughEnabled) floorParts.push(`Rough Turf ${round1(state.roughSqft)} sq ft — ${money(roughPrice())}`);
        if(state.floorBase!=="none") floorParts.push(`${base.name} — ${money(base.price)}`);
      }
      const accParts=[];
      if(state.acousticEnabled) accParts.push(`Acoustic Tiles ${Math.ceil((Number(state.acousticSqft)||0)/100)} pack(s) — ${money(acousticPrice())}`);
      if(state.padsEnabled) accParts.push(`Protection Pads × ${state.padsQty} — ${money(padsPrice())}`);
      if(state.projectorMountEnabled) accParts.push(`Projector Mount — ${money(projectorMountPrice())}`);
      if(state.simrailEnabled) accParts.push(`SimRail — ${money(simrailPrice())}`);
      const cards=[
        reviewItem("Room",r.w&&r.d&&r.h?`${r.w} ft W × ${r.d} ft D × ${r.h} ft H`:"Room dimensions incomplete",`Golfer setup: ${state.handedness==="both"?"Left + Right":state.handedness==="left"?"Left-handed only":"Right-handed only"}`),
        reviewItem("Enclosure / Screen",f?`${f.kind}: ${state.frontMode==="enclosure"?`${f.name} — ${f.variant}`:`${f.family} ${dim(f.w)} × ${dim(f.h)}`}`:"Not selected",f?`${f.ratio} · ${money(f.price)}`:""),
        reviewItem("Launch Monitor",lm?lm.name:"Not selected",lm?`${lm.type} · ${money(lm.price)}`:""),
        reviewItem("Projector",pr?pr.name:"Not selected",pr?`${pr.resolution} · ${money(pr.price)}`:""),
        reviewItem("Hitting Mat",m?m.name:"Not selected",m?`${round1(state.matW)} ft × ${round1(state.matL)} ft · ${money(matPrice())}`:""),
        reviewItem("Flooring / Turf",floorParts.length?floorParts.join(" | "):"No additional flooring selected",""),
        reviewItem("Computer",state.computerId==="own"?"Customer already has a computer":t?t.name:"Not selected",t?`${t.gpu} · ${t.ram}GB RAM · ${money(t.price)}`:""),
        reviewItem("Monitor",state.monitorId==="own"?"Customer already has a monitor":mon?mon.name:"Not selected",mon?`${mon.resolution} · ${money(mon.price)}`:""),
        reviewItem("Accessories",accParts.length?accParts.join(" | "):"No accessories selected","")
      ];
      cards.push(`<div class="tnsb-review-item tnsb-review-total"><h4>Estimated Product Total</h4><div class="tnsb-review-main">${money(total())} CAD</div><div class="tnsb-review-sub">${esc(DISCLAIMER)}</div></div>`);
      $("tnsb-review").innerHTML=cards.join("");
    }

    function updateTotals(){
      $("tnsb-top-total").textContent=`${money(total())} CAD`;
      if(state.step===9) renderReview();
    }

    function renderForStep(step){
      if(step===0) renderHandedness();
      if(step===1){ frontFilterOptions(); renderFront(); }
      if(step===2) renderLM();
      if(step===3) renderProjectors();
      if(step===4) renderMats();
      if(step===5) renderFlooring();
      if(step===6) renderComputers();
      if(step===7) renderMonitors();
      if(step===8) renderAccessories();
      if(step===9) renderReview();
      updateTotals();
    }

    function setStatus(ok,msg){ const el=$("tnsb-form-status"); el.className=`tnsb-form-status ${ok?"tnsb-success":"tnsb-error"}`; el.innerHTML=msg; }

    function validateQuote(){
      const missing=[]; const r=room();
      if(!r.w||!r.d||!r.h) missing.push("room dimensions");
      if(!selectedFront()) missing.push("an enclosure or screen");
      if(!selectedLM()) missing.push("a launch monitor");
      if(!selectedProjector()) missing.push("a projector");
      if(!selectedMat()) missing.push("a hitting mat");
      if(!state.computerId) missing.push("a computer choice");
      if(!state.monitorId) missing.push("a monitor choice");
      const name=$("tnsb-q-name").value.trim(), email=$("tnsb-q-email").value.trim();
      if(!name) missing.push("your name");
      if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("a valid email address");
      return missing;
    }

    async function submitQuote(){
      const missing=validateQuote();
      if(missing.length){setStatus(false,`Please complete ${missing.join(", ")} before requesting the quote.`);return;}
      state.qName=$("tnsb-q-name").value.trim(); state.qEmail=$("tnsb-q-email").value.trim(); state.qPhone=$("tnsb-q-phone").value.trim(); state.qNotes=$("tnsb-q-notes").value.trim(); save();
      const btn=$("tnsb-submit"), old=btn.textContent; btn.disabled=true; btn.textContent="Sending…";
      const r=room(), f=selectedFront(), lm=selectedLM(), pr=selectedProjector(), m=selectedMat(), put=puttingInfo(), base=floorBaseInfo(), t=selectedTower(), mon=selectedMonitor();
      const payload={
        subject:`New Top Notch Simulator Quote — ${state.qName}`,
        name:state.qName,email:state.qEmail,phone:state.qPhone||"Not provided",message:state.qNotes||"None",
        "Room Dimensions":`${r.w} ft W × ${r.d} ft D × ${r.h} ft H`,
        "Golfer Setup":state.handedness==="both"?"Left + Right":state.handedness==="left"?"Left-handed only":"Right-handed only",
        "Enclosure / Screen":state.frontMode==="enclosure"?`${f.name} — ${f.variant}`:`${f.family} — ${dim(f.w)} × ${dim(f.h)}`,
        "Enclosure / Screen Price":`${money(f.price)} CAD`,"Screen Ratio":f.ratio,
        "Launch Monitor":lm.name,"Launch Monitor Price":`${money(lm.price)} CAD`,
        "Projector":pr.name,"Projector Price":`${money(pr.price)} CAD`,
        "Hitting Mat":`${m.name} — ${round1(state.matW)} ft × ${round1(state.matL)} ft`,"Hitting Mat Price":`${money(matPrice())} CAD`,
        "Putting Turf":simBoothFlooringIncluded()?"Included with selected Sim Booth — no additional charge":state.puttingTurf==="none"?"None":`${put.name} — ${state.puttingMode==="custom"?"Custom":"Full Room"} Coverage ${round1(put.coverageW)} ft × ${round1(put.coverageL)} ft (${round1(put.coverageSqft)} sq ft) — ${put.material} — ${money(put.price)} CAD`,
        "Rough Turf":simBoothFlooringIncluded()?"Included with selected Sim Booth — no additional charge":state.roughEnabled?`${round1(state.roughSqft)} sq ft — ${money(roughPrice())} CAD`:"None",
        "Flooring Base":simBoothFlooringIncluded()?"Included with selected Sim Booth — no additional charge":state.floorBase==="none"?"None":`${base.name} — ${base.detail} — ${money(base.price)} CAD`,
        "Computer":state.computerId==="own"?"Customer already has a computer":`${t.name} — ${t.gpu} — ${t.ram}GB RAM — ${money(t.price)} CAD`,
        "Monitor":state.monitorId==="own"?"Customer already has a monitor":`${mon.name} — ${mon.resolution} — ${money(mon.price)} CAD`,
        "Acoustic Tiles":state.acousticEnabled?`${state.acousticSqft} sq ft requested — ${Math.ceil((Number(state.acousticSqft)||0)/100)} pack(s) — ${money(acousticPrice())} CAD`:"None",
        "Protection Pads":state.padsEnabled?`${state.padsQty} pad(s) — ${money(padsPrice())} CAD`:"None",
        "Projector Mount":state.projectorMountEnabled?`${money(projectorMountPrice())} CAD`:"None",
        "SimRail":state.simrailEnabled?`${money(simrailPrice())} CAD`:"None",
        "Estimated Product Total":`${money(total())} CAD`,
        "Pricing Note":DISCLAIMER,
        "Source":"Top Notch Sim Builder — Consolidated"
      };
      try{
        const response=await fetch(FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
        const data=await response.json().catch(()=>({}));
        if(!response.ok) throw new Error(data?.errors?.[0]?.message||"Quote submission failed.");
        setStatus(true,"<strong>Thanks — your simulator build has been sent to Top Notch Golf.</strong><br>We’ll review the configuration and follow up with you about the quote."); btn.textContent="Quote Request Sent";
      }catch(err){ console.error("Top Notch quote submission error",err); setStatus(false,"We couldn’t send the quote request right now. Please try again, or email <strong>sales@topntochgolf.ca</strong>."); btn.disabled=false; btn.textContent=old; }
    }

    ROOT.addEventListener("click",e=>{
      const a=e.target.closest("a"); if(a) return;
      const go=e.target.closest("[data-go]"); if(go){goStep(go.dataset.go);return;}
      const nav=e.target.closest("[data-step-nav]"); if(nav){goStep(nav.dataset.stepNav);return;}
      const hand=e.target.closest("[data-handed]"); if(hand){state.handedness=hand.dataset.handed;save();renderHandedness();updateTotals();return;}
      const fm=e.target.closest("[data-front-mode]"); if(fm){state.frontMode=fm.dataset.frontMode;clearAdditionalFlooringForSimBooth();save();frontFilterOptions();renderFront();renderProjectors();if(state.step===5)renderFlooring();updateTotals();return;}
      const enc=e.target.closest("[data-enclosure-key]"); if(enc&&!enc.disabled){state.enclosureKey=decodeURIComponent(enc.dataset.enclosureKey);clearAdditionalFlooringForSimBooth();save();renderFront();renderProjectors();if(state.step===5)renderFlooring();updateTotals();return;}
      const scr=e.target.closest("[data-screen-id]"); if(scr&&!scr.disabled){state.screenId=scr.dataset.screenId;save();renderFront();renderProjectors();updateTotals();return;}
      const lm=e.target.closest("[data-lm-id]"); if(lm){state.launchMonitorId=lm.dataset.lmId;if(selectedLM()?.mount!=="overhead")state.simrailEnabled=false;save();renderLM();renderComputers();updateTotals();return;}
      const pr=e.target.closest("[data-projector-id]"); if(pr){state.projectorId=pr.dataset.projectorId;save();renderProjectors();renderComputers();updateTotals();return;}
      const mat=e.target.closest("[data-mat-id]"); if(mat){state.matId=mat.dataset.matId;save();renderMats();updateTotals();return;}
      const put=e.target.closest("[data-putting]"); if(put){state.puttingTurf=put.dataset.putting;if(state.puttingTurf!=="none"&&!state.puttingMode)state.puttingMode="full";save();renderFlooring();updateTotals();return;}
      const fb=e.target.closest("[data-floor-base]"); if(fb){state.floorBase=fb.dataset.floorBase;save();renderFlooring();updateTotals();return;}
      const comp=e.target.closest("[data-computer-id]"); if(comp){state.computerId=comp.dataset.computerId;save();renderComputers();renderMonitors();updateTotals();return;}
      const mon=e.target.closest("[data-monitor-id]"); if(mon){state.monitorId=mon.dataset.monitorId;save();renderMonitors();updateTotals();return;}
    });

    ["tnsb-room-w","tnsb-room-d","tnsb-room-h"].forEach((id,i)=>$(id).addEventListener("input",e=>{state[["roomW","roomD","roomH"][i]]=Number(e.target.value)||0;save();if(state.step===1)renderFront();if(state.step===5)renderFlooring();if(state.step===8)renderAccessories();updateTotals();}));
    $("tnsb-front-search").addEventListener("input",renderFront);
    $("tnsb-front-filter").addEventListener("change",renderFront);
    $("tnsb-lm-search").addEventListener("input",renderLM);
    $("tnsb-lm-mount").addEventListener("change",renderLM);
    $("tnsb-mat-w").addEventListener("input",e=>{state.matW=Number(e.target.value)||0;save();renderMats();if(state.step===5)renderFlooring();updateTotals();});
    $("tnsb-mat-l").addEventListener("input",e=>{state.matL=Number(e.target.value)||0;save();renderMats();if(state.step===5)renderFlooring();updateTotals();});
    $("tnsb-putting-mode").addEventListener("change",e=>{state.puttingMode=e.target.value;const r=room();if(state.puttingMode==="custom"&&!(Number(state.puttingW)>0)&&!(Number(state.puttingL)>0)){state.puttingW=r.w;state.puttingL=r.d;}save();renderFlooring();updateTotals();});
    $("tnsb-putting-w").addEventListener("input",e=>{state.puttingW=Number(e.target.value)||0;save();renderFlooring();updateTotals();});
    $("tnsb-putting-l").addEventListener("input",e=>{state.puttingL=Number(e.target.value)||0;save();renderFlooring();updateTotals();});
    $("tnsb-rough-enabled").addEventListener("change",e=>{state.roughEnabled=e.target.checked;save();renderFlooring();updateTotals();});
    $("tnsb-rough-sqft").addEventListener("input",e=>{state.roughSqft=Number(e.target.value)||0;save();renderFlooring();updateTotals();});
    $("tnsb-use-rough-rec").addEventListener("click",()=>{state.roughEnabled=true;state.roughSqft=round1(roughRecommendedSqft());save();renderFlooring();updateTotals();});
    $("tnsb-submit").addEventListener("click",submitQuote);
    ["tnsb-q-name","tnsb-q-email","tnsb-q-phone","tnsb-q-notes"].forEach(id=>$(id).addEventListener("input",()=>{
      state.qName=$("tnsb-q-name").value;state.qEmail=$("tnsb-q-email").value;state.qPhone=$("tnsb-q-phone").value;state.qNotes=$("tnsb-q-notes").value;save();
    }));

    buildNav();
    goStep(state.step||0);
    return true;
  }

  function boot(){ if(!init()) setTimeout(boot,200); }
  boot();
})();
