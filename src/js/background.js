// Listener para alarme Pomodoro
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'pomodoroTimer') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon48.png',
      title: 'Pomodoro Completo!',
      message: 'Pomodoro completo! Faça uma pausa.',
      priority: 2
    });
  }
});

// Listener para monitorar atualização de abas e bloquear sites
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') { // Verifica se o carregamento da aba foi concluído
    chrome.storage.sync.get('blockedSites', function (data) {
      const blockedSites = data.blockedSites || [];
      // Verifica se algum site bloqueado está na URL da aba
      if (blockedSites.some(site => tab.url && tab.url.includes(site))) {
        chrome.tabs.remove(tabId); // Fecha a aba
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon48.png',
          title: 'Site Bloqueado',
          message: `Este site foi bloqueado: ${tab.url}`,
          priority: 2
        });
      }
    });
  }
});
