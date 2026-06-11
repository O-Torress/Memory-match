
function mostrarPantallaFinal() {
  const overlay = document.getElementById('end-screen-overlay');
  const endScreen = document.getElementById('end-screen');
  
  if (!overlay || !endScreen || typeof gameState === 'undefined') return;

  let tasaAcierto = 0;
  if (gameState.moves > 0) {
    tasaAcierto = Math.round((gameState.pairs / gameState.moves) * 100);
  }

  let html = '';

  if (gameState.mode === 'pvp') {
    const p1 = gameState.players[0];
    const p2 = gameState.players[1];
    
    let titulo = '';
    let classP1 = 'pvp-card';
    let classP2 = 'pvp-card';
    
    if (p1.score > p2.score) {
      titulo = `🎉 ¡${p1.name} gana!`;
      classP1 += ' winner';
    } else if (p2.score > p1.score) {
      titulo = `🎉 ¡${p2.name} gana!`;
      classP2 += ' winner';
    } else {
      titulo = `🤝 ¡Es un Empate!`;
    }
