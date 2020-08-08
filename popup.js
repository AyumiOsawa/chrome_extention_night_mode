

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

  let cc = document.getElementById('btn');

  chrome.storage.sync.get('color', (data) => {
    cc.style.background = data.color;
    cc.setAttribute('value', data.color);
  })

  cc.onclick = (elm) => {
    console.log('clicked');
    let color = elm.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  }


});
