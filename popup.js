const checkbox = document.getElementById('enabled');
const stateEl = document.getElementById('state');

function render(enabled) {
  checkbox.checked = enabled;
  stateEl.textContent = enabled
    ? 'Hiding bot comments on github.com'
    : 'Disabled — all comments visible';
}

chrome.storage.sync.get({ enabled: true }, ({ enabled }) => render(enabled));

checkbox.addEventListener('change', () => {
  const enabled = checkbox.checked;
  chrome.storage.sync.set({ enabled }, () => render(enabled));
});

document.getElementById('options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.enabled) render(changes.enabled.newValue);
});
