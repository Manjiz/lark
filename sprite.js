;(function() {
	'use strict';

	var fs = require('fs'),
		Spritesmith = require('spritesmith');

	var root = this;

	var conf = function() {
		return {
			// dir, output[, maxWidth, maxHeight]
			bydir: function(dir, output, maxWidth, maxHeight) {
				if(fs.statSync(dir).isDirectory()) {
					var fileList = [],
						folderList = [dir],
						maxWidth = maxWidth || 100,
						maxHeight = maxHeight || 100,
						walk = function() {
							if(folderList.length>0) {
								var files = fs.readdirSync(folderList[folderList.length-1]),
									dir = folderList[folderList.length-1];
								folderList.pop();
								files.forEach(function(item) {
									var tmpPath = dir + '/' + item;
									if(fs.statSync(tmpPath).isDirectory()) {
										folderList.push(tmpPath);
									} else {
										// 简单图片识别
										if(/.+\.(jpg|jpeg|png)$/.test(tmpPath)) {
											fileList.push(tmpPath);
										}
									}
								});
								walk();
							}
						};
					walk();
					
					var spritesmith = new Spritesmith();
					spritesmith.createImages(fileList, function handleImages (err, images) {
						if(err) throw err;
						images = images.filter(function(item) {
							return item.width<=maxWidth && item.height<=maxHeight;
						});
					  	var result = spritesmith.processImages(images);
					  	result.image.pipe(fs.createWriteStream(output));
					  	var json = {
					  		properties: result.properties,
					  		coordinates: result.coordinates
					  	};
					  	json = JSON.stringify(json);
					  	fs.writeFileSync(output+'.json', json);
					});
				}
			},

			bycss: function(filepath, output, isIntelligent) {
				var result, images = [],
					data = fs.readFileSync(filepath,'utf-8'),
					bgexp = /url\((?:'|")?([^'"\)]*)/g;
				while((result = bgexp.exec(data)) != null) {
					images.push(result[1]);
				}
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