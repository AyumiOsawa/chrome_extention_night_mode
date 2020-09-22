'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggle') {
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      // add class names to all the elements
      document.querySelectorAll('*').forEach(elm => {
        // (clean up) remove all the pre-existing "night_mode-- ..." class names
        constants.contrast_options.forEach(option => {
          if (elm.classList.contains('night_mode--' + option)) {
            elm.classList.remove('night_mode--' + option);
          }
        });

        if (result.night_mode) {
          // add a new class name if night mode is on
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

      // send a message back
      if(result.night_mode) {
        sendResponse({response_message: 'night mode'});
      } else {
        sendResponse({response_message: 'night mode turned off'});
      };
    });
  };
  return true;
});
