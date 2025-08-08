(function(){
  const pageParams = new URLSearchParams(location.search);
  const utms = {};
  pageParams.forEach((v,k)=>{ if(k.startsWith('utm_')) utms[k]=v; });
  const hasLLM = pageParams.get('llm') === '1';
  function hash(str){
    let h = 0;
    for(let i=0;i<str.length;i++){
      h = (h*31 + str.charCodeAt(i))>>>0;
    }
    return h.toString(36).padStart(8,'0').slice(0,8);
  }
  function rand6(){
    const arr = new Uint32Array(1);
    (crypto||window.msCrypto).getRandomValues(arr);
    return arr[0].toString(36).slice(0,6);
  }
  function makeClickId(){
    const now = new Date();
    const ts = now.getFullYear().toString()+
      String(now.getMonth()+1).padStart(2,'0')+
      String(now.getDate()).padStart(2,'0')+
      String(now.getHours()).padStart(2,'0')+
      String(now.getMinutes()).padStart(2,'0')+
      String(now.getSeconds()).padStart(2,'0');
    const lang = (navigator.language||'zz').slice(0,2).toUpperCase();
    const ab = window.WS_AB ? window.WS_AB.variant() : 'A';
    const pageHash = hash(location.pathname + location.search);
    return ts+'-'+rand6()+'-'+lang+'-'+ab+'-'+pageHash;
  }
  function decorate(target){
    let url = typeof target === 'string' ? target : target.getAttribute('href');
    if(!url) return url;
    const u = new URL(url, location.origin);
    const sp = u.searchParams;
    let cid = sp.get('subId') || sp.get('clickref');
    if(!cid){
      cid = makeClickId();
      sp.set('subId', cid);
      sp.set('clickref', cid);
    }
    for(const k in utms){ if(!sp.has(k)) sp.set(k, utms[k]); }
    sp.set('ref', location.host);
    sp.set('page', encodeURIComponent(location.pathname + location.search));
    if(hasLLM) sp.set('llm','1');
    u.search = sp.toString();
    if(typeof target === 'string'){
      return u.pathname + u.search;
    } else {
      if(target.dataset.wsDecorated) return;
      target.dataset.wsDecorated = '1';
      target.setAttribute('href', u.pathname + u.search);
      target.setAttribute('rel','sponsored noopener nofollow');
      target.setAttribute('referrerpolicy','origin-when-cross-origin');
      target.addEventListener('click', function(){
        const alias = u.pathname.split('/').pop().split('.')[0];
        if(window.WS_METRICS){
          window.WS_METRICS.record({
            ts: new Date().toISOString(),
            alias: alias,
            clickid: cid,
            variant: window.WS_AB ? window.WS_AB.variant() : 'A',
            lang: (navigator.language||'zz').slice(0,2).toUpperCase(),
            page: location.pathname + location.search,
            utm: utms
          });
        }
      });
    }
    return u.pathname + u.search;
  }
  function decorateAll(root){
    (root||document).querySelectorAll('a[href^="/go/"]').forEach(a=>decorate(a));
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>decorateAll());
  } else {
    decorateAll();
  }
  const obs = new MutationObserver(muts=>{
    muts.forEach(m=>{
      m.addedNodes.forEach(n=>{
        if(n.nodeType===1){
          if(n.matches && n.matches('a[href^="/go/"]')) decorate(n);
          else decorateAll(n);
        }
      });
    });
  });
  obs.observe(document.documentElement,{childList:true,subtree:true});
  window.WS_AFF = {decorate:decorate, clickidFor:function(url){const u=new URL(url, location.origin); return u.searchParams.get('subId')||u.searchParams.get('clickref');}};
})();
