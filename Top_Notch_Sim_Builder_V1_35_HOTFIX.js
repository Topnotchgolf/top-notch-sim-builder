/*
Top Notch Golf Simulator Builder — V1.35 HOTFIX
Fixes V1.34 startup regression caused by a leftover floor-projector label variable.
All projectors remain ceiling mounted.
*/
(function(){
  "use strict";

  const BASE_SCRIPT = "https://cdn.jsdelivr.net/gh/Topnotchgolf/top-notch-sim-builder@06f1639c0ec62333cf2820cd6b0745a00dbd75db/Top_Notch_Sim_Builder_CONSOLIDATED_V1_34.js";

  // V1.34's visualizer still references this legacy flag in one projector label.
  // Defining it before the production script loads prevents the visualizer from
  // throwing during startup. False is correct because all projectors are ceiling mounted.
  window.floorPlaced = false;

  // If a prior partial V1.34 initialization exists on this page, allow a clean retry.
  const root = document.getElementById("tnsb-root");
  if(root && root.dataset && root.dataset.consolidatedInit === "2026-10-06-consolidated-v1.34"){
    delete root.dataset.consolidatedInit;
  }

  const s = document.createElement("script");
  s.src = BASE_SCRIPT;
  s.async = false;
  s.onerror = function(){
    console.error("Top Notch Simulator Builder V1.35 HOTFIX: V1.34 base script failed to load.");
  };
  document.head.appendChild(s);
})();