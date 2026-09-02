export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  const html = await response.text();
  if (html.includes("spaceiHolidayBtn841")) return new Response(html, response);

  const layer = String.raw`
<style id="spaceiHolidayStyles841">
#spaceiHolidayBtn841{position:fixed;right:14px;bottom:14px;z-index:2147483000;width:50px;height:50px;border-radius:16px;border:1px solid rgba(180,120,255,.75);background:rgba(14,8,28,.9);color:#fff;font-size:24px;box-shadow:0 0 18px rgba(155,76,255,.45);backdrop-filter:blur(12px)}
#spaceiHolidayPanel841{position:fixed;inset:0;z-index:2147483001;display:none;background:rgba(2,2,8,.78);backdrop-filter:blur(12px);padding:18px;overflow:auto;color:#fff;font-family:Arial,sans-serif}
#spaceiHolidayPanel841.open{display:block}#spaceiHolidayCard841{max-width:900px;margin:4vh auto;background:linear-gradient(180deg,#130a26,#080612);border:1px solid #66458c;border-radius:24px;box-shadow:0 24px 80px #000;padding:18px}
#spaceiHolidayTop841{display:flex;align-items:center;gap:10px;margin-bottom:14px}#spaceiHolidayTop841 h2{margin:0;flex:1;font-size:22px}#spaceiHolidayClose841{border:1px solid #705597;background:#1b1130;color:#fff;border-radius:12px;padding:9px 12px}
#spaceiHolidayGrid841{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:12px}.holidayItem841{border:1px solid #49355f;border-radius:18px;padding:12px;background:#0c0914;cursor:pointer}.holidayTitle841{font-weight:800;margin-bottom:5px}.holidayDate841,.holidayCountdown841{font-size:12px;color:#bda9d2}.holidayCountdown841{color:#e2c7ff;margin-top:4px}
#holidayPreviewBar841{position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147482999;display:none;gap:8px;align-items:center;background:rgba(8,6,17,.9);border:1px solid #7450a0;border-radius:999px;padding:8px 11px;color:#fff;font:12px Arial,sans-serif;backdrop-filter:blur(9px)}#holidayPreviewBar841.show{display:flex}#holidayPreviewBar841 button{border:1px solid #66507e;background:#1d1430;color:#fff;border-radius:999px;padding:6px 9px}
#holidayFx841{position:fixed;inset:0;pointer-events:none;z-index:2147482000;overflow:hidden;display:none}#holidayFx841.active{display:block}#holidayTint841{position:absolute;inset:0;opacity:0;mix-blend-mode:screen}
.hfxSnow841{position:absolute;top:-30px;color:#fff;animation:hfxFall841 linear infinite;text-shadow:0 0 5px #fff}@keyframes hfxFall841{to{transform:translateY(115vh) rotate(260deg)}}
.hfxLight841{position:absolute;width:8px;height:8px;border-radius:50%;box-shadow:0 0 12px currentColor;animation:hfxBlink841 1.4s ease-in-out infinite alternate}@keyframes hfxBlink841{to{opacity:.35;transform:scale(.75)}}
.hfxBalloon841{position:absolute;bottom:-150px;width:48px;height:62px;border-radius:50% 50% 46% 46%;animation:hfxBalloonRise841 linear infinite;box-shadow:inset -8px -10px 14px #0003,0 0 16px #fff2}.hfxBalloon841:before{content:"";position:absolute;left:20px;bottom:-8px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:10px solid currentColor}.hfxBalloon841:after{content:"";position:absolute;left:24px;top:62px;width:1px;height:90px;background:#ffffffaa;transform-origin:top;animation:hfxString841 2s ease-in-out infinite alternate}@keyframes hfxBalloonRise841{0%{transform:translateY(0) translateX(0) rotate(-3deg)}50%{transform:translateY(-60vh) translateX(20px) rotate(3deg)}100%{transform:translateY(-125vh) translateX(-12px) rotate(-2deg)}}@keyframes hfxString841{to{transform:rotate(6deg)}}
#holidayFx841[data-theme="halloween"] #holidayTint841{opacity:.15;background:radial-gradient(circle at 50% 40%,#ff6a00,transparent 58%)}#holidayFx841[data-theme="pride"] #holidayTint841{opacity:.07;background:linear-gradient(90deg,#f00,#ff0,#0f0,#0cf,#70f)}#holidayFx841[data-theme="mental"] #holidayTint841{opacity:.1;background:radial-gradient(circle at 50% 50%,#55d5ff,transparent 68%)}#holidayFx841[data-theme="unity"] #holidayTint841{opacity:.08;background:linear-gradient(90deg,#9e68ff,#fff,#57b7ff)}
@media(max-width:600px){#spaceiHolidayBtn841{right:10px;bottom:118px}#spaceiHolidayCard841{margin:1vh auto}.hfxBalloon841{width:38px;height:50px}.hfxBalloon841:after{top:50px}}
</style>
<button id="spaceiHolidayBtn841" aria-label="SPACEI Calendar">📅</button>
<div id="spaceiHolidayPanel841" aria-hidden="true"><div id="spaceiHolidayCard841"><div id="spaceiHolidayTop841"><h2>SPACEI Calendar</h2><button id="spaceiHolidayClose841">CLOSE</button></div><div style="font-size:13px;color:#c9b7dd;margin-bottom:15px">Holiday decorations are layered over the OG starter. The starter itself stays unchanged.</div><div id="spaceiHolidayGrid841"></div></div></div>
<div id="holidayPreviewBar841"><span id="holidayPreviewName841">Holiday Preview</span><button id="holidayPreviewExit841">EXIT PREVIEW</button></div>
<div id="holidayFx841"><div id="holidayTint841"></div></div>
<script id="spaceiHolidayScript841">
(()=>{const $=id=>document.getElementById(id),panel=$("spaceiHolidayPanel841"),grid=$("spaceiHolidayGrid841"),fx=$("holidayFx841"),bar=$("holidayPreviewBar841");if(!panel||!grid||!fx)return;
const now=new Date();const y=now.getFullYear();
function nthWeekday(year,month,weekday,nth){const f=new Date(year,month,1),s=(weekday-f.getDay()+7)%7;return new Date(year,month,1+s+(nth-1)*7)}
function easter(year){const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31)-1,da=((h+l-7*m+114)%31)+1;return new Date(year,mo,da)}
const events=[
{name:"New Year’s Day",m:0,d:1,type:"newyear"},{name:"Valentine’s Day",m:1,d:14,type:"valentine"},{name:"International Women’s Day",m:2,d:8,type:"unity"},{name:"Easter",date:easter(y),type:"easter",move:"easter"},{name:"SPACEI Men & Women Unity Day",m:3,d:18,type:"unity",original:true},{name:"Mental Health Awareness Month",m:4,d:1,type:"mental",month:true},{name:"Mother’s Day",date:nthWeekday(y,4,0,2),type:"mothers",move:"mother"},{name:"Pride Month",m:5,d:1,type:"pride",month:true},{name:"Men’s Mental Health Month",m:5,d:1,type:"mental",month:true},{name:"Father’s Day",date:nthWeekday(y,5,0,3),type:"fathers",move:"father"},{name:"Independence Day",m:6,d:4,type:"july4"},{name:"SPACEI Birthday",m:7,d:26,type:"birthday"},{name:"Women’s Equality Day",m:7,d:26,type:"unity"},{name:"Spruce Birthday",m:8,d:2,type:"birthday"},{name:"Your Birthday",m:8,d:29,type:"birthday"},{name:"Halloween",m:9,d:31,type:"halloween"},{name:"International Men’s Day",m:10,d:19,type:"unity"},{name:"Thanksgiving",date:nthWeekday(y,10,4,4),type:"thanks",move:"thanksgiving"},{name:"Christmas Day",m:11,d:25,type:"christmas"},{name:"New Year’s Eve",m:11,d:31,type:"newyear"}
];
function dateFor(ev,year){if(ev.move==="easter")return easter(year);if(ev.move==="mother")return nthWeekday(year,4,0,2);if(ev.move==="father")return nthWeekday(year,5,0,3);if(ev.move==="thanksgiving")return nthWeekday(year,10,4,4);return new Date(year,ev.m,ev.d)}
function nextDate(ev){let d=dateFor(ev,y),today=new Date(y,now.getMonth(),now.getDate());if(d<today&&!ev.month)d=dateFor(ev,y+1);return d}
function days(d){const a=new Date(y,now.getMonth(),now.getDate()),b=new Date(d.getFullYear(),d.getMonth(),d.getDate());return Math.round((b-a)/86400000)}
function clearFx(){[...fx.querySelectorAll(".hfxSnow841,.hfxLight841,.hfxBalloon841")].forEach(n=>n.remove());fx.dataset.theme="";fx.classList.remove("active");bar.classList.remove("show")}
function snow(){for(let i=0;i<55;i++){const s=document.createElement("span");s.className="hfxSnow841";s.textContent=Math.random()>.55?"❄":"•";s.style.left=Math.random()*100+"vw";s.style.fontSize=8+Math.random()*16+"px";s.style.opacity=.35+Math.random()*.6;s.style.animationDuration=5+Math.random()*8+"s";s.style.animationDelay=-Math.random()*10+"s";fx.appendChild(s)}}
function lights(){const c=["#ff4d68","#65ff80","#ffd84d","#66b7ff","#cf6cff"];for(let i=0;i<32;i++){const l=document.createElement("i");l.className="hfxLight841";l.style.color=c[i%c.length];l.style.background="currentColor";l.style.left=3+i*3.05+"vw";l.style.top=5+Math.sin(i*.7)*2+"vh";l.style.animationDelay=(i%5)*.17+"s";fx.appendChild(l)}}
function balloons(){const c=["#b14cff","#6c7cff","#ff5ca8","#55d6ff","#ffd45d","#76ff9b"];for(let i=0;i<18;i++){const b=document.createElement("i");b.className="hfxBalloon841";b.style.left=2+Math.random()*94+"vw";b.style.background=c[i%c.length];b.style.color=c[i%c.length];b.style.animationDuration=8+Math.random()*7+"s";b.style.animationDelay=-Math.random()*12+"s";fx.appendChild(b)}}
function apply(ev,preview=true){clearFx();fx.classList.add("active");fx.dataset.theme=ev.type;if(preview){bar.classList.add("show");$("holidayPreviewName841").textContent="PREVIEW • "+ev.name}if(ev.type==="birthday")balloons();else if(ev.type==="christmas"){snow();lights()}else if(ev.type==="pride"||ev.type==="unity"||ev.type==="newyear"||ev.type==="july4")lights();else if(ev.type==="mental")snow();else if(ev.type==="halloween"){}else lights()}
const sorted=events.map(e=>({...e,next:nextDate(e)})).sort((a,b)=>a.next-b.next);sorted.forEach(ev=>{const d=days(ev.next),item=document.createElement("div");item.className="holidayItem841";item.innerHTML='<div class="holidayTitle841">'+(ev.type==="birthday"?"🎈 ":"")+ev.name+(ev.original?" • SPACEI Original":"")+'</div><div class="holidayDate841">'+ev.next.toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})+'</div><div class="holidayCountdown841">'+(d===0?"TODAY":d===1?"Tomorrow":d+" days away")+' • tap to preview</div>';item.onclick=()=>{apply(ev,true);panel.classList.remove("open")};grid.appendChild(item)});
$("spaceiHolidayBtn841").onclick=()=>panel.classList.add("open");$("spaceiHolidayClose841").onclick=()=>panel.classList.remove("open");$("holidayPreviewExit841").onclick=clearFx;
const todayM=now.getMonth(),todayD=now.getDate();const birthday=events.find(e=>e.type==="birthday"&&e.m===todayM&&e.d===todayD);if(birthday)apply(birthday,false);else{const exact=events.find(e=>!e.month&&dateFor(e,y).getMonth()===todayM&&dateFor(e,y).getDate()===todayD);if(exact)apply(exact,false);else{const monthEvent=events.find(e=>e.month&&e.m===todayM);if(monthEvent)apply(monthEvent,false)}}
})();
</script>`;

  const output = html.includes("</body>") ? html.replace("</body>", layer + "</body>") : html + layer;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(output, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
