// Balz Media – gemeinsames Skript für alle Seiten
(function(){
  var root=document.documentElement;
  root.classList.remove('no-js');

  // Hell/Dunkel umschalten (Auswahl bleibt im Browser gespeichert)
  var t=document.getElementById('theme');
  if(t)t.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);
    try{localStorage.setItem('bm-theme',n)}catch(e){}
  });

  // Mobiles Menü
  var mb=document.getElementById('menu'),mn=document.getElementById('mnav');
  if(mb&&mn)mb.addEventListener('click',function(){
    var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o);
  });

  // Linie unter dem Header beim Scrollen
  var h=document.querySelector('header');
  function sc(){if(h)h.classList.toggle('scrolled',scrollY>8)}
  addEventListener('scroll',sc,{passive:true});sc();

  // Sanftes Einblenden
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else els.forEach(function(e){e.classList.add('in')});

  // Karussells: Pfeile, Zähler, Fortschritt, Wischen
  document.querySelectorAll('.carousel').forEach(function(c){
    var tr=c.querySelector('.track'),items=[].slice.call(tr.children),
        pv=c.querySelector('.prev'),nx=c.querySelector('.next'),
        cnt=c.querySelector('.count'),bar=c.querySelector('.bar i'),ctl=c.querySelector('.car-ctrl'),barW=c.querySelector('.bar');
    function step(){return items[0].getBoundingClientRect().width+parseFloat(getComputedStyle(tr).columnGap||20)}
    function max(){return tr.scrollWidth-tr.clientWidth-2}
    function pad(n){return (n<10?'0':'')+n}
    function upd(){
      var m=max(),vis=Math.max(1,Math.round(tr.clientWidth/step())),pages=Math.max(1,items.length-vis+1);
      var i=tr.scrollLeft>=m?pages:Math.min(pages,Math.round(tr.scrollLeft/step())+1);
      if(pv)pv.disabled=tr.scrollLeft<4;
      if(nx)nx.disabled=tr.scrollLeft>=m;
      if(cnt)cnt.textContent=pad(i)+' / '+pad(pages);
      if(bar)bar.style.width=(i/pages*100)+'%';
      var hide=tr.scrollWidth<=tr.clientWidth+4;
      if(ctl)ctl.style.visibility=hide?'hidden':'';if(barW)barW.style.display=hide?'none':'';
    }
    if(pv)pv.onclick=function(){tr.scrollBy({left:-step(),behavior:'smooth'})};
    if(nx)nx.onclick=function(){tr.scrollBy({left:step(),behavior:'smooth'})};
    tr.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
    addEventListener('resize',upd);upd();
  });

  // Videos: automatisch abspielen, aber nur wenn sichtbar
  document.querySelectorAll('.showreel,.hero-film').forEach(function(box){
    var v=box.querySelector('video');if(!v)return;
    var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(still){v.removeAttribute('autoplay');v.pause()}
    if('IntersectionObserver' in window&&!still){
      new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.25}).observe(v);
    }
  });
})();
