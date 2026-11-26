const { test } = require('node:test');
const assert = require('node:assert/strict');
const createTimer = require('./timer.js');

test('запуск, остановка и автоматическое переключение режимов', () => {
  let now = 0;
  let callback;
  let running = 0;
  let display;
  const clock = {
    Date: { now: () => now },
    setInterval(fn) { callback = fn; running++; return 1; },
    clearInterval() { running--; }
  };
  const timer = createTimer((mode, seconds) => { display = [mode, seconds]; }, clock);
  timer.start();
  timer.start();
  assert.equal(running, 1);
  now = 1000;
  callback();
  assert.deepEqual(display, ['work', 1499]);
  timer.stop();
  assert.equal(running, 0);
  now += 5000;
  timer.start();
  now += 1499 * 1000;
  callback();
  assert.deepEqual(display, ['rest', 300]);
  now += 300 * 1000;
  callback();
  assert.deepEqual(display, ['work', 1500]);
  timer.stop();
  timer.stop();
  assert.equal(running, 0);
});
