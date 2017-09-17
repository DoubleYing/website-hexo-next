---
title: Algorithm - Divide and Conquer
date: 2014-11-07 18:42:58
description: 算法导论中的经典问题，分治的思想，从子问题着手。
categories: [Algorithm] 
---

今天的算法课高能的不行，对助教各种膜拜~~这里就厚颜无耻地讲讲吧~

## Master Theory

首先，提到这个高能的问题，不得不说说那个 Master Theory，简直是外挂...
$$T(n) = \underbrace{\Theta(n^{\log\_b a})}\_{\text{solving base cases}}+\underbrace{\sum\limits\_{j=0}^{(\log\_b n) -1}a^j f\left(\frac{n}{b^j}\right)}\_{g(n)=\text{ dividing and combining}}$$

* Case 1: $f(n) = O(n^{\log_b a-\varepsilon})$ :
$g(n) = O(n^{\log_b a}); T(n) = \Theta(n^{\log_b a})$ 

* Case 2:  $f(n) = \Theta(n^{\log_b a})$ :
$g(n) = n^{\log_b a} \log_b n; T(n) = \Theta(n^{\log_b a}) \log_b n$

* Case 3:  $f(n) = \Omega(n^{\log_b a+\varepsilon})$ :
$g(n) = \Theta(f(n)); T(n) = \Theta(f(n))$

有了这个利器，我们就能运用一定的技巧来解题啦~~ 

## n-bit整数的乘法

（喂，我们讲的是二进制啊~）
其实，我们小学数学就教过的列竖式的方法，要先计算 1-bit 乘以 n-bit，然后还要适当进行移位，最后再相加，注意我们这里定义的 Elementary Options 是两个 n-bit 数的加法是 $O(n)$，1-bit 乘以 n-bit 为 $O(1)$，移位操作也为 $O(1)$，所以共要进行 $n$ 次乘法，大约是 $n$ 次移位，最后是 $n$ 次的加法，由于加法本身已经是 $O(n)$ 的了，所以总的复杂度达到了 $O(n^2)$。许多年来我们都是这么做的啊，也没什么不好，而且似乎一度有人认为 n-bit 整数乘法的下界就是 $\Omega(n^2)$ 了。
到了 1960 年的时候，提出了一种新的算法，复杂度降低到了 $O(n^{1.59})$，其实，你发现了么，就是 $O(n^{\log_2 3})$，然后你看看 Master Thm，也能够凑出来啦~~首先，我们进行分的操作：
$$x=x_L\|x_R=x^{n/2}x_L+x_R$$ $$y=y_L\|y_R=y^{n/2}y_L+y_R$$ $$xy=(x^{n/2}x_L+x_R)(y^{n/2}y_L+y_R)$$ $$xy=2^nx_Ly_L+2^{n/2}(x_Ly_R+x_Ry_L)+x_Ry_R$$可是，这样的结果是，最终问题规模缩减一半，但是我们需要解决 4 个这样的子问题，然后还有 $n+n/2$ 次移位操作，得到的递归式：
$$T(n)=4T(n/2)+\Theta(n)=\Theta(n^2)$$ 居然没有提高！！好吧，想想办法！
$$(x_L+x_R)(y_L+y_R) = x_Ly_L+(x_Ly_R + x_Ry_L) + x_Ry_R$$我们不妨写为 $P_0=P_1+P_2+P_3$，这里的 $P_1,P_2,P_3$ 都是我们要在上面过程中计算的，通过计算 $(x_L+x_R)(y_L+y_R)$，代价为 $O(n)$，反解出 $(x_Ly_R + x_Ry_L)$，原本的4个子问题减少为3个啦，递归式：
$$T(n)=3T(n/2)+\Theta(n)=\Theta(n^{\log_2 3})$$ 

## 矩阵乘法 

这里定义的矩阵都是 $n\times n$ 的矩阵，规定的 Elementary Operations，加法和两个元素间的乘法复杂度均为 $O(1)$ 。
这样，对于结果的 $n^2$ 个元素，每个都需要进行 $n$ 次加法和 $n$ 次乘法，所以总的复杂度为 $O(n^3)$，Oh no，这很吓人！
想想递归，如果我们像上面整数乘法的方法一样，对矩阵进行分块呢？$$X=\left[
\begin{array}{c|c}
A & B \\\ \hline
C & D 
\end{array}
\right],\quad Y=\left[
\begin{array}{c|c}
E & F \\\ \hline
G & H
\end{array}
\right]$$那么$$XY =\left[
\begin{array}{c|c}
AE+BG & AF+BH \\\ \hline
CE+DG & CF+DH
\end{array}
\right]$$
这里的 Combine 的复杂度主要体现在矩阵的加法上，$\dfrac{n}{2}\times\dfrac{n}{2}$ 个数相加，复杂度为 $\Theta(n^2)$，我们来看看递归式
$$T(n)=8T(n/2)+\Theta(n^2)=\Theta(n^3)$$
还是没变！！当然，我们可以继续用上一问题中的技巧（Strassen Algorithm），可以降到只需解决 7 个规模为 $n/2$ 的子问题，最终$$T(n)=\Theta(n^{\log_2 7})=\Theta(n^{2.808})$$
一个好消息是，在 2014 年，矩阵乘法问题的复杂度已经降到了 $\Theta(n^{2.373})$，可喜可贺！问题的下界也只不过是 $\Omega(n^2)$

