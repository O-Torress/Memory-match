let currentBoardData = [];

function createBoard(difficulty, themeId) {
  let dims = { facil: 4, intermedio: 6, dificil: 8 };
  let size = dims[difficulty] || 4;
  let totalCards = size * size;
  let totalPairs = totalCards / 2;

  let theme = TEMAS[themeId];
  if (!theme) return null;

  let selectedEmojis = theme.emojis.slice(0, totalPairs);

  let cards = [];
  selectedEmojis.forEach(function (emoji, index) {
    cards.push({ id: index * 2, emoji: emoji, isFlipped: false, isMatched: false });
    cards.push({ id: index * 2 + 1, emoji: emoji, isFlipped: false, isMatched: false });
  });

  shuffleArray(cards);

  currentBoardData = cards;
  return { cards: cards, size: size, totalPairs: totalPairs };
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function renderBoard(boardResult) {
  let container = document.getElementById('board-container');
  if (!container) return;

  container.innerHTML = '';
  container.style.gridTemplateColumns = 'repeat(' + boardResult.size + ', 1fr)';

  boardResult.cards.forEach(function (card) {
    let cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.cardId = card.id;

    cardEl.innerHTML =
      '<div class="card-inner">' +
        '<div class="card-back"></div>' +
        '<div class="card-front">' + card.emoji + '</div>' +
      '</div>';

    cardEl.addEventListener('click', function () {
      if (typeof flipCard === 'function') {
        flipCard(this);
      }
    });

    container.appendChild(cardEl);
    card.element = cardEl;
  });
}