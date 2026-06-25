const datos = [
  { num: "365",     label: "días de amistad" },
  { num: "1",       label: "año que no se olvida" },
  { num: "8,760",   label: "horas de complicidad" },
  { num: "525,600", label: "minutos que valieron todo" }
];

let idx = 0;
const MAX = datos.length;

const bigNum    = document.getElementById('bigNum');
const numLabel  = document.getElementById('numLabel');
const btnNext   = document.getElementById('btnNext');
const dotsWrap  = document.getElementById('dots');

for (let i = 0; i < MAX; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  dotsWrap.appendChild(d);
}

bigNum.style.transition   = 'opacity 0.35s ease, transform 0.35s ease';
numLabel.style.transition = 'opacity 0.35s ease';

btnNext.addEventListener('click', () => {
  idx++;
  if (idx >= MAX) { goTo('screen-stats', 'screen-anime'); return; }

  bigNum.style.opacity    = '0';
  bigNum.style.transform  = 'translateY(10px)';
  numLabel.style.opacity  = '0';

  setTimeout(() => {
    bigNum.textContent   = datos[idx].num;
    numLabel.textContent = datos[idx].label;
    bigNum.style.opacity   = '1';
    bigNum.style.transform = 'translateY(0)';
    numLabel.style.opacity = '1';
    document.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === idx)
    );
    if (idx === MAX - 1) btnNext.textContent = 'Ver algo especial ♡';
  }, 320);
});

// ── Anime avatares (invertidos: anime_b = Tú, anime_a = Yo) ─
document.getElementById('animeA').src = FOTOS.anime_a;
document.getElementById('animeB').src = FOTOS.anime_b;

document.getElementById('btnVerFotos').addEventListener('click', () =>
  goTo('screen-anime', 'screen-fotos')
);

// ── Galería ──────────────────────────────────────────────
const galeria = [
  FOTOS.jess, FOTOS.img1, FOTOS.img2, FOTOS.img3,
  FOTOS.img4, FOTOS.img5, FOTOS.img7, FOTOS.img8, FOTOS.img9
];

const fotoGrid = document.getElementById('fotoGrid');

galeria.forEach((src, i) => {
  const wrap = document.createElement('div');
  wrap.className = 'foto-wrap';
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Recuerdo ' + (i + 1);
  wrap.appendChild(img);
  fotoGrid.appendChild(wrap);
});

// ── Botón Ver mensaje (delegado por si el elemento no estaba listo) ─
document.addEventListener('click', e => {
  if (e.target && e.target.id === 'btnVerMensaje') {
    goTo('screen-fotos', 'screen-msg');
  }
});

// ── Navegación ───────────────────────────────────────────
function goTo(fromId, toId) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.style.opacity       = '0';
  from.style.transform     = 'translateY(-20px)';
  from.style.pointerEvents = 'none';
  setTimeout(() => {
    from.classList.remove('active');
    from.style.opacity   = '';
    from.style.transform = '';
    to.classList.add('active');
  }, 600);
}

// ── Estrellas ────────────────────────────────────────────
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let W, H, stars = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 160; i++) {
  stars.push({
    x:  Math.random() * window.innerWidth,
    y:  Math.random() * window.innerHeight,
    r:  Math.random() * 1.2 + 0.3,
    a:  Math.random(),
    sp: Math.random() * 0.008 + 0.003
  });
}

function drawStars() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    s.a += s.sp;
    const alpha = ((Math.sin(s.a) + 1) / 2) * 0.7 + 0.1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ── Pétalos ──────────────────────────────────────────────
function makePetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.left = Math.random() * 100 + '%';
  const dur = 6 + Math.random() * 8;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay   = Math.random() * 4 + 's';
  p.style.opacity = 0.2 + Math.random() * 0.35;
  p.style.transform = `scale(${0.5 + Math.random()})`;
  document.getElementById('petals').appendChild(p);
  setTimeout(() => p.remove(), (dur + 5) * 1000);
}

for (let i = 0; i < 16; i++) makePetal();
setInterval(makePetal, 1400);
