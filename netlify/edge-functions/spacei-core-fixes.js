export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  const html = await response.text();
  if (html.includes("spaceiCoreFixes903")) return new Response(html, response);

  const patch = String.raw`
<style id="spaceiCoreFixes903">
@media(max-width:700px){.overlay{backdrop-filter:none!important}.sheet{box-shadow:none!important}.hfxBalloon841{animation-duration:14s!important}}
</style>
<script id="spaceiCoreFixes903">
(()=>{
 const $=id=>document.getElementById(id);
 const CREATOR='SPACEPUG created SPACEI, with development help from Spruce.';

 // Manual local-AI mode: nothing loads until the user presses Download / Load Local AI.
 localStorage.removeItem('spacei_local_ai_enabled_0876');
 window.SPACEI_AI_READY=false;

 function bindManualAI(){
   const status=$('aiStatus');
   const load=$('loadAiBtn');
   if(status && !window.SPACEI_AI_READY) status.textContent='AI: not loaded — tap Download / Load Local AI';
   if(!load) return;
   load.disabled=false;
   load.textContent='🧠 Download / Load Local AI';
   load.onclick=async()=>{
     if(load.dataset.loading903==='1') return;
     load.dataset.loading903='1';
     const old=load.textContent;
     try{
       if(status) status.textContent='AI: downloading / loading local model…';
       load.textContent='🧠 Loading Local AI…';
       if(typeof window.enableSpaceiLocalAI876!=='function') throw new Error('Local AI loader is not available on this device.');
       await window.enableSpaceiLocalAI876();
       window.SPACEI_AI_READY=true;
       if(status) status.textContent='AI: Local AI — Ready';
       load.textContent='✅ Local AI loaded';
       if(typeof window.toast==='function') window.toast('Local AI loaded ✅');
     }catch(e){
       localStorage.removeItem('spacei_local_ai_enabled_0876');
       window.SPACEI_AI_READY=false;
       if(status) status.textContent='AI: local AI could not load';
       load.textContent=old;
       if(typeof window.toast==='function') window.toast((e&&e.message)||'Local AI could not load.');
     }finally{
       delete load.dataset.loading903;
     }
   };
 }

 // The original page runs its own local-AI wire-up on a zero-delay timer.
 // Re-apply manual mode after it so Download also ENABLES the downloaded model.
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{setTimeout(bindManualAI,100);setTimeout(bindManualAI,700)},{once:true});
 else {setTimeout(bindManualAI,100);setTimeout(bindManualAI,700)}

 // Keep credits consistent without taking over the site's existing buttons/chat handlers.
 const credits=$('creditsPage808');
 if(credits){
   credits.innerHTML=credits.innerHTML
     .replace(/Created by <b>[^<]+<\\/b>/,'Created by <b>SPACEPUG</b>')
     .replace(/Development help from <b>[^<]+<\\/b>/,'Development help from <b>Spruce</b>');
 }

 // Small creator-answer helper only when the basic offline responder is used before Local AI is downloaded.
 window.SPACEI_CREATOR_CREDIT=CREATOR;
})();
</script>`;

  const output = html.includes("</body>") ? html.replace("</body>", patch + "</body>") : html + patch;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(output, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
