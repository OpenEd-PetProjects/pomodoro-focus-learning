function createTimer(render, clock = globalThis) {
  const durations = { work: 25 * 60, rest: 5 * 60 };
  let mode = 'work';
  let remaining = durations[mode];
  let interval = null;
  let deadline;

  function update() {
    const now = clock.Date.now();
    while (now >= deadline) {
      mode = mode === 'work' ? 'rest' : 'work';
      deadline += durations[mode] * 1000;
    }
    remaining = Math.ceil((deadline - now) / 1000);
    render(mode, remaining);
  }

  return {
    start() {
      if (interval !== null) return;
      deadline = clock.Date.now() + remaining * 1000;
      interval = clock.setInterval(update, 250);
    },
    stop() {
      if (interval === null) return;
      update();
      clock.clearInterval(interval);
      interval = null;
    }
  };
}

if (typeof module !== 'undefined') module.exports = createTimer;
