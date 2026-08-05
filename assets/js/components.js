(function(){
  'use strict';
  var CONFIG={PHONE:'+15863395370',FORMSPREE_FORM_ID:'mpqkkjpl'};
  function ready(fn){document.readyState!=='loading'?fn():document.addEventListener('DOMContentLoaded',fn);}
  function initMobileNav(){
    var toggle=document.querySelector('.mobile-toggle');var nav=document.getElementById('main-nav');if(!toggle||!nav)return;
    function close(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
    toggle.addEventListener('click',function(){var expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('is-open',!expanded);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();toggle.focus();}});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){if(window.innerWidth<=900)close();});});
  }
  function initSystemsStack(){
    var stack=document.querySelector('[data-systems-stack]');if(!stack)return;
    var tabs=Array.prototype.slice.call(stack.querySelectorAll('[role="tab"]'));
    var panels=Array.prototype.slice.call(stack.querySelectorAll('[role="tabpanel"]'));
    if(!tabs.length||!panels.length)return;
    var hasHover=window.matchMedia&&window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    function activate(tab,focusTab){
      tabs.forEach(function(t){var selected=t===tab;t.setAttribute('aria-selected',selected?'true':'false');t.tabIndex=selected?0:-1;});
      var id=tab.getAttribute('aria-controls');
      panels.forEach(function(p){if(p.id===id)p.removeAttribute('hidden');else p.setAttribute('hidden','');});
      if(focusTab)tab.focus();
    }
    tabs.forEach(function(tab,idx){
      tab.addEventListener('click',function(){activate(tab,false);});
      if(hasHover)tab.addEventListener('mouseenter',function(){activate(tab,false);});
      tab.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(idx+1)%tabs.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(idx-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;if(n!==null){e.preventDefault();activate(tabs[n],true);}});
    });
  }
  function initForm(){
    var form=document.getElementById('contact-form');if(!form)return;var status=document.getElementById('form-status');var btn=document.getElementById('submit-btn');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var hp=form.querySelector('#website');if(hp&&hp.value){return;}
      if(btn){btn.disabled=true;btn.textContent='Sending...';btn.setAttribute('aria-busy','true');}
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(function(res){
          if(res.ok){window.location.href='/thank-you/';}
          else{throw new Error('send failed');}
        })
        .catch(function(){
          if(status){status.className='form-status error';status.textContent='Something went wrong sending your request. Please call or text 586-339-5370 and we will take care of you directly.';}
          if(btn){btn.disabled=false;btn.textContent='Request My Free Assessment';btn.removeAttribute('aria-busy');}
        });
    });
  }
  function updateYear(){var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();}
  function checkTel(){document.querySelectorAll('a[href^="tel:"]').forEach(function(a){if(a.getAttribute('href')!=='tel:'+CONFIG.PHONE)console.warn('Phone link mismatch:',a.getAttribute('href'));});}
  ready(function(){initMobileNav();initSystemsStack();initForm();updateYear();checkTel();});
})();
