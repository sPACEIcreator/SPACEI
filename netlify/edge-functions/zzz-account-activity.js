export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (html.includes("spaceiAccountActivity1004")) return new Response(html, response);

  const patch = String.raw\`
<style id="spaceiAccountActivity1004">
#spaceiActivityBtn1004{display:none}
#spaceiActivity1004{position:fixed;inset:0;z-index:50000;background:#050817;color:#fff;display:none;overflow:auto;padding:14px}
#spaceiActivity1004.show{display:block}
.spaCard1004{max-width:900px;margin:0 auto;background:#090f25;border:1px solid #344477;border-radius:20px;padding:16px}
.spaRow1004{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.spaInput1004{flex:1;min-width:180px;background:#0d142c;color:#fff;border:1px solid #304071;border-radius:11px;padding:10px}
.spaEvent1004{background:#101832;border:1px solid #304071;border-radius:13px;padding:10px;margin:7px 0}
.spaEvent1004 b{display:block}.spaMeta1004{font-size:12px;color:#9da8c7;margin-top:3px}
</style>
<button id="spaceiActivityBtn1004" type="button">📋 Account Activity</button>
<section id="spaceiActivity1004">
  <div class="spaCard1004">
    <div class="spaRow1004"><button id="spaceiActivityClose1004" type="button">← Back</button><h2 style="margin:0">📋 Account Activity</h2></div>
    <p class="small">Creator/dev-only server activity. It records successful SPACEI account registrations and account sessions.</p>
    <label>Creator / Dev security code</label>
    <div class="spaRow1004"><input id="spaceiActivityCode1004" class="spaInput1004" type="password" autocomplete="off" placeholder="Enter creator/dev code"><button id="spaceiActivityLoad1004" type="button">Unlock</button></div>
    <div id="spaceiActivityStatus1004" class="small" style="margin-top:8px"></div>
    <div id="spaceiActivityList1004" style="margin-top:12px"></div>
  </div>
</section>
<script id="spaceiAccountActivity1004">
(()=>{
 if(window.spaceiAccountActivity1004)return;
 window.spaceiAccountActivity1004=true;
 const $=id=>document.getElementById(id);
 const esc=s=>{const d=document.createElement("div");d.textContent=String(s??"");return d.innerHTML};
 const username=()=>{for(const k of ["spacei_profile_074","spacei_profile_076","spacei_profile_077"]){try{const o=JSON.parse(localStorage.getItem(k)||"{}");if(o.username)return o.username}catch{}}return""};
 const isCreatorOrDev=()=>/oreopuggy\\s*\\(dev\\/creator\\)|spruce/i.test(username());
 const btn=$("spaceiActivityBtn1004"),panel=$("spaceiActivity1004");
 if(isCreatorOrDev())btn.style.display="inline-block";
 btn.onclick=()=>panel.classList.add("show");
 $("spaceiActivityClose1004").onclick=()=>panel.classList.remove("show");
 $("spaceiActivityLoad1004").onclick=async()=>{
   const code=$("spaceiActivityCode1004").value;
   if(!code)return;
   $("spaceiActivityStatus1004").textContent="Checking…";
   try{
     const r=await fetch("/api/spacei-social?action=activity",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({code})});
     const d=await r.json().catch(()=>({}));
     if(!r.ok)throw new Error(d.error||"Access denied");
     $("spaceiActivityStatus1004").textContent=d.events.length+" activity events";
     $("spaceiActivityList1004").innerHTML=d.events.length?d.events.map(e=>'<div class="spaEvent1004"><b>'+esc(e.type==="signed_up"?"🟢 Signed up":"🔵 Logged in")+' — '+esc(e.displayName||"SPACEI User")+'</b><div class="spaMeta1004">'+esc(e.handle||"")+' · '+esc(new Date(e.time).toLocaleString())+'</div></div>').join(""):'<div class="small">No activity yet.</div>';
   }catch(e){$("spaceiActivityStatus1004").textContent=e.message}
 };
 async function logLogin(){
   const h=localStorage.getItem("spacei_permanent_handle");
   if(!h||sessionStorage.getItem("spacei_login_activity_sent"))return;
   try{
     const r=await fetch("/api/spacei-social?action=login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({handle:h})});
     if(r.ok)sessionStorage.setItem("spacei_login_activity_sent","1");
   }catch{}
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(logLogin,700),{once:true});
 else setTimeout(logLogin,700);
})();
</script>\`;
  html = html.includes("</body>") ? html.replace("</body>", patch + "</body>") : html + patch;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {status:response.status,statusText:response.statusText,headers});
};
export const config = { path: "/" };
