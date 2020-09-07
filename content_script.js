'use strict';
// alert('content script');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggle') {
    chrome.storage.sync.get(['night_mode'], result => {
      document.querySelectorAll('*').forEach(elm => {
        if (result.night_mode) {
          elm.classList.add('night_mode');
        } else {
          elm.classList.remove('night_mode');
        };
      });
      if(result.night_mode) {
        sendResponse({response_message: 'night mode'})
      } else {
        sendResponse({response_message: 'night mode turned off'})
      };
    });
  };
  return true;
});
