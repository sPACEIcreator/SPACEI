// Redeploy trigger: re-publish current SPACEI updates without changing behavior.
export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  html = html.split("SPΛCEI").join("SPΛCΞI");

  const addon = String.raw`
<script id="spaceiBrandNormalizer">
(()=>{
  const from='SPΛCEI', to='SPΛCΞI';
  const fixNode=node=>{
    if(node.nodeType===Node.TEXT_NODE){
      if(node.nodeValue&&node.nodeValue.includes(from)) node.nodeValue=node.nodeValue.split(from).join(to);
      return;
    }
    if(node.nodeType!==Node.ELEMENT_NODE)return;
    for(const a of node.attributes||[]){
      if(a.value&&a.value.includes(from)) node.setAttribute(a.name,a.value.split(from).join(to));
    }
    for(const child of node.childNodes) fixNode(child);
  };
  const run=()=>fixNode(document.documentElement);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  new MutationObserver(muts=>{
    for(const m of muts){
      if(m.type==='characterData')fixNode(m.target);
      for(const n of m.addedNodes)fixNode(n);
    }
  }).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();
</script>`;

  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
};

export const config={path:"/"};
