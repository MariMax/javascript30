let interval;
const timerDisplay = document.querySelector('.display__time-left');
const beBack = document.querySelector('.display__end-time');
const button = document.querySelectorAll('[data-time]');

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(parseInt(mins, 10)*60);
})

button.forEach(i=>i.addEventListener('click', startTimer))

function startTimer(){
  const seconds = parseInt(this.dataset.time, 10);
  
  timer(seconds);
}

function timer(seconds) {
  clearInterval(interval);

  const now = (new Date()).valueOf();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  interval = setInterval(() => {
    const secondsLeft = Math.round((then - (new Date()).valueOf()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(interval);
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const display = `${mins}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  beBack.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes<10?'0':''}${minutes}`;
}

