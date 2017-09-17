---
type: "pictures"
title: Custome Settings for NexT.Pisces Theme and Hexo
date: 2016-10-14 16:29:18
categories:
- Tutorials
tags:
- hexo
- next-theme
- 折腾
- 黑科技
---
{% centerquote %}生命不息，折腾不止。{% endcenterquote %}
<!-- more -->

## 前言
本人采用的是 NexT.Pisces (Gemini) 主题，所以这些黑科技都是具有针对性的，理论上 NexT 中的另外主题也是能适用的。以下一些common的设置，理论上也是可以适用其他 Hexo 博客的。

## 由Hexo强力驱动 | 主题 - NexT.Pisces
### 如何删除？
{% note primary %}
现在可由 <span id="inline-purple">主题配置文件</span> 中的 copyright 选项设置为 false 实现。
{% endnote %}
这几行字放着是在是不开心，强迫症表示必须要删了！找到 `themes/next/layout/_partials` 下的 `footer.swig`： 
{% codeblock lang:html line_number:false%}
<div class="powered-by">
  \{\{ __('footer.powered', '<a class="theme-link" href="https://hexo.io">Hexo</a>') \}\}
</div>

<div class="theme-info">
  \{\{ __('footer.theme') \}\} -
  <a class="theme-link" href="https://github.com/iissnan/hexo-theme-next">
    NexT.{{ theme.scheme }}
  </a>
</div>
{% endcodeblock %}用`<!--`和`-->`把这段代码注释掉。

{% note warning %}
这里的 `\{` 和 `\}` 是为了防止本网页中的代码被 Markdown 解析成某种元素而添加的转义符号，在实际文件中并不存在！{% endnote %}

### 自定义网页尾部
当然，我自己添加了一行 Last Modified 信息

