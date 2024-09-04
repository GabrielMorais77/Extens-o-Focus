chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'pomodoroTimer') {
        alert('Pomodoro completo! Faça uma pausa.');
    }
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get('blockedSites', function(data) {
        const blockedSites = data.blockedSites || [];
        if (blockedSites.some(site => tab.url.includes(site))) {
            chrome.tabs.remove(tabId);
            alert(`Este site foi bloqueado: ${tab.url}`);
        }
    });
    }
});