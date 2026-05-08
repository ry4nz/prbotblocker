const DEFAULT_BOTS = [
  'github-actions',
  'dependabot',
  'copilot',
  'coderabbitai',
  'codecov',
  'codecov-commenter',
  'sonarcloud',
  'sonarqubecloud',
  'renovate',
  'vercel',
  'netlify',
  'mirantiscontainers-bot'
];

let botSet = new Set();

function normalize(name) {
  return (name || '').trim().toLowerCase().replace(/\[bot\]$/, '');
}

function isApplicablePage() {
  return /\/(pull|issues|discussions)\//.test(location.pathname);
}

const TOP_LEVEL_CONTAINERS = [
  '.js-timeline-item',
  '.timeline-comment',
  '.js-comment-container'
].join(',');

function hideComments() {
  if (botSet.size === 0 || !isApplicablePage()) return;

  document.querySelectorAll('a.author').forEach(authorEl => {
    const name = normalize(authorEl.textContent);
    if (!botSet.has(name)) return;

    const reviewComment = authorEl.closest('.review-comment');
    if (reviewComment) {
      reviewComment.classList.add('prbb-hidden');
      return;
    }
    const item = authorEl.closest(TOP_LEVEL_CONTAINERS);
    if (item) item.classList.add('prbb-hidden');
  });
}

function unhideAll() {
  document.querySelectorAll('.prbb-hidden').forEach(el => el.classList.remove('prbb-hidden'));
}

let scheduled = false;
function scheduleHide() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    hideComments();
  });
}

function loadAndApply() {
  chrome.storage.sync.get({ bots: DEFAULT_BOTS }, ({ bots }) => {
    botSet = new Set(bots.map(normalize).filter(Boolean));
    hideComments();
  });
}

loadAndApply();

const observer = new MutationObserver(scheduleHide);
observer.observe(document.body, { childList: true, subtree: true });

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync' || !changes.bots) return;
  botSet = new Set((changes.bots.newValue || []).map(normalize).filter(Boolean));
  unhideAll();
  hideComments();
});
