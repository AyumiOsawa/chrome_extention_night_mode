'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    night_mode: false,
    contrast: constants.contrast_options[0]
  });
});

const setup = (tabId) => {
  chrome.tabs.sendMessage(tabId, {message: 'page set up'});
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  setup(tabId);
});

chrome.tabs.onActivated.addListener(activeInfo => {
  setup(activeInfo.tabId);
});

// switch the icon
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'switch icon') {
    chrome.storage.sync.get(['night_mode', 'contrast'], result => {
      chrome.browserAction.setIcon({
        path : {
          16 : result.night_mode ? "img/icon_cat_16_closed.png" : "img/icon_cat_16.png",
          32 : result.night_mode ? "img/icon_cat_32_closed.png" : "img/icon_cat_32.png"
        }
      });
    });
  };
});
