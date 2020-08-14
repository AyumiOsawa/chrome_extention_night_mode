document.addEventListener('DOMContentLoaded', () => {
  const page = document.getElementById('btnDiv');
  const kBtnColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

  createOptions = (kBtnColors) => {
    for (let item of kBtnColors) {
      let btn = document.createElement('button');
      btn.style.backgroundColor = item;
      btn.addEventListener('click', () => {
        chrome.storage.sync.set({color: item}, () => {
          console.log('color is ' + item);
        })
      });
      page.appendChild(btn);
    }
  }

  createOptions(kBtnColors);
})
