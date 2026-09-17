/* Top Notch Sim Builder — Quote Fix (Formspree) */
(function(){
  "use strict";

  var tries=0;
  var DISCLAIMER="Price is before tax, shipping, duty, and installation if required. Thank you for your submission, We will respond within 24 hours with finalized pricing including any discounts, promotions, shipping, duty, installation, and taxes.";
  var MEVO_PRICE=1799.99;

  function money(n){
    return new Intl.NumberFormat("en-CA",{
      style:"currency",currency:"CAD",minimumFractionDigits:2,maximumFractionDigits:2
    }).format(Number(n)||0);
  }

  function parseMoney(text){
    var match=(text||"").match(/\$[\d,]+(?:\.\d{2})?/);
    return match ? parseFloat(match[0].replace(/[$,]/g,"")) : 0;
  }

  function findReviewItem(root,label){
    var items=root.querySelectorAll(".tnsb-review-item");
    for(var i=0;i<items.length;i++){
      var h=items[i].querySelector("h4");
      if(h&&h.textContent.trim()===label) return items[i];
    }
    return null;
  }

  function touchUpBuilder(){
    var root=document.getElementById("tnsb-root");
    if(!root) return;

    var lmButtons=root.querySelectorAll("#tnsb-lm-list [data-lm-id]");
    for(var i=0;i<lmButtons.length;i++){
      var title=lmButtons[i].querySelector("h3");
      if(title&&title.textContent.trim()==="FlightScope Mevo Gen 2"){
        var priceNode=lmButtons[i].querySelector(".tnsb-price");
        if(priceNode&&priceNode.textContent.trim()!==money(MEVO_PRICE)){
          priceNode.textContent=money(MEVO_PRICE);
        }
      }
    }

    var totalItem=findReviewItem(root,"Estimated Product Total");
    if(totalItem){
      var totalSub=totalItem.querySelector(".tnsb-review-sub");
      if(totalSub&&totalSub.textContent.trim()!==DISCLAIMER){
        totalSub.textContent=DISCLAIMER;
      }
    }

    var lmItem=findReviewItem(root,"Launch Monitor");
    var lmMain=lmItem&&lmItem.querySelector(".tnsb-review-main");
    var mevoSelected=!!(lmMain&&lmMain.textContent.indexOf("FlightScope Mevo Gen 2")!==-1);

    if(mevoSelected){
      var lmSub=lmItem.querySelector(".tnsb-review-sub");
      if(lmSub){
        var currentLmSub=lmSub.textContent;
        var correctedLmSub=currentLmSub.replace(/\$[\d,]+(?:\.\d{2})?/,money(MEVO_PRICE));
        if(currentLmSub!==correctedLmSub) lmSub.textContent=correctedLmSub;
      }

      var enclosureItem=findReviewItem(root,"Enclosure + Screen");
      var projectorItem=findReviewItem(root,"Projector");
      var matItem=findReviewItem(root,"Hitting Mat");

      var enclosurePrice=parseMoney(enclosureItem&&enclosureItem.querySelector(".tnsb-review-sub")?enclosureItem.querySelector(".tnsb-review-sub").textContent:"");
      var projectorPrice=parseMoney(projectorItem&&projectorItem.querySelector(".tnsb-review-sub")?projectorItem.querySelector(".tnsb-review-sub").textContent:"");
      var matPrice=parseMoney(matItem&&matItem.querySelector(".tnsb-review-sub")?matItem.querySelector(".tnsb-review-sub").textContent:"");
      var correctedTotal=enclosurePrice+MEVO_PRICE+projectorPrice+matPrice;
      var correctedTotalText=money(correctedTotal)+" CAD";

      if(totalItem){
        var totalMain=totalItem.querySelector(".tnsb-review-main");
        if(totalMain&&totalMain.textContent.trim()!==correctedTotalText){
          totalMain.textContent=correctedTotalText;
        }
      }

      var summaryTotal=document.getElementById("tnsb-summary-total");
      if(summaryTotal&&summaryTotal.textContent.trim()!==correctedTotalText){
        summaryTotal.textContent=correctedTotalText;
      }

      var topTotal=document.getElementById("tnsb-top-total");
      if(topTotal&&topTotal.textContent.trim()!==correctedTotalText){
        topTotal.textContent=correctedTotalText;
      }
    }
  }

  function boot(){
    var root=document.getElementById("tnsb-root");
    var name=document.getElementById("tnsb-q-name");
    var email=document.getElementById("tnsb-q-email");
    var phone=document.getElementById("tnsb-q-phone");
    if(!root||!name||!email||!phone){ if(tries++<100) setTimeout(boot,200); return; }

    touchUpBuilder();

    if(document.getElementById("tnsb-quote-fix-button")) return;

    var grid=phone.closest(".tnsb-input-grid")||phone.parentElement;
    var box=document.createElement("div");
    box.id="tnsb-quote-fix-ui";
    box.innerHTML='\n      <div class="tnsb-notes-wrap">\n        <label for="tnsb-quote-fix-notes">Notes / Questions</label>\n        <textarea id="tnsb-quote-fix-notes" rows="4" placeholder="Anything else we should know about the room, installation or preferred setup?"></textarea>\n      </div>\n      <div class="tnsb-submit-area">\n        <div class="tnsb-submit-copy">\n          <strong>Ready to talk through the build?</strong>\n          <span>Your full configuration and estimated product total will be sent to Top Notch Golf.</span>\n        </div>\n        <button id="tnsb-quote-fix-button" class="tnsb-btn tnsb-primary tnsb-submit-btn" type="button">Request My Quote</button>\n      </div>\n      <div id="tnsb-quote-fix-status" class="tnsb-form-status" role="status" aria-live="polite"></div>\n      <p class="tnsb-privacy-note">By submitting, you agree that Top Notch Golf may contact you about this simulator quote request.</p>';
    grid.insertAdjacentElement("afterend",box);

    function reviewValue(label){
      var item=findReviewItem(root,label);
      if(item){
        var main=item.querySelector(".tnsb-review-main");
        var sub=item.querySelector(".tnsb-review-sub");
        return (main?main.textContent.trim():"")+(sub&&sub.textContent.trim()?" — "+sub.textContent.trim():"");
      }
      return "Not available";
    }

    function status(ok,msg){
      var el=document.getElementById("tnsb-quote-fix-status");
      el.className="tnsb-form-status "+(ok?"tnsb-success":"tnsb-error");
      el.innerHTML=msg;
    }

    document.getElementById("tnsb-quote-fix-button").addEventListener("click",async function(){
      touchUpBuilder();

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

    touchUpBuilder();
  }

  boot();
  new MutationObserver(function(){
    boot();
    touchUpBuilder();
  }).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();
