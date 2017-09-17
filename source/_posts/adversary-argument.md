---
title: Algorithm - Adversary Argument
date: 2014-11-09 19:36:16
categories: [Algorithm]
---
对手论证，一般用于给出问题的下界。若用 $P$ 表示所讨论的问题，$I$ 表示问题的输入，$A$ 表示解决问题的基于比较运算的算法，$T(\,A,\,I)$ 表示对于输入 $I$，算法 $A$ 的计算时间复杂性，那么函数 $U(n)=min\\{ max \\{ T(A,\,I) \\},\text{ for each } I \\},\text{for each } A$ 表示问题 $P$ 在输入大小为 $n$ 时在最坏情况下的最好时间下界，它是问题所固有的。
<!-- more -->
对手论证的基本思想是对每一个 $A$ 构造一个输入特殊的输入 $I'$，使 $T(A,\,I')$ 尽量地大，然后在所有 $A$ 的集合上，求 $T(A,\,I')$ 的尽量小的下界作为 $f(n)$。对手论证方法的关键在于有一套对于一切 $A$ 的适用的构造符合要求的 $I'$ 的策略，即对手策略，逐步第构造出一个输入 $I'$，使算法 $A$ 如果想达到预期的结果，要做尽量多次的比较和判断，从而使 $T(A,\,I')$ 尽量大。需要注意的是，一方面对手策略需具有一致性，即不能前后矛盾，以保证 $I'$ 的存在性；另一方面对手策略还必须对一切 $A$ 都适用，因为我们需要在一切 $A$ 组成的集合上求 $T(A,\,I')$ 的下界。
## Find $2^{nd}$ Largest Number
我们知道，找到数组中元素的最大值，需要至少进行 $n-1$ 次比较，那么找到第二大的呢？暴力算法就是在找一次最大呗，又是 $n-2$ 次比较，总共是 $2n-3$ 次比较。乍看起来也不错了，但是通过对手论证的分析，比较的总次数可以减少为 $n+\lceil \log n \rceil -2$ 次。How to？
其实，所谓的第二大的元素，应该是在比较中仅仅输给了最大元素，也就是说，只有跟最大的那个元素比过的败者才有可能是。我们下面要说明的是，我们要找的第二大的元素应该是在那些跟最大元素比过的 $\lceil \log n \rceil$ 个元素中。
在对手论证中，我们每次都是选择两两配对，然后进行比较，这样的话，每次配对完后的比较，数据规模都缩减一半，也就是说，总共经过 $\lceil \log n \rceil$ 轮的比较，把这些输给最大数的元素拿出来，进行一次 find-Max，开销是 $O(\lceil \log n \rceil)$ 就可以找到第二大的啦！！
这里其实并不是严格的论证，只是证明了这个界是可以达到的，详细证明请参见[这儿](http://classes.soe.ucsc.edu/cmps201/Fall07/handouts/adversary.pdf)。
## Find Max and Min
这里也能够使用对手论证的方式得出其最少的比较次数为 $\left\lceil \frac{3}{2}n \right\rceil - 2$，具体的证明同样参见 [上述链接](http://classes.soe.ucsc.edu/cmps201/Fall07/handouts/adversary.pdf) 。
下面，我们就来说说是怎么办到的吧，首先两两配对，共进行 $\left\lceil \frac{1}{2}n \right\rceil$ 次比较，将这里面的胜者和败者分别分为两组，再在两组内分别挑选 Max 和 Min，代价是 $2\times (\left\lceil \frac{1}{2}n \right\rceil-1)$，这样就可以得到 Max 和 Min，总共的比较次数就是 $\left\lceil \frac{3}{2}n \right\rceil - 2$ 啦。
## Matrix Search
这个问题有一个十分美好的前提，那就是我们所给的 $n\times n$ 矩阵是行列皆有序的，在这样的条件下，我们要寻找某个元素 $x$ 在不在矩阵中，通过对手论证，我们可以做到线性时间 $O(n)$。 
首先是一个并不高效的方法，对每一行采用二分搜索，最多搜索 $n$ 行，所以复杂度为 $O(n\log n)$。
这里有一个超级机智的算法，<Step-wise 线性搜索> 从右上角开始，每次将搜索值$x$ 与右上角的值比较，如果大于右上角的值，则直接去除1行，否则，则去掉1列。如下所示，展示了在矩阵中查找 $x=28$ 的过程：
![Find 28](http://images.cnitblog.com/blog/632767/201411/090046262685217.png)
在对手论证中，我们只需要尽可能的构造一个数去查找，但是总是不满足条件，比如找不到的情况，就能达到最坏情况，而最短时间就是采用这种 <Step-wise> 方法了。这种查找方式最多也就是遍历完两遍对角线，总共的探查次数最多为 $n+n-1=2n-1$，所以复杂度为 $O(n)$。
## 25 Horses select $1^{st}, 2^{nd}, 3^{rd}$
问题描述：有 25 匹赛马，一片场地只有 5 条赛道，现在要求你用尽可能少的比赛场次来选出最快的前三名。
首先，至少每一匹马都有机会去跑一遍，所以至少要先比赛 5 场，得出总共 25 匹马的 5 个小组排名。接着，就是把每一组的冠军拿出来遛遛，第 6 场过后，我们就能选出冠军了，同时，我们也知道这第六场中的最后两名一定不可能是前三名了，因为他们至少都要输给已知的3匹马。顺带着，这两匹不可能的赛马所在小组里的马也都不可能了，想想小组第一都败了。（咦，当年翁学姐小组第一但是没出线就是这么一回事儿啊！！！）那么问题来了，下面只用一场比赛能够搞定么？答案是：可以！！
我们先给出竞赛的情况，
![match](http://images.cnitblog.com/blog/632767/201411/090048387069188.png)
每一行上，从快到慢排序，不失一般性，小组第一的就是 $X1,\ X=A,B,C,D,E$，我们假设第六场比赛 $A1>B1>C1>D1>E1$，$>$ 表示快的比较。那么 $A1$ 一定是冠军！下面可能是第二、第三的只可能是 $A2,\,A3,\,B1,\,B2,\,C1$ 这5个。为什么不可能是 $C2$ 呢？因为 $C2$ 至少输给了 $C1$，而 $C1$ 又至少输给了 $A1$ 和 $B1$，那么 $C2$ 的最好成绩也不过是第四，其他的情况也是类似的分析。
所以在这第七场，遛一遛 $A2,\,A3,\,B1,\,B2,\,C1$，就有第二、第三名产生了。

算法的 Mid-Exam 的三大分析方法至此完结撒花！

## Would you like to see...

### [Divide and Conquer](https://qiufengyu.github.io/2014/11/07/divide-and-conquer/)

### [Amortized Analysis](https://qiufengyu.github.io/2014/11/08/amortized-analysis/)