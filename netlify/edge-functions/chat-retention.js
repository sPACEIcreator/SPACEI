export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  let html = await response.text();
  const addon = `
<script id="spaceiChatRetention1d">
(()=>{
 const DAY=86400000, NOW=Date.now();
 const isChatKey=k=>/chat|message|conversation|inbox|thread|history/i.test(k)&&!/setting|theme|device/i.test(k);
 function clean(storage){
  const removals=[];
  for(let i=0;i<storage.length;i++){
   const k=storage.key(i); if(!k||!isChatKey(k))continue;
   try{
    const raw=storage.getItem(k), v=JSON.parse(raw);
    const prune=x=>{
     if(Array.isArray(x))return x.filter(item=>{
      if(!item||typeof item!=='object')return true;
      const t=Number(item.timestamp||item.time||item.createdAt||item.created_at||item.date||0);
      return !t||NOW-t<DAY;
     }).map(prune);
     if(x&&typeof x==='object')for(const p in x)x[p]=prune(x[p]);
     return x;
    };
    const out=prune(v); storage.setItem(k,JSON.stringify(out));
   }catch{
    const stamp=Number(storage.getItem(k+'__spacei_saved_at')||0);
    if(stamp&&NOW-stamp>=DAY)removals.push(k);
   }
  }
  removals.forEach(k=>storage.removeItem(k));
 }
 try{clean(localStorage);clean(sessionStorage);localStorage.setItem('spacei_chat_retention_ms',String(DAY));}catch{}
 // Stamp future chat-like localStorage writes so even older unstructured chat data can expire.
 try{
  const set=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){const r=set.call(this,k,v);if(this===localStorage&&isChatKey(String(k))&&!String(k).endsWith('__spacei_saved_at'))set.call(this,String(k)+'__spacei_saved_at',String(Date.now()));return r};
 }catch{}
})();
</script>`;
  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers); headers.delete("content-length");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
};
export const config={path:"/"};
