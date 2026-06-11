
let logrosDesbloqueados = [];

const   LOGROS = [
  {
    id: 'primer_paso',
    nombre: 'Primer Paso',
    descripcion: 'Encuentra tu primer par.',
    icono: '🏆',
    verificar: function(state) {
      return state.pairs >= 1;
    }
  },
  {
    id: 'racha_caliente',
    nombre: 'Racha Caliente',
    descripcion: 'Encuentra 3 pares consecutivos sin fallar.',
    icono: '🔥',
    verificar: function(state) {

      return state.consecutiveMatches >= 3;
    }
  },
  {
    id: 'velocista',
    nombre: 'Velocista',
    descripcion: 'Completa el modo fácil en menos de 30 segundos.',
    icono: '⚡',
    verificar: function(state) {

      return state.difficulty === 'facil' 
             && state.pairs === state.totalPairs 
             && typeof timerSeconds !== 'undefined' 
             && timerSeconds < 30;
    }
  },
  {
    id: 'sin_titubeos',
    nombre: 'Sin Titubeos',
    descripcion: 'Acierta un par en tu primer movimiento.',
    icono: '🎯',
    verificar: function(state) {
      return state.moves === 1 && state.pairs === 1;
    }
  },
  {
    id: 'mitad_camino',
    nombre: 'A Medio Camino',
    descripcion: 'Encuentra la mitad de los pares del tablero.',
    icono: '⭐',
    verificar: function(state) {
      return state.totalPairs > 0 && state.pairs >= Math.ceil(state.totalPairs / 2);
    }
    
  },
  {
    id: 'perfeccionista',
    nombre: 'Perfeccionista',
    descripcion: 'Termina el juego con una tasa de acierto del 80% o más.',
    icono: '💎',
    verificar: function(state) {
      if (state.pairs !== state.totalPairs || state.moves === 0) return false;
      const tasa = state.pairs / state.moves;
      return tasa >= 0.8;
    }
  }
];

function verificarLogros(state) {
  if (!state) return;

  LOGROS.forEach(function(logro) {

    if (logroYaDesbloqueado(logro.id)) return;

    if (logro.verificar(state)) {
    
      logrosDesbloqueados.push(logro);
      
      mostrarToast(logro);
      
      actualizarBarraLogros();
    }
  });
}

function logroYaDesbloqueado(id) {
  return logrosDesbloqueados.some(function(l) { return l.id === id; });
}

function mostrarToast(logro) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  toast.innerHTML = `
    <div class="toast-icon">${logro.icono}</div>
    <div class="toast-content">
      <h4>¡Logro Desbloqueado!</h4>
      <p><strong>${logro.nombre}</strong>: ${logro.descripcion}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(function() {
    if (container.contains(toast)) {
      container.removeChild(toast);
    }
  }, 3000);
}
