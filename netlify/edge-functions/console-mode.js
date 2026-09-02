export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  let html = await response.text();
  const addon = `
<style id="spaceiConsoleModeStyle">
html.spacei-console *:focus{outline:4px solid #fff!important;outline-offset:4px!important}
html.spacei-console button,html.spacei-console [role="button"],html.spacei-console a,html.spacei-console input,html.spacei-console textarea,html.spacei-console select{min-height:52px}
html.spacei-console button,html.spacei-console [role="button"],html.spacei-console a{font-size:max(16px,1em)}
html.spacei-console #bottomNav button{min-width:92px;min-height:64px}
html.spacei-console #composer{padding-bottom:max(10px,env(safe-area-inset-bottom))}
#spaceiConsoleToast{position:fixed;left:50%;top:18px;transform:translateX(-50%);z-index:2147483000;background:#090d20;color:white;border:1px solid #6d7cff;border-radius:14px;padding:10px 16px;font:600 14px system-ui;display:none;box-shadow:0 8px 30px #0008}
@media (min-width:1000px){html.spacei-console body{font-size:18px}html.spacei-console .small{font-size:14px!important}}
</style>
<div id="spaceiConsoleToast">🎮 Console Mode</div>
<script id="spaceiConsoleModeScript">
(()=>{
 const root=document.documentElement, toast=document.getElementById('spaceiConsoleToast');
 let active=false,lastButtons=[],lastMove=0;
 const focusable=()=>[...document.querySelectorAll('button:not([disabled]),a[href],[role="button"],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'});
 function enable(){if(active)return;active=true;root.classList.add('spacei-console');localStorage.setItem('spacei_console_mode','yes');if(toast){toast.style.display='block';setTimeout(()=>toast.style.display='none',1800)}const els=focusable();if(els.length&&!els.includes(document.activeElement))els[0].focus({preventScroll:true});}
 function nearest(dir){const els=focusable();if(!els.length)return;let cur=document.activeElement;if(!els.includes(cur)){els[0].focus();return}const a=cur.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2;let best=null,score=Infinity;for(const e of els){if(e===cur)continue;const b=e.getBoundingClientRect(),bx=b.left+b.width/2,by=b.top+b.height/2,dx=bx-ax,dy=by-ay;if((dir==='l'&&dx>=-4)||(dir==='r'&&dx<=4)||(dir==='u'&&dy>=-4)||(dir==='d'&&dy<=4))continue;const primary=(dir==='l'||dir==='r')?Math.abs(dx):Math.abs(dy),cross=(dir==='l'||dir==='r')?Math.abs(dy):Math.abs(dx),s=primary+cross*2.2;if(s<score){score=s;best=e}}if(best){best.focus({preventScroll:true});best.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'})}}
 function back(){const el=document.activeElement;if(el&&['INPUT','TEXTAREA','SELECT'].includes(el.tagName)){el.blur();return}const backs=[...document.querySelectorAll('button')].filter(b=>/back|close|cancel|←/i.test(b.textContent||'')&&b.offsetParent!==null);if(backs.length)backs[backs.length-1].click();}
 function press(i,fn,gp){if(gp.buttons[i]?.pressed&&!lastButtons[i])fn();}
 function loop(){const gp=navigator.getGamepads?.()[0];if(gp){enable();press(0,()=>document.activeElement?.click(),gp);press(1,back,gp);press(12,()=>nearest('u'),gp);press(13,()=>nearest('d'),gp);press(14,()=>nearest('l'),gp);press(15,()=>nearest('r'),gp);press(4,()=>window.scrollBy({top:-innerHeight*.65,behavior:'smooth'}),gp);press(5,()=>window.scrollBy({top:innerHeight*.65,behavior:'smooth'}),gp);const now=performance.now(),x=gp.axes[0]||0,y=gp.axes[1]||0;if(now-lastMove>180){if(x<-.65){nearest('l');lastMove=now}else if(x>.65){nearest('r');lastMove=now}else if(y<-.65){nearest('u');lastMove=now}else if(y>.65){nearest('d');lastMove=now}}lastButtons=gp.buttons.map(b=>b.pressed)}requestAnimationFrame(loop)}
 addEventListener('gamepadconnected',enable);if(localStorage.getItem('spacei_console_mode')==='yes')root.classList.add('spacei-console');requestAnimationFrame(loop);
 window.SPACEIConsoleMode={enable,disable(){active=false;root.classList.remove('spacei-console');localStorage.removeItem('spacei_console_mode')}};
})();
</script>`;
  html = html.includes("</body>") ? html.replace("</body>", addon + "</body>") : html + addon;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: "/" };
