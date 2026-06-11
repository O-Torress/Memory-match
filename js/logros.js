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
