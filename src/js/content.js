chrome.storage.sync.get(['darkMode'], function(result) {
    if (result.darkMode) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    }
  });
  
  function toggleDarkMode() {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'black' ? '' : 'black';
    document.body.style.color = document.body.style.color === 'white' ? '' : 'white';
    chrome.storage.sync.set({ darkMode: document.body.style.backgroundColor === 'black' });
  }
  