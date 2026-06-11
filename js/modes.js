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
