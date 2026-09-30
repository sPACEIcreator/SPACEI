export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("spaceiMasterUpdatesFixed1005")) return new Response(html, response);

  const addon = String.raw`
<style id="spaceiMasterUpdatesFixed1005">
#spaceiPlus1005{min-width:46px!important;font-size:22px!important;font-weight:800!important}
#spaceiMenu1005{position:fixed;inset:0;z-index:15000;display:none;background:#000b;align-items:flex-end;justify-content:center;padding:12px}
#spaceiMenu1005.show{display:flex}
#spaceiSheet1005{width:min(720px,96vw);max-height:88vh;overflow:auto;background:#090f25;border:1px solid #344477;border-radius:22px;padding:16px;color:#fff}
.s1005grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px;margin-top:12px}
.s1005tool{min-height:62px;text-align:left;background:#101832;border:1px solid #304071;border-radius:15px;padding:10px;color:#fff}
.s1005tool strong{display:block}.s1005tool span{display:block;color:#9da8c7;font-size:11px;margin-top:3px}
.s1005result{margin-top:12px}.s1005sources{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:10px}
.s1005source{display:block;color:#fff;text-decoration:none;background:#101832;border:1px solid #304071;border-radius:13px;padding:10px}
</style>
<div id="spaceiMenu1005" aria-hidden="true"><div id="spaceiSheet1005">
<div style="display:flex;align-items:center;gap:8px"><strong id="spaceiTitle1005" style="font-size:19px">＋ AI Tools</strong><button id="spaceiClose1005" type="button" style="margin-left:auto">✕</button></div>
<div id="spaceiGrid1005" class="s1005grid"></div><div id="spaceiResult1005" class="s1005result"></div>
</div></div>
<script id="spaceiMasterUpdatesFixed1005">
(()=>{if(window.spaceiMasterUpdatesFixed1005)return;window.spaceiMasterUpdatesFixed1005=true;
const $=s=>document.querySelector(s),menu=$("#spaceiMenu1005"),grid=$("#spaceiGrid1005"),out=$("#spaceiResult1005");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const post=(u,b)=>fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}).then(async r=>{const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.error||"Request failed");return d});
const pick=accept=>new Promise(resolve=>{const i=document.createElement("input");i.type="file";i.accept=accept||"*/*";i.onchange=()=>resolve(i.files&&i.files[0]||null);i.click()});
const read=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result));r.onerror=rej;r.readAsDataURL(f)});
const result=(title,msg)=>{out.innerHTML='<div class="card"><strong>'+esc(title)+'</strong><div style="white-space:pre-wrap;margin-top:8px">'+esc(msg)+'</div></div>'};
const ask=t=>{const x=prompt(t);return x&&x.trim()?x.trim():""};
const ai=[["🖼️","Create Image"],["✏️","Edit Image"],["🔎","Analyze Image"],["🎥","Upload Video"],["📄","Upload File"],["📷","Take Photo"],["🎤","Voice"],["🌐","Web Search"],["💻","Code"],["📊","Data Analysis"],["📝","Writing"],["🧠","Deep Research"],["📁","Saved Files"],["🎵","AI Music"],["🤖","Commands"],["🛡️","SAI Security"],["🚫","Anti-Doxxing"],["🤝","Trusted Friend"],["🔔","Notifications"],["👤","Profile"]];
const dm=[["🖼️","Images"],["🎥","Videos"],["📄","Files"],["🎵","Audio"],["📷","Camera"]];
const isDM=()=>{const e=$("#imPage");return !!e&&getComputedStyle(e).display!=="none"&&!e.classList.contains("hidden")};
function openMenu(){menu.classList.add("show");menu.setAttribute("aria-hidden","false");out.innerHTML="";grid.innerHTML="";const list=isDM()?dm:ai;$("#spaceiTitle1005").textContent=isDM()?"＋ DM Attachments":"＋ AI Tools";list.forEach(([ico,n])=>{const b=document.createElement("button");b.type="button";b.className="s1005tool";b.innerHTML="<strong>"+ico+" "+n+"</strong><span>"+(isDM()?"Attachment":"SPACEI tool")+"</span>";b.onclick=()=>run(n);grid.appendChild(b)})}
function closeMenu(){menu.classList.remove("show");menu.setAttribute("aria-hidden","true")}
async function run(n){
 try{
  if(["Images","Videos","Files","Audio"].includes(n)){const f=await pick(n==="Images"?"image/*":n==="Videos"?"video/*":n==="Audio"?"audio/*":"*/*");if(f)result(n+" ready",f.name);return}
  if(n==="Create Image"){const p=ask("What should SPACEI create?");if(!p)return;result("🖼️ Create Image","Creating…");const d=await post("/api/image",{prompt:p});out.innerHTML='<div class="card"><strong>🖼️ Generated image</strong><img src="'+esc(d.image||"")+'" style="max-width:100%;border-radius:14px;margin-top:8px" alt="AI generated image"></div>';return}
  if(n==="Analyze Image"){const f=await pick("image/*");if(!f)return;const d=await post("/api/vision",{prompt:"Describe this image and answer useful questions about it.",image:await read(f)});result("🔎 Image analysis",d.text||"No analysis returned.");return}
  if(n==="Upload File"){const f=await pick("*/*");if(!f)return;const data=await read(f);const d=await post("/api/file-analyze",{prompt:"Analyze and summarize this file.",filename:f.name,fileData:data});try{localStorage.setItem("spacei:lastFile",JSON.stringify({name:f.name,data:data}))}catch{}result("📄 File analysis",d.text||"No analysis returned.");return}
  if(n==="Upload Video"){const f=await pick("video/*");if(!f)return;result("🎥 Video analysis","Preparing a preview frame…");const u=URL.createObjectURL(f),v=document.createElement("video");v.src=u;v.muted=true;v.playsInline=true;await new Promise((a,b)=>{v.onloadeddata=a;v.onerror=b});v.currentTime=Math.min(1,v.duration||1);await new Promise(r=>setTimeout(r,300));const c=document.createElement("canvas"),w=Math.min(720,v.videoWidth||720);c.width=w;c.height=Math.round(w*(v.videoHeight||405)/(v.videoWidth||720));c.getContext("2d").drawImage(v,0,0,c.width,c.height);URL.revokeObjectURL(u);const d=await post("/api/vision",{prompt:"Analyze this video preview frame. Clearly state that this is frame-level analysis, not full-video understanding.",image:c.toDataURL("image/jpeg",.82)});result("🎥 Video analysis",d.text||"No analysis returned.");return}
  if(n==="Take Photo"){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){result("📷 Camera","Camera access is unavailable in this browser.");return}const s=await navigator.mediaDevices.getUserMedia({video:true}),v=document.createElement("video");v.autoplay=true;v.playsInline=true;v.srcObject=s;out.innerHTML="";out.append(v);const b=document.createElement("button");b.type="button";b.textContent="Capture";b.onclick=async()=>{const c=document.createElement("canvas");c.width=v.videoWidth||720;c.height=v.videoHeight||540;c.getContext("2d").drawImage(v,0,0,c.width,c.height);s.getTracks().forEach(t=>t.stop());const d=await post("/api/vision",{prompt:"Describe this photo.",image:c.toDataURL("image/jpeg",.85)});result("📷 Photo analysis",d.text||"No analysis returned.")};out.append(b);return}
  if(n==="Voice"){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){result("🎤 Voice","Speech recognition is not supported in this browser.");return}const r=new SR();r.onresult=e=>{const input=$("#input");if(input)input.value=e.results[0][0].transcript};r.start();result("🎤 Voice","Listening…");return}
  if(n==="Web Search"||n==="Deep Research"||n==="AI Music"){const p=ask(n==="AI Music"?"What music should I search for?":n==="Deep Research"?"What should I research?":"What should I search for?");if(!p)return;const d=await post("/api/web-search",{prompt:n==="Deep Research"?"Research this thoroughly and summarize with sources: "+p:p});result("🌐 "+n,d.text||"No result returned.");return}
  if(["Code","Data Analysis","Writing","Commands","SAI Security"].includes(n)){const p=ask(n+" request");if(!p)return;const prefix={Code:"Act as a coding assistant. ", "Data Analysis":"Analyze this data carefully. ", Writing:"Write or rewrite this naturally. ", Commands:"Interpret this as a SPACEI command. ", "SAI Security":"Analyze only information the user provides. "}[n];const d=await post("/api/chat",{message:prefix+p});result(n,d.text||"No result returned.");return}
  if(n==="Anti-Doxxing"){const p=ask("Paste what you plan to post.");if(!p)return;const hit=/\\b\\d{1,5}\\s+[A-Za-z0-9.'-]+\\s+(street|st|road|rd|avenue|ave|drive|dr|lane|ln|boulevard|blvd)\\b|\\b\\d{3}[-.\\s]\\d{3}[-.\\s]\\d{4}\\b|\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b/i.test(p);result("🚫 Anti-Doxxing",hit?"Potential private information detected.":"No obvious address, phone, or email pattern detected.");return}
  if(n==="Edit Image"){result("✏️ Edit Image","The current image endpoint supports generation and analysis; direct image-edit input still needs a dedicated edit endpoint.");return}
  if(n==="Saved Files"){let x="";try{x=localStorage.getItem("spacei:lastFile")||""}catch{}result("📁 Saved Files",x?"A saved file exists on this device.":"No saved file found on this device.");return}
  if(n==="Trusted Friend"){result("🤝 Trusted Friend","The interface is present; persistent mutual verification still requires the safety backend.");return}
  if(n==="Notifications"||n==="Profile"){const b=[...document.querySelectorAll("button")].find(x=>new RegExp(n,"i").test(x.textContent||""));if(b)b.click();else result(n,"The existing "+n.toLowerCase()+" area is not exposed on this screen.");return}
 }catch(e){result(n,e&&e.message||"Tool failed")}}
$("#spaceiClose1005").onclick=closeMenu;menu.onclick=e=>{if(e.target===menu)closeMenu()};
function install(){if($("#spaceiPlus1005"))return;const row=$("#composer .composeRow")||$("#composer");if(!row)return;const b=document.createElement("button");b.id="spaceiPlus1005";b.type="button";b.textContent="＋";b.title="SPACEI AI tools and DM attachments";b.onclick=openMenu;row.insertBefore(b,row.firstChild)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});
})();</script>`;
  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
};

export const config = { path: "/" };
