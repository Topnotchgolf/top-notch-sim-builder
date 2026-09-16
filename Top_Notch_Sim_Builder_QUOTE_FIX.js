/* Top Notch Sim Builder — Quote Fix (Formspree) */
(function(){
  "use strict";
  var tries=0;
  function boot(){
    var root=document.getElementById("tnsb-root");
    var name=document.getElementById("tnsb-q-name");
    var email=document.getElementById("tnsb-q-email");
    var phone=document.getElementById("tnsb-q-phone");
    if(!root||!name||!email||!phone){ if(tries++<100) setTimeout(boot,200); return; }
    if(document.getElementById("tnsb-quote-fix-button")) return;

    var grid=phone.closest(".tnsb-input-grid")||phone.parentElement;
    var box=document.createElement("div");
    box.id="tnsb-quote-fix-ui";
    box.innerHTML='\n      <div class="tnsb-notes-wrap">\n        <label for="tnsb-quote-fix-notes">Notes / Questions</label>\n        <textarea id="tnsb-quote-fix-notes" rows="4" placeholder="Anything else we should know about the room, installation or preferred setup?"></textarea>\n      </div>\n      <div class="tnsb-submit-area">\n        <div class="tnsb-submit-copy">\n          <strong>Ready to talk through the build?</strong>\n          <span>Your full configuration and estimated product total will be sent to Top Notch Golf.</span>\n        </div>\n        <button id="tnsb-quote-fix-button" class="tnsb-btn tnsb-primary tnsb-submit-btn" type="button">Request My Quote</button>\n      </div>\n      <div id="tnsb-quote-fix-status" class="tnsb-form-status" role="status" aria-live="polite"></div>\n      <p class="tnsb-privacy-note">By submitting, you agree that Top Notch Golf may contact you about this simulator quote request.</p>';
    grid.insertAdjacentElement("afterend",box);

    function reviewValue(label){
      var items=root.querySelectorAll(".tnsb-review-item");
      for(var i=0;i<items.length;i++){
        var h=items[i].querySelector("h4");
        if(h&&h.textContent.trim()===label){
          var main=items[i].querySelector(".tnsb-review-main");
          var sub=items[i].querySelector(".tnsb-review-sub");
          return (main?main.textContent.trim():"")+(sub&&sub.textContent.trim()?" — "+sub.textContent.trim():"");
        }
      }
      return "Not available";
    }

    function status(ok,msg){
      var el=document.getElementById("tnsb-quote-fix-status");
      el.className="tnsb-form-status "+(ok?"tnsb-success":"tnsb-error");
      el.innerHTML=msg;
    }

    document.getElementById("tnsb-quote-fix-button").addEventListener("click",async function(){
      var btn=this;
      var customerName=name.value.trim();
      var customerEmail=email.value.trim();
      var customerPhone=phone.value.trim();
      var notes=document.getElementById("tnsb-quote-fix-notes").value.trim();
      if(!customerName){ status(false,"Please enter your name."); return; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)){ status(false,"Please enter a valid email address."); return; }

      var payload={
        "subject":"New Top Notch Simulator Quote — "+customerName,
        "name":customerName,
        "email":customerEmail,
        "phone":customerPhone||"Not provided",
        "message":notes||"None",
        "Room Dimensions":reviewValue("Room"),
        "Enclosure + Screen":reviewValue("Enclosure + Screen"),
        "Launch Monitor":reviewValue("Launch Monitor"),
        "Projector":reviewValue("Projector"),
        "Hitting Mat":reviewValue("Hitting Mat"),
        "Estimated Product Total":reviewValue("Estimated Product Total"),
        "Source":"Top Notch Sim Builder"
      };

      var old=btn.textContent;
      btn.disabled=true;
      btn.textContent="Sending…";
      try{
        var response=await fetch("https://formspree.io/f/mgaveeol",{
          method:"POST",
          headers:{"Content-Type":"application/json","Accept":"application/json"},
          body:JSON.stringify(payload)
        });
        var data=await response.json().catch(function(){return {};});
        if(!response.ok){
          var detail=(data.errors&&data.errors.length&&data.errors[0].message)?data.errors[0].message:"Quote submission failed.";
          throw new Error(detail);
        }
        status(true,"<strong>Thanks — your simulator build has been sent to Top Notch Golf.</strong><br>We’ll review the configuration and follow up with you about the quote.");
        btn.textContent="Quote Request Sent";
      }catch(err){
        console.error("Top Notch Formspree quote submission error",err);
        status(false,"We couldn’t send the quote request right now. Please try again, or email <strong>sales@topntochgolf.ca</strong>.");
        btn.disabled=false;
        btn.textContent=old;
      }
    });
  }
  boot();
  new MutationObserver(function(){boot();}).observe(document.documentElement,{childList:true,subtree:true});
})();
