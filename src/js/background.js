chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'pomodoro') {
        chrome.notifications.create('pomodoro-end', {
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Pomodoro Finalizado',
            message: 'Faça uma pausa de 5 minutos.'
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.sync.get({ blockedSites: [] }, (data) => {
        const blockedSites = data.blockedSites;
        if (blockedSites.some((site) => tab.url.includes(site))) {
            chrome.tabs.remove(tabId);
        }
    });
});
