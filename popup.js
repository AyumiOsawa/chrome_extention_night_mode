'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // SETUP
  const btn = document.getElementById('btn');
  const container = document.getElementById('contrast__container');
  chrome.storage.sync.get(['night_mode', 'contrast'], result => {
    // set the button name and the contrast options
    if (!result.night_mode) {
      btn.innerText = 'Turn on';
      constants.contrast_options.forEach(option => {
        container.insertAdjacentHTML('beforeend',
        option === result.contrast ?
        `<div class="contrast__option">
          <input
            id="contrast_${option}"
            type="radio"
            name="contrast"
            value="${option}"
            checked
          >
          <label
            class="contrast__option__label"
            for="contrast_${option}"
          >
            ${option}
          </lable>
        </div>`
        :
        `<div class="contrast__option">
          <input
            id="contrast_${option}"
            type="radio"
            name="contrast"
            value="${option}"
          >
          <label
            class="contrast__option__label"
            for="contrast_${option}"
          >
            ${option}
          </lable>
        </div>`
        );
      });
    } else if (result.night_mode) {
      btn.innerText = 'Turn off';
      container.insertAdjacentHTML('beforeend',
      `<p class=contrast__option__label>${result.contrast}</p>`
      );
    };
  });

  // EVENT: CLICK
  const handleButtonClick = () => {
    // send a message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {message: 'toggle'}, response => console.log(response.response_message));
    });

    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      let new_state = {
          night_mode: !result.night_mode
        };
      // get the contrast option
      if (!result.night_mode) {
        const selected = Object.values(document.forms[0].elements).find(
          option => option.checked === true);
        new_state.contrast = selected.value;
      };
      // update the states
      chrome.storage.sync.set(new_state, () => window.close());
    });
  };


  btn.addEventListener('click', handleButtonClick);
});
