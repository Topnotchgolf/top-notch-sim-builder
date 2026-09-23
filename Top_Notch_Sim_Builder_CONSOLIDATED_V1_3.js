/*
Top Notch Golf Simulator Builder — Consolidated Production Build
Generated for Lightspeed E-Series
Includes: room fit, enclosures + standalone screens, launch monitors, projectors,
hitting mats, flooring/turf, flooring bases, gaming towers, monitors, accessories,
product detail links, dynamic compatibility guidance, review + Formspree quote submission.
*/
(function(){
  "use strict";

  const VERSION = "2026-09-23-consolidated-v1.2";
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
      .replace(/\"/g,"&quot;").replace(/'/g,"&#039;");

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

    /* Data and render logic are unchanged from tested consolidated V1.3. */
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/Topnotchgolf/top-notch-sim-builder@main/Top_Notch_Sim_Builder_EXTERNAL_CODE.js';
    document.head.appendChild(script);
  }

  function boot(){ if(!init()) setTimeout(boot,200); }
  boot();
})();
