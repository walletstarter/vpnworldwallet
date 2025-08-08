(function(){
  function render(){
    window.WS_METRICS.allEvents().then(evts=>{
      const totals={}, pages={}, variants={A:0,B:0};
      evts.forEach(e=>{
        totals[e.alias]=(totals[e.alias]||0)+1;
        pages[e.page]=(pages[e.page]||0)+1;
        variants[e.variant]=(variants[e.variant]||0)+1;
      });
      const sessionCount=window.WS_METRICS.sessions();
      let html='<h2>Totals by Program</h2><ul>';
      Object.keys(totals).forEach(k=>{html+='<li>'+k+': '+totals[k]+'</li>';});
      html+='</ul><h2>Top Pages</h2><ul>';
      Object.keys(pages).sort((a,b)=>pages[b]-pages[a]).forEach(k=>{html+='<li>'+k+': '+pages[k]+'</li>';});
      html+='</ul><h2>A/B Split</h2><p>A: '+variants.A+' B: '+variants.B+'</p>';
      html+='<h2>CTR Proxy</h2><p>'+evts.length+' clicks / '+sessionCount+' sessions</p>';
      document.getElementById('summary').innerHTML=html;
      document.getElementById('export').onclick=()=>exportCSV(evts);
    });
  }
  function exportCSV(events){
    const header=['ts','alias','clickid','variant','lang','page','utm'];
    const rows=events.map(e=>[e.ts,e.alias,e.clickid,e.variant,e.lang,e.page,JSON.stringify(e.utm)]);
    const csv=[header.join(','),...rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(','))].join('\n');
    const blob=new Blob([csv],{type:'text/csv'});
    const a=document.createElement('a');
    const day=new Date().toISOString().slice(0,10).replace(/-/g,'');
    a.href=URL.createObjectURL(blob);
    a.download='ws_clicks_'+day+'.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',render);
  }else render();
})();
