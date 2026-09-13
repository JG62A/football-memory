var ALL_SYMBOLS = [
  "⚽",
  "🧤",
  "🥅",
  "🏆",
  "👕",
  "👟",
  "🏟️",
  "🥇",
  "🚩",
  "⏱️",
  "🎽",
  "🏅",
  "🎯",
  "📣",
  "⭐",
  "🔔",
  "🥁",
  "🎺",
];
var MISMATCH_DELAY = 800;
var NEXT_LEVEL = { easy: "medium", medium: "hard", hard: null };

var VIRSLIGA_CLUBS = [
  {
    id: "daugavpils",
    name: "BFC Daugavpils",
    logo: "clubs/daugavpils.png",
    fact:
      "BFC Daugavpils — клуб из самого восточного города Латвии, Даугавпилса. Домашние матчи играет на стадионе «Эспланада». Это главный представитель Латгалии в Tonybet Virslīga.",
  },
  {
    id: "rfs",
    name: "FC RFS",
    logo: "clubs/rfs.png",
    fact:
      "FC RFS — рижская футбольная школа и один из сильнейших клубов страны. Играет на LNK Sporta Parks. Несколько раз выигрывал чемпионат Латвии и регулярно выступает в еврокубках.",
  },
  {
    id: "auda",
    name: "FK Auda",
    logo: "clubs/auda.png",
    fact:
      "FK Auda — клуб из Кекавы рядом с Ригой. В высшей лиге домашние матчи проводит на стадионе Skonto. В 2022 году выиграл Кубок Латвии и с тех пор держится среди лидеров Virslīga.",
  },
  {
    id: "grobina",
    name: "FK Grobiņa",
    logo: "clubs/grobina.png",
    fact:
      "FK Grobiņa представляет курземский город Гробиня. В Virslīga домашние матчи играет на стадионе «Даугава» в Лиепае. В элите латвийского футбола клуб относительно недавно.",
  },
  {
    id: "liepaja",
    name: "FK Liepāja",
    logo: "clubs/liepaja.png",
    fact:
      "FK Liepāja — клуб приморского города Лиепая. Чемпион Латвии 2015 года. Домашняя арена — стадион «Даугава», один из самых известных футбольных стадионов страны.",
  },
  {
    id: "tukums",
    name: "FK Tukums 2000",
    logo: "clubs/tukums.png",
    fact:
      "FK Tukums 2000 — клуб из Тукумса в Земгале. Играет на городском стадионе Тукумса. В высшую лигу пробился в начале 2020-х и с тех пор борется за место в элите.",
  },
  {
    id: "jelgava",
    name: "FS Jelgava",
    logo: "clubs/jelgava.png",
    fact:
      "FS Jelgava — футбольная школа Елгавы, продолжатель городских футбольных традиций. Домашние матчи проводит на стадионе Земгальского олимпийского центра.",
  },
  {
    id: "ogre",
    name: "Ogre United",
    logo: "clubs/ogre.png",
    fact:
      "Ogre United — новичок Tonybet Virslīga сезона 2026: клуб вышел из Первой лиги. Представляет город Огре и играет на Ogres stadions.",
  },
  {
    id: "riga",
    name: "Riga FC",
    logo: "clubs/riga.png",
    fact:
      "Riga FC основан в 2014 году и несколько раз становился чемпионом Латвии. Домашние матчи играет на стадионе Skonto. Главный соперник RFS в рижском дерби.",
  },
  {
    id: "supernova",
    name: "SK Super Nova",
    logo: "clubs/supernova.png",
    fact:
      "SK Super Nova — рижский клуб с сильной молодёжной школой. Домашняя арена — стадион имени Яниса Скределиса. Несколько раз возвращался в высшую лигу и снова играет в Virslīga.",
  },
];

