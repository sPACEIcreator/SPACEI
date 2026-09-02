export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  const html = await response.text();
  if (html.includes("spaceiCoreFixes902")) return new Response(html, response);

  const patch = String.raw`
<style id="spaceiCoreFixes902">
#spaceiCloudTool902{position:fixed;inset:0;z-index:2147482900;display:none;align-items:center;justify-content:center;padding:14px;background:#000b;backdrop-filter:blur(8px)}
#spaceiCloudTool902.show{display:flex}.sct902{width:min(94vw,700px);max-height:88dvh;overflow:auto;background:#091025;border:1px solid #304071;border-radius:20px;padding:16px;color:#fff}.sct902 textarea,.sct902 input{width:100%;margin:8px 0;background:#0d142c;color:#fff;border:1px solid #304071;border-radius:12px;padding:10px}.sct902 button{margin:5px 5px 5px 0}.sct902 img{max-width:100%;border-radius:14px;margin-top:10px}.sct902 pre{white-space:pre-wrap;word-break:break-word;background:#07101f;padding:12px;border-radius:12px}.spaceiBusy902{opacity:.7;pointer-events:none}
/* Performance: avoid expensive blur on low-power/mobile screens */
@media(max-width:700px){.overlay,#spaceiCloudTool902{backdrop-filter:none!important}.sheet{box-shadow:none!important}.hfxBalloon841{animation-duration:14s!important}}
</style>
<div id="spaceiCloudTool902"><div class="sct902"><button id="sctClose902">← Back</button><h2 id="sctTitle902">SPACEI Cloud Tool</h2><div id="sctBody902"></div></div></div>
<script id="spaceiCoreFixes902">
(()=>{
const $=id=>document.getElementById(id);
const CREATOR='SPACEPUG created SPACEI, with development help from Spruce.';
localStorage.removeItem('spacei_local_ai_enabled_0876');
const status=$('aiStatus');if(status)status.textContent='AI: SPACEI Cloud Brain';
const load=$('loadAiBtn');if(load){load.textContent='☁️ Cloud AI connected';load.onclick=()=>{if(window.toast)toast('SPACEI Cloud Brain is connected.')}}
window.enableSpaceiLocalAI876=async()=>true;

function esc902(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function addChat902(role,text){
 try{if(typeof messages!=='undefined'&&Array.isArray(messages)&&typeof renderChat==='function'){messages.push({role,text});localStorage.setItem('spacei_074_chat',JSON.stringify(messages));renderChat();return;}}catch(e){}
 const chat=$('chat');if(!chat)return;const d=document.createElement('div');d.className='msg '+role;d.innerHTML='<div class="bubble">'+esc902(text)+'</div>';chat.appendChild(d);chat.scrollTop=chat.scrollHeight;
}
function creatorQuestion902(t){return /(who|what person).*(created|made|built|owns?).*(spacei|website|site)|who.*(spacei|website).*(creator|developer)/i.test(t);}
function math902(raw){
 let s=raw.toLowerCase().replace(/what is|calculate|solve|equals|=/g,'').replace(/[×x]/g,'*').replace(/[÷]/g,'/').replace(/\^/g,'**').replace(/,/g,'').trim();
 if(!/[0-9]/.test(s)||!/^[0-9+\-*/().%\s*]+$/.test(s))return null;
 try{const v=Function('"use strict";return ('+s+')')();if(typeof v==='number'&&Number.isFinite(v))return String(Number.isInteger(v)?v:Number(v.toPrecision(12)));}catch(e){}return null;
}
async function sendCloud902(){
 const input=$('input');const t=input?.value.trim();if(!t)return;
 input.value='';addChat902('user',t);
 if(creatorQuestion902(t)){addChat902('assistant',CREATOR);return;}
 const m=math902(t);if(m!==null){addChat902('assistant',m);return;}
 addChat902('assistant','☁️ Thinking…');
 try{
  const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t})});const d=await r.json();
  try{if(typeof messages!=='undefined'&&Array.isArray(messages)&&messages[messages.length-1]?.text==='☁️ Thinking…'){messages[messages.length-1]={role:'assistant',text:d.text||d.error||'AI request failed.'};localStorage.setItem('spacei_074_chat',JSON.stringify(messages));renderChat();return;}}catch(e){}
  addChat902('assistant',d.text||d.error||'AI request failed.');
 }catch(e){addChat902('assistant','Could not reach the SPACEI Cloud Brain.');}
}
const send=$('sendBtn');if(send){send.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();sendCloud902();},true)}
const inp=$('input');if(inp){inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();e.stopImmediatePropagation();sendCloud902();}},true)}

const modal=$('spaceiCloudTool902'),body=$('sctBody902'),title=$('sctTitle902');$('sctClose902').onclick=()=>modal.classList.remove('show');
function openTool902(name,markup){title.textContent=name;body.innerHTML=markup;modal.classList.add('show');}
async function post902(url,payload,out){out.textContent='Working…';try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok)throw new Error(d.error||'Request failed');return d;}catch(e){out.textContent='Error: '+e.message;return null;}}
function fileData902(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});}

window.aiFeature804=function(type){
 const st=$('aiFeatureStatus804');
 if(type==='images'){
  openTool902('🖼️ Image Generation','<textarea id="imgPrompt902" rows="4" placeholder="Describe the image..."></textarea><button id="imgGo902">Generate Image</button><div id="imgOut902"></div>');
  $('imgGo902').onclick=async()=>{const out=$('imgOut902'),p=$('imgPrompt902').value.trim();if(!p)return out.textContent='Describe an image first.';const d=await post902('/api/image',{prompt:p,size:'1024x1024'},out);if(d?.image)out.innerHTML='<img alt="Generated image" src="'+d.image+'">';};return;
 }
 if(type==='web'){
  openTool902('🌐 Web Search','<textarea id="webPrompt902" rows="3" placeholder="What should SPACEI search for?"></textarea><button id="webGo902">Search</button><pre id="webOut902"></pre>');
  $('webGo902').onclick=async()=>{const out=$('webOut902'),p=$('webPrompt902').value.trim();if(!p)return out.textContent='Enter a search first.';const d=await post902('/api/web-search',{prompt:p},out);if(d?.text)out.textContent=d.text;};return;
 }
 if(type==='vision'){
  openTool902('👁️ Image Understanding','<input id="visFile902" type="file" accept="image/*"><textarea id="visPrompt902" rows="2" placeholder="Ask something about the image..."></textarea><button id="visGo902">Analyze Image</button><pre id="visOut902"></pre>');
  $('visGo902').onclick=async()=>{const out=$('visOut902'),f=$('visFile902').files[0];if(!f)return out.textContent='Choose an image first.';const image=await fileData902(f),p=$('visPrompt902').value.trim();const d=await post902('/api/vision',{image,prompt:p||'Describe this image.'},out);if(d?.text)out.textContent=d.text;};return;
 }
 if(type==='files'){
  openTool902('📄 File Analysis','<input id="file902" type="file"><textarea id="filePrompt902" rows="2" placeholder="What should SPACEI do with this file?"></textarea><button id="fileGo902">Analyze File</button><pre id="fileOut902"></pre>');
  $('fileGo902').onclick=async()=>{const out=$('fileOut902'),f=$('file902').files[0];if(!f)return out.textContent='Choose a file first.';if(f.size>7500000)return out.textContent='That file is too large for this beta.';const fileData=await fileData902(f),p=$('filePrompt902').value.trim();const d=await post902('/api/file-analyze',{fileData,filename:f.name,prompt:p||'Analyze and summarize this file.'},out);if(d?.text)out.textContent=d.text;};return;
 }
 if(['chat','code','games','memory','study','writing','summarize','translate','math','safety'].includes(type)){
   if(st)st.textContent='☁️ '+type+' now uses SPACEI Cloud Brain.';if(typeof closeAIFeatures804==='function')closeAIFeatures804();$('input')?.focus();return;
 }
 if(st)st.textContent='That feature is not connected yet.';
};

/* Make Credits and creator identity agree everywhere. */
const credits=$('creditsPage808');if(credits){credits.innerHTML=credits.innerHTML.replace(/Created by <b>[^<]+<\/b>/,'Created by <b>SPACEPUG</b>').replace(/Development help from <b>[^<]+<\/b>/,'Development help from <b>Spruce</b>');}
})();
</script>`;

  const output = html.includes("</body>") ? html.replace("</body>", patch + "</body>") : html + patch;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(output, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
