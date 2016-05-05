#! /usr/bin/env node --harmony

'use strict';

const 
	Path = require('path'),
	Commander = require('commander'),
	Colors = require('colors'),

	Sprite = require('../lib/sprite'),
	Base64 = require('../lib/base64');

Commander.version('0.0.6');

Commander
	.command('sprite')
	.alias('sp')
	.description('合并雪碧图 | Merged Images to Sprite')
	.option('-f, --folder <value>', '指定文件夹 | Specified Images Folder')
	.option('-d, --deep', '遍历子文件夹 | Scan Subfolder')
	.option('-a, --all', '忽略尺寸限制合并全部 | Ignore Size Limit')
	.option('-s, --size <value>', '限制面积 | Max Size')
	.option('-w, --width <value>', '限制宽度<100>，默认值时面积优先 | Max Width<100>. Size Priority When Default')
	.option('-h, --height <value>', '限制高度<100>，默认值时面积优先 | Max Height<100>. Size Priority When Default')
	.option('-p, --padding <number>', '间距，默认0')
	.option('--algo <value>', '算法：top-down | left-right | diagonal | alt-diagonal | binary-tree')
	.option('-o, --output <value>', '输出名称<spoutput> | Output Name<spoutput>')
	.action(function(options) {
		let path = process.cwd();
		if(options.folder) {
			path = Path.join(path, options.folder); 
		}
		Sprite.bypath({
			path: path, 
			outputName: options.output, 
			isDeep: !!options.deep, 
			isAll: !!options.all,
			maxSize: options.size,
			maxWidth: options.width, 
			padding: Number.parseInt(options.padding),
			algorithm: options.algo,
			maxHeight: options.height
		});
	});

Commander
	.command('base64')
	.alias('b64')
	.description('图转Base64数据 | Convert Image to Base64 Data')
	.option('-f, --file <file>', '选择文件 | Select File')
	.option('-i, --index <index>', '第几个文件（按文件名排序），默认0')
	.action(function(options) {
		Base64.convert({
			file: options.file, 
			index: options.index
		});
	});

Commander.parse(process.argv);
