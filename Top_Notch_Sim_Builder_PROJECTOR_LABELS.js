/* Top Notch Sim Builder — projector recommendation label cleanup */
(function(){
  "use strict";

  function updateProjectorLabels(){
    var list=document.getElementById("tnsb-projector-list");
    if(!list) return;

    var badges=list.querySelectorAll(".tnsb-badge");
    for(var i=0;i<badges.length;i++){
      if(badges[i].classList.contains("tnsb-green")){
        badges[i].textContent="Recommended Fit";
      }else if(badges[i].classList.contains("tnsb-yellow")){
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
