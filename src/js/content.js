function applyDarkMode() {
  const css =  `
    body {
      background-color: #333 !important;
      color: #fff !important;
      margin: 0;
      padding: 0;
    }
    header {
      background-color: #333 !important;
      color: #fff !important;
      padding: 10px;
    }
    a {
      color: #1e90ff !important;
    }
    button {
      background-color: #555 !important;
      color: #fff !important;
    }
    input, textarea {
      background-color: #444 !important;
      color: #fff !important;
    }
    h1 {
      color: #fff !important;
    }
    html, body {
      height: 100%;
    }
  `;
  
  const style = document.createElement('style');
  style.id = 'dark-mode-style';
  style.textContent = css;
  document.head.appendChild(style);
  console.log('Dark mode applied');
}

function removeDarkMode() {
  const darkModeStyle = document.getElementById('dark-mode-style');
  if (darkModeStyle) {
    darkModeStyle.remove();
    console.log('Dark mode removed');
  }
}

// Verifica a configuração armazenada e aplica o modo escuro
chrome.storage.sync.get(['darkModeEnabled'], function (result) {
  if (result.darkModeEnabled) {
    applyDarkMode();
  }
});

// Listener para mensagens vindas do popup.js
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === 'activateDarkMode') {
    applyDarkMode();
    chrome.storage.sync.set({ darkModeEnabled: true });
  } else if (request.action === 'deactivateDarkMode') {
    removeDarkMode();
    chrome.storage.sync.set({ darkModeEnabled: false });
  }
  sendResponse({ status: 'success' });
});
