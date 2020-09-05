console.log('swit.js');

chrome.storage.sync.get(['night_mode'], result => {
  document.querySelectorAll('*').forEach(elm => {
    if (result.night_mode) {
      elm.classList.add('night_mode');
    } else {
      elm.classList.remove('night_mode');
    }
  });
});
