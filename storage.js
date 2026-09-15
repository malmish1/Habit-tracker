(function(){
  const CURRENT_KEY='rytm-data-v2', OLD_KEY='rytm-habits-v1', VERSION=2;
  const defaults=()=>({version:VERSION,habits:[],tasks:[],settings:{}});
  const uid=()=>globalThis.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  function normalizeHabit(h){const entries={};Object.entries(h.entries||h.checks||{}).forEach(([date,v])=>{if(v===true)entries[date]={status:'done',value:null};else if(v&&typeof v==='object')entries[date]={status:v.status||'done',value:v.value??null,count:v.count??null}});return{id:h.id||uid(),name:h.name||'Namnlös vana',description:h.description||'',category:h.category||'Övrigt',color:h.color||'#3e7c67',icon:h.icon||'✓',startDate:h.startDate||Object.keys(entries).sort()[0]||new Date().toISOString().slice(0,10),schedule:h.schedule||{type:'daily',weekdays:[1,2,3,4,5,6,0],timesPerWeek:7},tracking:h.tracking||{type:'check'},target:h.target||null,archived:!!h.archived,createdAt:h.createdAt||new Date().toISOString(),entries};}
  function migrate(raw){const next=defaults();next.habits=(raw?.habits||[]).map(normalizeHabit);next.tasks=(raw?.tasks||[]).map(t=>({...t,id:t.id||uid(),done:!!t.done}));return next;}
  function load(){try{const current=localStorage.getItem(CURRENT_KEY);if(current)return migrate(JSON.parse(current));const old=localStorage.getItem(OLD_KEY);const data=old?migrate(JSON.parse(old)):defaults();save(data);return data}catch(e){console.error('Kunde inte läsa sparad data',e);return defaults()}}
  function save(data){try{data.version=VERSION;localStorage.setItem(CURRENT_KEY,JSON.stringify(data));return true}catch(e){console.error('Kunde inte spara data',e);return false}}
  window.RytmStore={load,save,uid,key:CURRENT_KEY,migrate,normalizeHabit};
})();
