let gameState = null;let currentConfig = null;

function startGame(config) {
  currentConfig = config;

  document.getElementById('formulario').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.getElementById('end-screen-overlay').classList.add('hidden');

let boardResult = createBoard(config.difficulty, config.theme);
  if (!boardResult || boardResult.cards.length === 0) return;

  gameState = {
    mode: config.mode,
    difficulty: config.difficulty,
    theme: config.theme,
    players: config.players.map(function (p) { return { name: p.name, score: 0 }; }),
    currentPlayer: 0,
    moves: 0,
    pairs: 0,
    totalPairs: boardResult.totalPairs,
    consecutiveMatches: 0,
    gameOver: false
  };

  logrosDesbloqueados = [];

  renderBoard(boardResult);
  renderHUD();
  initMode(config.mode);

  applyTheme(config.theme);

  if (typeof resetTimer === 'function') {
    resetTimer();
  }

  actualizarBarraLogros();
}

function backToMenu() {
  if (typeof stopTimer === 'function') stopTimer();

  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('end-screen-overlay').classList.add('hidden');
  document.getElementById('formulario').classList.remove('hidden');

  gameState = null;
  firstCard = null;
  secondCard = null;
  isBoardLocked = false;
}

function reiniciarJuego() {
  if (currentConfig) {
    startGame(currentConfig);
  }
}

function actualizarBarraLogros() {
  let bar = document.getElementById('achievements-bar');
  if (!bar) return;

  if (!logrosDesbloqueados || logrosDesbloqueados.length === 0) {
    bar.classList.add('hidden');
    return;
  }

  bar.classList.remove('hidden');
  bar.innerHTML = '';

  logrosDesbloqueados.forEach(function (logro) {
  let badge = document.createElement('span');
    badge.className = 'achievement-badge';
    badge.textContent = logro.icono + ' ' + logro.nombre;
    bar.appendChild(badge);
  });
}

function applyTheme(themeId) {
  let theme = TEMAS[themeId];
  if (!theme) return;

  document.documentElement.style.setProperty('--color-primary', theme.colorPrimario);
  document.documentElement.style.setProperty('--color-secondary', theme.colorSecundario);
}
