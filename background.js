function updateBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#cf222e' });
}

function syncBadge() {
  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => updateBadge(enabled));
}

chrome.runtime.onInstalled.addListener(syncBadge);
chrome.runtime.onStartup.addListener(syncBadge);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.enabled) {
    updateBadge(changes.enabled.newValue);
  }
});

chrome.commands.onCommand.addListener((cmd) => {
  if (cmd !== 'toggle-enabled') return;
  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    chrome.storage.sync.set({ enabled: !enabled });
  });
});
