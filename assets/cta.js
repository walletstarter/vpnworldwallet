(function(){
  function inject(){
    const slot=document.getElementById('cta-slot');
    if(!slot) return;
    const variant=window.WS_AB?window.WS_AB.variant():'A';
    fetch('/partials/cta_'+variant+'.html').then(r=>r.text()).then(html=>{
      slot.innerHTML=html;
      slot.querySelectorAll('a[href^="/go/"]').forEach(a=>window.WS_AFF&&window.WS_AFF.decorate(a));
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',inject);
  }else inject();
})();