var WORLD_CLUBS = [
  {
    id: "realmadrid",
    name: "Real Madrid",
    logo: "clubs/world/realmadrid.png",
    fact:
      "Real Madrid — самый титулованный клуб Лиги чемпионов. Играет на «Сантьяго Бернабеу» в Мадриде. Белый цвет формы стал символом клуба по всему миру.",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    logo: "clubs/world/barcelona.png",
    fact:
      "FC Barcelona — каталонский гранд со стадиона «Камп Ноу». Девиз клуба — «больше, чем клуб». Знаменит школой Ла Масия и атакующим стилем.",
  },
  {
    id: "manutd",
    name: "Manchester United",
    logo: "clubs/world/manutd.png",
    fact:
      "Manchester United — один из самых популярных клубов мира. Домашняя арена — «Олд Траффорд». Эпоха сэра Алекса Фергюсона сделала клуб символом английского футбола.",
  },
  {
    id: "bayern",
    name: "Bayern Munich",
    logo: "clubs/world/bayern.png",
    fact:
      "Бавария — главный клуб Германии и рекордсмен Бундеслиги. Играет на «Альянц Арене» в Мюнхене. Красный цвет и бриллиант на эмблеме узнают во всём мире.",
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "clubs/world/liverpool.png",
    fact:
      "Liverpool — клуб с гимном You'll Never Walk Alone. Домашний стадион — «Энфилд». Знаменит европейскими победами и красной формой.",
  },
  {
    id: "mancity",
    name: "Manchester City",
    logo: "clubs/world/mancity.png",
    fact:
      "Manchester City в 2010-х стал одним из сильнейших клубов Европы. Играет на «Этихад Стэдиум». Голубая форма и круглая эмблема с кораблём — его визитная карточка.",
  },
  {
    id: "psg",
    name: "Paris Saint-Germain",
    logo: "clubs/world/psg.png",
    fact:
      "PSG — главный клуб Парижа и лидер чемпионата Франции. Домашняя арена — «Парк де Пренс». Эмблема с Эйфелевой башней отражает столичный статус.",
  },
  {
    id: "juventus",
    name: "Juventus",
    logo: "clubs/world/juventus.png",
    fact:
      "Ювентус — самый титулованный клуб Италии. Играет в Турине, на «Ювентус Стэдиум». Чёрно-белые полосы — одна из самых известных форм в футболе.",
  },
  {
    id: "chelsea",
    name: "Chelsea",
    logo: "clubs/world/chelsea.png",
    fact:
      "Chelsea — лондонский клуб со стадиона «Стэмфорд Бридж». Несколько раз выигрывал Лигу чемпионов. Синяя форма дала прозвище The Blues.",
  },
  {
    id: "arsenal",
    name: "Arsenal",
    logo: "clubs/world/arsenal.png",
    fact:
      "Arsenal — исторический клуб Северного Лондона. С 2006 года играет на «Эмирейтс». Пушка на эмблеме — главный символ «канониров».",
  },
  {
    id: "acmilan",
    name: "AC Milan",
    logo: "clubs/world/acmilan.png",
    fact:
      "Милан — один из грандов Италии и Европы. Делит «Сан-Сиро» с Интером. Красно-чёрные полосы и множество европейских кубков — лицо клуба.",
  },
  {
    id: "inter",
    name: "Inter Milan",
    logo: "clubs/world/inter.png",
    fact:
      "Интер — миланский клуб, который тоже играет на «Сан-Сиро». Сине-чёрные цвета дали прозвище Nerazzurri. В 2010 году взял требл: лигу, кубок и Лигу чемпионов.",
  },
  {
    id: "dortmund",
    name: "Borussia Dortmund",
    logo: "clubs/world/dortmund.png",
    fact:
      "Боруссия Дортмунд знаменита жёлто-чёрными цветами и «Жёлтой стеной» на «Сигнал Идуна Парк». Один из самых атмосферных клубов Германии.",
  },
  {
    id: "atletico",
    name: "Atlético Madrid",
    logo: "clubs/world/atletico.png",
    fact:
      "Атлетико — второй великий клуб Мадрида. Играет на «Метрополитано». Красно-белые полоски и боевой стиль — его визитная карточка.",
  },
  {
    id: "ajax",
    name: "Ajax",
    logo: "clubs/world/ajax.png",
    fact:
      "Аякс — легенда Нидерландов и школа тотального футбола. Домашняя арена — «Йохан Кройфф Арена» в Амстердаме. С эмблемы смотрит грек Аякс.",
  },
  {
    id: "tottenham",
    name: "Tottenham",
    logo: "clubs/world/tottenham.png",
    fact:
      "Тоттенхэм — клуб Северного Лондона и принципиальный соперник Арсенала. Играет на современном Tottenham Hotspur Stadium. Петух на эмблеме — старый символ клуба.",
  },
  {
    id: "napoli",
    name: "Napoli",
    logo: "clubs/world/napoli.png",
    fact:
      "Наполи — главный клуб Неаполя. Играет на стадионе Диего Марадоны. Голубая форма и любовь города сделали клуб символом Южной Италии.",
  },
  {
    id: "roma",
    name: "AS Roma",
    logo: "clubs/world/roma.png",
    fact:
      "Рома представляет столицу Италии. Домашние матчи проводит на «Стадио Олимпико». Волчица на эмблеме отсылает к легенде об основании Рима.",
  },
  {
    id: "benfica",
    name: "Benfica",
    logo: "clubs/world/benfica.png",
    fact:
      "Бенфика — самый титулованный клуб Португалии. Играет в Лиссабоне на «Эштадиу да Луш». Орёл на эмблеме — один из самых узнаваемых символов страны.",
  },
  {
    id: "porto",
    name: "FC Porto",
    logo: "clubs/world/porto.png",
    fact:
      "Порту — гранд севера Португалии и многократный чемпион страны. Домашняя арена — «Драган». Сине-белые цвета и дракон связаны с городом Порту.",
  },
  {
    id: "celtic",
    name: "Celtic",
    logo: "clubs/world/celtic.png",
    fact:
      "Селтик — легендарный клуб Глазго. Играет на «Селтик Парк». Зелёно-белые обручи и противостояние с Рейнджерс — Old Firm — известны во всём мире.",
  },
  {
    id: "boca",
    name: "Boca Juniors",
    logo: "clubs/world/boca.png",
    fact:
      "Бока Хуниорс — самый популярный клуб Аргентины. Домашняя Бомбонера в Буэнос-Айресе считается уникальной ареной. Сине-жёлтые цвета узнают в Южной Америке сразу.",
  },
  {
    id: "river",
    name: "River Plate",
    logo: "clubs/world/river.png",
    fact:
      "Ривер Плейт — гранд Буэнос-Айреса и главный соперник Боки. Играет на «Монументаль». Красная диагональная полоса на белой форме — символ клуба.",
  },
  {
    id: "flamengo",
    name: "Flamengo",
    logo: "clubs/world/flamengo.png",
    fact:
      "Фламенго — самый популярный клуб Бразилии. Базируется в Рио-де-Жанейро. Красно-чёрные цвета и огромная армия болельщиков делают его одним из гигантов мира.",
  },
  {
    id: "santos",
    name: "Santos",
    logo: "clubs/world/santos.png",
    fact:
      "Сантос — клуб, в котором вырос Пеле. Играет в бразильском штате Сан-Паулу. Белая форма и чёрно-белая эмблема связаны с золотой эрой бразильского футбола.",
  },
  {
    id: "alhilal",
    name: "Al-Hilal",
    logo: "clubs/world/alhilal.png",
    fact:
      "Аль-Хиляль — самый титулованный клуб Саудовской Аравии и Азии. Играет в Эр-Рияде. Синяя форма и лунный полумесяц на эмблеме дали клубу прозвище «лидер».",
  },
  {
    id: "galatasaray",
    name: "Galatasaray",
    logo: "clubs/world/galatasaray.png",
    fact:
      "Галатасарай — один из трёх грандов Стамбула. Домашняя арена — «Неф стэдиум». Жёлто-красные цвета и атмосфера дерби — визитная карточка турецкого футбола.",
  },
  {
    id: "marseille",
    name: "Marseille",
    logo: "clubs/world/marseille.png",
    fact:
      "Олимпик Марсель — единственный французский победитель Лиги чемпионов. Играет на «Велодром». Бирюзово-белые цвета и девиз Droit au but известны всей Франции.",
  },
  {
    id: "sporting",
    name: "Sporting CP",
    logo: "clubs/world/sporting.png",
    fact:
      "Спортинг — лиссабонский гранд, воспитавший Криштиану Роналду. Играет на «Жозе Алваладе». Зелёный цвет и лев на эмблеме — символы клуба.",
  },
  {
    id: "intermiami",
    name: "Inter Miami",
    logo: "clubs/world/intermiami.png",
    fact:
      "Интер Майами — клуб MLS из Флориды. После прихода Месси стал одним из самых известных клубов Америки. Розовые цвета выделяют его среди остальных команд.",
  },
];

