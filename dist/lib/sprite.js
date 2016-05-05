'use strict';

;(function () {
	'use strict';

	var fs = require('fs'),
	    Path = require('path'),
	    Spritesmith = require('spritesmith'),
	    root = this;

	// 换行JSON
	var wrapJSON = function wrapJSON(str) {
		var addedStr = '';
		var space = 0;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var c = _step.value;

				if (c === '{') {
					addedStr += c + '\r\n';
					space += 2;
					addedStr += ' '.repeat(space);
				} else if (c === '}') {
					addedStr += '\r\n';
					space -= 2;
					addedStr += ' '.repeat(space);
					addedStr += c;
				} else if (c === ',') {
					if (space === 6) {
						// 都放一行吧
						addedStr += ', ';
					} else {
						addedStr += c + '\r\n';
						addedStr += ' '.repeat(space);
					}
				} else {
					addedStr += c;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return addedStr.replace(/\\\\/g, '/');
	};

	var conf = function conf() {
		return {
			// path, outputName[, maxWidth, maxHeight]
			bypath: function bypath(_ref) {
				var path = _ref.path;
				var _ref$outputName = _ref.outputName;
				var outputName = _ref$outputName === undefined ? 'spoutput' : _ref$outputName;
				var isDeep = _ref.isDeep;
				var isAll = _ref.isAll;
				var maxWidth = _ref.maxWidth;
				var maxHeight = _ref.maxHeight;
				var maxSize = _ref.maxSize;
				var padding = _ref.padding;
				var algorithm = _ref.algorithm;

				var spritesmith = new Spritesmith(),
				    fileList = [],
				    folderList = [path];

				var walk = function walk() {
					if (folderList[0]) {
						(function () {
							var files = fs.readdirSync(folderList[folderList.length - 1]),
							    fp = folderList.pop();
							files.forEach(function (item) {
								var tmpPath = Path.join(fp, item);
								if (fs.statSync(tmpPath).isDirectory() && isDeep) {
									folderList.push(tmpPath);
								} else {
									// 简单图片识别
									if (/.+\.(jpg|jpeg|png)$/.test(tmpPath)) {
										fileList.push(tmpPath);
									}
								}
							});
							walk();
						})();
					}
				};
				walk();

				spritesmith.createImages(fileList, function (err, images) {
					if (err) throw err;

					var outputImg = Path.join(path, outputName + '.png'),
					    outputJSON = Path.join(path, outputName) + '.json';

					images = images.filter(function (item) {
						// 默认值时面积优先
						return isAll || (maxSize ? item.width * item.height <= maxSize && (maxWidth ? item.width <= maxWidth : true) && (maxHeight ? item.height <= maxHeight : true) : item.width <= (maxWidth || 100) && item.height <= (maxHeight || 100));
					});

					var result = spritesmith.processImages(images, {
						padding: padding || 0,
						algorithm: algorithm
					});

					// 这里是追加数据到图片
					result.image.pipe(fs.createWriteStream(outputImg));

					var newObj = {};
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = Object.keys(result.coordinates)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var key = _step2.value;

							var sourceObj = {};
							sourceObj[Path.relative(path, key)] = result.coordinates[key];
							Object.assign(newObj, sourceObj);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					result.properties.cssText = 'background:url(' + Path.relative(path, outputImg) + ');background-size:' + result.properties.width + 'px;';
					var json = {
						ruler: result.properties,
						coord: newObj
					};
					json = wrapJSON(JSON.stringify(json));
					fs.writeFileSync(outputJSON, json);
				});
			},

			bycss: function bycss(filepath, output, isIntelligent) {
				var result,
				    images = [],
				    data = fs.readFileSync(filepath, 'utf-8'),
				    bgexp = /url\((?:'|")?([^'"\)]*)/g;
				while ((result = bgexp.exec(data)) != null) {
					images.push(result[1]);
				}
			}
		};
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = conf();
		}
		exports.conf = conf();
	}
}).call(undefined);