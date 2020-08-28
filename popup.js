'use strict';

// set the button name
chrome.storage.sync.get(['isOn'], (result) => {
  if (result.isOn === undefined || !result.isOn) {
    document.getElementById('btn').value = 'Turn on';
  } else if (result.isOn) {
    document.getElementById('btn').value = 'Turn off';
  };
  chrome.storage.sync.set({
    isOn: !result.isOn
  })
});

// initial setup
chrome.tabs.executeScript(null, {
  file: 'styling/setup.js'
});
chrome.tabs.insertCSS(null, {
  file: 'styling/night_mode.css'
});

// setup upon a page change
chrome.tabs.onUpdated.addListener( () => {
  chrome.tabs.executeScript(null, {
    file: 'styling/setup.js'
  });
  chrome.tabs.insertCSS(null, {
    file: 'styling/night_mode.css'
  });
});


const handleClick = () => {
  chrome.tabs.executeScript(null, {
    file: 'switching.js'
  });
  window.close();
};


document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', handleClick);
});


  // chrome.storage.sync.get('color', (data) => {
  //   cc.style.background = data.color;
  //   cc.setAttribute('value', data.color);
  // })
  //
  // cc.onclick = (elm) => {
  //   console.log('clicked');
  //   let color = elm.target.value;
  //   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  //     chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {code: 'document.body.style.backgroundColor = '' + color + '';'});
  //   });
  // }
