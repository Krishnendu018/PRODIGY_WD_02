// Load sound effects
const clickSound = new Audio('sounds/click.mp3');
const lapSound = new Audio('sounds/lap.mp3');
const resetSound = new Audio('sounds/reset.mp3');


let startTime;
let elapsedTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay(time) {
  const ms = String(time % 1000).padStart(3, '0');
  const totalSeconds = Math.floor(time / 1000);
  const s = String(totalSeconds % 60).padStart(2, '0');
  const m = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  display.textContent = `${h}:${m}:${s}.${ms}`;
}

function startStop() {
  if (!isRunning) {
    clickSound.play();
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
    startStopBtn.textContent = 'Stop';
  } else {
    clickSound.play();
    isRunning = false;
    clearInterval(interval);
    startStopBtn.textContent = 'Start';
  }
}

function reset() {
    resetSound.play();
  isRunning = false;
  clearInterval(interval);
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  startStopBtn.textContent = 'Start';
  laps.innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  lapSound.play();
  const lapTime = display.textContent;
  const lapDiv = document.createElement('div');
  lapDiv.textContent = `Lap: ${lapTime}`;
  laps.appendChild(lapDiv);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);