'use strict';

const nightModePreparation = (result) => {
  document.querySelectorAll('*').forEach(elm => {
    // clean up: remove all the pre-existing night_mode-- ... class names
    constants.contrast_options.forEach(option => {
      if (elm.classList.contains('night_mode--' + option)) {
        elm.classList.remove('night_mode--' + option);
      }
    });
    // add a new class name if night mode is on
    if (result.night_mode) {
      elm.classList.add('night_mode--' + result.contrast);
    };
    // adjust the brightness of <img>
    if (elm.nodeName === "IMG") {
      result.night_mode ? elm.style.filter = `brightness(${constants.img_brightness[result.contrast]})`
      : elm.removeAttribute("style", `filter : ${constants.img_brightness[result.contrast]}`);
    };
    // adjust the opacity of the background images
    if (elm.style.backgroundImage !== "") {
      result.night_mode ? elm.style.opacity = constants.bg_opacity[result.contrast]
      : elm.style.opacity = 1
    };
  });
};


const body = document.getElementsByTagName('BODY')[0] ?? document.getElementsByTagName('HTML')[0];
const config = { attributes: false, childList: true, subtree: true};
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['night_mode', 'contrast'], result => {
    nightModePreparation(result);
  });
});
observer.observe(body, config);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'page set up') {
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      nightModePreparation(result);
      result.night_mode ? sendResponse({response_message: 'night mode'})
      : sendResponse({response_message: 'night mode turned off'})
    });
  };
  return true;
});
