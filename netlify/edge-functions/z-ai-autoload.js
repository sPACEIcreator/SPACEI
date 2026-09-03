export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("spaceiAiAutoload913")) return new Response(html, response);

  const addon = String.raw`
<script id="spaceiAiAutoload913">
(()=>{
  const start=()=>{
    const status=document.getElementById('aiStatus');
    const load=document.getElementById('loadAiBtn');
    if(status) status.textContent='AI: checking Cloud Brain…';
    if(load){
      load.disabled=true;
      load.textContent='☁️ Checking AI…';
    }

    fetch('/api/ai-status',{cache:'no-store'})
      .then(async r=>({ok:r.ok,d:await r.json()}))
      .then(({ok,d})=>{
        const ready=Boolean(ok && d && d.configured===true);
        if(status) status.textContent=ready?'AI: SPACEI Cloud Brain — Ready':'AI: Cloud Brain needs setup';
        if(load){
          load.disabled=false;
          load.textContent=ready?'☁️ AI loaded automatically':'⚠️ AI needs production key';
          load.onclick=()=>location.reload();
        }
        window.SPACEI_AI_READY=ready;
        window.dispatchEvent(new CustomEvent('spacei-ai-ready',{detail:{ready,status:d}}));
      })
      .catch(()=>{
        if(status) status.textContent='AI: Cloud Brain unavailable';
        if(load){load.disabled=false;load.textContent='↻ Retry AI connection';load.onclick=()=>location.reload();}
        window.SPACEI_AI_READY=false;
      });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
</script>`;

  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