## 计算 $\lceil\sqrt{N}\ \rceil$
为了简化讨论，我们规定 n-bit+n-bit 的复杂度为 $O(1)$，移位操作和 1-bit 乘 n-bit 的操作也仍均为 $O(1)$，所以，我们计算一次 $x^2$ 的代价为 $O(n)$。
直接寻找（从 1 开始 till the end of the world）方法的话，复杂度能达到 $O(2^n\cdot n)$ ；
好一点的办法就是使用二分查找，能够降低到 $O(n\cdot n)$
我们想想能不能缩小二分查找的范围呢？注意到$$2^{\left\lfloor\dfrac{n-1}{2}\right\rfloor} \leq \lceil\sqrt{N}\ \rceil \leq 2^{\left\lfloor\dfrac{n}{2}\right\rfloor}$$可是这样的查找长度在进行 $\log$ 操作后，得到的结果仍然为 $n$ ，在大 $O$ 的意义下并未改进。
哈哈，下面给出一种线性时间的算法！注意，不是 $\Theta(n\log n)$，是 $\Theta(n)$，前方高能！！！
考虑 $M =\lfloor N/4 \rfloor, \quad x = \lceil \sqrt{M} \ \rceil,$ 和 $ (x, x^2)$，每次规模降低 2，除以 4 即可以右移 2 位。
那么我们要的 $y=\lceil \sqrt{N} \ \rceil$ 和 $(y,y^2)$ 和这个的关系呢？大致可以分为下面三种：$$(y,y^2)=\left\\{
\begin{array}{ll}
y=2x, & y^2=4x^2 \\\
y=2x+1, & y^2=4x^2+4x+1 \\\
y=2x-1, & y^2=4x^2-4x+1
\end{array}\right.$$ 我们只保留其中最接近 $y^2$ 的一个作为递归的下一步。那么每次 Combine 的代价也仅仅是常数时间 $O(1)$ 。这样，我们得到了一个新的递归式：注意规模不是变为 $1/4$，$n$ 是 $N$ 的比特长度。
$$T(n)=T(n-2)+O(1)=\Theta(n)$$

## VLSI Layout，布线问题
问题是：有一以完全的满二叉树结构形态的数字电路需要排布到面包板上，不能有交叉点，请给出一种高效的算法来计算布线的最小面积（最大长度 $\times$ 最大宽度）。
如果我们直接布线的话，由于二叉树结构的特殊性，两个子树加上一个根节点就是一个深度 +1 的新的满二叉树，所以，我们递归的规模可以缩减规模的一半。
这样的话，从高度来说，子问题的个数仍然是 1 个，所以 $Height(n)=Height(\dfrac{n}{2})+\Theta(1)=\Theta(\log n)$
那么宽度呢？fuck，居然是要变成两个子问题，所以 $Width(n)=2\times Width(\dfrac{n}{2})+\Theta(1)=\Theta(n)$
 面积 $Area(n)=Height(n) \times Width(n) = \Theta(n \log n)$
 其实，这种方法看起来还不错啦~就像这样

![1 排线](http://images.cnitblog.com/blog/632767/201411/080134160342840.png)

那么，有没有更好的办法呢？那么往下就可能是 $\Theta(n)$
猜猜看，高度和宽度都要是什么呢？（$1\times n$，$\sqrt{N} \times \sqrt{N}$，$\dfrac{n}{\log n} \times\log n$）??
我们给出一种采用的 $\sqrt{N} \times \sqrt{N}$ 方式，要达到 $\Theta(\sqrt{n})$ 的复杂度，那么从 Master Thm 上来看，高度和宽度可能是这样一种递归式：$$T(n)=2T(n/4)+\Theta(1)$$那是怎么排线的呢？

![2排线](http://images.cnitblog.com/blog/632767/201411/080136295969069.png)

太厉害，太牛B啦，有木有！！我还是第一次见到这样的二叉树，见识浅陋啊~~~
再次感谢助教！！

## Would you like to see...

### [Amortized Analysis](https://qiufengyu.github.io/2014/11/08/amortized-analysis/)

### [Adversary Argument](https://qiufengyu.github.io/2014/11/09/adversary-argument/)
