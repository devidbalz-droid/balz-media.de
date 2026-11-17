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

  // Karussells: Pfeile, Punkte, Wischen
  document.querySelectorAll('.carousel').forEach(function(c){
    var tr=c.querySelector('.track'),items=[].slice.call(tr.children),
        pv=c.querySelector('.prev'),nx=c.querySelector('.next'),dots=c.querySelector('.dots');
    function step(){return items[0].getBoundingClientRect().width+parseFloat(getComputedStyle(tr).columnGap||20)}
    function idx(){return Math.round(tr.scrollLeft/step())}
    function max(){return tr.scrollWidth-tr.clientWidth-2}
    if(dots){items.forEach(function(_,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Zu Karte '+(i+1));
      b.onclick=function(){tr.scrollTo({left:i*step(),behavior:'smooth'})};dots.appendChild(b)})}
    function upd(){
      if(pv)pv.disabled=tr.scrollLeft<4;
      if(nx)nx.disabled=tr.scrollLeft>=max();
      if(dots){var i=tr.scrollLeft>=max()?items.length-1:idx();[].forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===i)})}
      var hide=tr.scrollWidth<=tr.clientWidth+4;
      if(dots)dots.style.display=hide?'none':'';var ctl=c.querySelector('.car-ctrl');if(ctl)ctl.style.visibility=hide?'hidden':'';
    }
    if(pv)pv.onclick=function(){tr.scrollBy({left:-step(),behavior:'smooth'})};
    if(nx)nx.onclick=function(){tr.scrollBy({left:step(),behavior:'smooth'})};
    tr.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
    addEventListener('resize',upd);upd();
  });
})();
