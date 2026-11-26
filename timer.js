function createTimer(render, clock = globalThis) {
  const durations = { work: 25 * 60, rest: 5 * 60 };
  let mode = 'work';
  let remaining = durations[mode] * 1000;
  let interval = null;
  let deadline;

  function update() {
    const now = clock.Date.now();
    while (now >= deadline) {
      mode = mode === 'work' ? 'rest' : 'work';
      deadline += durations[mode] * 1000;
    }
    remaining = deadline - now;
    render(mode, Math.ceil(remaining / 1000));
  }

  return {
    start() {
      if (interval !== null) return;
      deadline = clock.Date.now() + remaining;
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
