export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  const html = await response.text();
  if (html.includes("spaceiHolidayTab841")) return new Response(html, response);

  const layer = String.raw`
<style id="spaceiHolidayStyles841">
#spaceiHolidayPanel841{position:fixed;inset:0;z-index:2147483001;display:none;background:rgba(2,2,8,.78);backdrop-filter:blur(12px);padding:18px;overflow:auto;color:#fff;font-family:Arial,sans-serif}
#spaceiHolidayPanel841.open{display:block}#spaceiHolidayCard841{max-width:900px;margin:4vh auto;background:linear-gradient(180deg,#130a26,#080612);border:1px solid #66458c;border-radius:24px;box-shadow:0 24px 80px #000;padding:18px}
#spaceiHolidayTop841{display:flex;align-items:center;gap:10px;margin-bottom:14px}#spaceiHolidayTop841 h2{margin:0;flex:1;font-size:22px}#spaceiHolidayClose841{border:1px solid #705597;background:#1b1130;color:#fff;border-radius:12px;padding:9px 12px}
#spaceiHolidayGrid841{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:12px}.holidayItem841{border:1px solid #49355f;border-radius:18px;padding:12px;background:#0c0914;cursor:pointer}.holidayTitle841{font-weight:800;margin-bottom:5px}.holidayDate841,.holidayCountdown841{font-size:12px;color:#bda9d2}.holidayCountdown841{color:#e2c7ff;margin-top:4px}
#spaceiHolidayTab841{border:0;background:transparent;border-radius:0;padding:7px 3px;color:#fff}
#spaceiHolidayTab841 .small{display:block;font-size:10px;color:inherit}
#holidayPreviewBar841{position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147482999;display:none;gap:8px;align-items:center;background:rgba(8,6,17,.9);border:1px solid #7450a0;border-radius:999px;padding:8px 11px;color:#fff;font:12px Arial,sans-serif;backdrop-filter:blur(9px)}#holidayPreviewBar841.show{display:flex}#holidayPreviewBar841 button{border:1px solid #66507e;background:#1d1430;color:#fff;border-radius:999px;padding:6px 9px}
#holidayFx841{position:fixed;inset:0;pointer-events:none;z-index:2147482000;overflow:hidden;display:none}#holidayFx841.active{display:block}#holidayTint841{position:absolute;inset:0;opacity:0;mix-blend-mode:screen}
.hfxSnow841{position:absolute;top:-30px;color:#fff;animation:hfxFall841 linear infinite;text-shadow:0 0 5px #fff}@keyframes hfxFall841{to{transform:translateY(115vh) rotate(260deg)}}
.hfxLight841{position:absolute;width:8px;height:8px;border-radius:50%;box-shadow:0 0 12px currentColor;animation:hfxBlink841 1.4s ease-in-out infinite alternate}@keyframes hfxBlink841{to{opacity:.35;transform:scale(.75)}}
#birthdayStarterFx841{position:absolute;inset:0;z-index:50;pointer-events:none;overflow:hidden;display:none}
#birthdayStarterFx841.show{display:block}
#birthdayStarterBanner841{position:absolute;left:50%;top:9%;transform:translateX(-50%);z-index:4;padding:10px 16px;border-radius:999px;background:rgba(12,7,27,.78);border:1px solid rgba(191,112,255,.85);box-shadow:0 0 22px rgba(171,76,255,.5);color:#fff;font:900 clamp(15px,4vw,22px) Arial,sans-serif;letter-spacing:.03em;text-align:center;white-space:nowrap}
.hfxBalloon841{position:absolute;bottom:-90px;width:34px;height:44px;border-radius:50% 50% 46% 46%;animation:hfxBalloonRise841 linear infinite;box-shadow:inset -7px -8px 12px #0003,0 0 12px #fff2}.hfxBalloon841:before{content:"";position:absolute;left:13px;bottom:-7px;border-left:4px solid transparent;border-right:4px solid transparent;border-top:8px solid currentColor}.hfxBalloon841:after{content:"";position:absolute;left:17px;top:44px;width:1px;height:55px;background:#ffffff99;transform-origin:top}@keyframes hfxBalloonRise841{0%{transform:translateY(0) translateX(0) rotate(-3deg)}50%{transform:translateY(-45vh) translateX(12px) rotate(3deg)}100%{transform:translateY(-90vh) translateX(-8px) rotate(-2deg)}}
#holidayFx841[data-theme="halloween"] #holidayTint841{opacity:.15;background:radial-gradient(circle at 50% 40%,#ff6a00,transparent 58%)}#holidayFx841[data-theme="pride"] #holidayTint841{opacity:.07;background:linear-gradient(90deg,#f00,#ff0,#0f0,#0cf,#70f)}#holidayFx841[data-theme="mental"] #holidayTint841{opacity:.1;background:radial-gradient(circle at 50% 50%,#55d5ff,transparent 68%)}#holidayFx841[data-theme="unity"] #holidayTint841{opacity:.08;background:linear-gradient(90deg,#9e68ff,#fff,#57b7ff)}
@media(max-width:600px){#spaceiHolidayCard841{margin:1vh auto}#birthdayStarterBanner841{top:7%;max-width:88vw;white-space:normal}}
</style>
<div id="spaceiHolidayPanel841" aria-hidden="true"><div id="spaceiHolidayCard841"><div id="spaceiHolidayTop841"><h2>SPACEI Calendar</h2><button id="spaceiHolidayClose841">CLOSE</button></div><div style="font-size:13px;color:#c9b7dd;margin-bottom:15px">Check dates, countdowns, birthdays, and holiday previews here.</div><div id="spaceiHolidayGrid841"></div></div></div>
<div id="holidayPreviewBar841"><span id="holidayPreviewName841">Holiday Preview</span><button id="holidayPreviewExit841">EXIT PREVIEW</button></div>
<div id="holidayFx841"><div id="holidayTint841"></div></div>
<script id="spaceiHolidayScript841">
(()=>{const $=id=>document.getElementById(id),panel=$("spaceiHolidayPanel841"),grid=$("spaceiHolidayGrid841"),fx=$("holidayFx841"),bar=$("holidayPreviewBar841");if(!panel||!grid||!fx)return;
const now=new Date();const y=now.getFullYear();
function nthWeekday(year,month,weekday,nth){const f=new Date(year,month,1),s=(weekday-f.getDay()+7)%7;return new Date(year,month,1+s+(nth-1)*7)}
function easter(year){const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31)-1,da=((h+l-7*m+114)%31)+1;return new Date(year,mo,da)}
const events=[
{name:"New Year’s Day",m:0,d:1,type:"newyear"},{name:"Valentine’s Day",m:1,d:14,type:"valentine"},{name:"International Women’s Day",m:2,d:8,type:"unity"},{name:"Easter",date:easter(y),type:"easter",move:"easter"},{name:"SPACEI Men & Women Unity Day",m:3,d:18,type:"unity",original:true},{name:"Mental Health Awareness Month",m:4,d:1,type:"mental",month:true},{name:"Mother’s Day",date:nthWeekday(y,4,0,2),type:"mothers",move:"mother"},{name:"Pride Month",m:5,d:1,type:"pride",month:true},{name:"Men’s Mental Health Month",m:5,d:1,type:"mental",month:true},{name:"Father’s Day",date:nthWeekday(y,5,0,3),type:"fathers",move:"father"},{name:"Independence Day",m:6,d:4,type:"july4"},{name:"SPACEI Birthday",m:7,d:26,type:"birthday",birthdayName:"SPACEI"},{name:"Women’s Equality Day",m:7,d:26,type:"unity"},{name:"Spruce Birthday",m:8,d:2,type:"birthday",birthdayName:"SPRUCE"},{name:"Your Birthday",m:8,d:29,type:"birthday",birthdayName:"YOUR"},{name:"Halloween",m:9,d:31,type:"halloween"},{name:"International Men’s Day",m:10,d:19,type:"unity"},{name:"Thanksgiving",date:nthWeekday(y,10,4,4),type:"thanks",move:"thanksgiving"},{name:"Christmas Day",m:11,d:25,type:"christmas"},{name:"New Year’s Eve",m:11,d:31,type:"newyear"}
];
function dateFor(ev,year){if(ev.move==="easter")return easter(year);if(ev.move==="mother")return nthWeekday(year,4,0,2);if(ev.move==="father")return nthWeekday(year,5,0,3);if(ev.move==="thanksgiving")return nthWeekday(year,10,4,4);return new Date(year,ev.m,ev.d)}
function nextDate(ev){let d=dateFor(ev,y),today=new Date(y,now.getMonth(),now.getDate());if(d<today&&!ev.month)d=dateFor(ev,y+1);return d}
function days(d){const a=new Date(y,now.getMonth(),now.getDate()),b=new Date(d.getFullYear(),d.getMonth(),d.getDate());return Math.round((b-a)/86400000)}
function clearFx(){[...fx.querySelectorAll(".hfxSnow841,.hfxLight841")].forEach(n=>n.remove());fx.dataset.theme="";fx.classList.remove("active");bar.classList.remove("show")}
function snow(){for(let i=0;i<55;i++){const s=document.createElement("span");s.className="hfxSnow841";s.textContent=Math.random()>.55?"❄":"•";s.style.left=Math.random()*100+"vw";s.style.fontSize=8+Math.random()*16+"px";s.style.opacity=.35+Math.random()*.6;s.style.animationDuration=5+Math.random()*8+"s";s.style.animationDelay=-Math.random()*10+"s";fx.appendChild(s)}}
function lights(){const c=["#ff4d68","#65ff80","#ffd84d","#66b7ff","#cf6cff"];for(let i=0;i<24;i++){const l=document.createElement("i");l.className="hfxLight841";l.style.color=c[i%c.length];l.style.background="currentColor";l.style.left=3+i*4+"vw";l.style.top=5+Math.sin(i*.7)*2+"vh";l.style.animationDelay=(i%5)*.17+"s";fx.appendChild(l)}}
function apply(ev,preview=true){clearFx();if(ev.type==="birthday"){if(preview){bar.classList.add("show");$("holidayPreviewName841").textContent="PREVIEW • "+ev.name}showBirthdayStarter(ev);return}fx.classList.add("active");fx.dataset.theme=ev.type;if(preview){bar.classList.add("show");$("holidayPreviewName841").textContent="PREVIEW • "+ev.name}if(ev.type==="christmas"){snow();lights()}else if(ev.type==="pride"||ev.type==="unity"||ev.type==="newyear"||ev.type==="july4")lights();else if(ev.type==="mental")snow();else if(ev.type==="halloween"){}else lights()}
function showBirthdayStarter(ev){let host=document.querySelector('#bootLogo841')?.parentElement||document.querySelector('[id*="boot"]')||document.body;if(getComputedStyle(host).position==='static')host.style.position='relative';let wrap=$("birthdayStarterFx841");if(wrap)wrap.remove();wrap=document.createElement('div');wrap.id='birthdayStarterFx841';wrap.className='show';const banner=document.createElement('div');banner.id='birthdayStarterBanner841';banner.textContent="IT'S "+(ev.birthdayName||ev.name.toUpperCase())+" BIRTHDAY 🎈";wrap.appendChild(banner);const c=["#b14cff","#6c7cff","#ff5ca8","#55d6ff","#ffd45d","#76ff9b"];for(let i=0;i<6;i++){const b=document.createElement('i');b.className='hfxBalloon841';b.style.left=(7+i*17)+"%";b.style.background=c[i%c.length];b.style.color=c[i%c.length];b.style.animationDuration=(9+i*.7)+"s";b.style.animationDelay=(-i*1.3)+"s";wrap.appendChild(b)}host.appendChild(wrap)}
const sorted=events.map(e=>({...e,next:nextDate(e)})).sort((a,b)=>a.next-b.next);sorted.forEach(ev=>{const d=days(ev.next),item=document.createElement("div");item.className="holidayItem841";item.innerHTML='<div class="holidayTitle841">'+(ev.type==="birthday"?"🎈 ":"")+ev.name+(ev.original?" • SPACEI Original":"")+'</div><div class="holidayDate841">'+ev.next.toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})+'</div><div class="holidayCountdown841">'+(d===0?"TODAY":d===1?"Tomorrow":d+" days away")+' • tap to preview</div>';item.onclick=()=>{apply(ev,true);panel.classList.remove("open")};grid.appendChild(item)});
function addCalendarTab(){const nav=document.getElementById('bottomNav');if(!nav||$("spaceiHolidayTab841"))return;const btn=document.createElement('button');btn.id='spaceiHolidayTab841';btn.innerHTML='<div>📅</div><span class="small">Calendar</span>';btn.onclick=()=>panel.classList.add('open');nav.appendChild(btn)}
addCalendarTab();setTimeout(addCalendarTab,800);$("spaceiHolidayClose841").onclick=()=>panel.classList.remove("open");$("holidayPreviewExit841").onclick=clearFx;
const todayM=now.getMonth(),todayD=now.getDate();const birthday=events.find(e=>e.type==="birthday"&&e.m===todayM&&e.d===todayD);if(birthday)setTimeout(()=>showBirthdayStarter(birthday),250);else{const exact=events.find(e=>!e.month&&dateFor(e,y).getMonth()===todayM&&dateFor(e,y).getDate()===todayD);if(exact)apply(exact,false);else{const monthEvent=events.find(e=>e.month&&e.m===todayM);if(monthEvent)apply(monthEvent,false)}}
})();
</script>`;

  const output = html.includes("</body>") ? html.replace("</body>", layer + "</body>") : html + layer;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(output, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
