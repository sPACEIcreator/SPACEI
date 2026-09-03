export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("spaceiUiRepair994")) return new Response(html, response);

  const addon = String.raw`
<style id="spaceiUiRepair994">
#lpGamesShelf994{display:none;position:fixed;left:12px;right:12px;bottom:86px;z-index:2147482500;max-height:66dvh;overflow:auto;background:#08101f;border:1px solid #354269;border-radius:18px;padding:14px;box-shadow:0 16px 50px #000a;color:#fff}
#lpGamesShelf994.show{display:block}
#lpGamesShelf994 .lpShelfTop994{display:flex;align-items:center;gap:10px;margin-bottom:12px}
#lpGamesShelf994 .lpShelfTop994 b{font-size:18px}
#lpGamesShelf994 .lpShelfTop994 button{margin-left:auto}
#lpGamesShelf994 button{background:#121a2e;color:#fff;border:1px solid #43517d;border-radius:14px;padding:12px;font:600 16px system-ui}
#lpGamesShelf994 .lpCard994{display:block;width:100%;text-align:left;background:linear-gradient(145deg,#171d2b,#080b11);padding:18px;border-radius:16px}
#lpGamesShelf994 .lpCard994 strong{display:block;font-size:20px;margin-bottom:5px}
#lpGamesShelf994 .lpCard994 span{opacity:.78}
@media(min-width:900px){#lpGamesShelf994{left:50%;right:auto;transform:translateX(-50%);width:min(680px,90vw)}}
</style>
<div id="lpGamesShelf994" aria-label="SPACEI Games"><div class="lpShelfTop994"><b>🎮 Games</b><button id="lpShelfClose994">Close</button></div><button id="lpShelfLaunch994" class="lpCard994"><strong>🌆 LONELY PLATES</strong><span>Psychological Survival Horror · 20-Day Descent</span></button></div>
<script id="spaceiUiRepair994">
(()=>{
 const norm=s=>(s||'').replace(/\s+/g,' ').trim();
 const visible=e=>{if(!e||!e.isConnected)return false;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};
 const shelf=document.getElementById('lpGamesShelf994');
 const close=document.getElementById('lpShelfClose994');
 const launch=document.getElementById('lpShelfLaunch994');
 if(close) close.onclick=()=>shelf?.classList.remove('show');
 if(launch) launch.onclick=()=>{shelf?.classList.remove('show');if(typeof window.openLonelyPlates991==='function')window.openLonelyPlates991();};

 function dedupeMenus(){
   const menus=[...document.querySelectorAll('button,[role="button"]')].filter(e=>visible(e)&&/^([☰≡]\s*)?menu$/i.test(norm(e.textContent))&&e.getBoundingClientRect().top<760);
   if(menus.length<2)return;
   menus.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top||a.getBoundingClientRect().left-b.getBoundingClientRect().left);
   const keep=menus[0];
   for(const m of menus.slice(1)){
     const kr=keep.getBoundingClientRect(),r=m.getBoundingClientRect();
     const sameArea=Math.abs(r.top-kr.top)<230 || (m.parentElement===keep.parentElement);
     if(sameArea){m.dataset.spaceiDuplicateMenu='1';m.style.setProperty('display','none','important');}
   }
 }

 function gameTargetFromClick(target){
   let e=target;
   for(let i=0;e&&i<5;i++,e=e.parentElement){
     const t=norm(e.textContent);
     if(t==='Games'||t==='🎮 Games'||(/^🎮?\s*Games$/i.test(t)))return e;
   }
   return null;
 }
 function showGamesShelf(){
   if(!shelf)return;
   shelf.classList.add('show');
   // Also try to place a normal card into an existing Games panel when one exists.
   setTimeout(()=>{
     if(document.getElementById('lpLaunchEmbedded994'))return;
     const candidates=[...document.querySelectorAll('section,main,div')].filter(e=>{
       if(!visible(e)||e===shelf||e.closest('#lpGamesShelf994'))return false;
       const r=e.getBoundingClientRect(),t=norm(e.textContent);
       return r.width>260&&r.height>120&&r.top<innerHeight-70&&/\bgames\b/i.test(t);
     }).sort((a,b)=>a.getBoundingClientRect().width*a.getBoundingClientRect().height-b.getBoundingClientRect().width*b.getBoundingClientRect().height);
     const host=candidates[0];
     if(host){
       const card=document.createElement('button');card.id='lpLaunchEmbedded994';card.className='lpCard994';card.style.cssText='display:block;width:min(92%,560px);margin:14px auto;text-align:left;background:linear-gradient(145deg,#171d2b,#080b11);color:#fff;border:1px solid #43517d;border-radius:16px;padding:18px';card.innerHTML='<strong style="display:block;font-size:20px;margin-bottom:5px">🌆 LONELY PLATES</strong><span style="opacity:.78">Psychological Survival Horror · 20-Day Descent</span>';card.onclick=()=>{if(typeof window.openLonelyPlates991==='function')window.openLonelyPlates991()};host.appendChild(card);shelf.classList.remove('show');
     }
   },350);
 }

 document.addEventListener('click',e=>{
   const game=gameTargetFromClick(e.target);
   if(game){setTimeout(showGamesShelf,180);return;}
   const t=norm(e.target?.textContent);
   if(/^(Home|Friends|Create|Inbox|Your Profile|Safety|People|Calendar)$/i.test(t))shelf?.classList.remove('show');
 },true);

 let timer=0;
 const repair=()=>{clearTimeout(timer);timer=setTimeout(dedupeMenus,50)};
 new MutationObserver(repair).observe(document.body,{childList:true,subtree:true});
 dedupeMenus();
})();
</script>`;

  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
