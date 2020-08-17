

document.addEventListener('DOMContentLoaded', () => {
  // const btn = document.getElementById('btn');
  // const bg = document.getElementById('body');
  // const default_bg_color = bg.style.background;
  // let isOn = false;
  //
  // btn.addEventListener('click', () => {
  //     // isOn ? (bg.style.background = default_bg_color)
  //     // : (bg.style.background = 'black');
  //     isOn = !isOn;
  // });
  let isOn = false;
  let btn = document.getElementById('btn');
  chrome.storage.sync.get(['bg_color', 'color'], (stored_data) => {
    btn.addEventListener('click', () => {
      if(isOn) {
        // btn.style.backgroundColor = stored_data.bg_color;
        // btn.style.color = stored_data.color;
        btn.value = "Turn off";
        chrome.tabs.executeScript({
          'code': 'console.log("unclicked")'
        });
        chrome.tabs.executeScript({
          'code': 'document.body.style.backgroundColor="white"'
        });
        chrome.tabs.executeScript({
          'code': 'document.body.style.color="black"'
        });
      } else {
        // btn.style.backgroundColor = 'white';
        // btn.style.color = 'black';
        chrome.tabs.executeScript({
          'code': 'console.log("clicked")'
        });
        chrome.tabs.executeScript({
          'code': 'document.body.style.backgroundColor="black"'
        });
        chrome.tabs.executeScript({
          'code': 'document.body.style.color="white"'
        });
        btn.value = "Turn on";
      }
      isOn = !isOn;
    })
  })

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


});
