Lark!
------

基于 Electron。

综合前端小工具。

## 雪碧图 ##

默认当前目录下的所有图片

``` bash
larks sp
```

*现阶段，你可能需要通过 `node larks sp` 来执行*

参数：

- --folder, -f 指定相对文件夹
- --deep, -d 遍历子文件夹，默认仅合并当前目录的图片

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
