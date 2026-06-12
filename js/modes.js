
function initMode(modo) {
  if (modo === 'solitario') {
    initSolitarioMode();
  } else if (modo === 'pvp') {
    initPvPMode();
  } else if (modo === 'practica') {
    initPracticaMode();
  }
}

function initSolitarioMode() {

  if (typeof resetTimer === 'function') {
    resetTimer();
  }
}

function initPvPMode() {

  if (typeof gameState !== 'undefined') {
    gameState.currentPlayer = 0;
    gameState.players.forEach(p => p.score = 0);
  }
}

function initPracticaMode() {

  if (typeof resetTimer === 'function') {
    resetTimer();
  }
}

function renderHUD() {
  const hudContainer = document.getElementById('hud');
  if (!hudContainer || typeof gameState === 'undefined') return;

  hudContainer.innerHTML = ''; 

  const modo = gameState.mode;

  if (modo === 'solitario') {
    hudContainer.innerHTML = `
      <div class="hud-stat">
        <span class="hud-label">Jugador</span>
        <span class="hud-value" id="hud-player-name">${gameState.players[0].name}</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">Movimientos</span>
        <span class="hud-value" id="hud-moves">0</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">Pares</span>
        <span class="hud-value" id="hud-pairs">0 / ${gameState.totalPairs}</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">Tiempo</span>
        <span class="hud-value" id="hud-timer-value">00:00</span>
      </div>
      <button class="hud-btn-restart" id="btn-restart-game">Reiniciar</button>
    `;
  } 
  else if (modo === 'pvp') {
    const p1Name = gameState.players[0].name;
    const p2Name = gameState.players[1].name;

    hudContainer.innerHTML = `
      <div class="player-indicator active" id="player-1-indicator">
        <span class="hud-label">${p1Name}</span>
        <span class="hud-value" id="player-1-score">0</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">VS</span>
      </div>
      <div class="player-indicator" id="player-2-indicator">
        <span class="hud-label">${p2Name}</span>
        <span class="hud-value" id="player-2-score">0</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">Movimientos Totales</span>
        <span class="hud-value" id="hud-moves">0</span>
      </div>
      <button class="hud-btn-restart" id="btn-restart-game">Reiniciar</button>
    `;//commit
  }
  else if (modo === 'practica') {
    hudContainer.innerHTML = `
      <div class="hud-stat">
        <span class="hud-label">Jugador</span>
        <span class="hud-value" id="hud-player-name">${gameState.players[0].name}</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">Movimientos</span>
        <span class="hud-value" id="hud-moves">0</span>
      </div>
      <div class="hud-stat">
        <span class="hud-label">Pares</span>
        <span class="hud-value" id="hud-pairs">0 / ${gameState.totalPairs}</span>
      </div>
      <button class="hud-btn-restart" id="btn-restart-game">Reiniciar</button>
    `;
  }
  const btnRestart = document.getElementById('btn-restart-game');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      if (typeof backToMenu === 'function') {
        backToMenu();
      }
    });
  }
}

function updateHUD() {
  if (typeof gameState === 'undefined') return;

  const movesEl = document.getElementById('hud-moves');
  if (movesEl) movesEl.textContent = gameState.moves;

  const pairsEl = document.getElementById('hud-pairs');
  if (pairsEl) pairsEl.textContent = `${gameState.pairs} / ${gameState.totalPairs}`;

  if (gameState.mode === 'pvp') {
    const p1Score = document.getElementById('player-1-score');
    const p2Score = document.getElementById('player-2-score');
    if (p1Score) p1Score.textContent = gameState.players[0].score;
    if (p2Score) p2Score.textContent = gameState.players[1].score;

    const p1Ind = document.getElementById('player-1-indicator');
    const p2Ind = document.getElementById('player-2-indicator');
    if (p1Ind) p1Ind.classList.toggle('active', gameState.currentPlayer === 0);
    if (p2Ind) p2Ind.classList.toggle('active', gameState.currentPlayer === 1);
  }

  if (typeof actualizarBarraLogros === 'function') {
    actualizarBarraLogros();
  }
}
