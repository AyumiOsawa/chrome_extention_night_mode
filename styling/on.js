console.log('on.js');

// if(typeof body == 'undefined') {
//   const body = document.querySelector('body');
//   console.log('if is run');
// }
console.log(typeof body);
let body = document.querySelector('body');
console.log('body: ' + body);
body.style.backgroundColor = 'black';
body.style.color = 'white';
console.log('turned on');

console.log(typeof body);
delete body;
console.log(body);
