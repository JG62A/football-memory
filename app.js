const BASE_SYMBOLS = ["⚽", "🧤", "🥅", "🏆", "👕", "👟"];
const EXTRA_SYMBOLS = ["🏟️", "🥇", "🚩", "⏱️"];
const MISMATCH_DELAY = 800;
const NEXT_LEVEL = { easy: "medium", medium: "hard", hard: null };

const LEVELS = {
  easy: { id: "easy", label: "6 карточек", pairs: 3, cards: 6 },
  medium: { id: "medium", label: "12 карточек", pairs: 6, cards: 12 },
  hard: { id: "hard", label: "20 карточек", pairs: 10, cards: 20 },
};

const screens = {
  start: document.getElementById("start-screen"),
  play: document.getElementById("play-screen"),
  result: document.getElementById("result-screen"),
};

const els = {
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

const state = {
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

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    const active = key === name;
    screen.classList.toggle("is-active", active);
    screen.hidden = !active;
    screen.setAttribute("aria-hidden", String(!active));
  });
}

function buildDeck(pairs) {
  const chosen =
    pairs <= BASE_SYMBOLS.length
      ? shuffle(BASE_SYMBOLS).slice(0, pairs)
      : [...BASE_SYMBOLS, ...shuffle(EXTRA_SYMBOLS).slice(0, pairs - BASE_SYMBOLS.length)];
  const cards = chosen.flatMap((symbol, index) => [
    { id: `${index}-a`, symbol },
    { id: `${index}-b`, symbol },
  ]);
  return shuffle(cards);
}

function formatTime(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  if (!minutes) return `${seconds} сек`;
  return `${minutes} мин ${String(seconds).padStart(2, "0")} сек`;
}

function updateStats() {
  const level = LEVELS[state.level];
  els.stats.textContent = `Ходы ${state.moves} · Пары ${state.matches} / ${level.pairs}`;
}

function startGame(levelId) {
  if (state.mismatchTimer) window.clearTimeout(state.mismatchTimer);
  const level = LEVELS[levelId];
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
  els.board.dataset.level = levelId;
  updateStats();
  renderBoard();
  showScreen("play");
}

function renderBoard() {
  els.board.replaceChildren();
  state.deck.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-card";
    button.dataset.id = card.id;
    button.setAttribute("aria-label", "Карточка рубашкой вверх");

    const back = document.createElement("span");
    back.className = "card-face card-back";
    back.setAttribute("aria-hidden", "true");
    back.textContent = "⚽";

    const front = document.createElement("span");
    front.className = "card-face card-front";
    front.setAttribute("aria-hidden", "true");
    front.textContent = card.symbol;

    button.append(back, front);
    button.addEventListener("click", () => flipCard(card, button));
    els.board.appendChild(button);
  });
}

function cardButton(id) {
  return els.board.querySelector(`[data-id="${id}"]`);
}

function flipCard(card, button) {
  if (state.locked || button.classList.contains("is-flipped") || button.classList.contains("is-matched")) {
    return;
  }

  button.classList.add("is-flipped");
  button.setAttribute("aria-label", card.symbol);

  if (!state.first) {
    state.first = { card, button };
    els.feedback.textContent = "Выберите вторую карточку";
    return;
  }

  state.second = { card, button };
  state.moves += 1;
  updateStats();
  checkMatch();
}

function checkMatch() {
  const { first, second } = state;
  if (first.card.symbol === second.card.symbol) {
    first.button.classList.add("is-matched", "is-disabled");
    second.button.classList.add("is-matched", "is-disabled");
    state.matches += 1;
    state.first = null;
    state.second = null;
    updateStats();
    els.feedback.textContent = "Пара!";
    if (state.matches === LEVELS[state.level].pairs) {
      window.setTimeout(showResult, 450);
    }
    return;
  }

  state.locked = true;
  first.button.classList.add("is-wrong");
  second.button.classList.add("is-wrong");
  els.feedback.textContent = "Не пара — запомните и попробуйте снова";
  state.mismatchTimer = window.setTimeout(() => {
    first.button.classList.remove("is-flipped", "is-wrong");
    second.button.classList.remove("is-flipped", "is-wrong");
    first.button.setAttribute("aria-label", "Карточка рубашкой вверх");
    second.button.setAttribute("aria-label", "Карточка рубашкой вверх");
    state.first = null;
    state.second = null;
    state.locked = false;
    els.feedback.textContent = "Откройте две карточки";
  }, MISMATCH_DELAY);
}

function showResult() {
  const level = LEVELS[state.level];
  const next = NEXT_LEVEL[state.level];
  const elapsed = formatTime(Date.now() - state.startedAt);
  const perfect = state.moves === level.pairs;
  els.resultTitle.textContent = perfect ? "Идеальная память!" : "Все пары найдены";
  els.resultScore.textContent = `${state.moves} ${movesWord(state.moves)}`;
  els.resultText.textContent = `${level.label} за ${elapsed}. ${
    next ? "Можно перейти на следующий уровень." : "Это самый сложный уровень — сыграйте ещё раз."
  }`;
  els.next.hidden = !next;
  showScreen("result");
}

function movesWord(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "ход";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "хода";
  return "ходов";
}

document.querySelectorAll("[data-level]").forEach((button) => {
  button.addEventListener("click", () => startGame(button.dataset.level));
});

els.home.addEventListener("click", () => {
  if (state.mismatchTimer) window.clearTimeout(state.mismatchTimer);
  showScreen("start");
});

els.replay.addEventListener("click", () => startGame(state.level));

els.next.addEventListener("click", () => {
  const next = NEXT_LEVEL[state.level];
  if (next) startGame(next);
});

els.menu.addEventListener("click", () => showScreen("start"));

function setOfflineStatus(text) {
  const status = document.getElementById("offline-status");
  if (status) status.textContent = text;
}

async function prepareOffline() {
  if (!("serviceWorker" in navigator) || !("caches" in window)) {
    setOfflineStatus("Офлайн-режим в этом браузере недоступен. Откройте игру в Safari.");
    return;
  }

  try {
    setOfflineStatus("Сохраняем игру на iPad…");
    const registration = await navigator.serviceWorker.register("./service-worker.js?v=1", { scope: "./" });
    await navigator.serviceWorker.ready;
    if (registration.update) registration.update();
    setOfflineStatus("Игра сохранена. Можно играть без интернета.");
  } catch (error) {
    setOfflineStatus("Не удалось сохранить офлайн. Откройте сайт в Safari по Wi‑Fi.");
  }
}

prepareOffline();
