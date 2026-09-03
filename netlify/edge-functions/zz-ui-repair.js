export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("spaceiUiRepair995")) return new Response(html, response);

  const addon = String.raw`
<style id="spaceiUiRepair995">
#games0731 #lpLaunchGames995{display:block;width:min(94%,620px);margin:16px auto;padding:18px;border-radius:16px;color:#fff;text-align:left;background:linear-gradient(145deg,#171d2b,#080b11);border:1px solid #43517d}
#games0731 #lpLaunchGames995 strong{display:block;font-size:20px;margin-bottom:5px}
#games0731 #lpLaunchGames995 span{opacity:.78}
</style>
<script id="spaceiUiRepair995">
(()=>{
 const norm=s=>(s||'').replace(/\s+/g,' ').trim();
 const visible=e=>{if(!e||!e.isConnected)return false;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};

 function dedupeMenus(){
   const menus=[...document.querySelectorAll('button,[role="button"]')].filter(e=>visible(e)&&/^([☰≡]\s*)?menu$/i.test(norm(e.textContent))&&e.getBoundingClientRect().top<760);
   if(menus.length<2)return;
   menus.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top||a.getBoundingClientRect().left-b.getBoundingClientRect().left);
   for(const m of menus.slice(1)) m.style.setProperty('display','none','important');
 }

 function installLonelyPlatesInGames(){
   // Remove old repair cards/shelves that incorrectly appeared on Home.
   document.getElementById('lpGamesShelf994')?.remove();
   document.getElementById('lpLaunchEmbedded994')?.remove();

   const games=document.getElementById('games0731');
   const host=games?.querySelector('.body0731') || games;
   if(!host)return;

   // If the original Lonely Plates injector made a card elsewhere, remove it.
   const old=document.getElementById('lpLaunch991');
   if(old && !games.contains(old)) old.remove();

   let card=document.getElementById('lpLaunchGames995');
   if(!card){
     card=document.createElement('button');
     card.id='lpLaunchGames995';
     card.innerHTML='<strong>🌆 LONELY PLATES</strong><span>Psychological Survival Horror · 20-Day Descent</span>';
     card.onclick=()=>{if(typeof window.openLonelyPlates991==='function')window.openLonelyPlates991();};
     host.appendChild(card);
   }else if(card.parentElement!==host){
     host.appendChild(card);
   }
 }

 let timer=0;
 function repair(){clearTimeout(timer);timer=setTimeout(()=>{dedupeMenus();installLonelyPlatesInGames()},40)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair,{once:true});else repair();
 new MutationObserver(repair).observe(document.body,{childList:true,subtree:true});
 setTimeout(repair,300);setTimeout(repair,1200);
})();
</script>`;

  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
