'use strict';
console.log('setup.js');

// store the original background color and the original color of the current page
chrome.storage.sync.get(['default_bg ', 'default_color', 'current_url'], result => {
  result.default_bg = [];
  result.default_color = [];

  document.querySelectorAll('*').forEach(elm => {
    result.default_bg.push(elm.style.backgroundColor);
    result.default_color.push(elm.style.color);
  });

  chrome.storage.sync.set({
    default_bg: result.default_bg,
    default_color: result.default_color
  });
});
