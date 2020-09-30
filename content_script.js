'use strict';

const _cleanUp = (elm, result) => {
  // clean up: remove all the pre-existing night_mode-- ... class names
  constants.contrast_options.forEach(option => {
    if (elm.classList.contains('night_mode--' + option)) {
      elm.classList.remove('night_mode--' + option);
    };
  });
  if (elm.tagName === 'IMG') {
    elm.removeAttribute('style', `opacity : ${constants.opacity[result.contrast]}`);
  };
  if (elm.classList.contains('night_mode__bg_color')) {
    elm.classList.remove('night_mode__bg_color');
  };
  const bg_image = document.defaultView.getComputedStyle(elm).getPropertyValue('background-image');
  if (bg_image !== '' && bg_image !== 'none') {
    elm.classList.remove('night_mode__bg_color');
    elm.setAttribute('style', 'mix-blend-mode: multiply');
  };
};

const _addClassName = (elm, result) => {
  // add the class name to the element other than following cases
  if (result.night_mode) {
    console.log("LET'S TOGGLE");
    elm.classList.add('night_mode--' + result.contrast);
    switch (elm.tagName) {
      case 'SCRIPT' :
      case 'IFRAME' :
      case 'VIDEO' :
      case 'CANVAS' :
        break;
      case 'IMG' :
        elm.style.opacity = `${constants.opacity[result.contrast]}`;
        break;
      default :
        // change the background color
        const bg_color = document.defaultView.getComputedStyle(elm).getPropertyValue('background-color');
        if (bg_color && bg_color !== 'rgba(0, 0, 0, 0)' && bg_color !== 'rgb(0, 0, 0)') {
          elm.classList.add('night_mode__bg_color');
        };
        // change the opacity of the background image
        const bg_image = document.defaultView.getComputedStyle(elm).getPropertyValue('background-image');
        if (bg_image !== '' && bg_image !== 'none') {
          console.log(elm.tagName + ' has a bg image! : ' + bg_image);
          // elm.classList.add('night_mode__bg_color');
          // elm.setAttribute('style', 'mix-blend-mode: multiply');
          elm.style.opacity = `${constants.opacity[result.contrast]}`;
        }
    };
  };
};


const toggleNightMode = (result) => {
  // coloring the <body> or <hmtl>
  const body = document.getElementsByTagName('BODY')[0] ?? document.getElementsByTagName('HTML')[0];
  _cleanUp(body, result);
  if (result.night_mode) {
    body.classList.add('night_mode--' + result.contrast, 'night_mode__bg_color');
  };

  // coloring the other elements
  body.querySelectorAll('*').forEach(elm => {
    _cleanUp(elm, result);
    _addClassName(elm, result);

    // TODO: adjust the color of video, canvas, iframe
  });
};

const monitorDOMChange = () => {
  // TODO: detect the DOM change and apply the styling to the new contents
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('message received');
  console.log('from: ' + sender.url);
  if (request.message === 'toggle') {
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      toggleNightMode(result);
      if (result.night_mode) {
        sendResponse({response_message: 'night mode'});
      } else {
        sendResponse({response_message: 'night mode turned off'});
      };
    });
  };
  return true;
});
