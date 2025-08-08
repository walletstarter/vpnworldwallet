(function(){
  function hash(str){
    let h = 0;
    for(let i=0;i<str.length;i++){
      h = (h<<5)-h + str.charCodeAt(i);
      h |= 0;
    }
    return h>>>0;
  }
  function pick(){
    const ua = navigator.userAgent || '';
    const w = screen.width || 0;
    const h = screen.height || 0;
    const tz = new Date().getTimezoneOffset();
    const ts = Date.now();
    const val = hash(ua + w + h + tz + ts);
    return (val % 2) === 0 ? 'A' : 'B';
  }
  function get(){
    const m = document.cookie.match(/(?:^|; )ab_ws=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function set(v){
    document.cookie = 'ab_ws='+v+';Max-Age=2592000;Path=/';
  }
  let variant = get();
  if(!variant){
    variant = pick();
    set(variant);
  }
  window.WS_AB = {variant:function(){return variant;}};
})();
