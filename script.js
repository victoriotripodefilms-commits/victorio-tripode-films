const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

const reviews = document.querySelector('.reviews');
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');
const dots = document.querySelector('.review-dots');

function cardStep() {
  if (!reviews) return 0;
  const card = reviews.querySelector('.review');
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(reviews).columnGap || getComputedStyle(reviews).gap || 0);
  return card.getBoundingClientRect().width + gap;
}
function updateDots() {
  if (!reviews || !dots) return;
  const step = cardStep();
  if (!step) return;
  const index = Math.round(reviews.scrollLeft / step);
  [...dots.children].forEach((d,i)=>d.classList.toggle('active', i===index));
}
if (reviews && dots) {
  const count = reviews.querySelectorAll('.review').length;
  for (let i=0;i<count;i++) {
    const d=document.createElement('span');
    if(i===0)d.className='active';
    dots.appendChild(d);
  }
  reviews.addEventListener('scroll', () => requestAnimationFrame(updateDots));
  prev?.addEventListener('click', ()=> reviews.scrollBy({left:-cardStep(),behavior:'smooth'}));
  next?.addEventListener('click', ()=> reviews.scrollBy({left:cardStep(),behavior:'smooth'}));
}

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nombre = data.get('nombre') || '';
  const telefono = data.get('telefono') || '';
  const evento = data.get('evento') || '';
  const fecha = data.get('fecha') || '';
  const lugar = data.get('lugar') || '';
  const invitados = data.get('invitados') || '';
  const mensaje = data.get('mensaje') || '';
  const text = `Hola Victorio, soy ${nombre}.\nTeléfono: ${telefono}\nTipo de evento: ${evento}\nFecha: ${fecha || 'A definir'}\nLugar: ${lugar || 'A definir'}\nInvitados: ${invitados || 'A definir'}\n\n${mensaje}`;
  window.open(`https://wa.me/5493534769631?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
