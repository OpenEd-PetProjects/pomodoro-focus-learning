const mode = document.querySelector('#mode');
const time = document.querySelector('#time');
const timer = createTimer((currentMode, remaining) => {
  mode.textContent = currentMode === 'work' ? 'Работа' : 'Отдых';
  time.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
});
document.querySelector('#start').addEventListener('click', timer.start);
document.querySelector('#stop').addEventListener('click', timer.stop);