var CLUB_SETS = {
  latvia: {
    id: "latvia",
    label: "Клубы Латвии",
    resultText: "Это клубы Tonybet Virslīga.",
    clubs: VIRSLIGA_CLUBS,
  },
  popular: {
    id: "popular",
    label: "Клубы популярные",
    resultText: "Это 30 самых известных футбольных клубов мира.",
    clubs: WORLD_CLUBS,
  },
};

var CLUB_SAY = {
  daugavpils: "Даугавпилс",
  rfs: "Р Ф С",
  auda: "Ауда",
  grobina: "Гробиня",
  liepaja: "Лиепая",
  tukums: "Тукумс две тысячи",
  jelgava: "Елгава",
  ogre: "Огре Юнайтед",
  riga: "Рига эф си",
  supernova: "Супер Нова",
  realmadrid: "Реал Мадрид",
  barcelona: "Барселона",
  manutd: "Манчестер Юнайтед",
  bayern: "Бавария Мюнхен",
  liverpool: "Ливерпуль",
  mancity: "Манчестер Сити",
  psg: "П С Ж",
  juventus: "Ювентус",
  chelsea: "Челси",
  arsenal: "Арсенал",
  acmilan: "Милан",
  inter: "Интер Милан",
  dortmund: "Боруссия Дортмунд",
  atletico: "Атлетико Мадрид",
  ajax: "Аякс",
  tottenham: "Тоттенхэм",
  napoli: "Наполи",
  roma: "Рома",
  benfica: "Бенфика",
  porto: "Порту",
  celtic: "Селтик",
  boca: "Бока Хуниорс",
  river: "Ривер Плейт",
  flamengo: "Фламенго",
  santos: "Сантос",
  alhilal: "Аль Хиляль",
  galatasaray: "Галатасарай",
  marseille: "Марсель",
  sporting: "Спортинг",
  intermiami: "Интер Майами",
};

