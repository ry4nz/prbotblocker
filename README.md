# PR Bot Blocker

A Chrome extension that hides bot comments on GitHub pull request, issue, and discussion pages. The bot list is configurable.

## Install (unpacked extension)

1. Download or clone this repo to your machine.
   ```
   git clone https://github.com/ry4nz/prbotblocker.git
   ```
   If you cloned inside WSL, the folder is reachable from Windows at `\\wsl$\<distro>\home\<you>\path\to\prbotblocker` (run `wsl -l -q` to find your distro name). If Chrome has trouble loading from a `\\wsl$\` path, copy the folder somewhere under `C:\` first.
2. Open `chrome://extensions` in Chrome (or `edge://extensions` in Edge, `brave://extensions` in Brave).
3. Toggle **Developer mode** on (top-right).
4. Click **Load unpacked** and select the `prbotblocker` folder.
5. The extension is now active on `https://github.com/*`.

## Turn it on/off

Three ways:

- **Toolbar popup** — click the extension's toolbar icon and flip the toggle. When disabled, an `OFF` badge appears on the icon.
- **Keyboard shortcut** — `Alt+Shift+B` toggles it on/off. You can change this at `chrome://extensions/shortcuts`.
- **Per-site disable** — right-click the toolbar icon → "This can read and change site data" → "When you click the extension". Chrome's built-in mechanism for fully disabling on github.com.

## Configure the bot list

- Click the extension's toolbar icon, then **Configure bot list…** in the popup.
- Or go to `chrome://extensions`, find **PR Bot Blocker**, click **Details** → **Extension options**.

Enter one bot username per line, then **Save**. Matching is case-insensitive and the trailing `[bot]` suffix is ignored, so `github-actions` matches `github-actions[bot]`.

Defaults: `github-actions`, `dependabot`, `copilot`, `coderabbitai`, `codecov`, `codecov-commenter`, `sonarcloud`, `sonarqubecloud`, `renovate`, `vercel`, `netlify`, `mirantiscontainers-bot`.

Click **Reset to defaults** to restore the built-in list (useful after upgrading if new defaults were added).

## Update

After pulling new commits, go to `chrome://extensions` and click the reload icon on the PR Bot Blocker card.
