// js/cupones.js
// Lista completa de 22 cupones (incluye el cupón largo que pediste)
const cupones = [
  "Vale por un abrazo tan largo que olvidemos el mundo",
  "Vale por un beso sorpresa donde menos lo esperes",
  "Vale por una cita improvisada… aunque sea en tu sala",
  "Vale por una noche de películas y comer palomitas hasta reírnos",
  "Vale por un masaje solo si prometes no dormirte",
  "Vale por un baile ridículo juntos en pijama",
  "Vale por que te lea un poema o frase bonita hecha por mí",
  "Vale por un cumplido exagerado que te haga sonrojar",
  "Vale por preparar tu bebida favorita y servirla con una sonrisa",
  "Vale por un paseo sorpresa por algún lugar bonito, aunque sea cercano",
  "Vale por un reto divertido que solo nosotros podamos entender",
  "Vale por que haga lo que tú quieras… hasta que me canses de tanta ternura",
  "Vale por un beso apasionado lleno de emoción y ternura",
  "Vale por confesarte un secreto romántico solo para ti",
  "Vale por una noche de risas, historias y abrazos tiernos",
  "Vale por que planifique un momento especial solo para ti",
  "Vale por que te dedique una canción cantada o tarareada solo para ti",
  "Vale por inventar un pequeño juego o tradición que solo tengamos nosotros",
  "Vale por un paseo improvisado tomados de la mano, aunque sea dentro de casa",
  "Vale por un momento solo nuestro, lleno de miradas y sonrisas",
  "Vale por una noche donde te haga sentir mi princesa, mi deseo y mi diversión… todo al mismo tiempo",
  // Cupón largo solicitado (lo dejo al final, puedes moverlo donde quieras)
  "Cupón válido para una noche de mimos, abrazos y besos lentos. Incluye tu comida favorita, una película que elijas tú, y la promesa de que mis manos no se cansarán de acariciarte hasta que te quedes dormido en mis brazos."
];

// Soporte para dos ids posibles de contenedor en HTML
const contenedor =
  document.getElementById("cupones-container") ||
  document.getElementById("lista-cupones");

if (!contenedor) {
  console.error("No se encontró el contenedor de cupones. Añade un elemento con id 'cupones-container' o 'lista-cupones'.");
}

// Recupera el estado guardado (mapa index -> timestamp vencimiento)
let usados = {};
try {
  usados = JSON.parse(localStorage.getItem("cuponesUsados") || "{}");
} catch (e) {
  usados = {};
}

// Devuelve un Date que representa el 8 del siguiente mes a partir de ahora (00:00)
function getNext8thFromNow() {
  const now = new Date();
  // mes siguiente
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 8, 0, 0, 0, 0);
  return nextMonth;
}

// Renderiza todos los cupones en el DOM
function renderCupones() {
  contenedor.innerHTML = "";
  cupones.forEach((texto, i) => {
    const div = document.createElement("div");
    div.className = "cupon";
    div.id = `cupon-${i}`;

    // Título opcional con número
    const titulo = document.createElement("h3");
    titulo.textContent = `Cupón #${i + 1}`;

    const p = document.createElement("p");
    p.textContent = texto;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = `btn-${i}`;
    btn.textContent = "Usar cupón 💌";
    btn.addEventListener("click", () => usarCupon(i));

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.id = `countdown-${i}`;

    div.appendChild(titulo);
    div.appendChild(p);
    div.appendChild(btn);
    div.appendChild(countdown);

    contenedor.appendChild(div);

    // Si ya está usado, aplicar estado y arrancar cuenta regresiva
    if (usados[i]) {
      const vencimiento = Number(usados[i]);
      if (!isNaN(vencimiento) && vencimiento > Date.now()) {
        marcarComoUsadoUI(i, true);
        iniciarCuentaRegresiva(i, vencimiento);
      } else {
        // Si venció en el pasado, limpiarlo (por seguridad)
        delete usados[i];
        persistUsados();
      }
    }
  });
}

// Guarda el objeto 'usados' en localStorage
function persistUsados() {
  try {
    localStorage.setItem("cuponesUsados", JSON.stringify(usados));
  } catch (e) {
    console.error("No se pudo guardar en localStorage:", e);
  }
}

// UI: aplica clases/estado de cupón usado o lo revierte
function marcarComoUsadoUI(index, usado = true) {
  const cuponEl = document.getElementById(`cupon-${index}`);
  const btn = document.getElementById(`btn-${index}`);
  if (!cuponEl || !btn) return;

  if (usado) {
    cuponEl.classList.add("usado");
    btn.disabled = true;
    btn.textContent = "Cupón usado 💔";
  } else {
    cuponEl.classList.remove("usado");
    btn.disabled = false;
    btn.textContent = "Usar cupón 💌";
    const cd = document.getElementById(`countdown-${index}`);
    if (cd) cd.textContent = "";
  }
}

// Acción al usar un cupón: guarda vencimiento en el 8 del siguiente mes y arranca countdown
function usarCupon(index) {
  const next8 = getNext8thFromNow();
  const ts = next8.getTime();
  usados[index] = ts;
  persistUsados();
  marcarComoUsadoUI(index, true);
  iniciarCuentaRegresiva(index, ts);
}

// Inicia una cuenta regresiva para el cupón 'index' hasta 'timestampFin'
// Actualiza el elemento #countdown-index cada segundo. Cuando termine, reactiva el cupón.
const intervals = {}; // para limpiar intervalos si es necesario
function iniciarCuentaRegresiva(index, timestampFin) {
  const el = document.getElementById(`countdown-${index}`);
  if (!el) return;

  // limpia intervalo previo (si lo hay)
  if (intervals[index]) {
    clearInterval(intervals[index]);
  }

  function tick() {
    const ahora = Date.now();
    let diff = timestampFin - ahora;

    if (diff <= 0) {
      // venció: limpiar estado y UI
      clearInterval(intervals[index]);
      delete usados[index];
      persistUsados();
      marcarComoUsadoUI(index, false);
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const segs = Math.floor((diff / 1000) % 60);

    el.textContent = `Disponible en ${dias}d ${horas}h ${mins}m ${segs}s`;
  }

  // primer tick inmediato + intervalo cada 1s
  tick();
  intervals[index] = setInterval(tick, 1000);
}

// Inicializa la UI
renderCupones();
