console.log('on.js');
// console.log(document.querySelectorAll('*'));
document.querySelectorAll('*').forEach(elm => {
  elm.style.backgroundColor = 'black';
  elm.style.color = 'white';
  elm.style.fontFamily = 'TimesNewRoman';
})
// document.querySelector('*').style.color = 'white';
// document.querySelector('*').style.fontFamily = 'TimesNewRoman';
// console.log(document.querySelectorAll('*').length);
