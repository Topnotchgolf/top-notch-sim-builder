/*
Top Notch Golf Simulator Builder — V1.29 FIX
Loads the verified V1.28 production build, then applies a scoped layout adjustment so
product photos no longer overlap the top-right product badges.

Fix: the previous V1.29 wrapper incorrectly treated the static #tnsb-root mount element
as proof that the production builder had already loaded. This version only checks for
the production stylesheet marker before deciding the base builder is already active.
*/
(function(){
  "use strict";

  const BASE_SCRIPT = "https://cdn.jsdelivr.net/gh/Topnotchgolf/top-notch-sim-builder@1dc316b61f2b5ec74239b720553fbf208f6cff22/Top_Notch_Sim_Builder_CONSOLIDATED_V1_28.js";
  const PATCH_ID = "tnsb-v129-photo-badge-spacing";

  function applyPhotoBadgeSpacing(){
    if(document.getElementById(PATCH_ID)) return;
    const style=document.createElement("style");
    style.id=PATCH_ID;
    style.textContent=`
#tnsb-root .tnsb-card > .tnsb-badge{z-index:6}
#tnsb-root .tnsb-card > .tnsb-badge + .tnsb-card-thumb,
#tnsb-root .tnsb-card > .tnsb-badge + .tnsb-lm-photo{
  width:92%;
  min-height:0;
  margin:38px auto 0;
  border:1px solid var(--tn-border);
  border-radius:12px;
}
`;
    document.head.appendChild(style);
  }

  /* If the actual V1.28 production styles are already present, only apply the patch. */
  if(document.getElementById("tnsb-consolidated-styles")){
    applyPhotoBadgeSpacing();
    return;
  }

  const script=document.createElement("script");
  script.src=BASE_SCRIPT;
  script.async=false;
  script.onload=applyPhotoBadgeSpacing;
  script.onerror=function(){
    console.error("Top Notch Simulator Builder V1.29 FIX: base V1.28 script failed to load.");
  };
  document.head.appendChild(script);
})();
