'use strict';

const 
	Path = require('path'),
	Commander = require('commander'),
	Sprite = require('./sprite');

Commander.version('0.0.1');

Commander
	.command('sprite')
	.alias('sp')
	.description('合并雪碧图 Merged images to sprite')
	.option('-f, --folder <value>', '指定文件夹 Specified the images folder')
	.option('-d, --deep', '遍历子文件夹 Scan subfolder')
	.action(function(options) {
		let path = process.cwd();
		if(options.folder) {
			path = Path.join(path, options.folder); 
		}
		Sprite.bydir(path, Path.join(path, 'spoutput.png'), 100, 100);
	});

Commander.parse(process.argv);

// var base64data = 'data:image/'+type[1]+';base64,'+ fs.readFileSync(file.path, {encoding:'base64'});