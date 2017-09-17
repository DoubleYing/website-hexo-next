---
title: Sorting and Selection in $O(n)$
date: 2014-10-29
description: 使用 Sorting 和 Selection 方法更加机智地解决一些经典难题。
categories: [Algorithm]
---

## 寻找第 $k$ 大（小）的数

假设数据存储在数组 $a[1..n]$ 中
首先，寻找一个数组中最大或者最小的数，因为最大（小）的数一定要比其他所有的数大（小），因此至少要比较完所有的 pair 才能确定，所以时间复杂度在 $O(n)$。那么寻找第k大（小）呢？
比较直观的，就是对数组中所有的数据先进行排序，在我们这种渣渣的计算机入门选手而言，可选的有 QuickSort，MergeSort 和 HeapSort，甚至是 ShellSort 等一些比较高级的方法啊...一般的代价都在 $O(n\log n)$ 上，然后直接取出即可。
在算法导论的第九章，提出了一个效率更高的 Selection 算法，用到的主要原理就是分治，是根据 QuickSort 改编的，但是主要的不同的是，QuickSort 会递归处理划分的两边，而这里的 Selection 则是只处理一半。因为要寻找第 $k$ 小的数，那么如果 $k$ 比之前的 partition 处理后，返回的位置下标要小，那么第 $k$ 小的数一定在 partition 的 pivot 的左边一半，右边一半可以不用处理；若是 $k$ 比这个 pivot 的下标要大，那么显然，要找的值在 pivot 的右边，但是这里有一点特殊，下一次递归查找的时候，是要寻找第（$k-pivot$ 下标）的数！
嗯，感觉好厉害的样子。然后让我来练练手。
{% codeblock lang:java line_number:false %}int partition(int[] a, int start, int end, int pivot) {//pivot为可以自己定义选定的参照值
        int i = start;
        int j = start;
        for(j = start; j < end; j++) {
            if(a[j]<=pivot) {                
                int temp=a[i];
                a[i]=a[j];
                a[j]=temp;
                i++;
            }
        }
        int temp2 = a[i];
        a[i]=a[end];
        a[end]=temp2;
        return i;        
    }
    
    int selectkth(int[] a, int start, int end, int k) {
        if(start == end) 
            return a[start];
        int q = partition(a,start,end,a[end]);
        int p = q-start+1;
        if(k == p)
            return a[q];
        else if(k < p) {
            return selectkth(a, start, q-1, k);
        }
        else return selectkth(a, q+1 , end, k-p);        
    }
}{% endcodeblock %}

## 前 $k$ 大的数(算法导论思考题 1 )

其实，在我们老师上课的时候，比较强调 selection 和 partition 的“化学作用”啊，如果问题变为找出前k大的k个数呢？当然，万能的排序还是 OK 的啊，直接排序完输出就好了，简直66666...
后来，作业题中出现了一些比较厉害的东西啊，它可以达到 $O(n + k\log n)$ 啊，居然要用到建立一个堆啊，显然，算法导论上第六章说道，建立一个堆只需要线性时间啊，各种 fix 的操作也只需要 $\log n$ 啊，那不就是建个最大堆，然后提取 $k$ 次 root 顺带着调整一下嘛...其实我喜欢说修理啊哈哈哈哈....
再后来，还有一个问题，说是可以到 $O(n+k\log k)$ 啊，你 TM 真是够了啊，然后，就是 selection 选出第 $k$ 大的数啊，然后用这个数进行 partition 啊，把比他大的数用一次排序就好了啊，喂，你真是够了啊！

## Selection + Partition共同解决一些问题

为了进一步 blablablabla，老师真的是很强调这个 Selection+Partition ，下面是一些例题啥的。

