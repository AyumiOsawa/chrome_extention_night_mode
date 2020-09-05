'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  alert('content_script.js');
  alert(sender);
  if (request.message === 'setup') {
    alert('setup');
    chrome.storage.sync.get(['night_mode'], result => {
      document.querySelectorAll('*').forEach(elm => {
        if (result.night_mode) {
          elm.classList.add('night_mode');
        } else {
          elm.classList.remove('night_mode');
        }
      });
    });
    sendResponse({message: 'done'});
  } else {
    sendResponse({message: 'the message was not setup'})
  };
  return true;
});
