# timeLine for jx3

一款为剑三写的自用倒计时插件

外网地址:http://45.192.165.83:8080

## 使用说明

>提示:只可以用chrome浏览器打开,别的浏览器可以倒计时,但是无法播放语音.


### 编辑说明

所有数据保存在本地\
点击编辑倒计时,进入编辑界面.

#### 方法1
直接在文本框进行编辑\
文本框编辑格式为: 时间 说明\
最好的方法是在外侧的编辑器内编辑好 然后复制进去,不然你会发现很难编辑.\
示例:

```$xslt
34 躲圈
57 抱团
145 躲圈
189 分散
```

以上复制到文本框内,相同说明的计时条颜色相同.\
点击保存,输入名字后返回.

#### 方法2
当开怪的时候可以点击开始 同步记录游戏发生时间.\
在发生了某事件之后,回到网页中,按键盘E记录该事件,之后修改说明即可.

### 开始倒计时

返回到主页,点击开始倒计时,点击开始即可.\
语音提前,指在倒计时条结束前多久播放语音


##  辅助插件
因为要在网页和游戏之间切换,因此需要一些辅助插件.\
1.chrome自带插件Seperate Window\
下载地址:https://chrome.google.com/webstore/detail/cbgkkbaghihhnaeabfcmmglhnfkfnpon \
用这个插件可以将倒计时独立出来 拖动成为一个小窗口\
2.windows on top\
下载地址:https://download.cnet.com/Window-On-Top/3000-2072_4-75586848.html \
用这个插件可以将倒计时窗口置顶.



>如果你要研究该代码,可以用以下方式下载,依赖node.js
## 下载安装说明

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# 直接运行
npm start
```