var LEVELS = {
  easy: { id: "easy", label: "6 карточек", pairs: 3, cards: 6 },
  medium: { id: "medium", label: "12 карточек", pairs: 6, cards: 12 },
  hard: { id: "hard", label: "6 × 6", pairs: 18, cards: 36 },
};

var screens = {
  start: document.getElementById("start-screen"),
  play: document.getElementById("play-screen"),
  clubs: document.getElementById("clubs-screen"),
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
  clubsStats: document.getElementById("clubs-stats"),
  clubsFeedback: document.getElementById("clubs-feedback"),
  clubLogo: document.getElementById("club-logo"),
  clubNamePrompt: document.getElementById("club-name-prompt"),
  clubPromptCard: document.getElementById("club-prompt-card"),
  clubFact: document.getElementById("club-fact"),
  clubAnswers: document.getElementById("club-answers"),
  clubNext: document.getElementById("club-next-btn"),
  clubChip: document.querySelector("#clubs-screen .mode-chip"),
  clubSpeak: document.getElementById("club-speak-btn"),
};

var state = {
  game: "memory",
  level: "easy",
  deck: [],
  first: null,
  second: null,
  locked: false,
  moves: 0,
  matches: 0,
  startedAt: 0,
  mismatchTimer: null,
  clubOrder: [],
  clubIndex: 0,
  clubScore: 0,
  clubTried: false,
  clubKind: "logo",
  clubSet: "latvia",
};

var sound = {
  enabled: true,
  music: null,
  clap: null,
};

function setupAudio() {
  if (sound.music) return;
  sound.music = document.getElementById("music-el");
  sound.clap = document.getElementById("applause-el");
  if (sound.music) {
    sound.music.loop = true;
    sound.music.volume = 0.5;
  }
  if (sound.clap) sound.clap.volume = 1;
}

function playEl(el) {
  if (!el) return;
  try {
    var result = el.play();
    if (result && result.catch) result.catch(function () {});
  } catch (error) {}
}

function startMusic() {
  setupAudio();
  if (!sound.enabled || !sound.music) return;
  playEl(sound.music);
}

function stopMusic() {
  setupAudio();
  if (sound.music) {
    try {
      sound.music.pause();
    } catch (error) {}
  }
}

function playApplause() {
  setupAudio();
  if (!sound.enabled || !sound.clap) return;
  try {
    sound.clap.pause();
    sound.clap.currentTime = 0;
  } catch (error) {}
  playEl(sound.clap);
}

function spokenName(club) {
  if (!club) return "";
  return CLUB_SAY[club.id] || club.name;
}

