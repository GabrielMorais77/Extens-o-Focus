chrome.storage.sync.get('darkMode', function(result) {
    if (result.darkMode) {
      setDarkMode(true);
    }
  });
  
  function setDarkMode(enable) {
    const body = document.body;
    if (enable) {
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    } else {
      body.style.backgroundColor = '';
      body.style.color = '';
    }
  }
  