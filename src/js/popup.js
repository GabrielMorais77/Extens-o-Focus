document.getElementById('start-pomodoro').addEventListener('click', () => {
    chrome.alarms.create('pomodoro', { delayInMinutes: 25 });
    chrome.notifications.create('pomodoro-start', {
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Pomodoro Iniciado',
        message: 'Foque nos seus estudos/trabalho por 25 minutos!'
    });
});

document.getElementById('stop-pomodoro').addEventListener('click', () => {
    chrome.alarms.clear('pomodoro');
    chrome.notifications.create('pomodoro-stop', {
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Pomodoro Parado',
        message: 'Você parou o temporizador.'
    });
});

document.getElementById('add-site-button').addEventListener('click', () => {
    const site = document.getElementById('add-site').value;
    if (site) {
        chrome.storage.sync.get({ blockedSites: [] }, (data) => {
            const sites = data.blockedSites;
            sites.push(site);
            chrome.storage.sync.set({ blockedSites: sites });
        });
        document.getElementById('add-site').value = '';
    }
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleDarkMode
        });
    });
});

function toggleDarkMode() {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
    document.body.style.color = document.body.style.color === 'white' ? 'black' : 'white';
}
