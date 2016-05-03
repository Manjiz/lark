'use strict';

const 
	Path = require('path'),
	Commander = require('commander'),

	Sprite = require('./src/sprite');

Commander.version('0.0.1');

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
	.option('-n, --name <value>', '输出名称<spoutput> | Output Name<spoutput>')
	.action(function(options) {
		let path = process.cwd();
		if(options.folder) {
			path = Path.join(path, options.folder); 
		}
		Sprite.bypath({
			path: path, 
			outputName: options.name, 
			isDeep: !!options.deep, 
			isAll: !!options.all,
			maxSize: options.size,
			maxWidth: options.width, 
			maxHeight: options.height
		});
	});

Commander.parse(process.argv);

// var base64data = 'data:image/'+type[1]+';base64,'+ fs.readFileSync(file.path, {encoding:'base64'});