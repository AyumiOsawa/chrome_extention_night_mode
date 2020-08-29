'use strict';

// set the button name
chrome.storage.sync.get(['night_mode'], (result) => {
  if (!result.night_mode) {
    document.getElementById('btn').value = 'Turn on';
  } else if (result.night_mode) {
    document.getElementById('btn').value = 'Turn off';
  };
});

// initial setup
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


const handleClick = () => {
  chrome.tabs.executeScript(null, {
    file: 'switching.js'
  });
  chrome.storage.sync.get(['night_mode'], (result) => {
    chrome.storage.sync.set({ night_mode: !result.night_mode}, () => {
      window.close();
    });
  });
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
