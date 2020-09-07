'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({night_mode: false, contrast: "high"});
  // console.log('onInstalled');
});

const setup = (tabId) => {
  // alert("setup")
  // chrome.tabs.insertCSS(tabId, {file: 'styling/night_mode.css'}, () => {
  //   chrome.tabs.executeScript(tabId, {file: 'content_script.js'}, () => {
      chrome.tabs.sendMessage(tabId, {message: 'toggle'});
  //   });
  // });
};

// setup upon going to another page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  setup(tabId);
});

chrome.tabs.onActivated.addListener(activeInfo => {
  setup(activeInfo.tabId);
});
