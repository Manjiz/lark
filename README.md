Larks!
------

[![npm version](https://badge.fury.io/js/larks.svg)](https://badge.fury.io/js/larks)

前端小工具。

运行环境：Node.js [>=6.0.0]，不稳定支持其他版本

**安装**

``` bash
node install -g larks
```

**使用**

``` bash
larks [命令] [参数]

# 对于低版本nodeJS用户，我已经用babel转好了，但不保证一定能用
larks-es5 [命令] [参数]
```

### 雪碧图 ###

``` bash
# 支持简写 sp
larks sprite [参数]

# 示例
larks sp -f test -d
```

参数：

- --folder, -f 指定相对文件夹，注意是相对路径
- --deep, -d 遍历子文件夹，默认仅合并当前目录的图片
- --all, -a 忽略尺寸限制合并全部
- --size, -s 限制面积
- --width, -w 限制宽度<100>，默认值时面积优先
- --height, -h 限制高度<100>，默认值时面积优先
- --padding, -p 间距
- --algo 算法：top-down | left-right | diagonal | alt-diagonal | binary-tree，详见[这里](https://github.com/Ensighten/spritesmith#algorithms)
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

### Base64 ###

``` bash
# 支持简写b64
larks base64 [参数]

# 示例
larks b64 -f home.png
```

参数：

- -f, --file 指定文件

转换后 Base64 数据将会复制到剪切板中。
