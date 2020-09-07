'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // SETUP
  const btn = document.getElementById('btn');
  chrome.storage.sync.get(['night_mode', 'contrast'], (result) => {
    // set the button name
    if (!result.night_mode) {
      btn.innerText = 'Turn on';
    } else if (result.night_mode) {
      btn.innerText = 'Turn off';
    };
    // pre-select an option
    document.getElementById('contrast_' + result.contrast).checked = true;
  });

  // EVENT: CLICK
  const handleButtonClick = () => {
    // send a message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {message: 'toggle'}, response => alert(response.response_message));
    });
    // get the contrast option
    const selected = Object.values(document.forms[0].elements).find(
      option => option.checked === true);
    // update the states
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      chrome.storage.sync.set({
        night_mode: !result.night_mode,
        contrast: selected.value},
        () => window.close()
      );
    });
  };

  btn.addEventListener('click', handleButtonClick);
});
