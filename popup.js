'use strict';

let isOn = false;

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  const body = document.getElementById('body');
  // const allElms = body.getElementsByTagName('*');

  const handleClick = (e) => {
    if(isOn) {
      btn.value = "Turn on";
      chrome.tabs.executeScript(null, {
        code: 'console.log("unclicked")'
      });

        // for (let elm of allElms) {
        //   chrome.tabs.executeScript({
        //     code: elm + '.style.backgroundColor="white"'
        //   });
        //   chrome.tabs.executeScript({
        //     code: elm + '.style.color="black"'
        //   })
        // }
      chrome.tabs.executeScript(null, {
        file: 'styling/off.js'
      });

    } else {
      btn.value = "Turn off";
      chrome.tabs.executeScript(null, {
        code: 'console.log("clicked")'
      });
      // chrome.tabs.executeScript({
      //   code: 'document.body.style.backgroundColor="black"'
      // });
      // chrome.tabs.executeScript({
      //   code: 'document.body.style.color="white"'
      // });
      chrome.tabs.executeScript(null, {
        file: 'styling/on.js'
      });
    }
    isOn = !isOn;
    window.close();
  }

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
  //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
  //   });
  // }
  btn.addEventListener('click', handleClick);

});
