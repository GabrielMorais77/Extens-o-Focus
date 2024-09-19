document.addEventListener('DOMContentLoaded', function () {
  const activateDarkModeButton = document.getElementById('activateDarkMode');
  const deactivateDarkModeButton = document.getElementById('deactivateDarkMode');

  activateDarkModeButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'activateDarkMode' }, function(response) {
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
        chrome.tabs.sendMessage(tabs[0].id, { action: 'deactivateDarkMode' }, function(response) {
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
