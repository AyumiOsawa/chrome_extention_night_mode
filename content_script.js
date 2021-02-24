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
  console.log('adding style to element:', elm.tagName);
  console.log('type:', typeof elm);
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
        elm.classList.add('night_mode__bg_color');
        elm.setAttribute('style', 'mix-blend-mode: multiply');
        elm.style.opacity = `${constants.opacity[contrast]}`;
      };
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
    if (result.night_mode && elm) {
      _addStyle(elm, result.contrast);
    };
    // TODO: adjust the color of video, canvas, iframe
  });

  // set up/remove a mutation observer to watch the DOM change
  _observeDOMChange(result.night_mode, observer);
};

// TODO: apply the night mode style to the new elements got by ajax
// ajax dom content loaded?
// text color should be adjusted too
const observer = new MutationObserver(mutations => {
  if(mutations && mutations.length > 0) {
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      mutations.forEach((mutation) => {
        console.log('mutation detected!');
        // console.log('mutation.target',mutation.target);
        // console.log('mutation.target.childNodes',mutation.target.childNodes);
        _recursivelyApplyStyle(mutation.target, result.contrast);
      });
    });
  }
});

const _observeDOMChange = (night_mode, observer) => {
  if(night_mode) {
    observer.observe(document, {subtree: true, childList: true});
  } else {
    observer.disconnect();
    console.log('observer disconnected');
  }
}

const _recursivelyApplyStyle = (element, contrast) => {
  console.log('inside _recursivelyApplyStyle');
  console.log('element.target',element);
  console.log('element.target.childNodes',element.childNodes);
  console.log('hasChildren',element.childNodes.length !== 0);

  if (typeof element === "undefined") {
    return;
  }
  _addStyle(element, contrast);
  const hasChildren = element.childNodes.length !== 0;
  if (hasChildren) {
    element.childNodes.forEach(childElm => {
      _recursivelyApplyStyle(childElm, contrast);
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
