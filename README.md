Larks!
------

前端小工具。

运行环境：Node.js (>=6.0.0)[必须]，由于用到了大量的ES6新特性，比如6.0.0才支持的函数参数默认值

**安装**

``` bash
node install -g larks
```

## 雪碧图 ##

使用：

``` bash
larks sp [参数]

## 示例
larks sp -f test -d
```

参数：

- --folder, -f 指定相对文件夹，注意是相对路径
- --deep, -d 遍历子文件夹，默认仅合并当前目录的图片
- --all, -a 忽略尺寸限制合并全部
- --size, -s 限制面积
- --width, -w 限制宽度<100>，默认值时面积优先
- --height, -h 限制高度<100>，默认值时面积优先
- --output, -o 输出名称，默认spoutput

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
