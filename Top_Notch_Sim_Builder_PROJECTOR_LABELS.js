/* Top Notch Sim Builder — projector recommendation label cleanup (safe) */
(function(){
  "use strict";

  var observer=null;
  var watchedList=null;

  function updateProjectorLabels(){
    var list=document.getElementById("tnsb-projector-list");
    if(!list) return;

    var badges=list.querySelectorAll(".tnsb-badge");
    for(var i=0;i<badges.length;i++){
      var desired=null;

      if(badges[i].classList.contains("tnsb-green")){
        desired="Recommended Fit";
      }else if(badges[i].classList.contains("tnsb-yellow")){
        desired="Supported";
      }

      if(desired && badges[i].textContent.trim()!==desired){
        badges[i].textContent=desired;
      }
    }
  }

  function attachObserver(){
    var list=document.getElementById("tnsb-projector-list");
    if(!list){
      setTimeout(attachObserver,200);
      return;
    }

    if(watchedList===list) return;

    if(observer) observer.disconnect();
    watchedList=list;

    updateProjectorLabels();

    observer=new MutationObserver(function(){
      updateProjectorLabels();
    });

    observer.observe(list,{childList:true,subtree:true});
  }

  attachObserver();
})();
