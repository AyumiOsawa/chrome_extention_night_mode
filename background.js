chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    night_mode: false,
    default_bg: [],
    default_color: [],
    current_url: ''
  })
});

// re-setup upon a page change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.sync.get(['current_url', 'night_mode'], result => {
    if(changeInfo.url !== result.current_url) {
      // re-setup
      chrome.tabs.executeScript(null, {
        file: 'styling/setup.js'
      });
      chrome.tabs.insertCSS(null, {
        file: 'styling/night_mode.css'
      });
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.storage.sync.set({
          current_url: tabs[0].url
        });
      });
    };

    if(result.night_mode) {
      // turn on the night mode
      chrome.tabs.executeScript(null, {
        file: 'switching.js'
      });
    };
  });
});

// TO DO: use one of the chrome.tabs methods to detect the main active tab change and run setup and styling insertion.


// chrome.runtime.onMessage.addListener(request => {
//   if(request.message === 'setup') {
//     // do some set up here for a new page
//     const body = document.querySelector('body');
//     chrome.storage.sync.set({
//       body: body
//     }, ())
//   }
// })

// chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
//   log("Got message from background page: " + msg);
// });
