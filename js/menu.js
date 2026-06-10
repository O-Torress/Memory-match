const form = document.querySelector('#config-form');
const modoJuego = document.getElementById('modoJuego');
const player2Group = document.getElementById('player2-group');
const player2Input = document.getElementById('player2Name');

function actualizarCampoJugador2() {
  if (!player2Group || !modoJuego) return;

  const mostrar = modoJuego.value === 'pvp';
  player2Group.classList.toggle('hidden', !mostrar);

  if (player2Input) {
    player2Input.required = mostrar;
  }
}

if (modoJuego) {
  modoJuego.addEventListener('change', actualizarCampoJugador2);
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const modo = document.getElementById('modoJuego')?.value || 'solitario';
    const jugador1 = document.getElementById('player1Name')?.value.trim() || 'Jugador 1';
    const jugador2 = document.getElementById('player2Name')?.value.trim() || 'Jugador 2';
    const reto = document.getElementById('dificultad')?.value || 'facil';
    const tema = document.getElementById('tematica')?.value || '1';

    console.log('Configuración iniciada:', { modo, jugador1, jugador2, reto, tema });
  });
}

actualizarCampoJugador2();