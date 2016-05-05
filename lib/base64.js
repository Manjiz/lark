;(function() {
	'use strict';

	const 
		fs = require('fs'),
		Path = require('path'),
		NCP = require("copy-paste"),
		Colors = require('colors'),

		root = this;

	let conf = function() {
		return {
			convert: function({file, index}) {
				let path = file || './';
				let img;

				if(!file || fs.statSync(file).isDirectory()) {
					let files = fs.readdirSync( file || path ).sort();
					files = files.filter(x => {
						let name = file ? Path.join(file, x) : x;
						if(!fs.statSync(name).isDirectory() && /.+\.(jpg|jpeg|png)$/.test(name)) {
							return true;
						}
					});
					img = files[index || 0];
					if(!files[index || 0]) {
						console.log('目录下没找到图片');
						return;
					}
					img = file ? Path.join(file, img) : img;
				} else {
					img = file;
				}

				console.log(Colors.green('------------------------'));
				console.log(Colors.green('-> %s'), img);
				console.log(Colors.green('------------------------'));

				let type = img.match(/\.([^\.]+)$/);
				type = type ? type[1] : '';
				let data = fs.readFileSync(img, {encoding:'base64'});
				let base64data = 'data:image/'+type+';base64,'+ data;
				NCP.copy(base64data, function () {
	  				console.log(Colors.green('BASE64数据已复制到剪切板'));
				});
			}
		};
	}

	if(typeof exports !== 'undefined') {
		if(typeof module !== 'undefined' && module.exports) {
			exports = module.exports = conf();
		}
		exports.conf = conf();
	}
}).call(this);