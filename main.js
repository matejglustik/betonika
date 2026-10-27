const $=s=>document.querySelector(s),esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
fetch('content/site.json').then(r=>r.json()).then(d=>{
  document.title=`${d.company} – Stavebná firma`;
  $('#logo').textContent=d.company;$('#f-name').textContent=d.company;$('#yr').textContent=new Date().getFullYear();
  $('#h-eyebrow').textContent=d.hero.eyebrow;$('#h-text').textContent=d.hero.text;$('#h-cta').textContent=d.hero.cta;
  const t=$('#h-title');t.setAttribute('aria-label',d.hero.title);
  t.innerHTML=d.hero.title.split(' ').map((w,i)=>`<span class="w" aria-hidden="true"><i style="--i:${i}">${esc(w)}</i></span>`).join(' ');
  $('#marquee').innerHTML=[...d.services,...d.services].map(s=>`<span>${esc(s.title)}</span>`).join('').repeat(2);
  $('#stats').innerHTML=d.stats.map((s,i)=>`<div class="rv" style="--d:${i*.1}s"><div class="num"><span data-to="${+s.value}">0</span>${esc(s.suffix)}</div><p>${esc(s.label)}</p></div>`).join('');
  $('#services').innerHTML=d.services.map((s,i)=>`<article class="card rv" style="--d:${(i%2)*.12}s"><span class="n">0${i+1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('');
  $('#projects').innerHTML=d.projects.map((p,i)=>`<article class="proj rv" style="--d:${(i%3)*.1}s">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`:''}<div><small>${esc(p.type)} · ${esc(p.year)}</small><h3>${esc(p.title)}</h3></div></article>`).join('');
  $('#steps').insertAdjacentHTML('beforeend',d.process.map((s,i)=>`<div class="step rv"><b>${i+1}</b><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join(''));
  $('#quotes').innerHTML=d.testimonials.map((q,i)=>`<blockquote class="q rv" style="--d:${i*.12}s"><p>${esc(q.text)}</p><footer><strong>${esc(q.name)}</strong><small>${esc(q.role)}</small></footer></blockquote>`).join('');
  $('#c-title').textContent=d.cta.title;$('#c-text').textContent=d.cta.text;
  $('#info').innerHTML=[d.phone,d.email,d.address].map(x=>`<li>${esc(x)}</li>`).join('');
  init();
}).catch(()=>document.body.insertAdjacentHTML('afterbegin','<p style="padding:20px">Obsah sa nepodarilo načítať (spustite stránku cez server alebo Netlify).</p>'));

function init(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
    e.target.querySelectorAll('[data-to]').forEach(n=>{const to=+n.dataset.to,t0=performance.now();
      (function f(t){const p=Math.min((t-t0)/1800,1);n.textContent=Math.round(to*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(f)})(t0)})}),{threshold:.18});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
  const hdr=$('#top'),bar=$('#progress'),line=$('#line'),steps=$('#steps');
  const onScroll=()=>{const y=scrollY;hdr.classList.toggle('s',y>60);
    bar.style.transform=`scaleX(${y/(document.documentElement.scrollHeight-innerHeight)})`;
    const r=steps.getBoundingClientRect(),p=Math.min(Math.max((innerHeight*.6-r.top)/r.height,0),1);line.style.height=p*100+'%';
    steps.querySelectorAll('.step').forEach(s=>s.classList.toggle('in',s.getBoundingClientRect().top<innerHeight*.6))};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const g=$('#glow');$('#hero').addEventListener('mousemove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
  document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',x*6+'deg');c.style.setProperty('--rx',-y*6+'deg')});
    c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
}
