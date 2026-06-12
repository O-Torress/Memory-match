let timerSeconds = 0;
let timerInterval = null;
let isTimerRunning = false;

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  timerInterval = setInterval(function () {
    timerSeconds++;
    const el = document.getElementById('hud-timer-value');
    if (el) el.textContent = formatTime(timerSeconds);
  }, 1000);
}

function stopTimer() {
  isTimerRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  const el = document.getElementById('hud-timer-value');
  if (el) el.textContent = formatTime(0);
}

function formatTime(sec) {
  const min = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return min + ':' + s;
}
