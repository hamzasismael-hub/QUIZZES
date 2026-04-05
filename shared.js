/* shared.js — دوال مشتركة بين جميع الصفحات */

// ─── THEME ───────────────────────────────────────
const THEME_KEY = 'bq-theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(saved);
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(THEME_KEY, t);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

// ─── BREADCRUMB ───────────────────────────────────
function renderBreadcrumb(items) {
  // items: [{label, href?}] — last item = current (no link)
  const bc = document.getElementById('breadcrumb-inner');
  if (!bc) return;
  bc.innerHTML = items.map((item, i) => {
    const last = i === items.length - 1;
    if (last) return `<span class="bc-cur">${item.label}</span>`;
    return `<a class="bc-link" href="${item.href || '#'}">${item.label}</a>
            <span class="bc-sep">›</span>`;
  }).join('');
}

// ─── URL PARAMS ───────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ─── FETCH QUIZ DATA ──────────────────────────────
async function loadQuizData(compId, formId) {
  const path = `data/q-${compId}-${formId}.json`;
  const res = await fetch(path);
  if (!res.ok) throw new Error(`لم يُعثر على الملف: ${path}`);
  return res.json();
}

async function loadMeta() {
  const res = await fetch('data/meta.json');
  if (!res.ok) throw new Error('لم يُعثر على ملف البيانات');
  return res.json();
}

// ─── SPINNER ──────────────────────────────────────
function showLoading(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `
    <div class="loading-screen">
      <div class="spinner"></div>
      <span>جاري التحميل...</span>
    </div>`;
}

function showError(containerId, msg) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="error-box">⚠️ ${msg}</div>`;
}

// ─── INIT ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
});
