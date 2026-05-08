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

const ta = document.getElementById('bots');
const status = document.getElementById('status');

function load() {
  chrome.storage.sync.get({ bots: DEFAULT_BOTS }, ({ bots }) => {
    ta.value = bots.join('\n');
  });
}

function parse(text) {
  return text.split('\n').map(s => s.trim()).filter(Boolean);
}

function flash(msg) {
  status.textContent = msg;
  setTimeout(() => { status.textContent = ''; }, 1500);
}

document.getElementById('save').addEventListener('click', () => {
  const bots = parse(ta.value);
  chrome.storage.sync.set({ bots }, () => flash('Saved.'));
});

document.getElementById('reset').addEventListener('click', () => {
  ta.value = DEFAULT_BOTS.join('\n');
});

load();
