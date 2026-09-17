/* Top Notch Sim Builder — projector recommendation label cleanup */
(function(){
  "use strict";

  function updateProjectorLabels(){
    var list=document.getElementById("tnsb-projector-list");
    if(!list) return;

    var badges=list.querySelectorAll(".tnsb-badge");
    for(var i=0;i<badges.length;i++){
      var text=badges[i].textContent.trim();

      if(text==="Recommended" || text==="Ideal native match"){
        badges[i].textContent="Recommended fit";
      }

      if(text==="Adjustable support" || text==="Usable — confirm setup" || text==="Adjustable / compromise"){
        badges[i].textContent="Supported";
      }
    }
  }

  function boot(){
    updateProjectorLabels();
    setTimeout(updateProjectorLabels,100);
    setTimeout(updateProjectorLabels,300);
  }

  boot();
  new MutationObserver(updateProjectorLabels).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();
