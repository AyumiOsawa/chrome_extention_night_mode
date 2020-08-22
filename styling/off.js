console.log('off.js');

// if(typeof body == 'undefined') {
//   const body = document.querySelector('body');
//   console.log('if is run');
// }
console.log(typeof body);
let body = document.querySelector('body');
body.style.backgroundColor = 'white';
body.style.color = 'black';
console.log('turned off');

console.log(typeof body);
delete body;
console.log(body);
