chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    isOn: false,
    default_bg: [],
    default_color: []
  })
});

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
