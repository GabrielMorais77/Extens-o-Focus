chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleDarkMode') {
      toggleDarkMode();
      sendResponse({ status: 'dark mode toggled on content script' });
    }
  });
  
  // Definindo a função de alternância de modo escuro
  function toggleDarkMode() {
    if (document.body.style.backgroundColor === 'black') {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
  
      document.querySelectorAll('a').forEach(link => {
        link.style.color = '';
      });
  
      document.querySelectorAll('button').forEach(button => {
        button.style.backgroundColor = '';
        button.style.color = '';
        button.style.borderColor = '';
      });
  
      document.querySelectorAll('input, textarea').forEach(input => {
        input.style.backgroundColor = '';
        input.style.color = '';
        input.style.borderColor = '';
      });
    } else {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
  
      document.querySelectorAll('a').forEach(link => {
        link.style.color = '#1e90ff';
      });
  
      document.querySelectorAll('button').forEach(button => {
        button.style.backgroundColor = '#333';
        button.style.color = 'white';
        button.style.borderColor = '#555';
      });
  
      document.querySelectorAll('input, textarea').forEach(input => {
        input.style.backgroundColor = '#222';
        input.style.color = 'white';
        input.style.borderColor = '#555';
      });
    }
  }
  