function mostrarPantallaFinal() {
  const overlay = document.getElementById('end-screen-overlay');
  const endScreen = document.getElementById('end-screen');
  
  if (!overlay || !endScreen || typeof gameState === 'undefined') return;

  let tasaAcierto = 0;
  if (gameState.moves > 0) {
    tasaAcierto = Math.round((gameState.pairs / gameState.moves) * 100);
  }

  let html = '';