function restoreMusicVolume() {
  if (sound.music) sound.music.volume = 0.5;
}

function pickRussianVoice() {
  var voices = window.speechSynthesis.getVoices() || [];
  var i;
  for (i = 0; i < voices.length; i += 1) {
    if (voices[i].lang && voices[i].lang.toLowerCase().indexOf("ru") === 0) {
      return voices[i];
    }
  }
  return null;
}

function speakText(text, onDone) {
  if (!text || !window.speechSynthesis) {
    if (onDone) onDone();
    return;
  }
  try {
    window.speechSynthesis.cancel();
  } catch (error) {}
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = 0.82;
  utterance.pitch = 1;
  var voice = pickRussianVoice();
  if (voice) utterance.voice = voice;
  if (sound.music && sound.enabled && !sound.music.paused) {
    sound.music.volume = 0.08;
  }
  utterance.onend = function () {
    restoreMusicVolume();
    if (onDone) onDone();
  };
  utterance.onerror = function () {
    restoreMusicVolume();
    if (onDone) onDone();
  };
  try {
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    restoreMusicVolume();
    if (onDone) onDone();
  }
}

function speakClubName(club) {
  speakText(spokenName(club));
}

function updateSoundButtons() {
  var startBtn = document.getElementById("sound-start-btn");
  var playBtn = document.getElementById("sound-play-btn");
  var clubsBtn = document.getElementById("sound-clubs-btn");
  var playing = sound.music && !sound.music.paused;
  if (startBtn) {
    if (!sound.enabled) startBtn.textContent = "🔇 Звук выключен";
    else if (playing) startBtn.textContent = "🔊 Звук включён";
    else startBtn.textContent = "🔊 Нажмите, чтобы включить звук";
  }
  if (playBtn) playBtn.textContent = sound.enabled ? "🔊" : "🔇";
  if (clubsBtn) clubsBtn.textContent = sound.enabled ? "🔊" : "🔇";
}

function toggleSound() {
  setupAudio();
  if (sound.enabled && sound.music && sound.music.paused) {
    startMusic();
    updateSoundButtons();
    return;
  }
  sound.enabled = !sound.enabled;
  if (sound.enabled) {
    startMusic();
  } else {
    stopMusic();
  }
  updateSoundButtons();
}

