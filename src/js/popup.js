// Modo escuro
document.getElementById('toggleDarkMode').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: toggleDarkMode
    });
  });
});

// Temporizador Pomodoro
let pomodoroInterval;
const startButton = document.getElementById('startPomodoro');
const resetButton = document.getElementById('resetPomodoro');
let timeLeft = 25 * 60; // 25 minutos em segundos

startButton.addEventListener('click', function () {
  if (!pomodoroInterval) {
    pomodoroInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        alert("Tempo do Pomodoro terminado!");
      } else {
        timeLeft--;
        updateTimerDisplay();
      }
    }, 1000);
  }
});

resetButton.addEventListener('click', function () {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  timeLeft = 25 * 60;
  updateTimerDisplay();
});

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Adicionar sites à lista de bloqueados
document.getElementById('addSite').addEventListener('click', function () {
  const siteInput = document.getElementById('siteInput').value;
  if (siteInput) {
    chrome.storage.sync.get(['blockedSites'], function (result) {
      let blockedSites = result.blockedSites || [];
      blockedSites.push(siteInput);
      chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
        updateBlockedSitesList(blockedSites);
        document.getElementById('siteInput').value = '';
      });
    });
  }
});

function updateBlockedSitesList(sites) {
  const list = document.getElementById('blockedSitesList');
  list.innerHTML = '';
  sites.forEach(site => {
    const li = document.createElement('li');
    li.textContent = site;
    list.appendChild(li);
  });
}

// Atualiza a lista de sites bloqueados quando o popup é aberto
chrome.storage.sync.get(['blockedSites'], function (result) {
  updateBlockedSitesList(result.blockedSites || []);
});

// Função que será injetada na aba ativa para alternar o modo escuro
function toggleDarkMode() {
  const body = document.body;
  
  if (body.style.backgroundColor === '#333') {
    // Desativar modo escuro
    body.style.backgroundColor = '';
    body.style.color = '';

    // Reverter estilos de links
    document.querySelectorAll('a').forEach(link => {
      link.style.color = '';
    });

    // Reverter estilos de botões
    document.querySelectorAll('button').forEach(button => {
      button.style.backgroundColor = '';
      button.style.color = '';
      button.style.borderColor = '';
    });

    // Reverter estilos de inputs
    document.querySelectorAll('input, textarea').forEach(input => {
      input.style.backgroundColor = '';
      input.style.color = '';
      input.style.borderColor = '';
    });

    // Reverter estilos de h1
    document.querySelectorAll('h1').forEach(h1 => {
      h1.style.color = '';
    });

    // Reverter estilos de seções de artigos
    document.querySelectorAll('.article-section, .article-section__content').forEach(section => {
      section.style.backgroundColor = '';
      section.style.color = '';
    });

    document.querySelectorAll('footer-sections padded-content hub-footer hub-first-footer'). forEach(section => {
      section.style.backgroundColor = '#333';
      section.style.color = '';
    });

  } else {
    // Ativar modo escuro
    body.style.backgroundColor = '#333';
    body.style.color = '';

    // Estilos de links no modo escuro
    document.querySelectorAll('a').forEach(link => {
      link.style.color = '#1e90ff';
    });

    // Estilos de botões no modo escuro
    document.querySelectorAll('button').forEach(button => {
      button.style.backgroundColor = '#333';
      button.style.color = 'white';
      button.style.borderColor = '#555';
    });

    // Estilos de inputs no modo escuro
    document.querySelectorAll('input, textarea').forEach(input => {
      input.style.backgroundColor = '#222';
      input.style.color = 'white';
      input.style.borderColor = '#555';
    });

    // Estilos de h1 no modo escuro
    document.querySelectorAll('h1').forEach(h1 => {
      h1.style.color = 'white';
    });

    // Estilos de seções de artigos no modo escuro
    document.querySelectorAll('.article-section, .article-section__content').forEach(section => {
      section.style.backgroundColor = '#333';
      section.style.color = 'white';
    });
  }
}
