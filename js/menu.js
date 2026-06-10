const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const modo = document.getElementById('modoJuego').value;
      const name = document.getElementById('userName').value;
      const reto = document.getElementById('dificultad').value;
      const tema = document.getElementById('tematica').value;
  });