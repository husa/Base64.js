(function() {
	'use strict';

	var	isNode = false,
		root = this;

	if (typeof(exports) !== 'undefined' && typeof(module) !== 'undefined' && module.exports) {
		isNode = typeof (Buffer) !== 'undefined';
	}
	
var Base64 = new function() {
	var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function encode(input) {
		var output = '',
			chr1, chr2, chr3, enc1, enc2, enc3, enc4,
			i = 0;
		
		if (isNode) {
			return new Buffer(input).toString('base64');
		}

		input = _utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

		}

		return output;
	}

	// public method for decoding
	function decode(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		
		if (isNode) {
			return new Buffer(input, 'base64').toString('utf8');
		}

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

		while (i < input.length) {

			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}

		output = _utf8_decode(output);

		return output;

	}

	// private method for UTF-8 encoding
	function _utf8_encode(string) {
		var utftext = '';

			string = string.replace(/\r\n/g,'\n');

		for (var n = 0, m = string.length; n < m; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}

	// private method for UTF-8 decoding
	function _utf8_decode(utftext) {
		var string = '',
			i = 0,
			c = 0, c1 = 0, c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}
		return string;
	}

	return {
		encode : encode,
		decode : decode
	};

};

	if (typeof(exports) !== 'undefined') {
		if (typeof(module) !== 'undefined' && module.exports) {
			exports = module.exports = Base64;
		}
		exports.Base64 = Base64;
	} else {
		root.Base64 = Base64;
	}

}).call(this);
