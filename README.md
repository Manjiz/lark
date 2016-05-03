Larks!
------

基于 Electron。

综合前端小工具。

运行环境：Node.js (>=6.0.0)[必须]，由于用到了大量的ES6新特性，比如6.0.0才支持的函数参数默认值

## 雪碧图 ##

默认当前目录下的所有图片

``` bash
larks sp
```

*现阶段，你可能需要通过 `node larks sp` 来执行*

参数：

- --folder, -f 指定相对文件夹
- --deep, -d 遍历子文件夹，默认仅合并当前目录的图片
- --all, -a 忽略尺寸限制合并全部
- --size, -s 限制面积
- --width, -w 限制宽度<100>，默认值时面积优先
- --height, -h 限制高度<100>，默认值时面积优先
- --name, -n 输出名称<spoutput>

将得到一张雪碧图以及一个JSON的坐标描述文件，如下：

```
{
  "ruler":{
    "width":144,
    "height":108,
    "cssText":"background:url(spoutput.png);background-size:144px;"
  },
  "coord":{
    "index.v2.home.png":{
      "x":0, "y":0, "width":36, "height":36
    },
    "deep/index.v2.home2.png":{
      "x":72, "y":36, "width":36, "height":36
    }
  }
}
```
