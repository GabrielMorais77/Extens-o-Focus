chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'pomodoroAlarm') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'src/icons/icon48.png',
        title: 'Pomodoro terminado!',
        message: 'Hora de fazer uma pausa!'
      });
    }
  });
  