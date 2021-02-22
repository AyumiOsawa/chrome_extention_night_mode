'use strict';

const _cleanUp = (elm, contrast) => {
  // remove all the pre-existing night_mode-- ... class names
  constants.contrast_options.forEach(option => {
    elm.classList.remove('night_mode--' + option);
  });
  elm.classList.remove('night_mode__bg_color');

  if (elm.tagName === 'IMG') {
    elm.removeAttribute('style', `opacity : ${constants.opacity[contrast]}`);
  };

  const bg_image = document.defaultView.getComputedStyle(elm).getPropertyValue('background-image');
  if (bg_image !== '' && bg_image !== 'none') {
    elm.classList.remove('night_mode__bg_color');
    elm.removeAttribute('style', 'mix-blend-mode: multiply');
    elm.setAttribute('style', 'opacity: 1');
  };
};

const _addStyle = (elm, contrast) => {
  // add the class name to the element other than following cases
  switch (elm.tagName) {
    case 'HEAD' :
    case 'SCRIPT' :
    case 'NOSCRIPT' :
    case 'IFRAME' :
    case 'VIDEO' :
    case 'CANVAS' :
      break;
    case 'IMG' :
      elm.style.opacity = `${constants.opacity[contrast]}`;
      elm.classList.add('night_mode--bg_color' + contrast);
      break;
    default :
      elm.classList.add('night_mode--' + contrast);
      // change the background color
      const bg_color = document.defaultView.getComputedStyle(elm).getPropertyValue('background-color');
      if (bg_color && bg_color !== 'rgba(0, 0, 0, 0)' && bg_color !== 'rgb(0, 0, 0)') {
        elm.classList.add('night_mode__bg_color');
      };
      // change the opacity of the background image
      const bg_image = document.defaultView.getComputedStyle(elm).getPropertyValue('background-image');

      if (bg_image !== '' && bg_image !== 'none') {
        // console.log('grabbed bg image value of elm: ', bg_image);
        // elm.classList.add('night_mode__bg_color');
        // elm.setAttribute('style', 'mix-blend-mode: multiply');
        elm.style.opacity = `${constants.opacity[contrast]}`;
      };
      // console.log('General Elm, classname, opacity, bg_image changed: ', elm);
  };
};


const toggleNightMode = (result) => {
  // reset and color the <body> or <hmtl>
  const body = document.getElementsByTagName('BODY')[0] ?? document.getElementsByTagName('HTML')[0];
  _cleanUp(body, result.contrast);
  if (result.night_mode) {
    body.classList.add('night_mode--' + result.contrast, 'night_mode__bg_color');
  };

  // coloring the other elements
  body.querySelectorAll('*').forEach(elm => {
    _cleanUp(elm, result.contrast);
    if (result.night_mode) {
      _addStyle(elm, result.contrast);
    };
    // TODO: adjust the color of video, canvas, iframe
  });

  // set up/remove a mutation observer to watch the DOM change
  _observeDOMchange(result.night_mode, observer);
};

const observer = new MutationObserver(mutations => {
  console.log('mutation observer callback');
  if(mutations || mutations.length > 0) {
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      _recursivelyApplyStyle(mutations, result.contrast);
    });
  }
});

const _observeDOMchange = (night_mode, observer) => {
  if(night_mode) {
    observer.observe(document, {subtree: true, childList: true});
  } else {
    observer.disconnect();
    console.log('observer disconnected');
  }
}

const _recursivelyApplyStyle = (elements, contrast) => {
  // console.log('_recursivelyApplyStyle is running');
  elements.forEach(element => {
    if (element.target) {
      if (element.target.childNodes.length === 0) {
        _addStyle(element.target, contrast);
      } else {
        _addStyle(element.target, contrast);
        _recursivelyApplyStyle(element.target.childNodes, contrast);
      }
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggle') {
    // console.log('message: ', request.message);
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
