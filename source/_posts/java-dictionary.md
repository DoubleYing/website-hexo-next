---
title: JAVA - Dictionary 第一次大作业
description: 做JAVA的第一次大作业有感，觉得以后会用到其中某些东西吧，这个奇怪的作业，这个磨人的小妖精~
date: 2014-10-30
categories: [JAVA]
tags: [java, projects, notes]
---

## 做完感受

这次写 JAVA 课的大作业，首先不得不佩服所给的 `dictionary.txt` 词典数据文件的厉害之处啊，各种大小写、连字符还有各种词组的不同情况在自己测试的时候都中奖了，我该高兴么...

## 实现过程
其实大作业的要求不高，大概就是一个词典的查询软件，提供了后台词典文件，只要完成其中的文件I/O，进行String的处理就可以了。

下面其实主要是一些算法问题，查找的话，既然有序（但是从某些角度说，
字符 `-` 的值要比 `a-z` 小啊，但是在 dictionary 中的顺序却不是这样！所以我暴力地进行了一次 QuickSort，果断 $O(n\log n)$)。不过鉴于变态的要求联想的功能，我就怂了，只能稍微修改下这个 quicksort。不过 JAVA 中 String 也是蛮厉害的，compareToIgnoreCase，还有什么 split 方法比西加加不知道高到哪里去了，简直是福利啊，也支持正则表达式~~却由此中枪了 `-` 的问题.....

关于其中的纠错问题，就厚颜无耻地选了一个[Levenshtein Distance](http://en.wikipedia.org/wiki/Levenshtein_distance "编辑距离")计算啊，还能控制精度，不亦乐乎...

下面给出Levenshtein Distance计算的函数....

{% codeblock lang:java line_number:false %} private final int distance(String x, String y) {
        int m = x.length();
        int n = y.length();
        int[][] T = new int[m + 1][n + 1];
        T[0][0] = 0;
        for (int j = 0; j < n; j++) {
            T[0][j + 1] = T[0][j] + ins(y, j);
        }
        for (int i = 0; i < m; i++) {
            T[i + 1][0] = T[i][0] + del(x, i);
            for (int j = 0; j < n; j++) {
                T[i + 1][j + 1] =  min(T[i][j] + sub(x, i, y, j), T[i][j + 1] + del(x, i),
                    T[i + 1][j] + ins(y, j));
            }
        }
        return T[m][n];
    }
    
    private int sub(String x, int xi, String y, int yi) {
          return x.charAt(xi) == y.charAt(yi) ? 0 : 1;
    }
    private int ins(String x, int xi) {
        return 1;
    }
    private int del(String x, int xi) {
          return 1;
    }
    private int min(int a, int b, int c) {
        return Math.min(Math.min(a, b), c);
    }
} {% endcodeblock %}

## 关于JList
说了这么多，我就来说说主题，JList...

### Question 1: JList 的 Listeners

首先就吃了一个 ListSelectionListener 的亏啊，结果因为这个 GUI 中的其他Listeners 有冲突，遂抛弃之，改用 MouseListener 和 KeyListener（Only Up and Down），这才得以解决...泪目...

### Question 2: 动态的 JList

因为 JList 要实时更新，所以默认的 JList 似乎办不到，这个时候 Google 之，采用 DefaultListModel，就能够进行 add 和 delete JList中的项目啦~~

### Question 3: JList 上的特效

为了美观，我想要把 JList 上选中的项表示的明显一些，就是加粗，字号增大一号，但是 JList 本身似乎没有单独设置 selectedItem 的函数，这个时候就要把 JList 中的项目选为 JLabel 的 subclass，而不是简单的 String 了...

里面还是很复杂的...首先要定义一个 Item 的类，用来定义要放进去的东西，其实感觉 String 也是可以的啊...

{% codeblock MyListItem.java lang:java line_number:false %}
public class MyListItem {    
    String text;
    
    public MyListItem(String text) {
        this.text=text;
    }
    
    public String getString() {
        return text;
    }
    
    public void setString(String s) {
        text=s;
    } 
} {% endcodeblock %}

这个时候就可以用 CellRenderer 来实现格式的设置啦~~

{% codeblock lang:java line_number:false %}public class MyCellRenderer extends JLabel implements ListCellRenderer {    
    private static final Font font1 = new Font("Palatino Linotype",Font.PLAIN,13);
    private static final Font font2 = new Font("Palatino Linotype",Font.BOLD+Font.ITALIC,14);
    private static final Color color1 = new Color(176,196,222);
    //for the JLabel default to be transparent, so setOpaque true to set the background color 
    //http://huangqiqing123.iteye.com/blog/1678208
    public MyCellRenderer() {
        this.setOpaque(true);
    }
    
    public Component getListCellRendererComponent(JList list,
        Object value,
        int index,
        boolean isSelected,
        boolean cellHasFocus) {
        MyListItem myItem=(MyListItem)value;
        this.setText(myItem.getString());
        if(isSelected) {
            this.setFont(font2);
            this.setBackground(color1);
        }
        else {
            this.setFont(font1);
            this.setBackground(Color.WHITE);
        }                
        return this;             
    }    
} {% endcodeblock %}

好啦~这个时候，这样定义我们的 JList 就可以啦~这样选择的那项就会有一些特殊效果啦~~~
{% codeblock lang:java line_number:false %}private JList <MyListItem> jltWordlist = new JList<MyListItem>();
private final DefaultListModel<MyListItem> model = new DefaultListModel<MyListItem>(); 
jltWordlist.setCellRenderer(new MyCellRenderer());
{% endcodeblock %}

效果图，还不错看吧~~

![Sorry~](result.png)

## 彩蛋之doge

哈哈哈，我一定是疯了~因为要实现如果用户输入一个错误的单词，要尽可能地根据字典内的单词进行纠错啊，这个时候我加了一个doge，不服来辩！！不知道会不会被杀掉...

![Sorry~](doge.png)

## 后记

### 自定义添加单词

主要是文件 I/O 的操作啦~~

### 翻译句子

在后来的上机检查中，又要求我们实现对句子的翻译，不用管句子是否通顺，基本上用的是贪心算法，尽可能地组成一个长的在字典文件中词组查找并翻译，然后组合就可以了~~

### 第二次大作业

要求实现一个网络版的词典，从百度、必应和有道上获取翻译，并且还有一堆关于数据库和 Server/Client 的内容，附带用户注册、好友分享点赞等功能...很复杂！慢慢写吧，然而我成功找到了[大腿](https://github.com/SongY123)！哈哈哈~~
