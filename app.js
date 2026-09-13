var BASE_SYMBOLS = ["⚽", "🧤", "🥅", "🏆", "👕", "👟"];
var EXTRA_SYMBOLS = ["🏟️", "🥇", "🚩", "⏱️"];
var MISMATCH_DELAY = 800;
var NEXT_LEVEL = { easy: "medium", medium: "hard", hard: null };

var LEVELS = {
  easy: { id: "easy", label: "6 карточек", pairs: 3, cards: 6 },
  medium: { id: "medium", label: "12 карточек", pairs: 6, cards: 12 },
  hard: { id: "hard", label: "20 карточек", pairs: 10, cards: 20 },
};

var screens = {
  start: document.getElementById("start-screen"),
  play: document.getElementById("play-screen"),
  result: document.getElementById("result-screen"),
};

var els = {
  board: document.getElementById("board"),
  stats: document.getElementById("stats"),
  levelLabel: document.getElementById("level-label"),
  feedback: document.getElementById("feedback"),
  resultTitle: document.getElementById("result-title"),
  resultScore: document.getElementById("result-score"),
  resultText: document.getElementById("result-text"),
  next: document.getElementById("next-btn"),
  replay: document.getElementById("replay-btn"),
  menu: document.getElementById("menu-btn"),
  home: document.getElementById("home-btn"),
};

var state = {
  level: "easy",
  deck: [],
  first: null,
  second: null,
  locked: false,
  moves: 0,
  matches: 0,
  startedAt: 0,
  mismatchTimer: null,
};

var sound = {
  ctx: null,
  master: null,
  musicGain: null,
  enabled: true,
  musicStarted: false,
  nextNoteTime: 0,
  step: 0,
  timer: null,
  noise: null,
};

var MUSIC_NOTES = [261.63, 329.63, 392.0, 329.63, 261.63, 329.63, 392.0, 0, 349.23, 440.0, 523.25, 440.0, 392.0, 493.88, 392.0, 0];
var MUSIC_BASS = [130.81, 0, 0, 0, 130.81, 0, 0, 0, 174.61, 0, 0, 0, 196.0, 0, 0, 0];
var STEP_TIME = 0.28;

function getAudioCtx() {
  if (sound.ctx) return sound.ctx;
  var Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  sound.ctx = new Ctx();
  sound.master = sound.ctx.createGain();
  sound.master.gain.value = 0.9;
  sound.master.connect(sound.ctx.destination);
  sound.musicGain = sound.ctx.createGain();
  sound.musicGain.gain.value = 0.12;
  sound.musicGain.connect(sound.master);
  return sound.ctx;
}

function unlockAudio() {
  var ctx = getAudioCtx();
  if (!ctx) return null;
  if (ctx.state === "suspended" && ctx.resume) ctx.resume();
  try {
    var buffer = ctx.createBuffer(1, 1, 22050);
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0);
  } catch (error) {}
  return ctx;
}

function playBeep(freq, when, duration, type, dest, volume) {
  if (!freq) return;
  var ctx = sound.ctx;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(when);
  osc.stop(when + duration + 0.02);
}

function scheduleMusic() {
  if (!sound.enabled || !sound.ctx || !sound.musicStarted) return;
  var ctx = sound.ctx;
  var ahead = ctx.currentTime + 0.8;
  while (sound.nextNoteTime < ahead) {
    var melody = MUSIC_NOTES[sound.step];
    var bass = MUSIC_BASS[sound.step];
    playBeep(melody, sound.nextNoteTime, 0.22, "triangle", sound.musicGain, 0.55);
    playBeep(bass, sound.nextNoteTime, 0.24, "sine", sound.musicGain, 0.45);
    sound.nextNoteTime += STEP_TIME;
    sound.step = (sound.step + 1) % MUSIC_NOTES.length;
  }
  sound.timer = window.setTimeout(scheduleMusic, 200);
}

function startMusic() {
  var ctx = unlockAudio();
  if (!ctx || !sound.enabled || sound.musicStarted) return;
  sound.musicStarted = true;
  sound.step = 0;
  sound.nextNoteTime = ctx.currentTime + 0.05;
  scheduleMusic();
}

function stopMusic() {
  sound.musicStarted = false;
  if (sound.timer) {
    window.clearTimeout(sound.timer);
    sound.timer = null;
  }
}

