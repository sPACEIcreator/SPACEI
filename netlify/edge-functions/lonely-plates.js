export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("lonelyPlatesGame991")) return new Response(html, response);

  const addon = String.raw`
<style id="lonelyPlatesGame991">
#lp991{position:fixed;inset:0;z-index:2147483200;background:#06080d;color:#eee;display:none;font-family:system-ui,Arial,sans-serif;overflow:auto}
#lp991.show{display:block}.lpWrap991{min-height:100%;background:linear-gradient(#0a0d14,#111725 52%,#050609);padding:16px 16px 90px;transition:filter .35s,transform .08s}
.lpTop991{display:flex;gap:10px;align-items:center;position:sticky;top:0;z-index:3;background:#080b12e8;backdrop-filter:blur(6px);padding:10px;border-bottom:1px solid #2d3545}
.lpTop991 h1{font-size:20px;margin:0;letter-spacing:.08em}.lpTop991 button{margin-left:auto}
.lpStats991{display:grid;grid-template-columns:repeat(5,minmax(90px,1fr));gap:8px;margin:14px 0}.lpStat991{background:#0b101a;border:1px solid #293244;border-radius:12px;padding:9px}.lpStat991 b{display:block;font-size:12px;color:#9aa7ba}.lpBar991{height:8px;background:#252b36;border-radius:99px;overflow:hidden;margin-top:6px}.lpBar991 i{display:block;height:100%;background:#d9dce5;width:50%}
.lpCity991{position:relative;min-height:270px;border:1px solid #293244;border-radius:18px;overflow:hidden;background:linear-gradient(#263043 0 18%,#171c27 18% 43%,#0b0f17 43% 100%)}
.lpSky991{position:absolute;inset:0;background:radial-gradient(circle at 70% 14%,#d8d2bb33 0 6%,transparent 7%),linear-gradient(transparent,#0007);pointer-events:none}.lpBuildings991{position:absolute;left:0;right:0;bottom:45px;height:155px;background:repeating-linear-gradient(90deg,#10151f 0 48px,#0b0e14 48px 52px);clip-path:polygon(0 26%,7% 26%,7% 2%,13% 2%,13% 39%,22% 39%,22% 12%,29% 12%,29% 34%,37% 34%,37% 7%,44% 7%,44% 27%,55% 27%,55% 0,62% 0,62% 34%,72% 34%,72% 16%,80% 16%,80% 30%,91% 30%,91% 8%,100% 8%,100% 100%,0 100%)}
.lpStreet991{position:absolute;left:0;right:0;bottom:0;height:52px;background:#080a0f;border-top:2px solid #1e2531}.lpStreet991:after{content:"";position:absolute;left:0;right:0;top:23px;border-top:2px dashed #86868655}
.lpNarrative991{position:relative;z-index:2;margin:24px;max-width:760px;background:#05070bbd;border:1px solid #30394a;border-radius:14px;padding:14px;line-height:1.45;white-space:pre-line}
.lpActions991{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin:12px 0}.lpBtn991,#lp991 button{background:#121a29;color:#fff;border:1px solid #39445a;border-radius:12px;padding:12px;font-weight:700}.lpBtn991:hover,#lp991 button:hover{background:#1b2538}.lpBtn991:disabled{opacity:.35}.lpPanels991{display:grid;grid-template-columns:1.3fr .7fr;gap:12px}.lpPanel991{background:#0a0e16;border:1px solid #273143;border-radius:16px;padding:13px}.lpPanel991 h3{margin:0 0 10px}.lpRegistry991{max-height:240px;overflow:auto}.lpMissing991{color:#b51924;text-decoration:line-through;text-decoration-thickness:2px}.lpLog991{min-height:140px;max-height:240px;overflow:auto;white-space:pre-line;color:#cbd2df}.lpEnding991{position:fixed;inset:0;z-index:10;background:#000;display:none;align-items:center;justify-content:center;padding:24px}.lpEnding991.show{display:flex}.lpEndingCard991{max-width:720px;font-family:Georgia,serif;line-height:1.6;font-size:18px}.lpNotebook991{background:#d9cfb2;color:#201b16;padding:22px;border-radius:6px;transform:rotate(-1deg);box-shadow:0 20px 60px #000}.lpReset991{margin-top:20px}.lpGameCard991{border:1px solid #38435a!important;background:linear-gradient(145deg,#161c29,#090c12)!important}
html.lpParanoiaLow991 #lp991 .lpWrap991{filter:contrast(1.04) saturate(.9)}
html.lpParanoiaMed991 #lp991 .lpWrap991{filter:contrast(1.12) saturate(.7);animation:lpFlick991 7s infinite}
html.lpParanoiaHigh991 #lp991 .lpWrap991{filter:contrast(1.3) saturate(.45);animation:lpFlick991 2.2s infinite}
@keyframes lpFlick991{0%,94%,100%{opacity:1}95%{opacity:.58}96%{opacity:1}98%{opacity:.72}}
@media(max-width:700px){.lpStats991{grid-template-columns:repeat(2,1fr)}.lpPanels991{grid-template-columns:1fr}.lpTop991{backdrop-filter:none}.lpNarrative991{margin:16px}}
</style>
<div id="lp991" aria-label="Lonely Plates game">
 <div class="lpWrap991">
  <div class="lpTop991"><h1>🌆 LONELY PLATES</h1><span id="lpPhase991">THE QUIET</span><button id="lpExit991">Exit</button></div>
  <div class="lpStats991">
   <div class="lpStat991"><b>DAY</b><span id="lpDay991">1 / 20</span></div>
   <div class="lpStat991"><b>MONEY</b>$<span id="lpMoney991">42</span></div>
   <div class="lpStat991"><b>FOOD</b><span id="lpFood991">70</span><div class="lpBar991"><i id="lpFoodBar991"></i></div></div>
   <div class="lpStat991"><b>FLUIDS</b><span id="lpWater991">75</span><div class="lpBar991"><i id="lpWaterBar991"></i></div></div>
   <div class="lpStat991"><b>PARANOIA</b><span id="lpPar991">2</span><div class="lpBar991"><i id="lpParBar991"></i></div></div>
  </div>
  <div class="lpCity991"><div class="lpSky991"></div><div class="lpBuildings991"></div><div class="lpStreet991"></div><div id="lpNarrative991" class="lpNarrative991"></div></div>
  <div id="lpActions991" class="lpActions991"></div>
  <div class="lpPanels991">
   <div class="lpPanel991"><h3>Activity Log</h3><div id="lpLog991" class="lpLog991"></div></div>
   <div class="lpPanel991"><h3>Registry of the Missing</h3><div id="lpRegistry991" class="lpRegistry991"></div></div>
  </div>
 </div>
 <div id="lpEnding991" class="lpEnding991"><div class="lpEndingCard991"><div class="lpNotebook991"><b>DAY 20 — NOTEBOOK</b><p>"The amount of people I killed is making me crazy but I won't tell anyone or tell myself. Every night I take a pill that makes me lose my memory and I forget."</p></div><p id="lpEndingText991"></p><button id="lpRestart991" class="lpReset991">Start Over</button></div></div>
</div>
<script id="lonelyPlatesScript991">
(()=>{
 const $=id=>document.getElementById(id);
 const NAMES=['Mara Voss','Theo Bell','Nina Hale','Jules Mercer','Owen Pike','Rhea Cole','Sam Danner','Iris Wynn','Cal Rowan','June Vale','Eli Marsh','Tara Finch','Milo Grant','Ada Cross','Leon Ward','Mae Lin','Noah Keene','Vera Snow','Finn Hart','Luca Grey'];
 const jobs=[['Sweep Mercer Alley',12,8,6],['Deliver a sealed package',15,7,7],['Clean the dark storefront',13,9,5],['Carry groceries upstairs',10,6,5],['Fix a flickering hallway light',16,10,8]];
 let s;
 function fresh(){return{day:1,money:42,food:70,water:75,par:2,pop:2184307,worked:false,ate:false,drank:false,missing:[],log:['Day 1. Rent is due in twenty days. The city feels ordinary enough.'],seed:Math.random()}}
 function load(){try{s=JSON.parse(localStorage.getItem('spacei_lonely_plates_991'))||fresh()}catch(e){s=fresh()}if(!s||!s.day)s=fresh();}
 function save(){localStorage.setItem('spacei_lonely_plates_991',JSON.stringify(s));}
 function phase(){return s.day<=5?'THE QUIET':s.day<=12?'THE THINNING':s.day<=19?'THE ECHOES':'HORIZON OF SILENCE'}
 function clamp(v){return Math.max(0,Math.min(100,Math.round(v)))}
 function paranoiaClass(){document.documentElement.classList.remove('lpParanoiaLow991','lpParanoiaMed991','lpParanoiaHigh991');document.documentElement.classList.add(s.par<35?'lpParanoiaLow991':s.par<70?'lpParanoiaMed991':'lpParanoiaHigh991')}
 function population(){if(s.day<=5)return Math.max(1500000,2184307-(s.day-1)*Math.floor(60000+s.seed*45000));if(s.day<=12)return Math.max(80000,1500000-Math.pow(s.day-5,2)*28000);if(s.day<=19)return Math.max(1,80000-Math.pow(s.day-12,2)*1600);return 0}
 function scene(){
   const q=[
    'Morning traffic murmurs between towers. Your neighbor leaves a chore list under the door.',
    'The grocery sign changes prices twice while you watch it. Nobody seems bothered.',
    'There are fewer cars on the highway today. A pedestrian signal cycles for an empty crosswalk.',
    'A diner server repeats the same goodbye word-for-word. You notice three empty booths still set for dinner.',
    'A city bus arrives on time. It has no passengers.'
   ];
   const t=['A person you worked for yesterday is gone. Their door is unlocked. Dinner has gone cold. One plate remains on the counter.','The evening news is only static. Someone has left every light on in the apartment across the hall.','You call an employer. Their phone rings from inside an empty room.','The convenience store is automated now. The clerk badge still sits beside the register.','Another apartment is open. Another untouched meal. Another lonely plate.'];
   const e=['Footsteps match yours from half a block behind. When you stop, they stop.','The sky never gets brighter than twilight. Your hands shake while you try to open a food packet.','You hear your own voice whisper your name from an alley you have never entered.','The city map says you are surrounded by millions of residents. The streets say otherwise.','You pass five apartments with warm meals and no people. You cannot remember why the sight feels familiar.'];
   if(s.day===20)return 'TOTAL POPULATION: 0.\n\nThere are no engines. No voices. No doors opening. You run toward your apartment. Your emergency savings are in the dresser. They have to be.';
   const a=s.day<=5?q:s.day<=12?t:e;return a[(s.day+Math.floor(s.seed*10))%a.length]+'\n\nEstimated population: '+population().toLocaleString()+'.';
 }
 function missingForDay(){const target=s.day<=5?0:s.day<=12?Math.floor((s.day-5)*1.4):Math.min(NAMES.length,10+(s.day-12)*2);while(s.missing.length<target){const left=NAMES.filter(n=>!s.missing.includes(n));if(!left.length)break;s.missing.push(left[Math.floor(Math.random()*left.length)]);}}
 function price(base){const wave=1+Math.sin((s.day+s.seed*4)*1.7)*.22+(s.day>12?.18:0);return Math.max(2,Math.round(base*wave))}
 function log(txt){s.log.unshift(txt);s.log=s.log.slice(0,20)}
 function consume(){s.food=clamp(s.food-(9+Math.floor(Math.random()*5)));s.water=clamp(s.water-(11+Math.floor(Math.random()*5)));if(s.day>=6)s.par=clamp(s.par+Math.floor(4+Math.random()*8));if(s.day>=13)s.par=clamp(s.par+Math.floor(5+Math.random()*10));}
 function actions(){
   const el=$('lpActions991');el.innerHTML='';
   if(s.day===20){button('Run to your apartment',()=>ending());return;}
   const j=jobs[(s.day+Math.floor(s.seed*7))%jobs.length];
   button('🧹 '+j[0]+'  +$'+j[1],()=>{if(s.worked)return;s.worked=true;s.money+=j[1];s.food=clamp(s.food-j[2]);s.water=clamp(s.water-j[3]);if(s.day>5)s.par=clamp(s.par+3);log('You finish the job. The payment arrives instantly.');render();},s.worked);
   const fp=price(7),wp=price(4),meal=price(11);
   button('🥪 Buy food  $'+fp,()=>{if(s.money<fp)return log('Not enough money.'),render();s.money-=fp;s.food=clamp(s.food+32);s.ate=true;log('You eat quickly. The room feels too quiet.');render();});
   button('🥤 Buy fluids  $'+wp,()=>{if(s.money<wp)return log('Not enough money.'),render();s.money-=wp;s.water=clamp(s.water+38);s.drank=true;log('The bottle machine thanks you by name.');render();});
   button('🍽️ Diner meal  $'+meal,()=>{if(s.money<meal)return log('Not enough money.'),render();s.money-=meal;s.food=clamp(s.food+45);s.water=clamp(s.water+15);s.ate=s.drank=true;s.par=clamp(s.par+(s.day>10?4:-2));log(s.day>10?'Every table is set. None are occupied.':'You sit beneath humming fluorescent lights.');render();});
   button('🌙 End day / sleep',nextDay);
 }
 function button(label,fn,disabled=false){const b=document.createElement('button');b.className='lpBtn991';b.textContent=label;b.disabled=disabled;b.onclick=fn;$('lpActions991').appendChild(b)}
 function nextDay(){
   consume();
   if(s.food<=0||s.water<=0){$('lpNarrative991').textContent=s.food<=0?'You are too weak to stand. You never reach the truth.':'Your vision tunnels. Dehydration wins before the city gives up its secret.';$('lpActions991').innerHTML='';button('Restart',()=>{s=fresh();save();render()});return;}
   if(!s.ate)log('You went to sleep hungry.');if(!s.drank)log('Your mouth is painfully dry.');
   s.day++;s.worked=s.ate=s.drank=false;missingForDay();
   if(s.day===6)log('The news turns to static. Someone you know is missing.');
   if(s.day===13)log('Permanent twilight settles over the skyline.');
   if(s.day>=15&&Math.random()<.7)log('Footsteps follow you home. You never see who made them.');
   save();render();
 }
 function ending(){
   s.pop=0;save();$('lpEnding991').classList.add('show');$('lpEndingText991').textContent='There is no emergency cash. Only the notebook, an empty prescription bottle, and a single plate. The handwriting is yours. The missing citizens were never random to you. The city did not become empty around you—you emptied it, then erased yourself night after night. The room seems to contract as the memory returns.';
 }
 function registry(){const el=$('lpRegistry991');el.innerHTML='';NAMES.forEach(n=>{const d=document.createElement('div');d.textContent=n;d.className=s.missing.includes(n)?'lpMissing991':'';el.appendChild(d)})}
 function render(){
   s.pop=population();missingForDay();paranoiaClass();$('lpDay991').textContent=s.day+' / 20';$('lpMoney991').textContent=s.money;$('lpFood991').textContent=s.food;$('lpWater991').textContent=s.water;$('lpPar991').textContent=s.par;$('lpFoodBar991').style.width=s.food+'%';$('lpWaterBar991').style.width=s.water+'%';$('lpParBar991').style.width=s.par+'%';$('lpPhase991').textContent=phase();$('lpNarrative991').textContent=scene();$('lpLog991').textContent=s.log.join('\n\n');registry();actions();save();
 }
 function open(){load();$('lp991').classList.add('show');render();}
 $('lpExit991').onclick=()=>{$('lp991').classList.remove('show');document.documentElement.classList.remove('lpParanoiaLow991','lpParanoiaMed991','lpParanoiaHigh991')};
 $('lpRestart991').onclick=()=>{localStorage.removeItem('spacei_lonely_plates_991');s=fresh();$('lpEnding991').classList.remove('show');render()};
 window.openLonelyPlates991=open;
 function installGameButton(){
   const games=[...document.querySelectorAll('button,[role="button"],a')].filter(e=>/games/i.test((e.textContent||'').trim()));
   games.forEach(g=>{if(g.dataset.lp991)return;g.dataset.lp991='1';g.addEventListener('click',()=>setTimeout(()=>{
     if(document.getElementById('lpLaunch991'))return;
     const visible=[...document.querySelectorAll('div,section,main')].filter(e=>e.offsetParent!==null&&/game/i.test(e.textContent||'')).sort((a,b)=>a.getBoundingClientRect().width-b.getBoundingClientRect().width)[0];
     const host=visible||document.body;const card=document.createElement('button');card.id='lpLaunch991';card.className='lpGameCard991';card.style.cssText='display:block;width:min(92vw,520px);margin:16px auto;padding:18px;border-radius:16px;color:white;text-align:left';card.innerHTML='<b style="font-size:20px">🌆 LONELY PLATES</b><br><span style="opacity:.8">Psychological Survival Horror · 20-Day Descent</span>';card.onclick=open;host.appendChild(card);
   },150));});
 }
 new MutationObserver(installGameButton).observe(document.body,{childList:true,subtree:true});installGameButton();
})();
</script>`;

  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
