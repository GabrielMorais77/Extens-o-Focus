document.addEventListener('DOMContentLoaded', function () {
  // Modo Escuro
  const activateDarkModeButton = document.getElementById('activateDarkMode');
  const deactivateDarkModeButton = document.getElementById('deactivateDarkMode');

  activateDarkModeButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'activateDarkMode' }, function (response) {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
          } else {
            console.log('Response:', response);
          }
        });
      } else {
        console.error('No active tab found');
      }
    });
  });

  deactivateDarkModeButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'deactivateDarkMode' }, function (response) {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
          } else {
            console.log('Response:', response);
          }
        });
      } else {
        console.error('No active tab found');
      }
    });
  });

  // Temporizador Pomodoro
  let pomodoroInterval;
  const startButton = document.getElementById('startPomodoro');
  const resetButton = document.getElementById('resetPomodoro');
  let timeLeft = 60 * 60; // 25 minutos em segundos

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

  // Lista de Sites Bloqueados
  document.getElementById('addSite').addEventListener('click', function () {
    const siteInput = document.getElementById('siteInput').value.trim(); // Pega o valor do campo de entrada e remove espaços extras
    if (siteInput) { // Verifica se há algum valor no campo de entrada
      chrome.storage.sync.get(['blockedSites'], function (result) {
        let blockedSites = result.blockedSites || []; // Recupera a lista de sites bloqueados ou inicializa com uma lista vazia
        if (!blockedSites.includes(siteInput)) { // Verifica se o site já não está na lista
          blockedSites.push(siteInput); // Adiciona o novo site à lista
          chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
            updateBlockedSitesList(blockedSites); // Atualiza a lista exibida
            document.getElementById('siteInput').value = ''; // Limpa o campo de entrada
          });
        }
      });
    }
  });

  // Atualiza a lista de sites bloqueados exibida no popup
  function updateBlockedSitesList(sites) {
    const list = document.getElementById('blockedSitesList');
    list.innerHTML = ''; // Limpa a lista atual
    sites.forEach(site => { // Adiciona cada site da lista
      const li = document.createElement('li');
      li.textContent = site;
      list.appendChild(li);
    });
  }

  // Adiciona funcionalidade para limpar a lista de sites bloqueados
  document.getElementById('clearSites').addEventListener('click', function () {
    chrome.storage.sync.set({ blockedSites: [] }, function () { // Reseta a lista de sites bloqueados no armazenamento
      updateBlockedSitesList([]); // Atualiza a lista exibida para vazia
      console.log('Lista de sites bloqueados limpa.'); // Loga uma mensagem de confirmação
    });
  });

  // Atualiza a lista de sites bloqueados quando o popup é aberto
  chrome.storage.sync.get(['blockedSites'], function (result) {
    updateBlockedSitesList(result.blockedSites || []);
  });
});
