// Verifica o estado inicial do modo escuro e ajusta o botão
chrome.storage.sync.get('darkMode', function(result) {
  const darkModeEnabled = result.darkMode || false;
  updateDarkModeButton(darkModeEnabled);
});

// Atualiza o botão com base no estado do modo escuro
function updateDarkModeButton(isEnabled) {
  const button = document.getElementById('toggleDarkMode');
  if (isEnabled) {
    button.textContent = 'Desativar Modo Escuro';
  } else {
    button.textContent = 'Ativar Modo Escuro';
  }
}

// Ativa/Desativa o Modo Escuro
document.getElementById('toggleDarkMode').addEventListener('click', function() {
  chrome.storage.sync.get('darkMode', function(result) {
    const darkModeEnabled = !result.darkMode; // Inverte o estado atual
    chrome.storage.sync.set({ darkMode: darkModeEnabled }, function() {
      updateDarkModeButton(darkModeEnabled);
      applyDarkModeToCurrentTab(darkModeEnabled);
    });
  });
});

// Aplica o modo escuro na aba ativa
function applyDarkModeToCurrentTab(enable) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: setDarkMode,
      args: [enable]
    });
  });
}

// Função que será executada na aba para aplicar o modo escuro
function setDarkMode(enable) {
  const body = document.body;
  if (enable) {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
  } else {
    body.style.backgroundColor = '';
    body.style.color = '';
  }
}