function noiseBuffer(seconds) {
  var ctx = sound.ctx;
  var length = Math.floor(ctx.sampleRate * seconds);
  var buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  var data = buffer.getChannelData(0);
  var i;
  for (i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function clapAt(when, volume) {
  var ctx = sound.ctx;
  var src = ctx.createBufferSource();
  var filter = ctx.createBiquadFilter();
  var gain = ctx.createGain();
  src.buffer = sound.noise;
  filter.type = "bandpass";
  filter.frequency.value = 1200 + Math.random() * 800;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(volume, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + 0.18);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(sound.master);
  src.start(when);
  src.stop(when + 0.2);
}

function playApplause(strong) {
  var ctx = unlockAudio();
  if (!ctx || !sound.enabled) return;
  if (!sound.noise) sound.noise = noiseBuffer(0.25);
  var start = ctx.currentTime;
  var count = strong ? 22 : 10;
  var i;
  if (sound.musicGain) {
    sound.musicGain.gain.cancelScheduledValues(start);
    sound.musicGain.gain.setValueAtTime(sound.musicGain.gain.value, start);
    sound.musicGain.gain.linearRampToValueAtTime(0.04, start + 0.05);
    sound.musicGain.gain.linearRampToValueAtTime(0.12, start + (strong ? 1.4 : 0.7));
  }
  for (i = 0; i < count; i += 1) {
    clapAt(start + i * 0.045 + Math.random() * 0.02, strong ? 0.22 : 0.16);
  }
}

function updateSoundButtons() {
  var startBtn = document.getElementById("sound-start-btn");
  var playBtn = document.getElementById("sound-play-btn");
  if (startBtn) startBtn.textContent = sound.enabled ? "🔊 Музыка включена" : "🔇 Музыка выключена";
  if (playBtn) playBtn.textContent = sound.enabled ? "🔊" : "🔇";
}

function toggleSound() {
  sound.enabled = !sound.enabled;
  if (sound.enabled) {
    startMusic();
  } else {
    stopMusic();
  }
  updateSoundButtons();
}

function shuffle(list) {
  var copy = list.slice();
  var i;
  var j;
  var temp;
  for (i = copy.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function clearElement(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function showScreen(name) {
  var key;
  for (key in screens) {
    if (!screens.hasOwnProperty(key)) continue;
    var screen = screens[key];
    var active = key === name;
    if (active) {
      screen.className = "screen is-active";
      screen.removeAttribute("hidden");
      screen.setAttribute("aria-hidden", "false");
    } else {
      screen.className = "screen";
      screen.setAttribute("hidden", "hidden");
      screen.setAttribute("aria-hidden", "true");
    }
  }
}

function buildDeck(pairs) {
  var chosen;
  var extra;
  var cards = [];
  var i;
  if (pairs <= BASE_SYMBOLS.length) {
    chosen = shuffle(BASE_SYMBOLS).slice(0, pairs);
  } else {
    extra = shuffle(EXTRA_SYMBOLS).slice(0, pairs - BASE_SYMBOLS.length);
    chosen = BASE_SYMBOLS.concat(extra);
  }
  for (i = 0; i < chosen.length; i += 1) {
    cards.push({ id: i + "-a", symbol: chosen[i] });
    cards.push({ id: i + "-b", symbol: chosen[i] });
  }
  return shuffle(cards);
}

function pad2(value) {
  return value < 10 ? "0" + value : String(value);
}

function formatTime(ms) {
  var total = Math.max(0, Math.round(ms / 1000));
  var minutes = Math.floor(total / 60);
  var seconds = total % 60;
  if (!minutes) return seconds + " сек";
  return minutes + " мин " + pad2(seconds) + " сек";
}

function updateStats() {
  var level = LEVELS[state.level];
  els.stats.textContent = "Ходы " + state.moves + " · Пары " + state.matches + " / " + level.pairs;
}

function startGame(levelId) {
  startMusic();
  if (state.mismatchTimer) window.clearTimeout(state.mismatchTimer);
  var level = LEVELS[levelId];
  state.level = levelId;
  state.deck = buildDeck(level.pairs);
  state.first = null;
  state.second = null;
  state.locked = false;
  state.moves = 0;
  state.matches = 0;
  state.startedAt = Date.now();
  els.levelLabel.textContent = level.label;
  els.feedback.textContent = "Откройте две карточки";
  els.board.setAttribute("data-level", levelId);
  updateStats();
  renderBoard();
  showScreen("play");
}

function renderBoard() {
  clearElement(els.board);
  var i;
  for (i = 0; i < state.deck.length; i += 1) {
    els.board.appendChild(makeCard(state.deck[i]));
  }
}

function makeCard(card) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "memory-card";
  button.setAttribute("data-id", card.id);
  button.setAttribute("aria-label", "Карточка рубашкой вверх");

  var back = document.createElement("span");
  back.className = "card-face card-back";
  back.setAttribute("aria-hidden", "true");
  back.textContent = "⚽";

  var front = document.createElement("span");
  front.className = "card-face card-front";
  front.setAttribute("aria-hidden", "true");
  front.textContent = card.symbol;

  button.appendChild(back);
  button.appendChild(front);
  button.addEventListener("click", function () {
    flipCard(card, button);
  });
  return button;
}

function flipCard(card, button) {
  if (state.locked) return;
  if (button.className.indexOf("is-flipped") !== -1) return;
  if (button.className.indexOf("is-matched") !== -1) return;

  button.className = "memory-card is-flipped";
  button.setAttribute("aria-label", card.symbol);

  if (!state.first) {
    state.first = { card: card, button: button };
    els.feedback.textContent = "Выберите вторую карточку";
    return;
  }

  state.second = { card: card, button: button };
  state.moves += 1;
  updateStats();
  checkMatch();
}

function checkMatch() {
  var first = state.first;
  var second = state.second;
  if (first.card.symbol === second.card.symbol) {
    first.button.className = "memory-card is-flipped is-matched is-disabled";
    second.button.className = "memory-card is-flipped is-matched is-disabled";
    state.matches += 1;
    state.first = null;
    state.second = null;
    updateStats();
    els.feedback.textContent = "Пара!";
    if (state.matches === LEVELS[state.level].pairs) {
      playApplause(true);
      window.setTimeout(showResult, 450);
    } else {
      playApplause(false);
    }
    return;
  }

  state.locked = true;
  first.button.className = "memory-card is-flipped is-wrong";
  second.button.className = "memory-card is-flipped is-wrong";
  els.feedback.textContent = "Не пара — запомните и попробуйте снова";
  state.mismatchTimer = window.setTimeout(function () {
    first.button.className = "memory-card";
    second.button.className = "memory-card";
    first.button.setAttribute("aria-label", "Карточка рубашкой вверх");
    second.button.setAttribute("aria-label", "Карточка рубашкой вверх");
    state.first = null;
    state.second = null;
    state.locked = false;
    els.feedback.textContent = "Откройте две карточки";
  }, MISMATCH_DELAY);
}

function showResult() {
  var level = LEVELS[state.level];
  var next = NEXT_LEVEL[state.level];
  var elapsed = formatTime(Date.now() - state.startedAt);
  var perfect = state.moves === level.pairs;
  els.resultTitle.textContent = perfect ? "Идеальная память!" : "Все пары найдены";
  els.resultScore.textContent = state.moves + " " + movesWord(state.moves);
  els.resultText.textContent =
    level.label +
    " за " +
    elapsed +
    ". " +
    (next ? "Можно перейти на следующий уровень." : "Это самый сложный уровень — сыграйте ещё раз.");
  if (next) {
    els.next.removeAttribute("hidden");
  } else {
    els.next.setAttribute("hidden", "hidden");
  }
  showScreen("result");
}

function movesWord(count) {
  var mod10 = count % 10;
  var mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "ход";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "хода";
  return "ходов";
}

function bindLevelButtons() {
  var buttons = document.querySelectorAll("[data-level]");
  var i;
  for (i = 0; i < buttons.length; i += 1) {
    (function (button) {
      button.addEventListener("click", function () {
        startGame(button.getAttribute("data-level"));
      });
    })(buttons[i]);
  }
}

bindLevelButtons();

var soundStartBtn = document.getElementById("sound-start-btn");
var soundPlayBtn = document.getElementById("sound-play-btn");
if (soundStartBtn) soundStartBtn.addEventListener("click", toggleSound);
if (soundPlayBtn) soundPlayBtn.addEventListener("click", toggleSound);
updateSoundButtons();

els.home.addEventListener("click", function () {
  if (state.mismatchTimer) window.clearTimeout(state.mismatchTimer);
  showScreen("start");
});

els.replay.addEventListener("click", function () {
  startGame(state.level);
});

els.next.addEventListener("click", function () {
  var next = NEXT_LEVEL[state.level];
  if (next) startGame(next);
});

els.menu.addEventListener("click", function () {
  showScreen("start");
});

function setOfflineStatus(text) {
  var status = document.getElementById("offline-status");
  if (status) status.textContent = text;
}

function prepareOffline() {
  if (!("serviceWorker" in navigator)) {
    setOfflineStatus("Можно играть. Офлайн-режим на этом Safari ограничен.");
    return;
  }

  setOfflineStatus("Сохраняем игру на iPad…");
  navigator.serviceWorker
    .register("./service-worker.js?v=3")
    .then(function () {
      setOfflineStatus("Игра готова. Можно играть.");
    })
    .catch(function () {
      setOfflineStatus("Играть можно. Офлайн может быть недоступен.");
    });
}

prepareOffline();
