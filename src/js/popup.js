let timer;
let isRunning = false;

document.getElementById('startPomodoro').addEventListener('click', function() {
  if (!isRunning) {
    isRunning = true;
    let timeLeft = 25 * 60; // 25 minutos

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timerDisplay').textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        alert('Pomodoro terminado!');
      }
    }, 1000);
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

// Adicionar site à lista de bloqueio
document.getElementById('addSite').addEventListener('click', function() {
  const site = document.getElementById('siteInput').value;
  if (site) {
    chrome.storage.sync.get(['blockedSites'], function(result) {
      const sites = result.blockedSites || [];
      sites.push(site);
      chrome.storage.sync.set({ blockedSites: sites }, function() {
        updateSiteList();
        document.getElementById('siteInput').value = '';
      });
    });
  }
});

function updateSiteList() {
  chrome.storage.sync.get(['blockedSites'], function(result) {
    const sites = result.blockedSites || [];
    const siteList = document.getElementById('siteList');
    siteList.innerHTML = '';
    sites.forEach(site => {
      const li = document.createElement('li');
      li.textContent = site;
      siteList.appendChild(li);
    });
  });
}

updateSiteList();

// Ativar/Desativar Modo Escuro
document.getElementById('toggleDarkMode').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: toggleDarkMode
    });
  });
});

function toggleDarkMode() {
  const body = document.body;
  body.style.backgroundColor = body.style.backgroundColor === 'black' ? '' : 'black';
  body.style.color = body.style.color === 'white' ? '' : 'white';
}
