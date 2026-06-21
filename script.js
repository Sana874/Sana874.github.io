/* SANA FIRDOUS PORTFOLIO JS */

/* ── NEURAL CANVAS ── */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let nodes = [], W, H;
function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  nodes = [];
  const n = Math.floor((W * H) / 13000);
  for (let i = 0; i < n; i++)
    nodes.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, r: Math.random()*1.8+.8 });
}
function draw() {
  ctx.clearRect(0,0,W,H);
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'#04050c'); g.addColorStop(1,'#080910');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  nodes.forEach(n => { n.x+=n.vx; n.y+=n.vy; if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1; });
  for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) {
    const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy);
    if(d<130){ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.strokeStyle=`rgba(212,175,100,${(1-d/130)*.22})`;ctx.lineWidth=.5;ctx.stroke();}
  }
  nodes.forEach(n=>{ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle='rgba(212,175,100,.5)';ctx.fill();});
  requestAnimationFrame(draw);
}
window.addEventListener('resize', resize);
resize(); draw();

/* ── ROLE TYPEWRITER ── */
const roles=['AI/ML Engineer','Computer Vision Researcher','Product Data Analyst','LLM Agent Builder','Software Engineer'];
let ri=0,ci=0,del=false;
const re=document.getElementById('role-text');
function typeRole(){
  if(!re)return;
  const cur=roles[ri];
  if(!del){re.textContent=cur.slice(0,ci+1);ci++;if(ci===cur.length){del=true;setTimeout(typeRole,1800);return;}}
  else{re.textContent=cur.slice(0,ci-1);ci--;if(ci===0){del=false;ri=(ri+1)%roles.length;}}
  setTimeout(typeRole,del?40:70);
}
setTimeout(typeRole,800);

/* ── NAME TYPEWRITER ── */
const tn=document.getElementById('typewriter-name');
const nm='Sana Firdous Abdul Kalam';
let ni=0;
function typeName(){if(!tn)return;if(ni<nm.length){tn.textContent+=nm[ni++];setTimeout(typeName,55);}}
setTimeout(typeName,400);

/* ── NAVBAR ── */
const nav=document.getElementById('nav');
const nls=document.querySelectorAll('.nav-links a');
const secs=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>60);
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-150)cur=s.id;});
  nls.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ── HAMBURGER ── */
const ham=document.getElementById('hamburger');
const nl=document.getElementById('navLinks');
let open=false;
ham.addEventListener('click',()=>{
  open=!open;
  if(open){Object.assign(nl.style,{display:'flex',flexDirection:'column',position:'fixed',
    top:'54px',right:'0',background:'rgba(8,9,16,.97)',border:'1px solid #1e2235',
    padding:'1.5rem',width:'200px',zIndex:'999',gap:'1.1rem',backdropFilter:'blur(18px)'});}
  else nl.style.display='';
});

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);}
}),{threshold:.09});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ── STAT COUNTERS ── */
function animCount(el,target,dur=1300){
  const dec=(String(target).split('.')[1]||'').length;
  let val=0;const step=target/(dur/16);
  const t=setInterval(()=>{val=Math.min(val+step,target);
    el.textContent=dec?val.toFixed(dec):Math.floor(val);if(val>=target)clearInterval(t);},16);
}
const so=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){
    document.querySelectorAll('.hs-n').forEach(el=>animCount(el,parseFloat(el.dataset.target)));
    so.disconnect();}});
},{threshold:.5});
const hsr=document.querySelector('.hero-stat-row');
if(hsr) so.observe(hsr);

/* ── SKILL BARS ── */
const sko=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) e.target.querySelectorAll('.sk-fill').forEach(b=>{b.style.width=b.dataset.w+'%';});
}),{threshold:.3});
document.querySelectorAll('.sk-card').forEach(el=>sko.observe(el));

/* ── VIEW MORE PROJECTS ── */
function toggleProjects() {
  const extras = document.querySelectorAll('.proj-extra');
  const btn = document.getElementById('viewMoreBtn');
  const hidden = extras[0].style.display === 'none';
  extras.forEach(el => {
    el.style.display = hidden ? 'flex' : 'none';
    el.style.flexDirection = hidden ? 'column' : '';
    if (hidden) setTimeout(()=>el.classList.add('in'), 50);
    else el.classList.remove('in');
  });
  btn.innerHTML = hidden
    ? '<i class="fa-solid fa-chevron-up"></i> Show Less'
    : '<i class="fa-solid fa-chevron-down"></i> View All 6 Projects';
}

/* ── CONTACT FORM ── */
const form=document.getElementById('contactForm');
form&&form.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=form.querySelector('button[type="submit"] span'),orig=btn.textContent;
  btn.textContent='Sending…';
  try{
    const r=await fetch('https://formspree.io/f/xvzynbeq',{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    btn.textContent=r.ok?'Sent ✓':'Error — try again';if(r.ok)form.reset();
  }catch{btn.textContent='Error — try again';}
  setTimeout(()=>{btn.textContent=orig;},3000);
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});
      if(open&&window.innerWidth<960){nl.style.display='';open=false;}}
  });
});