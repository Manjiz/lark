;(function() {
	'use strict';

	const 
		fs = require('fs'),
		Path = require('path'),
		Spritesmith = require('spritesmith'),

		root = this;

	// 换行JSON
	const wrapJSON = str => {
		let addedStr = '';
		let space = 0;
		for(let c of str) {
			if(c==='{') {
				addedStr += (c+'\r\n');
				space += 2;
				addedStr += ' '.repeat(space);
			} else if(c==='}') {
				addedStr += '\r\n';
				space -= 2;
				addedStr += ' '.repeat(space);
				addedStr += c;
			} else if(c===',') {
				if(space===6) {	// 都放一行吧
					addedStr += ', ';
				} else {
					addedStr += (c+'\r\n');
					addedStr += ' '.repeat(space);
				}
			} else {
				addedStr += c;
			}
		}
		return addedStr.replace(/\\\\/g, '/');
	}

	let conf = function() {
		return {
			// path, outputName[, maxWidth, maxHeight]
			bypath: function({path, outputName='spoutput', isDeep, isAll, maxWidth, maxHeight, maxSize, padding, algorithm}) {
				let spritesmith = new Spritesmith(),

					fileList = [],
					folderList = [path];
				
				let walk = function() {
					if(folderList[0]) {
						let files = fs.readdirSync( folderList[folderList.length-1] ),
							fp = folderList.pop();
						files.forEach(item => {
							let tmpPath = Path.join(fp, item);
							if(fs.statSync(tmpPath).isDirectory() && isDeep) {
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

				spritesmith.createImages(fileList, function(err, images) {
					if(err) throw err;

					let outputImg = Path.join(path, outputName+'.png'),
						outputJSON = Path.join(path, outputName)+'.json';

					images = images.filter(item => {
						// 默认值时面积优先
						return isAll || (maxSize ? 
									(item.width*item.height<=maxSize 
										&& (maxWidth ? (item.width<=maxWidth) : true) 
										&& (maxHeight ? (item.height<=maxHeight) : true)) 
								  : (item.width<=(maxWidth||100) && item.height<=(maxHeight||100)));
					});

				  	let result = spritesmith.processImages(images, {
				  		padding: padding || 0,
				  		algorithm: algorithm
				  	});

				  	// 这里是追加数据到图片
				  	result.image.pipe(fs.createWriteStream(outputImg));

					let newObj = {};
					for(let key of Object.keys(result.coordinates)) {
						let sourceObj = {};
						sourceObj[Path.relative(path, key)] = result.coordinates[key]
						Object.assign(newObj, sourceObj);
					}

				  	result.properties.cssText = `background:url(${Path.relative(path, outputImg)});background-size:${result.properties.width}px;`;
				  	let json = {
				  		ruler: result.properties,
				  		coord: newObj
				  	};
				  	json = wrapJSON(JSON.stringify(json));
				  	fs.writeFileSync(outputJSON, json);
				});
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