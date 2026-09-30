export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  const addon = `
<style id="spaceiTypedDateStyle">
.spaceiTypedDateWrap{display:grid;gap:6px;margin-top:6px}.spaceiTypedDateLabel{font:600 12px system-ui;opacity:.8}.spaceiTypedDateInput{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid #33406b;background:#0d142c;color:#fff;font:inherit}.spaceiTypedDateHint{font:500 11px system-ui;opacity:.65}.spaceiTypedDateInput.spaceiDateBad{border-color:#ff6b6b!important}
</style>
<script id="spaceiTypedDateScript">
(()=>{
 function isoToPretty(v){const m=/^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(v||'');return m?m[2]+'/'+m[3]+'/'+m[1]:''}
 function prettyToIso(v){
   const s=(v||'').trim();
   let m=/^(\\d{1,2})[\\/\\-.](\\d{1,2})[\\/\\-.](\\d{4})$/.exec(s);
   if(!m)return null;
   const mm=+m[1],dd=+m[2],yy=+m[3];
   if(mm<1||mm>12||dd<1||dd>31||yy<1900||yy>2100)return null;
   const d=new Date(Date.UTC(yy,mm-1,dd));
   if(d.getUTCFullYear()!==yy||d.getUTCMonth()!==mm-1||d.getUTCDate()!==dd)return null;
   return String(yy).padStart(4,'0')+'-'+String(mm).padStart(2,'0')+'-'+String(dd).padStart(2,'0');
 }
 function enhance(input){
   if(input.dataset.spaceiTypedDate==='1')return;
   input.dataset.spaceiTypedDate='1';
   const wrap=document.createElement('div');wrap.className='spaceiTypedDateWrap';
   const label=document.createElement('div');label.className='spaceiTypedDateLabel';label.textContent='Or type the date';
   const typed=document.createElement('input');typed.className='spaceiTypedDateInput';typed.type='text';typed.inputMode='numeric';typed.autocomplete='bday';typed.placeholder='MM/DD/YYYY';typed.setAttribute('aria-label','Type date as month day year');
   const hint=document.createElement('div');hint.className='spaceiTypedDateHint';hint.textContent='Example: 09/29/2013';
   typed.value=isoToPretty(input.value);
   function sync(){const iso=prettyToIso(typed.value);typed.classList.toggle('spaceiDateBad',typed.value.trim()!==''&&!iso);if(!iso)return false;input.value=iso;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));return true}
   typed.addEventListener('input',()=>{if(typed.value.length>=8)sync()});typed.addEventListener('blur',sync);typed.addEventListener('keydown',e=>{if(e.key==='Enter')sync()});
   input.addEventListener('change',()=>{typed.value=isoToPretty(input.value);typed.classList.remove('spaceiDateBad')});
   wrap.append(label,typed,hint);input.insertAdjacentElement('afterend',wrap);
 }
 function scan(){document.querySelectorAll('input[type="date"]').forEach(enhance)}
 scan();
 const obs=new MutationObserver(()=>scan());obs.observe(document.documentElement,{childList:true,subtree:true});
})();
</script>`;
  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
