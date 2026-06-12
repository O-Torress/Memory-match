let firstCard = null;
let secondCard = null;
let isBoardLocked = false;

function flipCard(cardEl) {
  if (isBoardLocked) return;
  if (!gameState || gameState.gameOver) return;
  if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

  if (gameState.mode === 'solitario' && !isTimerRunning && typeof startTimer === 'function') {
    startTimer();
  }

  cardEl.classList.add('flipped');

  if (!firstCard) {
    firstCard = cardEl;
    return;
  }

  if (cardEl === firstCard) return;

  secondCard = cardEl;
  isBoardLocked = true;

  gameState.moves++;

  if (checkMatch(firstCard, secondCard)) {
    handleMatch(firstCard, secondCard);
  } else {
    handleMismatch(firstCard, secondCard);
  }
}

function checkMatch(card1, card2) {
  let emoji1 = card1.querySelector('.card-front').textContent;
  let emoji2 = card2.querySelector('.card-front').textContent;
  return emoji1 === emoji2;
}

function handleMatch(card1, card2) {
  card1.classList.remove('flipped');
  card1.classList.add('matched');
  card2.classList.remove('flipped');
  card2.classList.add('matched');

  let id1 = parseInt(card1.dataset.cardId);
  let id2 = parseInt(card2.dataset.cardId);
  let cardData1 = currentBoardData.find(function (c) { return c.id === id1; });
  let cardData2 = currentBoardData.find(function (c) { return c.id === id2; });
  if (cardData1) cardData1.isMatched = true;
  if (cardData2) cardData2.isMatched = true;

  gameState.pairs++;
  gameState.consecutiveMatches++;

  if (gameState.mode === 'pvp') {
    gameState.players[gameState.currentPlayer].score++;
  }

  if (typeof verificarLogros === 'function') {
    verificarLogros(gameState);
  }

  if (typeof updateHUD === 'function') {
    updateHUD();
  }

  resetTurn();

  if (gameState.pairs >= gameState.totalPairs) {
    gameState.gameOver = true;
    if (typeof stopTimer === 'function') stopTimer();
    if (typeof mostrarPantallaFinal === 'function') {
      setTimeout(mostrarPantallaFinal, 500);
    }
  }

  isBoardLocked = false;
}

function handleMismatch(card1, card2) {
  gameState.consecutiveMatches = 0;

  card1.classList.add('mismatch');
  card2.classList.add('mismatch');

  if (typeof updateHUD === 'function') {
    updateHUD();
  }

  setTimeout(function () {
    card1.classList.remove('flipped', 'mismatch');
    card2.classList.remove('flipped', 'mismatch');

    resetTurn();

    if (gameState.mode === 'pvp') {
      gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
      if (typeof updateHUD === 'function') {
        updateHUD();
      }
    }

    isBoardLocked = false;
  }, 1000);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
}
