import { readJSON, writeJSON } from './storage.js';

export const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'ms', label: 'BM' },
];

const STRINGS = {
  appTitle: { en: 'Games & Prizes', zh: '游戏与奖品', ms: 'Permainan & Hadiah' },
  home: { en: 'Home', zh: '主页', ms: 'Utama' },
  trivia: { en: 'Trivia Quiz', zh: '常识问答', ms: 'Kuiz Trivia' },
  triviaDesc: {
    en: 'Questions, answers & fun facts',
    zh: '问题、答案和趣味知识',
    ms: 'Soalan, jawapan & fakta menarik',
  },
  bottle: { en: 'Roll the Bottle', zh: '滚瓶子', ms: 'Gulingkan Botol' },
  bottleDesc: {
    en: 'Prize wheel for every winner',
    zh: '成功了就转奖品轮盘',
    ms: 'Roda hadiah untuk setiap pemenang',
  },
  bottleHint: {
    en: 'Did the bottle stop on the target? Spin the wheel!',
    zh: '瓶子停在目标上了吗？来转轮盘吧！',
    ms: 'Botol berhenti di atas sasaran? Pusing roda!',
  },
  prizeWheel: { en: 'Prize Wheel', zh: '奖品轮盘', ms: 'Roda Hadiah' },
  spin: { en: 'SPIN!', zh: '转！', ms: 'PUSING!' },
  spinning: { en: 'Spinning…', zh: '转动中…', ms: 'Berpusing…' },
  spinTheWheel: { en: 'Spin the prize wheel', zh: '转奖品轮盘', ms: 'Pusing roda hadiah' },
  tissues: { en: 'Tissues', zh: '纸巾', ms: 'Tisu' },
  wipes: { en: 'Wet Wipes', zh: '湿纸巾', ms: 'Tisu Basah' },
  nothing: { en: 'Try Again', zh: '再接再厉', ms: 'Cuba Lagi' },
  youWon: { en: 'You won!', zh: '恭喜你赢了！', ms: 'Tahniah, anda menang!' },
  soClose: { en: 'So close!', zh: '差一点点！', ms: 'Hampir dapat!' },
  betterLuck: {
    en: 'Better luck next time!',
    zh: '下次一定好运！',
    ms: 'Semoga lebih bernasib baik lain kali!',
  },
  ok: { en: 'OK', zh: '好', ms: 'OK' },
  close: { en: 'Close', zh: '关闭', ms: 'Tutup' },
  qOf: { en: 'Question {n} of {total}', zh: '第 {n} 题（共 {total} 题）', ms: 'Soalan {n} daripada {total}' },
  reveal: { en: 'Reveal answer', zh: '显示答案', ms: 'Tunjuk jawapan' },
  hideAnswer: { en: 'Hide answer', zh: '隐藏答案', ms: 'Sembunyi jawapan' },
  funFact: { en: 'Fun fact', zh: '趣味知识', ms: 'Fakta menarik' },
  prev: { en: 'Previous', zh: '上一题', ms: 'Sebelum' },
  next: { en: 'Next', zh: '下一题', ms: 'Seterusnya' },
  goTo: { en: 'Go to question', zh: '跳到第几题', ms: 'Pergi ke soalan' },
  go: { en: 'Go', zh: '前往', ms: 'Pergi' },
  tally: {
    en: 'This laptop: {spins} spins · {tissues} tissues · {wipes} wet wipes given',
    zh: '本电脑：转了 {spins} 次 · 送出纸巾 {tissues} 包 · 湿纸巾 {wipes} 包',
    ms: 'Komputer ini: {spins} pusingan · {tissues} tisu · {wipes} tisu basah diberi',
  },
  resetTally: { en: 'Reset count', zh: '重置计数', ms: 'Set semula' },
  resetConfirm: {
    en: 'Reset the prize count on this laptop?',
    zh: '要重置本电脑的奖品计数吗？',
    ms: 'Set semula kiraan hadiah pada komputer ini?',
  },
  odds: { en: 'Prize odds', zh: '中奖几率', ms: 'Peluang hadiah' },
  sourceLink: {
    en: "✓ Using the organiser's settings link",
    zh: '✓ 已使用主办方的设置链接',
    ms: '✓ Menggunakan pautan tetapan penganjur',
  },
  sourceSaved: {
    en: '✓ Using settings saved on this laptop',
    zh: '✓ 使用本电脑已保存的设置',
    ms: '✓ Menggunakan tetapan yang disimpan pada komputer ini',
  },
  sourceDefault: {
    en: "Using default settings. Open the organiser's link if you were sent one.",
    zh: '正在使用默认设置。如果收到主办方的链接，请打开它。',
    ms: 'Menggunakan tetapan asal. Buka pautan penganjur jika anda menerimanya.',
  },
  settingsSummary: {
    en: '{seniors} seniors · {tissues} tissues · {wipes} wet wipes · {duration} min',
    zh: '{seniors} 位长者 · 纸巾 {tissues} 包 · 湿纸巾 {wipes} 包 · {duration} 分钟',
    ms: '{seniors} warga emas · {tissues} tisu · {wipes} tisu basah · {duration} minit',
  },
  organiserSetup: { en: 'Organiser setup', zh: '主办方设置', ms: 'Tetapan penganjur' },
  soundOn: { en: 'Sound on', zh: '声音开', ms: 'Bunyi hidup' },
  soundOff: { en: 'Sound off', zh: '声音关', ms: 'Bunyi mati' },
  introSlides: { en: 'Intro slides', zh: '介绍幻灯片', ms: 'Slaid pengenalan' },

  // Intro slides (/slides)
  welcome: { en: 'Welcome, everyone!', zh: '欢迎大家！', ms: 'Selamat datang semua!' },
  todaysGames: { en: "Today's games", zh: '今天的游戏', ms: 'Permainan hari ini' },
  triviaIntro: { en: 'Answer fun questions', zh: '回答有趣的问题', ms: 'Jawab soalan yang menarik' },
  bottleIntro: { en: 'Roll a bottle onto the target', zh: '把瓶子滚到目标上', ms: 'Gulingkan botol ke atas sasaran' },
  about25: { en: 'About 25 minutes', zh: '大约25分钟', ms: 'Kira-kira 25 minit' },
  sampleQuestion: { en: 'Sample question', zh: '例题', ms: 'Contoh soalan' },
  triviaRule: {
    en: 'Got it right? Spin the prize wheel!',
    zh: '答对了？就可以转奖品轮盘！',
    ms: 'Jawapan betul? Pusing roda hadiah!',
  },
  bottleStep1: {
    en: 'Take turns to roll the bottle along the table',
    zh: '大家轮流把瓶子在桌上滚出去',
    ms: 'Bergilir-gilir menggulingkan botol di atas meja',
  },
  bottleStep2: { en: 'Try to make it stop on the target', zh: '尽量让瓶子停在目标上', ms: 'Cuba pastikan ia berhenti di atas sasaran' },
  bottleStep3: {
    en: 'Stopped on the target? Spin the prize wheel!',
    zh: '停在目标上了？就可以转奖品轮盘！',
    ms: 'Berhenti di atas sasaran? Pusing roda hadiah!',
  },
  labelBottle: { en: 'Bottle', zh: '瓶子', ms: 'Botol' },
  labelTarget: { en: 'Target', zh: '目标', ms: 'Sasaran' },
  labelTable: { en: 'Table', zh: '桌子', ms: 'Meja' },
  wheelExplain: {
    en: 'Every time you win a game, you get to spin the wheel!',
    zh: '每次游戏成功，就可以转一次轮盘！',
    ms: 'Setiap kali anda berjaya, anda boleh memusing roda!',
  },
  youCouldWin: { en: 'You could win:', zh: '你可能会得到：', ms: 'Anda mungkin mendapat:' },
  haveFun: { en: 'Have fun!', zh: '玩得开心！', ms: 'Selamat bergembira!' },
  goodLuck: { en: 'Good luck, everyone!', zh: '祝大家好运！', ms: 'Semoga berjaya, semua!' },
  fullscreen: { en: 'Full screen', zh: '全屏', ms: 'Skrin penuh' },
};

const LANG_KEY = 'stw.lang';
let current = readJSON(LANG_KEY, 'en');
if (!LANGS.some((l) => l.code === current)) current = 'en';

export function getLang() {
  return current;
}

export function setLang(code) {
  current = code;
  writeJSON(LANG_KEY, code);
  document.documentElement.lang = code === 'zh' ? 'zh-Hans' : code;
}

export function t(key, vars = {}) {
  const entry = STRINGS[key];
  let s = entry ? entry[current] ?? entry.en : key;
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

/** Pick the current language from a {en, zh, ms} object (or return a plain string as-is). */
export function tr(text) {
  return typeof text === 'string' ? text : text[current] ?? text.en;
}
