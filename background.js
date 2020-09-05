chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    night_mode: false
  });
});

// setup upon going to another page
// chrome.tabs.onUpdated.addListener(() => {
//   chrome.tabs.insertCSS(null, {
//     file: 'styling/night_mode.css'
//   });
//   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//     chrome.tabs.sendMessage(tabs[0].id, {
//       message: 'setup'
//     });
//   });
// });

// setup upon returning to the previous page



// // setup upon a tab change (NEED CHECK)
// chrome.tabs.onActivated.addListener(() => {
//   chrome.tabs.executeScript(null, {
//     file: 'setup.js'
//   });
// });
//
// // setup upon a window change (NEED CHECK)
// chrome.windows.onFocusChanged.addListener(() => {
//   chrome.tabs.executeScript(null, {
//     file: 'setup.js'
//   });
// });
//
// // setup upon opening a new tab
// chrome.tabs.onCreated.addListener(() => {
//   chrome.tabs.executeScript(null, {
//     file: 'setup.js'
//   });
// })
//
// // setup upon opening a new window
// chrome.windows.onCreated.addListener(() => {
//   chrome.tabs.executeScript(null, {
//     file: 'setup.js'
//   });
// })
