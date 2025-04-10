// ✅ sparks.js with Spark Limit + Streak Tracker + Archive View + Tag Animation + Hover Effects + AI Inspiration

import { saveSpark, loadSparks, deleteSparkAt } from './storage.js';

const input = document.getElementById('spark-input');
const addBtn = document.getElementById('add-spark');
const list = document.getElementById('spark-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeBtn = document.getElementById('toggle-theme');
const archiveBtn = document.getElementById('view-archive');
const archiveSection = document.getElementById('spark-archive');
const inspireBtn = document.getElementById('inspire-btn');
const inspirationBox = document.getElementById('inspiration-box');
const themes = ['light', 'dark', 'calm'];

let currentFilter = 'all';
const MAX_SPARKS_PER_DAY = 5;
const META_KEY = 'sparks-meta';
const ARCHIVE_KEY = 'sparks-archive';

addBtn.addEventListener('click', handleAddSpark);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAddSpark();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.tag;
    renderAll();
  });
});

if (archiveBtn) {
  archiveBtn.addEventListener('click', () => {
    archiveSection.classList.toggle('visible');
    renderArchive();
  });
}

if (inspireBtn) {
  inspireBtn.addEventListener('click', () => {
    const sparkText = input.value.trim();
    if (!sparkText) return;

    // Simulated inspiration (replace with API later if needed)
    const variations = [
      `"${sparkText}" — what if this changed the world?`,
      `Expand on: ${sparkText}. Who would benefit?`,
      `Turn "${sparkText}" into a mission statement.`,
      `Add a poetic twist: ${sparkText}, then silence.`,
      `Imagine "${sparkText}" as a startup idea.`
    ];
    const suggestion = variations[Math.floor(Math.random() * variations.length)];
    inspirationBox.textContent = suggestion;
  });
}

function handleAddSpark() {
  const text = input.value.trim();
  if (!text || text.split(' ').length > 10) return;

  if (!canAddSpark()) {
    alert("You've reached your 5 spark limit for today. Come back tomorrow ✨");
    return;
  }

  const tag = detectTag(text);
  const spark = { text, tag };
  saveSpark(spark);
  archiveSpark(spark);
  input.value = '';
  inspirationBox.textContent = '';
  incrementSparkCount();
  renderAll(true);
}

function detectTag(text) {
  if (text.includes('#🔥')) return '🔥';
  if (text.includes('#💡')) return '💡';
  if (text.includes('#💭')) return '💭';
  return '';
}

function getTagClass(tag) {
  switch (tag) {
    case '🔥': return 'tag-fire';
    case '💡': return 'tag-idea';
    case '💭': return 'tag-thought';
    default: return '';
  }
}

function renderAll(isNew = false) {
  const sparks = loadSparks();
  list.innerHTML = '';

  sparks.forEach((spark, index) => {
    if (currentFilter === 'all' || spark.tag === currentFilter) {
      renderSpark(spark, index, isNew && index === 0);
    }
  });

  updateSparkUI();
}

function renderSpark(spark, index, isNew = false) {
  const li = document.createElement('li');
  const tagClass = getTagClass(spark.tag);

  li.innerHTML = `
    <span>${spark.text}</span>
    <span class="spark-tag ${tagClass}">${spark.tag || ''}</span>
    <button class="delete-btn" title="Delete Spark">✖</button>
  `;

  if (isNew) {
    li.classList.add('added');
    setTimeout(() => li.classList.remove('added'), 600);
  }

  li.querySelector('.delete-btn').addEventListener('click', () => {
    deleteSparkAt(index);
    renderAll();
  });

  list.appendChild(li);
}

function renderArchive() {
  const container = archiveSection;
  container.innerHTML = '<h2>📅 Archive</h2>';
  const archive = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || {};

  Object.keys(archive).sort().reverse().forEach(date => {
    const group = document.createElement('div');
    group.className = 'archive-day';

    const header = document.createElement('h3');
    header.textContent = date;
    group.appendChild(header);

    const ul = document.createElement('ul');
    archive[date].forEach(spark => {
      const tagClass = getTagClass(spark.tag);
      const li = document.createElement('li');
      li.innerHTML = `<span>${spark.text}</span> <span class="spark-tag ${tagClass}">${spark.tag || ''}</span>`;
      ul.appendChild(li);
    });

    group.appendChild(ul);
    container.appendChild(group);
  });
}

function archiveSpark(spark) {
  const key = getTodayKey();
  const archive = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || {};
  if (!archive[key]) archive[key] = [];
  archive[key].unshift(spark);
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
}

function applyTheme(theme) {
  themes.forEach(t => document.body.classList.remove(t));
  document.body.classList.add(theme);
  localStorage.setItem('sparks-theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('sparks-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const starting = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(starting);
}

let currentThemeIndex = 0;

themeBtn.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme(themes[currentThemeIndex]);
});

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function loadMeta() {
  const saved = localStorage.getItem(META_KEY);
  return saved ? JSON.parse(saved) : { streak: 0, lastDate: '', sparksToday: 0 };
}

function saveMeta(meta) {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}

function updateSparkMeta() {
  const today = getTodayKey();
  let meta = loadMeta();

  if (meta.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().split('T')[0];

    meta.streak = meta.lastDate === yKey ? meta.streak + 1 : 1;
    meta.sparksToday = 0;
    meta.lastDate = today;
    saveMeta(meta);
  }

  return meta;
}

function incrementSparkCount() {
  const meta = updateSparkMeta();
  meta.sparksToday += 1;
  saveMeta(meta);
  updateSparkUI();
}

function getRemainingToday() {
  const meta = updateSparkMeta();
  return MAX_SPARKS_PER_DAY - meta.sparksToday;
}

function canAddSpark() {
  return getRemainingToday() > 0;
}

function updateSparkUI() {
  const meta = loadMeta();
  const counter = document.getElementById('spark-counter');
  if (counter) {
    counter.textContent = `🧠 Sparks today: ${meta.sparksToday} / ${MAX_SPARKS_PER_DAY} | 🔥 Streak: ${meta.streak} day${meta.streak === 1 ? '' : 's'}`;
  }
}

renderAll();
initTheme();