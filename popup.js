'use strict';

const handleClick = () => {
  alert("clicked");
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'setup'}, () => {
      alert(response.message);
    });
  });

  chrome.storage.sync.get(['night_mode'], result => {
    chrome.storage.sync.set({ night_mode: !result.night_mode}, () => {
      window.close();
    });
  });
};


document.addEventListener('DOMContentLoaded', () => {
  // set the button name and the event listener
  const btn = document.getElementById('btn');
  chrome.storage.sync.get(['night_mode'], (result) => {
    if (!result.night_mode) {
      btn.value = 'Turn on';
    } else if (result.night_mode) {
      btn.value = 'Turn off';
    };
  });
  btn.addEventListener('click', handleClick);

  // initial setup
  // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  //   chrome.tabs.insertCSS(tabs[0].id, {
  //     file: 'styling/night_mode.css'
  //   });
  // });
});