### Question 1：算法导论的第 9 章的思考题就有一个，叫做 weighted-median。
{% note primary %}
给定 $n$ 个不同的数 $x\_1, x\_2, \cdots, x\_n$ 分别对应权值 $w\_1, w\_2, \cdots, w\_n$ 且满足权重之和为1，即 $\sum\_{i = 1}^n w\_i = 1$，那么 weighted-median 就定义为满足以下两个条件的 $x\_k$：$\sum\_{x\_i < x\_k} w\_i < 1/2$ 且 $\sum\_{x\_i > x\_k} w\_i \leq 1/2$.
{% endnote %}


显然啊，我觉得排序算法解决一切啊，有木有！但你他喵的非得线性时间~
马上来了啊，选出中位数啊，嘿嘿，然后进行 partition ，从头开始计算权重的和啊，看看跟 $1/2$ 怎么样？小？OK，权重不够哦，再在右边一半进行 Median 的 Selection+Partition 啊，再进行计算吧，带上前面算出来的权重和，再去跟 $1/2$ 比较...要是第一趟处理就比 $1/2$ 大，那就在左边做一次中位数 Selection+Partition，大概估算一下，它的 cost 应该是在 $n\times(1+1/2+1/4+1/8+...+1/(2^n))$ 吧...其实求完极限也就是 $O(2n)$ 的样子，不错了吧，嘿嘿！

### Question 2：寻找最近接 Median 的 $k$ 个数...（算法导论 9.3-7 题）

