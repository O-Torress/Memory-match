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

    html += `<h2>${titulo}</h2>`;
    html += `
      <div class="pvp-results">
        <div class="${classP1}">
          <div class="stat-label">${p1.name}</div>
          <div class="stat-value">${p1.score} pares</div>
        </div>
        <div class="${classP2}">
          <div class="stat-label">${p2.name}</div>
          <div class="stat-value">${p2.score} pares</div>
        </div>
      </div>
    `;
   
    html += `
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Total Movimientos</span>
          <span class="stat-value">${gameState.moves}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Tasa Acierto Global</span>
          <span class="stat-value">${tasaAcierto}%</span>
        </div>
      </div>
    `;