{% codeblock line_number:false lang:html %}
<div class="modified" >
<span class="last-update" >Last modified: Oct. 12th, 2016</span>
</div>
{% endcodeblock %}
暂时无法自动更新日期，Hexo 中内置使用的是 [Moment.js](http://momentjs.com/)，不知道如何嵌入进去更新时的时间，可能涉及到一些系统调用啥的，不懂，所以暂时是手动更新。

### 一个坑
我自己不是很懂网页前端设计，折腾、调试了很久。如果你的网页尾部有 3 行或者更多的内容，需要同时把`/themes/next/source/css/_schemes/Pisces` 的`_layout.styl`文件中 `min-height`的 css 样式值设置的大一些，否则就不是在页面右半部分居中。
## Powered by 多说？删掉！
{% note primary %}
现已不再支持多说评论？？？
{% endnote %}
同样的，在添加了 **多说评论** 后，评论框的最后也出现了 Powered By 多说，算是品牌信息，然而我喜欢小清新，所以不想要这些多余的文字。于是又开始找源码，发现本地调用的是 **多说自己提供** 的 js 脚本，网页加载时会自动去下载，里面就有这样的小尾巴设定。当然，首先你得在多说上设置你的版权信息显示为 `Powered by 多说` 这样的，其他的也行，仿照做法即可。
① 把这份 [js 脚本](http://static.duoshuo.com/embed.js) 复制下来，存在本地命名为 `duoshuoembed.js`, 为了在 Hexo 生成时能够被加载，推荐放在 `themes/next/source/js/src` 下。
② 根据自己设置的版权信息，通过搜索`Powered` 关键字在 js 脚本中定位到一个 `poweredBy` 函数，直接删除这个函数，或者 `return` 一个空的字符串即可。
③ 重定义为自己修改过的 js 脚本。在网页项目中找到对应的加载评论的网页模板文件，完整路径是 `themes/next/layout/_scripts/third-party/comments/duoshuo.swig`，把其中这样一行{% codeblock lang:html line_number:false %}
ds.src = (document.location.protocol == 
	'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
{% endcodeblock %}改为 {% codeblock lang:html line_number:false %}
ds.src = '/js/src/duoshuoembed.js';
{% endcodeblock %}这样就可以加载到我们本地的 多说 js 脚本。

{% note info %}
在推送到 Github 上以后就能够正常显示了
{% endnote %} 

## Custome Logo
NexT 主题中说明，只有默认 Muse Scheme 可以设置，不甘寂寞，动手改造。
### 添加Custome Logo
编辑<span id="inline-purple">主题配置文件</span> `_config.yml`，设置 `custom_logo`字段。

{% codeblock line_number:false lang:yml%}
custom_logo:
  enabled: true
  image: /images/custom_logo.jpg
{% endcodeblock %}
既然官方说明文档表示不支持 Pisces Scheme，那么注定还有许多的坑，看了看源码，还需要修改 `themes/next/layout/_partials/header.swig` 的第 2 行中 `Muse` 为 `Pisces` 或者直接删除 `and theme.scheme === 'Pisces'` 这个条件。

### 又一个大坑
那么问题来了，官方说不支持，就一定有问题。实际情况是，`header` 中 `site-nav` 部分（首页、分类、关于、归档的那个小部件）由于图片的存在，被下面的 `sidebar` 部分遮盖了。实际情况和预期情况：

![实际与预期情况](contrast.png)

奇怪的是，在 Chrome 浏览器中，刷新几次能正常显示，查看网页源代码是
`<aside id="sidebar" class="sidebar" style="margin-top: 458px;">`，而不正确显示的情况下，`margin-top: 300px`，修改了能找到 `sidebar` 对应的 css 格式参数，甚至在生成的语言中显式写上 `style="margin-top: 458px;"` 依旧 not work。
终于在本篇博文完成前，得到了原作者大大的回复：

![作者解答](review.png)

动手！从浏览器解析出的结果，在 `source/js/schemes/pisces.js` 中，把原本通过计算得出的 `sidebar` 的 `margin-top` 改为定值即可，根据不同的图片而设定。看了一下 css 相关的其他代码，发现其他两个 Scheme (`themes/next/source/css/_schemes/Pisces`)下都有一个 `_logo.styl` 文件，声明了关于 `custome-logo-image` 的样式。于是搬过来，在 Pisces Scheme 的 `index.styl` 中记得 `@import`进来，从而稍作修改：

{% codeblock _logo.styl lang:html line_number:false %}
.custom-logo {
  .site-meta-headline { text-align: center; }

  .brand { background: none; }

  .site-title {
    margin: 10px auto 0;
    font-size: 24px;
    a { border: none; }
  }
}

.custom-logo-image {
  margin: 0 auto;
  max-width: 240px;
  height: ???px; // 根据实际图片调整
  background: white;
}
{% endcodeblock %}
这样 Header 的 height 能够正确计算出，Sidebar 的定位也能准确得到 `margin-top` 属性。如果你有什么好的办法，欢迎在 NexT 的 [issue](https://github.com/iissnan/hexo-theme-next/issues/1163) 页面留言。再次感谢作者大大！！

## Block Quote
在看 Hexo 和 NexT 主题的文档时，爱上了这种左粗边框带颜色文本框。

![quote](quote.png)

### 添加标签插件
{% note primary %}
现已经有大神[ivan-nginx](https://almostover.ru/2016-01/hexo-theme-next-test)做了...他还做了很多其他的样式！
{% endnote %}
Hexo 提供了一种引用文字格式，[文档](https://hexo.io/docs/tag-plugins.html)正好有关于 `blockquote-center` 的介绍，是以插件的形式实现的，在此基础上进行修改。以我自己定义的左侧边框为红色的 `blockquote-warn` 样式为例。
① 在`themes/next/source/css/_common/components/tags` 下添加一个 `blockquote-border.styl` 文件，用于规定一些样式，使之符合整个博客的风格。
同样别忘了在总的 `tags.styl` 文件中指明调用：`@import "blockquote-border";`
{% codeblock blockquote-border.styl lang:css line_number:false %}
// Blockquote with color left changed red.
.blockquote-warn {
  padding: 0 15px;
  margin-bottom: 1.3em;
  color: $grey-dim;
  border-left: 4px solid #d9534f; //red
  border-top: 1px solid $grey-light;
  border-bottom: 1px solid $grey-light;
  border-right: 1px solid $grey-light;
 
  cite::before {
    content: "-";
    padding: 0 5px;
  }
}

.quote-title {
  margin-top: 1em;
  margin-bottom: 0;
  display: block;
  font-size: 1.3em;
  font-weight: 700
}

.quote-content {
  margin-top: 1.5em;
}
{% endcodeblock %}

② 编写 js 代码，注入对应的 html 代码，放在 `themes/next/scripts/tags` 下：
{% codeblock border-quote.js lang:javascript line_number:false %}
// Blockquote with color left changed red.
/* global hexo */
// Usage: {\% warnquote \%} Something {\% endwarnquote \%}
// Alias: {\% wq \%} Something {\% endwq %}\

function warnQuote (args, content) {
  return '<blockquote class="blockquote-warn">' +  
            hexo.render.renderSync({text: content, engine: 'markdown'}) +
          '</blockquote>';
}

hexo.extend.tag.register('warnquote', warnQuote, {ends: true});
hexo.extend.tag.register('wq', warnQuote, {ends: true});
{% endcodeblock %}

③ 添加类似的 `{\% warnquote %}`与 `{\% endwarnquote \%}`(简写为`{\% wq %}`与`{\% endwq %}`) markdown标签，在 `themes/next/source/css/_common/components/post` 中的 `blockquote` 下添加：{% codeblock lang:css line_number:flase %}
@extend .blockquote-warn;
{% endcodeblock %}{% note success %}
这里的`\`只是表示转义，实际使用时请去掉！
{% endnote %}

### 仿上图风格
不幸的是，这样的做法并不完美，如果引用块（其实现在已经是一种特殊的消息文本框了）里有标题和内容，格式显然是不同的。毕竟是用 Markdown 来写博客内容，不能用太多的 html 和 css 元素，在这里有一个并不完美的方案。上述 `blockquote-border.styl` 文件中定义的 `quote-title` 和 `quote-content` 就将块里的文字分成两种。
{% examplequote %}文本框样式 {% note danger %}
**这是标题**
这是内容 {% endnote %} {% endexamplequote %}

#### 既有标题又有内容的情况
{% codeblock lang:html line_number:false %}
{\% warnquote \%}
<strong class="quote-title">这是标题</strong>
这是内容
{\% endwarnquote \%}
{% endcodeblock %}
#### 只有内容的情况
{% codeblock lang:html line_number:false %}
{\% warnquote \%}
<p class="quote-content">这里只有内容，没有标题</p>
{\% endwarnquote \%}
{% endcodeblock %}

## Example Quote
在 NexT Theme 的文档中，出现了这样一种带块头的文本框，从他的 css 样式中学了来，但是在 Markdown 里写起来比较难看。

![example quote](example.png)

### 样式定义
同样以插件的形式添加，在 `themes/next/source/css/_common/components/tags` 中新建 `quote-example.styl`，并在 `tags.styl` 中引入：`@import "quote-example"`。
{% codeblock quote-example.styl line_number:false lang:html %}
// quote with box with title: example
.quote-example {
    position: relative;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 18px;
    font-size: 12px;

    &::before {
    display: inline-block;
    margin-right: 5px;
    font-weight: 700;
    color: #959595;
    text-transform: uppercase;
    letter-spacing: 1px;
    content: "Example - ";
  }
}
{% endcodeblock %}

### 实际使用
Markdown 中写起来实在是很难看，用基于 `HTML` 的 `<div>` 标签。
{% codeblock lang:html line_number:false %}
<div class="quote-example"> Quote Example 标题
这是其他内容
</div>
{% endcodeblock %}

### 使用Tag Plugin
不甘寂寞，所以和之前一样使用标签来表示。
新建一个 `example-quote.js` 脚本，放在 `themes/next/scripts/tags` 中，内容如下：
{% codeblock lang:javascript %} /* global hexo */
// Usage: {% examplequote %} Something {% endexamplequote %}
// Alias: {% eq %} Something {% endeq %}

function exampleQuote (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<div class="quote-example">' +   
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('examplequote', exampleQuote, {ends: true});
hexo.extend.tag.register('eq', exampleQuote, {ends: true});
{% endcodeblock %}
使用 Hexo 更新一下，就可以直接使用
{% codeblock lang:markdown line_number:false %}
{\% examplequote \%} 标题（需要一个换行符）
内容
{\% endexamplequote \%}
{% endcodeblock %}

### 效果图
实际效果还可以，但是有一些格式上的问题需要注意，毕竟不是亲儿子。
{% examplequote %}Quote Example 标题
这是其他内容 
{% endexamplequote %}{% note info %}
当然，其他的内容也可以是上述定义的 Block Quote，codeblock等
{% endnote %}{% note danger %}
使用标签方法调用时，请尽量保证各种嵌入的环境标签在同一行中，否则会引起格式解析错误!{% endnote %}

## 代码块设置
Hexo 或者支持两种方法在文章中插入代码块，一种是基于 Markdown 的以 \`\`\`(一般是键盘上数字 1 左边的波浪号~键，且需要在英文输入状态下) 包裹的方式，另一种则是 `{\% codeblock \%}`和{\% endcodeblock \%}方法。这里强推后者，可以指定代码的语言，行号等其他参数，完整格式如下：
{% codeblock lang:markdown line_number:false %}
{\% codeblock [title] [lang:language] [line_number:(true|false)] [url] [link text] \%}
code snippet
{\% endcodeblock \%}
{% endcodeblock %}
* `title` 参数可以表明是否显示代码文件名，显示在左上角
* `lang` 参数指明代码语言，是代码高亮模式的依据
* `line_number` 是否需要显示行号，默认为 `true` 显示行号
* `url` 和 `link text` 则是在右上角显示一个链接和链接文字

{% note info %}这里的 `\` 仅是为了防止文章解析与显示的错误，实际使用时请去掉！下面各种代码中的 `\` 同理，不再赘述
{% endnote %}

### 语法
{% codeblock lang:markdown line_number:false %}
{\% codeblock test.java lang:java line_number:true someurl urlname \%}
Some java code
{\% endcodeblock \%}
{% endcodeblock %}

### 效果
为了显示效果，稍微调整了一下代码块的 `margin` 和 `padding` 参数，把值调小，免得行距、空白太多。在 `themes/next/source/css/_common/components/highlight/highlight.styl` 文件中，修改： `$code-block` 下属性改为 `margin: 10px 0;` 和  `padding: 10px;`。
{% codeblock IBMTest.java lang:java line_number:true https://github.com/qiufengyu/CodeWarehouse/blob/master/NLP/IBM%20Model%201/code/src/IBMTest.java  IBMTest %}
/**
 * IBM Language Translation Model 1, a simple implementation
 */
import java.io.IOException;

public class IBMTest {
  
  private static int MAX_IT = 100;

  public static void main(String[] args) throws IOException {
    final long t1 = System.currentTimeMillis();
    // Initialize the filter Set
    Decoder.initSet();
    
    IBMDriver driver = new IBMDriver();
    driver.model("test.en.txt", "test.ch.txt", MAX_IT);
    
    IBMInverse inverse = new IBMInverse();
    inverse.modelInverse("test.en.txt", "test.ch.txt", MAX_IT);
    
    Decoder.decode(driver.getProbT(), inverse.getProbTInverse(), "test.en.txt", "test.ch.txt", "myalignment.txt");
    
    Decoder.evaluate("test.align.txt", "myalignment.txt");
    
    final long t2 = System.currentTimeMillis();
    
    System.out.println("Time = "+(t2-t1)+" ms with "+MAX_IT+" iterations.");
  }

}
{% endcodeblock %}

## 背景色标签
依然在 NexT 的文档中，看到了有背景颜色的标签，感觉能够为整个博客内容带来一些变化，通过照抄 css 定义，用插件的方式引入。

### 样式定义
在 `themes/next/source/css/_common/components/tags` 中新建 `inline-tags.styl`，并在 `tags.styl` 中引入：`@import "inline-tags"`，限于篇幅只列出了一种颜色，其余的底色的标签就不再赘述。
{% codeblock inline-tags.styl line_number:false %}
span#inline-blue {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 80%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0;
  background-color: #2780e3;
}
{% endcodeblock %}

### Markdown 中使用
由于本人水平有限，没办法用一个 js 文件搞定多种底色颜色的标签，依旧不是很好看的用法。Markdown 中用的兼容 `html` 的方式：
{% codeblock line_number:false lang:html %}
<span id="inline-blue">蓝色标签</span>
{% endcodeblock %}不过我不嫌麻烦，还是写了个相关的 js 脚本，依旧以蓝底标签为例：
{% codeblock lang:javascript %} /* global hexo */
// Usage: {\% inlinetagblue \%} Something {\% endinlinetagblue \%}
// Alias: {\% itb \%} Something {\% enditb \%}

function inlineTagBlue (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-blue">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetagblue', inlineTagBlue, {ends: true});
hexo.extend.tag.register('itb', inlineTagBlue, {ends: true});
{% endcodeblock %}
现在可以直接用 `{\% inlinetagblue \%}` 或者 `{\% itb \%}` 来调用：
{% codeblock line_number:false %}
{\% inlinetagblue \%} 蓝色标签 {\% endinlinetagblue \%}
{% endcodeblock %}
### 实际效果
没错，他可以和其他的样式一起用：
{% eq %} 这是一张6种底色标签的样例 {% note success %}
{% itb %}蓝色标签{% enditb %}、{% itr %}红色标签{% enditr %}、{% ity %}黄色标签{% endity %}、{% itp %}紫色标签{% enditp %}、{% itg %}绿色标签{% enditg %}、{% ito %}橙色标签{% endito %}
{% endnote %}{% endeq %}

## 背景动画设置
这是一种非常酷炫的东西，但感觉会拖慢网页加载的速度。

1. 将 [particle.js](https://github.com/qiufengyu/qiufengyu.github.io/tree/master/js/src/particle.js) 文件添加到 `themes/next/source/js/src`文件目录下。
2. 在`themes/next/layout/_layout.swing`文件的 `</body>`标签之前添加以下代码：
{% codeblock line_number:false lang:html %}
<!-- 背景动画 -->
<script type="text/javascript" src="/js/src/particle.js"></script>
{% endcodeblock %}

## 鼠标点击小爱心设置
1. 将 [love.js](https://github.com/qiufengyu/qiufengyu.github.io/tree/master/js/src/love.js) 文件添加到 `themes/next/source/js/src` 文件目录下。
2. 在`themes/next/layout/_layout.swing`文件的 `</body>`标签之前添加以下代码：
{% codeblock line_number:false lang:html %}
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/love.js"></script>
{% endcodeblock %}
{% note danger %} 有趣的是，小爱心的颜色是随机的哟(=・ω・=) {% endnote %}

## 回滚 NexT 5.0.0 的博主头像
感觉还是老版本的用户 sidebar 比较好看，更紧凑些。

![](styles.png)

结合浏览器中 css 的样式，参考了之前版本的 NexT Pisces 主题，需要修改这么几个参数：
①  最重要的是，让博主的头像显示为左边浮动，留出地方显示博主名字和描述，找到 `themes/next/source/css/_common/components/sidebar/sidebar-author.styl` 注释掉 `display: block;`，新增一行 `float: left;`，保证图片显示在左边。
②  定义/修改一些相关格式的定值，在 `themes/next/source/css/_variables/Pisces.styl` 中修改 Sidebar 相关的常量，具体数值可以进行调整，主要涉及到的如下 {% codeblock lang:yml line_number:false %}
$site-author-image-width          = 80px
$site-author-name-margin-top      = 0.8em
$site-author-name-margin-bottom   = 0.2em
$site-author-name-font-size       = 17px
{% endcodeblock %}
③  主要是为了美观，对 ① 中的文件里 `.site-author-name` 下:{% codeblock lang:yml line_number:false %}
margin-top: $site-author-name-margin-top;
margin-bottom: $site-author-name-margin-bottom;
font-size: $site-author-name-font-size;
{% endcodeblock %}
④ 为什么还有一点呢？是因为这部分和下面的“日志、分类、标签”距离太近，找到 `themes/next/source/css/_schemes/Pisces/_sidebar.styl`，直接在第一个 `.use-motion .sidebar .motion-element` 下增加一个新的属性：` margin-bottom: 1.25em;`

至此，终于回到了有一点紧凑的样子，反正我喜欢！

## 给Github添加README

默认情况下，Github 中每一个项目，我们希望有一份 README.md 的文件来作为项目的说明，但是我们在项目根目录下的 `source` 目录下创建一份 README.md 文件，写好说明介绍，部署的时候，这个 README.md 会被 Hexo 解析掉，而不会被解析到 Github 中去的。
正确的解决方法其实很简单：把 README.md 文件的后缀名改成 ”MDOWN” 或者不带后缀名，然后扔到 `source` 文件夹下即可，这样 Hexo 不会解析，Github 也会将其作为MD文件解析。

## 自动备份 Hexo 源文件 <font size=2>由 [Wanghao](https://notes.wanghao.work/2015-07-06-%E8%87%AA%E5%8A%A8%E5%A4%87%E4%BB%BDHexo%E5%8D%9A%E5%AE%A2%E6%BA%90%E6%96%87%E4%BB%B6.html) 提供
{% centerquote %} 用 Hexo 写博客是一件比较享受的事情，无奈如果换电脑的话，备份博客就是一件比较闹心的事情。{% endcenterquote %}

### 原理
前两天博主（Wanghao）刚刚编写过关于 [Hexo添加文章时自动打开编辑器](https://notes.wanghao.work/2015-06-29-Hexo%E6%B7%BB%E5%8A%A0%E6%96%87%E7%AB%A0%E6%97%B6%E8%87%AA%E5%8A%A8%E6%89%93%E5%BC%80%E7%BC%96%E8%BE%91%E5%99%A8.html) 的相关文章，其原理就是利用 NodeJS 的事件监听机制实现监听 Hexo 的 `new` 事件来启动编辑器，完成自动启动编辑器的操作。
那么可不可以通过通过监听 Hexo 的其它事件来完成自动执行Git命令完成自动备份呢？通过查阅 Hexo 文档，找到了 Hexo 的主要事件，见下表：

事件名|事件发生时间
:---|:---
`deployBefore`|在部署完成前发布
`deployAfter`|在部署成功后发布
`exit`|在 Hexo 结束前发布
`generateBefore`|在静态文件生成前发布
`generateAfter`|在静态文件生成后发布
`new`|在文章文件建立后发布

于是我们就可以通过监听 Hexo 的 `deployAfter` 事件，待上传完成之后自动运行Git备份命令，从而达到自动备份的目的。

### 实现
① 将 Hexo 目录加入 Git 仓库
本脚本需要提前将 Hexo 加入 Git 仓库并与 Github 或者 Gitcafe 远程仓库绑定之后，才能正常工作。以下为快速教程：
* 在 Github 下创建一个新的 repository，取名为与本地的 Hexo 源码文件夹同名即可，这里假设叫做 `website-hexo-next` (因为我用了 NexT 主题)。
* 进入本地的 Hexo 文件夹，执行以下命令创建仓库:{% codeblock line_number:false lang:bash %}
git init {% endcodeblock %}
* 设置远程仓库地址，并更新: {% codeblock line_number:false lang:bash %}
# 现在 Github 推荐用 HTTPS 方式获取
git remote add origin https://github.com/yourgithubname/website-hexo
#可选，第一次新建不需要吧？免得把本地文件覆盖掉了 
git pull origin master {% endcodeblock %}
* 修改.gitignore文件（如果没有请手动创建一个），在里面加入 `*.log` 和 `public/` 以及 `.deploy*/` (默认已经都有了)。因为每次执行 `hexo generate` 命令时，上述目录都会被重写更新。因此忽略这两个目录下的文件更新，加快 push 速度。
* 执行命令以下命令，完成 Hexo 源码在本地的提交。{% codeblock line_number:false lang:bash %}
git add .
git commit -m "添加hexo源码文件作为备份"
{% endcodeblock %}
* 执行以下命令，将本地的仓库文件推送到Github。
{% codeblock line_number:false lang:bash %}
git push -u origin master
{% endcodeblock%}

②  安装 `shelljs` 模块
要实现这个自动备份功能，需要依赖 NodeJs 的一个 `shelljs` 模块,该模块重新包装了 `child_process`，调用系统命令更加的方便。
在命令中键入以下命令，完成shelljs模块的安装：{% codeblock line_number:false lang:bash %}
npm install --save shelljs
{% endcodeblock %}

③  编写自动备份脚本
待到模块安装完成，在 Hexo 根目录的 `scripts` 文件夹下新建一个 js 文件，文件名随意取。如果没有scripts目录，请新建一个。然后在脚本中，写入以下内容：
{% codeblock lang:javascript %} require('shelljs/global');

try {
	hexo.on('deployAfter', function() {//当deploy完成后执行备份
		run();
	});
} catch (e) {
	console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

// time panel
function add0 (i) {
	if (i<10) {
		i = "0" + i;
	}
	return i;
}

function run() {
	if (!which('git')) {
		echo('Sorry, this script requires git');
		exit(1);
	} else {
		echo("======================Auto Backup Begin===========================");
		cd('~/Documents/website-hexo-next');    //此处修改为Hexo根目录路径
		if (exec('git add --all').code !== 0) {
			echo('Error: Git add failed');
			exit(1);

		}
		dt = new Date();
		year = dt.getFullYear();
		month = dt.getMonth()+1;
		date = dt.getDate();
		hour = dt.getHours();
		minute = dt.getMinutes();
		second = dt.getSeconds();
		month_string = add0(month);
		date_string = add0(date);
		hour_string = add0(hour);
		minute_string = add0(minute);
		second_string = add0(second);
		time_string = year+'/'+month_string+'/'+date_string+' '+hour_string+':'+minute_string+':'+second_string;
		if (exec('git commit -am "Form auto backup script\'s commit - ' + time_string +'"').code !== 0) {
			echo('Error: Git commit failed');
			exit(1);

		}
		if (exec('git push origin master').code !== 0) {
			echo('Error: Git push failed');
			exit(1);

		}
		echo("==================Auto Backup Complete============================")
	}
}
{% endcodeblock %}
* 其中，需要修改第 17 行的 `~/Documents/website-hexo-next` 路径为 Hexo 的根目录路径。（脚本中的路径为我的 Hexo 路径）
* 其中一段关于 `Date` 的操作，我是为了在 Git push 时，增加一点时间信息，纯属娱乐
* 如果你的 Git 远程仓库名称不为 origin 的话，还需要修改第 49 行执行的 push 命令，修改成自己的远程仓库名和相应的分支名。

保存脚本并退出，然后执行 `hexo deploy` 命令，将会得到类似以下结果: {% codeblock lang:bash line_number:false %}
======================Auto Backup Begin===========================
[master 8c758b0] Form auto backup script's commit - 2016/10/17 17:34:19
 1 file changed, 111 insertions(+)
To https://github.com/yourgithubname/website-hexo-next.git
   0863cc5..8c758b0  master -> master
==================Auto Backup Complete============================{% endcodeblock %}
这样子，每次更新博文并 `deploy` 到服务器上之后，备份就自动启动并完成备份啦~是不是很方便呢？Enjoy it！
