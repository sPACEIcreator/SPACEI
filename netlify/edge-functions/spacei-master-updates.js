export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  let html = await response.text();
  if (html.includes("spaceiMasterUpdates1002")) return new Response(html, response);

  const addon = String.raw\`
<style id="spaceiMasterUpdates1002">
#spaceiPlus1002{min-width:46px!important;font-size:22px!important;font-weight:800!important}
#spaceiMenu1002{position:fixed;inset:0;z-index:15000;display:none;background:#000b;align-items:flex-end;justify-content:center;padding:12px}
#spaceiMenu1001.show{display:flex}
#spaceiSheet1002{width:min(720px,96vw);max-height:88vh;overflow:auto;background:#090f25;border:1px solid #344477;border-radius:22px;padding:16px}
.s1002grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px;margin-top:12px}
.s1002tool{min-height:62px;text-align:left;background:#101832;border:1px solid #304071;border-radius:15px;padding:10px;color:#fff}
.s1002tool strong{display:block}.s1002tool span{display:block;color:#9da8c7;font-size:11px;margin-top:3px}
.s1002result{margin-top:12px}.s1002sources{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:10px}
.s1002source{display:block;color:#fff;text-decoration:none;background:#101832;border:1px solid #304071;border-radius:13px;padding:10px}
.s1002logo{width:30px;height:30px;border-radius:8px;background:#202b50;display:grid;place-items:center;font-weight:800;margin-bottom:7px}
.s1002domain{font-size:11px;color:#9da8c7}
</style>
<div id="spaceiMenu1001" aria-hidden="true"><div id="spaceiSheet1001">
<div style="display:flex;align-items:center;gap:8px"><strong id="spaceiTitle1002" style="font-size:19px">＋ AI Tools</strong><button id="spaceiClose1002" type="button" style="margin-left:auto">✕</button></div>
<div id="spaceiGrid1002" class="s1002grid"></div><div id="spaceiResult1002" class="s1002result"></div>
</div></div>
<script id="spaceiMasterUpdates1002">
(()=>{if(window.spaceiMasterUpdates1002)return;window.spaceiMasterUpdates1002=true;
const $=s=>document.querySelector(s), menu=$("#spaceiMenu1001"),grid=$("#spaceiGrid1001"),out=$("#spaceiResult1001");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const post=(u,b)=>fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}).then(async r=>{const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.error||"Request failed");return d});
const pick=accept=>new Promise(resolve=>{const i=document.createElement("input");i.type="file";i.accept=accept||"*/*";i.onchange=()=>resolve(i.files?.[0]||null);i.click()});
const read=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result));r.onerror=rej;r.readAsDataURL(f)});
const result=(title,text)=>out.innerHTML='<div class="card"><strong>'+esc(title)+'</strong><div style="white-space:pre-wrap;margin-top:8px">'+esc(text)+'</div></div>';
const promptFor=t=>{const x=prompt(t);return x&&x.trim()?x.trim():""};
const ai=[["🖼️","Create Image"],["✏️","Edit Image"],["🔎","Analyze Image"],["🎥","Upload Video"],["📄","Upload File"],["📷","Take Photo"],["🎤","Voice"],["🌐","Web Search"],["💻","Code"],["📊","Data Analysis"],["📝","Writing"],["🧠","Deep Research"],["📁","Saved Files"],["🎵","AI Music"],["🤖","Commands"],["🛡️","SAI Security"],["🚫","Anti-Doxxing"],["🤝","Trusted Friend"],["🔔","Notifications"],["👤","Profile"]];
const dm=[["🖼️","Images"],["🎥","Videos"],["📄","Files"],["🎵","Audio"],["📷","Camera"]];
const isDM=()=>{const e=$("#imPage");return !!e&&getComputedStyle(e).display!=="none"&&!e.classList.contains("hidden")};
function open(){menu.classList.add("show");menu.setAttribute("aria-hidden","false");out.innerHTML="";grid.innerHTML="";const list=isDM()?dm:ai;$("#spaceiTitle1001").textContent=isDM()?"＋ DM Attachments":"＋ AI Tools";list.forEach(([ico,n])=>{const b=document.createElement("button");b.type="button";b.className="s1002tool";b.innerHTML="<strong>"+ico+" "+n+"</strong><span>"+(isDM()?"Send this type":"SPACEI tool")+"</span>";b.onclick=()=>run(n);grid.appendChild(b)})}
function close(){menu.classList.remove("show");menu.setAttribute("aria-hidden","true")}
async function run(n){
try{
if(["Images","Videos","Files","Audio"].includes(n)){const f=await pick(n==="Images"?"image/*":n==="Videos"?"video/*":n==="Audio"?"audio/*":"*/*");if(f)out.innerHTML='<div class="notice"><strong>'+esc(n)+' ready</strong><div class="small">'+esc(f.name)+'</div><p>This attachment is selected for the DM workflow.</p></div>';return}
if(n==="Create Image"){const p=promptFor("What should SPACEI create?");if(!p)return;out.innerHTML='<div class="notice">Creating image…</div>';const d=await post("/api/image",{prompt:p});out.innerHTML='<div class="card"><strong>🖼️ Generated image</strong><img src="'+esc(d.image)+'" style="max-width:100%;border-radius:14px;margin-top:8px" alt="AI generated image"></div>';return}
if(n==="Analyze Image"){const f=await pick("image/*");if(!f)return;const d=await post("/api/vision",{prompt:"Describe this image and answer useful questions about it.",image:await read(f)});result("🔎 Image analysis",d.text);return}
if(n==="Upload File"){const f=await pick("*/*");if(!f)return;const d=await post("/api/file-analyze",{prompt:"Analyze and summarize this file.",filename:f.name,fileData:await read(f)});result("📄 File analysis",d.text);localStorage.setItem("spacei:lastFile",JSON.stringify({name:f.name,data:await read(f)}));return}
if(n==="Upload Video"){const f=await pick("video/*");if(!f)return;const u=URL.createObjectURL(f),v=document.createElement("video");v.src=u;v.muted=true;v.playsInline=true;await new Promise((a,b)=>{v.onloadeddata=a;v.onerror=b});v.currentTime=Math.min(1,v.duration||1);await new Promise(r=>setTimeout(r,350));const c=document.createElement("canvas"),w=Math.min(720,v.videoWidth||720);c.width=w;c.height=Math.round(w*(v.videoHeight||405)/(v.videoWidth||720));c.getContext("2d").drawImage(v,0,0,c.width,c.height);URL.revokeObjectURL(u);const d=await post("/api/vision",{prompt:"Analyze this video preview frame. Clearly state that this is frame-level analysis, not full-video understanding.",image:c.toDataURL("image/jpeg",.82)});result("🎥 Video analysis",d.text);return}
if(n==="Take Photo"){if(!navigator.mediaDevices?.getUserMedia){result("📷 Camera","Camera access is unavailable in this browser.");return}const s=await navigator.mediaDevices.getUserMedia({video:true}),v=document.createElement("video");v.autoplay=true;v.playsInline=true;v.srcObject=s;out.innerHTML="";out.append(v);const b=document.createElement("button");b.textContent="Capture";b.onclick=async()=>{const c=document.createElement("canvas");c.width=v.videoWidth||720;c.height=v.videoHeight||540;c.getContext("2d").drawImage(v,0,0,c.width,c.height);s.getTracks().forEach(t=>t.stop());const d=await post("/api/vision",{prompt:"Describe this photo.",image:c.toDataURL("image/jpeg",.85)});result("📷 Photo analysis",d.text)};out.append(b);return}
if(n==="Voice"){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){result("🎤 Voice","Speech recognition is not supported in this browser.");return}const r=new SR();r.onresult=e=>{const t=e.results[0][0].transcript,input=$("#input");if(input)input.value=t};r.start();result("🎤 Voice","Listening…");return}
if(n==="Web Search"||n==="Deep Research"||n==="AI Music"){const p=promptFor(n==="AI Music"?"What song should I find?":n==="Deep Research"?"What should I research?":"What should I search for?");if(!p)return;const q=n==="Deep Research"?"Research this thoroughly and summarize with sources: "+p:p;const d=await post("/api/web-search",{prompt:q});const cards=(d.sources||[]).map(s=>{try{const u=new URL(s.url),dom=u.hostname.replace(/^www\\./,"");return '<a class="s1002source" href="'+esc(u.href)+'" target="_blank" rel="noopener"><div class="s1002logo">'+esc(dom.slice(0,2).toUpperCase())+'</div><strong>'+esc(s.title||dom)+'</strong><div class="s1002domain">'+esc(dom)+'</div></a>'}catch{return""}}).join("");out.innerHTML='<div class="card"><strong>🌐 '+esc(n)+'</strong><div style="white-space:pre-wrap;margin-top:8px">'+esc(d.text)+'</div>'+(cards?'<div class="s1002sources">'+cards+"</div>":"")+"</div>";return}
if(["Code","Data Analysis","Writing","Commands","SAI Security"].includes(n)){const p=promptFor(n+" request");if(!p)return;const prefix={Code:"Act as a coding assistant. ", "Data Analysis":"Analyze this data carefully. ",Writing:"Write or rewrite this naturally. ",Commands:"Interpret this as a SPACEI command and explain what can safely be done. ", "SAI Security":"You are SAI, a user-directed security assistant. Only analyze information the user provides; never claim access to private chats or hidden data. "}[n];const d=await post("/api/chat",{message:prefix+p});result(n,d.text);return}
if(n==="Anti-Doxxing"){const p=promptFor("Paste what you plan to post.");if(!p)return;const hit=/\\b\\d{1,5}\\s+[A-Za-z0-9.'-]+\\s+(street|st|road|rd|avenue|ave|drive|dr|lane|ln|boulevard|blvd)\\b|\\b\\d{3}[-.\\s]\\d{3}[-.\\s]\\d{4}\\b|\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b/i.test(p);result("🚫 Anti-Doxxing",hit?"Potential private information detected. Review it before posting.":"No obvious address, phone, or email pattern detected.");return}
if(n==="Edit Image"){result("✏️ Edit Image","The current image backend can generate images and analyze images, but it does not yet accept an image-edit operation directly. The edit workflow needs a dedicated image-edit endpoint.");return}
if(n==="Saved Files"){const x=localStorage.getItem("spacei:lastFile");result("📁 Saved Files",x?"A saved file exists on this device.":"No saved file found on this device.");return}
if(n==="Trusted Friend"){result("🤝 Trusted Friend","The TFCA interface can be added, but mutual verification and platform violation records require the persistent safety backend before this can be a real trust decision.");return}
if(n==="Notifications"||n==="Profile"){const b=[...document.querySelectorAll("button")].find(x=>new RegExp(n,"i").test(x.textContent||""));if(b)b.click();else result(n,"The existing SPACEI "+n.toLowerCase()+" area is not exposed on this screen.");return}
}catch(e){result(n,e.message||"Tool failed")}}
document.getElementById("spaceiClose1001").onclick=close;menu.onclick=e=>{if(e.target===menu)close()};
function install(){if($("#spaceiPlus1002"))return;const row=$("#composer .composeRow")||$("#composer");if(!row)return;const b=document.createElement("button");b.id="spaceiPlus1002";b.type="button";b.textContent="＋";b.title="SPACEI AI tools and DM attachments";b.onclick=open;row.insertBefore(b,row.firstChild)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});
})();</script>\`;
  html = html.includes("
<style id="spaceiAccessibility1002">
body.spacei-adhd1002{letter-spacing:.025em;line-height:1.6}body.spacei-adhd1002 button,body.spacei-adhd1002 input,body.spacei-adhd1002 textarea{letter-spacing:.02em}
body.spacei-dyslexia1002{letter-spacing:.055em;line-height:1.7}body.spacei-dyslexia1002 *{font-family:"Trebuchet MS",Arial,sans-serif!important}
#spaceiAccess1002{position:fixed;right:14px;bottom:86px;z-index:14999;border:1px solid #40528b;background:#101832;color:#fff;border-radius:14px;padding:10px 12px;font-weight:800;box-shadow:0 4px 18px #0006}
#spaceiAccessSheet1002{position:fixed;inset:0;z-index:15001;display:none;background:#000b;align-items:flex-end;justify-content:center;padding:12px}#spaceiAccessSheet1002.show{display:flex}#spaceiAccessCard1002{width:min(520px,96vw);background:#090f25;border:1px solid #344477;border-radius:22px;padding:16px}#spaceiAccessCard1002 button{min-height:46px;margin:4px;padding:10px 13px;border-radius:12px;border:1px solid #304071;background:#101832;color:#fff}
</style>
<div id="spaceiAccessSheet1002" aria-hidden="true"><div id="spaceiAccessCard1002"><div style="display:flex;align-items:center;gap:8px"><strong style="font-size:19px">♿ Accessibility & Fonts</strong><button id="spaceiAccessClose1002" type="button" style="margin-left:auto">✕</button></div><p style="color:#9da8c7">Choose a reading style. Your choice stays on this device.</p><div><button data-font1002="default">✨ Default SPACEI</button><button data-font1002="adhd">🧠 ADHD / ADD friendly</button><button data-font1002="dyslexia">📖 Dyslexia friendly</button></div></div></div>
<script id="spaceiAccessibilityScript1002">(()=>{if(window.spaceiAccessibility1002)return;window.spaceiAccessibility1002=true;const sheet=document.getElementById("spaceiAccessSheet1002"),close=document.getElementById("spaceiAccessClose1002");function apply(v){document.body.classList.remove("spacei-adhd1002","spacei-dyslexia1002");if(v==="adhd")document.body.classList.add("spacei-adhd1002");if(v==="dyslexia")document.body.classList.add("spacei-dyslexia1002");try{localStorage.setItem("spacei:font",v)}catch{}}try{apply(localStorage.getItem("spacei:font")||"default")}catch{}document.querySelectorAll("[data-font1002]").forEach(b=>b.onclick=()=>{apply(b.dataset.font1002);sheet.classList.remove("show");sheet.setAttribute("aria-hidden","true")});close.onclick=()=>{sheet.classList.remove("show");sheet.setAttribute("aria-hidden","true")};const open=()=>{sheet.classList.add("show");sheet.setAttribute("aria-hidden","false")};const install=()=>{if(document.getElementById("spaceiAccess1002"))return;const b=document.createElement("button");b.id="spaceiAccess1002";b.type="button";b.textContent="Aa";b.title="Accessibility & fonts";b.onclick=open;document.body.appendChild(b)};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true})})();</script>
</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};
export const config = { path: "/" };
