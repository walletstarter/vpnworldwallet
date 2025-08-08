(function(){
  const DB_NAME='ws_metrics';
  const STORE='clicks';
  function openDB(){
    return new Promise((resolve,reject)=>{
      if(!('indexedDB' in window)) return reject('no-idb');
      const req=indexedDB.open(DB_NAME,1);
      req.onupgradeneeded=()=>req.result.createObjectStore(STORE,{autoIncrement:true});
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||req.result.error);
    });
  }
  function record(ev){
    openDB().then(db=>{
      const tx=db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).add(ev);
    }).catch(()=>{
      const arr=JSON.parse(localStorage.getItem('ws_clicks')||'[]');
      arr.push(ev); localStorage.setItem('ws_clicks',JSON.stringify(arr));
    });
  }
  function allEvents(){
    return openDB().then(db=>new Promise((res,rej)=>{
      const tx=db.transaction(STORE,'readonly');
      const req=tx.objectStore(STORE).getAll();
      req.onsuccess=()=>res(req.result);
      req.onerror=()=>rej(req.error);
    })).catch(()=>JSON.parse(localStorage.getItem('ws_clicks')||'[]'));
  }
  function sessions(){
    return parseInt(localStorage.getItem('ws_session_count')||'0',10);
  }
  try{
    if(!sessionStorage.getItem('ws_session')){
      sessionStorage.setItem('ws_session','1');
      const day=new Date().toISOString().slice(0,10);
      const match=document.cookie.match(/ws_day=([^;]+)/);
      if(!match||match[1]!==day){
        document.cookie='ws_day='+day+';max-age=86400;path=/';
        localStorage.setItem('ws_session_count', sessions()+1);
      }
    }
  }catch(e){}
  if(location.search.includes('dev=1')){
    const link=document.getElementById('metrics-link');
    if(link){ link.style.display='inline'; link.href='/dashboard/?dev=1'; }
  }
  window.WS_METRICS={record,allEvents,sessions};
})();