function bindTap(el, fn) {
  if (!el) return;
  el.addEventListener(
    "touchstart",
    function (event) {
      event.preventDefault();
      fn();
    },
    false
  );
  el.addEventListener("click", fn, false);
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
    if (!screen) continue;
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
  var chosen = shuffle(ALL_SYMBOLS).slice(0, pairs);
  var cards = [];
  var i;
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

function clubPool() {
  var set = CLUB_SETS[state.clubSet] || CLUB_SETS.latvia;
  return set.clubs;
}

function pickClubOptions(club) {
  var others = [];
  var pool = clubPool();
  var i;
  for (i = 0; i < pool.length; i += 1) {
    if (pool[i].id !== club.id) others.push(pool[i]);
  }
  others = shuffle(others).slice(0, 3);
  others.push(club);
  return shuffle(others);
}

function buildClubRound() {
  var clubs = shuffle(clubPool().slice());
  var kinds = [];
  var i;
  for (i = 0; i < clubs.length; i += 1) {
    kinds.push(i % 2 === 0 ? "logo" : "name");
  }
  kinds = shuffle(kinds);
  return clubs.map(function (club, index) {
    return { club: club, kind: kinds[index] };
  });
}

function startClubsQuiz(setId) {
  startMusic();
  if (setId && CLUB_SETS[setId]) state.clubSet = setId;
  var set = CLUB_SETS[state.clubSet] || CLUB_SETS.latvia;
  state.game = "clubs";
  state.clubOrder = buildClubRound();
  state.clubIndex = 0;
  state.clubScore = 0;
  state.startedAt = Date.now();
  if (els.clubChip) els.clubChip.textContent = set.label;
  showClubQuestion();
  showScreen("clubs");
}

function showClubQuestion() {
  var round = state.clubOrder[state.clubIndex];
  var club = round.club;
  var kind = round.kind;
  var options = pickClubOptions(club);
  var i;
  state.clubTried = false;
  state.locked = false;
  state.clubKind = kind;
  els.clubsStats.textContent = state.clubIndex + 1 + " / " + state.clubOrder.length;
  els.clubFact.textContent = "";
  els.clubFact.setAttribute("hidden", "hidden");
  els.clubNext.setAttribute("hidden", "hidden");
  els.clubNext.textContent =
    state.clubIndex === state.clubOrder.length - 1 ? "К результату" : "Дальше";

  if (kind === "name") {
    els.clubsFeedback.textContent = "Какая эмблема у этого клуба?";
    els.clubLogo.setAttribute("hidden", "hidden");
    els.clubLogo.removeAttribute("src");
    els.clubNamePrompt.textContent = club.name;
    els.clubNamePrompt.removeAttribute("hidden");
    els.clubPromptCard.className = "club-logo-card is-name";
    els.clubAnswers.className = "club-answers is-emblems";
    if (els.clubSpeak) {
      els.clubSpeak.removeAttribute("hidden");
      els.clubSpeak.setAttribute("data-club-id", club.id);
    }
    speakClubName(club);
  } else {
    els.clubsFeedback.textContent = "Что это за клуб?";
    els.clubNamePrompt.textContent = "";
    els.clubNamePrompt.setAttribute("hidden", "hidden");
    els.clubLogo.src = club.logo;
    els.clubLogo.alt = "Эмблема клуба";
    els.clubLogo.removeAttribute("hidden");
    els.clubPromptCard.className = "club-logo-card";
    els.clubAnswers.className = "club-answers";
    if (els.clubSpeak) els.clubSpeak.setAttribute("hidden", "hidden");
  }

  clearElement(els.clubAnswers);
  for (i = 0; i < options.length; i += 1) {
    els.clubAnswers.appendChild(makeClubChoice(options[i], club, kind));
  }
}

function makeClubChoice(option, correct, kind) {
  var button = document.createElement("button");
  button.type = "button";
  if (kind === "name") {
    var img = document.createElement("img");
    img.src = option.logo;
    img.alt = option.name;
    button.className = "club-choice is-emblem";
    button.appendChild(img);
    button.setAttribute("aria-label", option.name);
  } else {
    var label = document.createElement("span");
    label.className = "club-choice-name";
    label.textContent = option.name;
    var speakBtn = document.createElement("span");
    speakBtn.className = "club-choice-speak";
    speakBtn.setAttribute("role", "button");
    speakBtn.setAttribute("aria-label", "Прослушать " + option.name);
    speakBtn.textContent = "🔊";
    speakBtn.addEventListener(
      "touchstart",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        speakClubName(option);
      },
      false
    );
    speakBtn.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        speakClubName(option);
      },
      false
    );
    button.className = "club-choice has-speak";
    button.appendChild(label);
    button.appendChild(speakBtn);
  }
  button.addEventListener("click", function () {
    answerClub(button, option, correct);
  });
  return button;
}

function answerClub(button, option, correct) {
  if (state.locked) return;
  if (option.id !== correct.id) {
    button.className = button.className + " is-wrong is-disabled";
    state.clubTried = true;
    els.clubsFeedback.textContent = "Неправильно";
    speakText("Неправильно");
    return;
  }

  state.locked = true;
  if (!state.clubTried) state.clubScore += 1;
  button.className = button.className + " is-correct";
  disableOtherClubChoices(button);
  els.clubsFeedback.textContent = "Правильно! Это " + correct.name;
  els.clubFact.textContent = correct.fact;
  els.clubFact.removeAttribute("hidden");
  els.clubNext.removeAttribute("hidden");
  speakText("Правильно. Это " + spokenName(correct), function () {
    playApplause();
  });
}

function disableOtherClubChoices(correctButton) {
  var buttons = els.clubAnswers.querySelectorAll(".club-choice");
  var i;
  for (i = 0; i < buttons.length; i += 1) {
    if (buttons[i] !== correctButton) {
      if (buttons[i].className.indexOf("is-wrong") === -1) {
        buttons[i].className = buttons[i].className + " is-disabled";
      }
    }
  }
}

function goNextClub() {
  if (state.clubIndex >= state.clubOrder.length - 1) {
    showClubsResult();
    return;
  }
  state.clubIndex += 1;
  showClubQuestion();
}

