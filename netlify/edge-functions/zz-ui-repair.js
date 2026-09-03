export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("spaceiUiRepair996")) return new Response(html, response);

  const addon = String.raw`
<style id="spaceiUiRepair996">
#games0731 #lpLaunchGames995{display:block;width:min(94%,620px);margin:16px auto;padding:18px;border-radius:16px;color:#fff;text-align:left;background:linear-gradient(145deg,#171d2b,#080b11);border:1px solid #43517d;cursor:pointer;touch-action:manipulation}
#games0731 #lpLaunchGames995 strong{display:block;font-size:20px;margin-bottom:5px}
#games0731 #lpLaunchGames995 span{opacity:.78}
</style>
<script id="spaceiUiRepair996">
(()=>{
 const norm=s=>(s||'').replace(/\s+/g,' ').trim();
 const visible=e=>{if(!e||!e.isConnected)return false;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};

 function dedupeMenus(){
   const menus=[...document.querySelectorAll('button,[role="button"]')].filter(e=>visible(e)&&/^([☰≡]\s*)?menu$/i.test(norm(e.textContent))&&e.getBoundingClientRect().top<760);
   if(menus.length<2)return;
   menus.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top||a.getBoundingClientRect().left-b.getBoundingClientRect().left);
   for(const m of menus.slice(1)) m.style.setProperty('display','none','important');
 }

 function launchLonelyPlates(){
   let tries=0;
   const attempt=()=>{
     if(typeof window.openLonelyPlates991==='function'){
       window.openLonelyPlates991();
       return;
     }
     tries++;
     if(tries<20){setTimeout(attempt,100);return;}
     const game=document.getElementById('lp991');
     if(game){game.classList.add('show');return;}
     if(typeof window.toast==='function')window.toast('Lonely Plates is still loading. Try again in a second.');
   };
   attempt();
 }

 function installLonelyPlatesInGames(){
   document.getElementById('lpGamesShelf994')?.remove();
   document.getElementById('lpLaunchEmbedded994')?.remove();
   document.getElementById('lpLaunch991')?.remove();

   const games=document.getElementById('games0731');
   const host=games?.querySelector('.body0731') || games;
   if(!host)return;

   let card=document.getElementById('lpLaunchGames995');
   if(!card){
     card=document.createElement('button');
     card.type='button';
     card.id='lpLaunchGames995';
     card.innerHTML='<strong>🌆 LONELY PLATES</strong><span>Psychological Survival Horror · 20-Day Descent</span>';
     card.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();launchLonelyPlates();});
     card.addEventListener('touchend',e=>{e.preventDefault();e.stopPropagation();launchLonelyPlates();},{passive:false});
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
