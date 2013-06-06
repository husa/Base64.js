var Base64 = require('base64');

var str = 'This is just a test string'; 
	coded = Base64.encode(str),

	decoded = Base64.decode(coded);

console.log('original string = ', str);
console.log('coded string    = ', coded);
console.log('decoded string  = ', decoded);