老规矩，排序啊，有木有！！！为什么又是线性时间呢？但是，老师这么说肯定是有用意的。好啦，我能想到的方法呢，就是先 select 出中位数，cost = $n$，然后呢，就是对每个数与这个中位数做差取绝对值啊，然后这里的每个差的绝对值中，选出前 $k$ 小的数，根据 2 中的原理，也就是 $O(n+k\log k)$ 的 cost，然后映射回去原来的数，总体而言，的确是 $O(n)$ 的 cost 吧（如果 $k$ 不是特别大的话）。老师上课在讲 Tutorial 的时候，还提出了另一种差不多的方法，大致思路也就是 selection+partition 这个主题啦~~第一次选出中位数 selection，记为 $M$ ，加一次 partition，共计 $O(2n)$，两边各自寻找中位数，只保留接近中位数 $M$ 的一半，直到差不多在第一次的中位数 $M$ 左右两边各有 $k$ 个数左右，然后选出差值最小的 $k$个数...总之就是缩小范围，然后再集中处理的样子吧，时间大概是一个等比级数的求和 $n\times(2+2/2+2/4+2/8+...+2/{2^k})$，还是在 $O(n)$ 的级别的，但我总觉得绕了这么一大圈...哎，网上搜了一下，大多数都是直接一次上来就做差的啊...(莫非是我记错了？？

## PK 法 
PK 一词让我想起了年少无知的我看超女快男的经历啊。这里，我们老师主要用这种方法解决一些 Selection 相关的问题。
PK 法的前提是我想要的超过总数的一半，主要思路是，每次都对等的淘汰两个或一个，若淘汰两个，至少有 1 个是我不想要的，若只淘汰了一个，那么我必定是我不想要的那个！这样淘汰直到最后，剩下的一定是我想要的。当然，若事先不知道前提是否成立，那么在得到结果以后，还要进行一次check！

### Question 3：寻找出现频率最高的数
直接贴代码吧...
{% codeblock lang:java line_number:false %}int pk(int[] a) {
        int x = a[0];
        int count = 0;
        for(int i=0; i<a.length; i++) {
            if(a[i] == x) 
                count++;
            else if(count >= 1)
                count--;
            else {
                //start from begin
                count = 0;
                //why i+1? for next item is a[i+1], then count will ++
                //delete this pair of two
                x = a[i+1];
            }
        }
        //check
        int y = x;
        count = 0;
        for(int i = 0; i<a.length; i++) {
            if(a[i]==y) {
                count++;
            }
        }
        if(count>a.length/2)
            return x;
        else
            return -1;
    }
{% endcodeblock %}
还有一个扩展问题：现在数组中没有出现频率一半的数字了，但有三个都超过了四分之一，找到他们。 
有兴趣的可以去看看这儿：[Select weighted elements](http://www.cnblogs.com/jy02414216/archive/2011/03/04/1970497.html)

### Question 4：VLSI 芯片测试

Diogenes 教授有 $n$ 个被认为是完全相同的 VLSI 芯片，原则上它们是可以互相测试的。教授的测试装置一次可测二片，当该装置中放有两片芯片时，每一片就对另一片作测试并报告其好坏。一个好的芯片总是能够报告另一片的好坏，但一个坏的芯片的结果是不可靠的。这样，每次测试的四种可能结果如下：

A芯片报告|B芯片报告|结论
:---|:---|:---
B是好的|A是好的|都是好的，或都是坏的
B是好的|A是坏的|至少一片是坏的
B是坏的|A是好的|至少一片是坏的
B是坏的|A是坏的|至少一片是坏的
 
a）证明若多于 $n/2$ 的芯片是坏的，在这种成对测试方法下，使用任何策略都不能确定哪个芯片是好的。假设坏的芯片可以联合起来欺骗教授。
b）假设有多于 $n/2$ 的芯片是好的，考虑从 $n$ 片中找出一片好芯片的问题。证明 $n/2$ 对测试就足以使问题的规模降至近原来的一半。
c）假设多于 $n/2$ 片芯片是好的，证明好的芯片可用 $\Theta(n)$ 对测试找出。给出并解答表达式测试次数的递归式。

注：VLSI——Very Large Scale Integrated.

**算法分析与解答：**
a) 在所有的策略中，时间复杂度最高但最有效的方法是：对每个芯片，让其它所有芯片对它进行报告，由于好芯片数目小于 $n/2$，对于任意芯片，坏芯片都可以让判断结果一模一样（比如判断结果好坏各占一半），此时，就无法判断出好坏。得证。

b) 问题可以这么理解，证明：当多于 $n/2$ 的芯片是好的时，可以通过 $n/2$ 的下界次操作，得到一个包含至多 $n/2$ 个芯片的集合，且该集合内好的芯片大于一半。这样，以后只需要在这个集合上执行类似的判断动作就好了。
对于 $n$ 个芯片的集合，假设 $good$ 代表好芯片的数目，则坏芯片有 $(n – good)$ 个，将 $n$ 个芯片两两组合，接下来分类讨论。
1. 当 $n$ 为偶数时，假设好芯片和坏芯片组成的对数为 $r$ ，则$(n - good) \geq r$。对每个对，如果结果是情况2、3、4，则不做任何操作，如果结果是情况1，则从中挑出一个放到一个集合中。所以，我们可以在好芯片对中取到 $\dfrac{good – r}{2}$ 个芯片，从坏芯片对中取到 $m$个芯片，$m \leq \dfrac{n – good - r}{2}$。因为 $\dfrac{good – r}{2} > \dfrac{n – good - r}{2}$，所以新集合中好芯片的数目大于一半，另外总芯片数小于等于 $\left(\dfrac{n}{2} - r\right)$。
2. 当 $n$ 为奇数时，提取一个芯片，对剩下的芯片采取偶数的方法，只不过最后的集合情况是：$\dfrac{good – r}{2} \geq \dfrac{n – 1 – good - r}{2}$，芯片总数小于等于 $\left(\dfrac{n – 1}{2} - r\right)$。
(1) 当总数是偶数时，要么好的芯片数和坏的芯片数一样，原先被提取的芯片是好的芯片，把好的芯片加入集合；要么好的芯片比坏芯片多偶数个，此时不论被提取的芯片是好是坏，把它加入集合也能保证好的芯片数大于坏的芯片数。
(2) 当总数是奇数时，好的芯片数必然大于坏的芯片数。
得证。

c) 当每次的 $r$ 为 0 时，所需要的递归次数最多，$T(n) = T(n/2) + n/2$。

 (请原谅我直接贴了别人的[博客](http://www.cnblogs.com/longdouhzt/archive/2011/07/15/2107751.html)内容...)
