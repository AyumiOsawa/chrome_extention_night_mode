console.log('off.js');
// document.querySelector('body').style.backgroundColor = 'white';
// document.querySelector('body').style.color = 'black';
// document.querySelector('*').style.fontFamily = 'Arial';

document.querySelectorAll('*').forEach(elm => {
  elm.style.backgroundColor = 'white';
  elm.style.color = 'black';
  elm.style.fontFamily = 'Arial';
})
