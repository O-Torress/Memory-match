const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('config-form');
  const modoSelect = document.getElementById('modoJuego');
  const player2Group = document.getElementById('player2-group');
  const lblPlayer1 = document.getElementById('lbl-player1');

  modoSelect.addEventListener('change', (e) => {
    if (e.target.value === 'pvp') {
      player2Group.classList.remove('hidden');
      lblPlayer1.textContent = 'Nombre del Jugador 1';
    } else {
      player2Group.classList.add('hidden');
      lblPlayer1.textContent = 'Nombre del Jugador';
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const modo = document.getElementById('modoJuego').value;
    const dificultad = document.getElementById('dificultad').value;
    const tematica = document.getElementById('tematica').value;

    let p1Name = document.getElementById('player1Name').value.trim();
    if (!p1Name) p1Name = 'Jugador 1';

    const players = [{ name: p1Name, score: 0 }];

    if (modo === 'pvp') {
      let p2Name = document.getElementById('player2Name').value.trim();
      if (!p2Name) p2Name = 'Jugador 2';
      players.push({ name: p2Name, score: 0 });
    }

    const config = {
      mode: modo,
      difficulty: dificultad,
      theme: tematica,
      players: players
    };

    if (typeof startGame === 'function') {
      startGame(config);
    } else {
      console.error("startGame no está definido aún. Faltan los demás scripts.");
    }
  });
});
