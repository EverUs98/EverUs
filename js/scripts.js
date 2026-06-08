// ====== FRASES ======
const phrases = [
  "Eres mi lugar favorito ❤️",
  "Contigo todo tiene sentido 🌙",
  "Eres mi paz y mi locura 💫",
  "Mi mejor historia eres tú ✨",
  "Cada día a tu lado es magia 💕",
];

let phraseIndex = 0;
const phraseEl = document.getElementById("phrase");

function changePhrase() {

  if(!phraseEl) return;

  phraseEl.textContent = phrases[phraseIndex];

  phraseIndex =
  (phraseIndex + 1) % phrases.length;
}

setInterval(changePhrase, 10000);
changePhrase();


// ====== CONTADOR ======

const startDate =
new Date("2025-09-08T00:00:00");

function updateCounter() {

  const now = new Date();

  let years =
  now.getFullYear() -
  startDate.getFullYear();

  let months =
  now.getMonth() -
  startDate.getMonth();

  let days =
  now.getDate() -
  startDate.getDate();

  if(days < 0){

    months--;

    days += new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();
  }

  if(months < 0){

    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if(document.getElementById("years")){
    document.getElementById("years").textContent = years;
  }

  if(document.getElementById("months")){
    document.getElementById("months").textContent = months;
  }

  if(document.getElementById("days")){
    document.getElementById("days").textContent = days;
  }

  if(document.getElementById("hours")){
    document.getElementById("hours").textContent = hours;
  }

  if(document.getElementById("minutes")){
    document.getElementById("minutes").textContent = minutes;
  }

  if(document.getElementById("seconds")){
    document.getElementById("seconds").textContent = seconds;
  }
}

setInterval(updateCounter,1000);
updateCounter();


// ====== GALERÍA MODAL ======

const modal =
document.getElementById("modal");

if(modal){

  const modalImg =
  document.getElementById("modal-img");

  const metaPlace =
  document.getElementById("meta-place");

  const metaDate =
  document.getElementById("meta-date");

  const metaNote =
  document.getElementById("meta-note");

  const closeBtn =
  document.querySelector(".close");

  document
  .querySelectorAll(".gallery-item")
  .forEach(item=>{

    item.addEventListener("click",()=>{

      modal.style.display = "flex";

      modalImg.src =
      item.dataset.src;

      metaPlace.textContent =
      item.dataset.place;

      metaDate.textContent =
      item.dataset.date;

      metaNote.textContent =
      item.dataset.note;
    });
  });

  if(closeBtn){

    closeBtn.addEventListener("click",()=>{

      modal.style.display="none";
    });
  }
}


// ====== NAVBAR SMART ======

let lastScroll = 0;

const nav =
document.getElementById("mainNav");

const navLinks =
document.getElementById("navLinks");

const menuToggle =
document.getElementById("menuToggle");

window.addEventListener("scroll",()=>{

  const currentScroll =
  window.pageYOffset;

  if(
    currentScroll > lastScroll &&
    currentScroll > 100
  ){

    if(nav){
      nav.classList.add("hidden");
      nav.classList.add("side");
    }

  } else {

    if(nav){
      nav.classList.remove("hidden");
    }
  }

  lastScroll =
  currentScroll <= 0
  ? 0
  : currentScroll;
});


// Toggle menú móvil

if(menuToggle){

  menuToggle.addEventListener("click",()=>{

    if(navLinks){
      navLinks.classList.toggle("active");
    }

  });
}


// ====== ESTRELLAS DE FONDO ======

const canvas =
document.createElement("canvas");

canvas.id = "stars";

document.body.prepend(canvas);

const ctx =
canvas.getContext("2d");

let w,h;

function resize(){

  w = canvas.width =
  window.innerWidth;

  h = canvas.height =
  window.innerHeight;
}

window.addEventListener("resize",resize);

resize();

const stars = Array.from(
  {length:100},
  ()=>({

    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2,
    d: Math.random()*1+0.5,
  })
);

function drawStars(){

  ctx.clearRect(0,0,w,h);

  ctx.fillStyle = "white";

  ctx.beginPath();

  stars.forEach(s=>{

    ctx.moveTo(s.x,s.y);

    ctx.arc(
      s.x,
      s.y,
      s.r,
      0,
      Math.PI*2
    );
  });

  ctx.fill();

  moveStars();
}

function moveStars(){

  stars.forEach(s=>{

    s.y += s.d;

    if(s.y > h){

      s.y = 0;
      s.x = Math.random()*w;
    }
  });
}

function animateStars(){

  drawStars();

  requestAnimationFrame(
    animateStars
  );
}

animateStars();


// ==========================================
// 🔔 NOVEDADES
// ==========================================

const novedades = [

  {
    id: 9,
    titulo: "💖 Felices 9 Meses",
    link: "meses.html?mes=9",

    // CAMBIA ESTA FECHA
    // AÑO, MES-1, DÍA

    fecha:
    new Date(2026, 6, 9).getTime()
  }

];


// ==========================================
// ⏳ CLASIFICAR NOVEDADES
// ==========================================

const ahora = new Date().getTime();

let novedadesActivas = [];
let novedadesPasadas = [];

novedades.forEach(n=>{

  if(ahora >= n.fecha){

    novedadesPasadas.push(n);

  } else {

    novedadesActivas.push(n);
  }

});


// ==========================================
// 📦 CONTENEDORES
// ==========================================

const newsContainer =
document.getElementById(
  "news-container"
);

const oldNewsContainer =
document.getElementById(
  "old-news-container"
);

const newsCount =
document.getElementById(
  "news-count"
);


// ==========================================
// 🔥 MOSTRAR ACTIVAS
// ==========================================

if(newsContainer){

  newsContainer.innerHTML = "";

  novedadesActivas.forEach(n=>{

    newsContainer.innerHTML += `

      <div class="news-item">

        <a href="${n.link}">
          ${n.titulo}
        </a>

        <div class="news-date">
          Próximamente ✨
        </div>

      </div>

    `;
  });

  if(novedadesActivas.length === 0){

    newsContainer.innerHTML = `

      <div class="news-item">

        No hay novedades activas 💫

      </div>

    `;
  }
}


// ==========================================
// 🕰 MOSTRAR PASADAS
// ==========================================

if(oldNewsContainer){

  oldNewsContainer.innerHTML = "";

  novedadesPasadas.forEach(n=>{

    oldNewsContainer.innerHTML += `

      <div class="news-item">

        <a href="${n.link}">
          ${n.titulo}
        </a>

        <div class="news-date">
          Ya disponible 💖
        </div>

      </div>

    `;
  });

  if(novedadesPasadas.length === 0){

    oldNewsContainer.innerHTML = `

      <div class="news-item">

        Aún no hay novedades pasadas ✨

      </div>

    `;
  }
}


// ==========================================
// 🔢 CONTADOR
// ==========================================

if(newsCount){

  newsCount.textContent =
  novedadesActivas.length;
}


// ==========================================
// 🔘 BOTÓN PRINCIPAL
// ==========================================

const toggleNews =
document.getElementById(
  "toggle-news"
);

const newsPanel =
document.getElementById(
  "news-panel"
);

if(toggleNews && newsPanel){

  toggleNews.addEventListener("click",()=>{

    newsPanel.classList.toggle(
      "hidden-news"
    );

  });
}


// ==========================================
// 📂 DESPLEGAR ACTIVAS
// ==========================================

const toggleActive =
document.getElementById(
  "toggle-active"
);

if(toggleActive){

  toggleActive.addEventListener("click",()=>{

    newsContainer.classList.toggle(
      "active"
    );

  });
}


// ==========================================
// 📁 DESPLEGAR PASADAS
// ==========================================

const toggleOld =
document.getElementById(
  "toggle-old"
);

if(toggleOld){

  toggleOld.addEventListener("click",()=>{

    oldNewsContainer.classList.toggle(
      "active"
    );

  });
}