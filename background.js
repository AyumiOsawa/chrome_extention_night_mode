'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    night_mode: false,
    contrast: constants.contrast_options[0]
  });
});

const setup = (tabId) => {
  chrome.tabs.sendMessage(tabId, {message: 'toggle'});
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  setup(tabId);
});

chrome.tabs.onActivated.addListener(activeInfo => {
  setup(activeInfo.tabId);
});