function showClubsResult() {
  var elapsed = formatTime(Date.now() - state.startedAt);
  var total = state.clubOrder.length;
  var perfect = state.clubScore === total;
  var set = CLUB_SETS[state.clubSet] || CLUB_SETS.latvia;
  document.querySelector("#result-screen .eyebrow").textContent = perfect ? "Гол!" : "Финал";
  els.resultTitle.textContent = perfect ? "Все клубы с первой попытки!" : "Вы узнали " + set.label.toLowerCase();
  els.resultScore.textContent = state.clubScore + " из " + total;
  els.resultText.textContent =
    "Правильных ответов с первой попытки: " +
    state.clubScore +
    ". Игра заняла " +
    elapsed +
    ". " +
    set.resultText;
  els.next.setAttribute("hidden", "hidden");
  showScreen("result");
}

function startGame(levelId) {
  startMusic();
  state.game = "memory";
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
  document.querySelector("#result-screen .eyebrow").textContent = "Гол!";
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
      button.addEventListener(
        "touchstart",
        function () {
          startMusic();
        },
        false
      );
      button.addEventListener(
        "click",
        function () {
          startMusic();
          startGame(button.getAttribute("data-level"));
        },
        false
      );
    })(buttons[i]);
  }
}

bindLevelButtons();

bindTap(document.getElementById("sound-start-btn"), toggleSound);
bindTap(document.getElementById("sound-play-btn"), toggleSound);
bindTap(document.getElementById("sound-clubs-btn"), toggleSound);
setupAudio();
updateSoundButtons();

var clubsStartBtn = document.querySelector("[data-game='clubs']");
if (clubsStartBtn) {
  clubsStartBtn.addEventListener(
    "touchstart",
    function () {
      startMusic();
    },
    false
  );
  clubsStartBtn.addEventListener(
    "click",
    function () {
      startMusic();
      startClubsQuiz("latvia");
    },
    false
  );
}

var clubSetButtons = document.querySelectorAll("[data-club-set]");
var clubSetIndex;
for (clubSetIndex = 0; clubSetIndex < clubSetButtons.length; clubSetIndex += 1) {
  (function (button) {
    button.addEventListener(
      "touchstart",
      function () {
        startMusic();
      },
      false
    );
    button.addEventListener(
      "click",
      function () {
        startMusic();
        startClubsQuiz(button.getAttribute("data-club-set"));
      },
      false
    );
  })(clubSetButtons[clubSetIndex]);
}

if (els.home) {
  els.home.addEventListener("click", function () {
    if (state.mismatchTimer) window.clearTimeout(state.mismatchTimer);
    showScreen("start");
  });
}

if (document.getElementById("clubs-home-btn")) {
  document.getElementById("clubs-home-btn").addEventListener("click", function () {
    showScreen("start");
  });
}

if (els.clubSpeak) {
  bindTap(els.clubSpeak, function () {
    var round = state.clubOrder[state.clubIndex];
    if (round && round.club) speakClubName(round.club);
  });
}

if (els.clubNext) {
  els.clubNext.addEventListener("click", function () {
    goNextClub();
  });
}

if (els.replay) {
  els.replay.addEventListener("click", function () {
    if (state.game === "clubs") startClubsQuiz();
    else startGame(state.level);
  });
}

if (els.next) {
  els.next.addEventListener("click", function () {
    var next = NEXT_LEVEL[state.level];
    if (next) startGame(next);
  });
}

if (els.menu) {
  els.menu.addEventListener("click", function () {
    showScreen("start");
  });
}

function setOfflineStatus(text) {
  var status = document.getElementById("offline-status");
  if (status) status.textContent = text;
}

function assetDir() {
  var scripts = document.getElementsByTagName("script");
  var i;
  for (i = 0; i < scripts.length; i += 1) {
    if (scripts[i].src && scripts[i].src.indexOf("app.js") !== -1) {
      return scripts[i].src.replace(/app\.js.*$/, "");
    }
  }
  return "./";
}

function prepareOffline() {
  if (!("serviceWorker" in navigator)) {
    setOfflineStatus("Можно играть. Офлайн-режим на этом Safari ограничен.");
    return;
  }

  setOfflineStatus("Сохраняем игру на iPad…");
  navigator.serviceWorker
    .register(assetDir() + "service-worker.js?v=11")
    .then(function () {
      setOfflineStatus("Игра готова. Можно играть.");
    })
    .catch(function () {
      setOfflineStatus("Играть можно. Офлайн может быть недоступен.");
    });
}

prepareOffline();
