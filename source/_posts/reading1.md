---
title: 跨领域推荐系统，Item Silk Road
date: 2017-09-16 20:00:00
description: 精读论文第一期，本期选择的是 SIGIR 2017 中关于推荐系统和跨领域推荐的文章
tags: [Recommender Systems, Social Networks, NLP, Readings]
categories: [Recommendation] 
---

通讯作者：[何向南](http://www.comp.nus.edu.sg/~xiangnan/)

会议信息：SIGIR 2017，链接：http://dl.acm.org/citation.cfm?id=3080771

<!-- more -->

### Abstract
网络中存在用户-物品的交互信息，而用户之间的交互称为社交信息，两者是异构的。我们可以通过横跨两者的共同用户建立桥梁，完成从信息领域到社交领域用户的物品推荐。现有的跨领域推荐系统中，所有的数据属性都是同构的，或者是完全重叠的。据此，本文提出了一个神经网络社交协同排序算法（Neural Social Collaborative Ranking, NSCR)，通过桥梁用户把两个异构数据之间“串联”起来。

#### Keywords

跨领域推荐，深度协同过滤，神经网络，深度学习

### Introduction 
在线平台，一种像网购电商网站有许多信息导向的用户-物品交互数据，另一种如社交网络，刻画并强调用户之间的交互信息。根据口耳相传的道理，用户在选择商品时，也会受到好友的推荐和好友们的意见影响。表面上看两个领域中的联系并不紧密，但是通过某些同时活跃在这两个领域中的用户，我们可以建立一座桥梁，正如我们所说的丝绸之路一般，把关系和信息传递过去。

跨领域社交推荐，即从信息领域选择合适的物品，向另一个社交网络中的其他用户推荐。目前的困境主要有两方面：

* 桥梁用户较少，活跃在两个领域的用户比例约为10%
* 虽然信息领域信息充足，但和社交领域相关的信息少

本文提出的NSCR解决方案基于

* 神经网络协同过滤，采用一种改进的pairwise pooling策略，刻画更好的用户-物品的低维特征表示
* 图正则，通过桥梁用户在信息领域的embedding，向社交领域传播，使得亲密的朋友具有相近的特征表示，意味着他们有相似的喜好

### Problem Formulation

信息领域 $M\_1$ ，用户集合 $U\_1$，物品集合 $I$，他们之间的交互（打分）为 $Y\_{ui}$，此外这中间还有一些关于用户和物品的辅助特征信息，分别是用 $G\_u$ 和 $G\_i$ 表示；在社交领域 $M\_2$，有用户集合 $U\_2$，和与之对应的社交关系 $S$ 。桥梁用户定义为 $U = U\_1 \cap U\_2$ 。

输入：信息领域下的 $U\_1, I, Y, G\_u, G\_i$ ，社交领域下的 $U\_2, S$ ，且满足 $U\_1 \cap U\_2 \neq \emptyset$

输出：一个个性化的排序函数，对于社交领域下的某个用户 $u^\prime$ ，给出信息领域下的某个物品 $i$ 的喜好程度，即 $f\_{u^\prime}: I \rightarrow \mathbb{R}$

### My possible solution

同样抓住两个领域的共享用户，从信息领域（rating matrix）中通过model-based filtering（当然可以选择更为优秀的NNMF、NCF方法），学习到信息领域下 $\mathcal{I}$ 用户的向量表示 $\vec{u}$ 和物品的表示 $\vec{p}$。在社交领域 $\mathcal{S}$，这里面的用户 $\vec{u}\_s$ 可以表示为他在信息领域有信息的朋友的向量表示的（加权）平均，形式化可以表示为:
$$
\vec{u\_s} = \sum\_j w\_{js} \times \vec{u\_j} \text{ for all } u\_j \in \mathcal{I} \cap \mathcal{S} \text{ and } u\_j \text{ is a friend of } u\_s \text{ in } \mathcal{S}
$$
这里的 $w\_{js}$ 是一个归一化之后的权重，通常是 $1/u\_s$ 的好友个数，或者可以选择好友关系强度这类的系数。

得到仅仅在社交领域出现的用户 $u\_s$ 的表示后，重新回到信息领域视角下，把这个学习到的向量表示和物品的向量表示放在一起，通过 model-based filtering 模型，用 $f(\vec{u\_s}, \vec{p\_i})$ 评估推荐的概率。

### Motivations

在单个领域的视角下，喜好程度预测根据给定的用户和物品给出，抽象化表示为 $\hat{y}\_{ui} = f\_\Theta(u,i)$，像 model-based filtering 方法，用户和物品都表示为一个向量，映射函数 $f$ 通常选取向量内积。虽然简单，但行之有效。换一个角度来看，内积操作其实是对用户和物品的向量对应位相乘得到 $\vec{h}$ 再把每个分量加和起来，将 $\vec{h}$ 视作输入层，就像是一个单层神经网络，模拟了一个 sum 函数的操作。这样的模型忽略了在跨领域的表示向量之间的关联性，简单的按位求和显然也无法体现协同关系。

### NSCR Model

核心问题是，如何把两个领域之间的用户、物品的表示向量融合在同一个向量空间中。NSCR模型在两个领域分别依次学习向量表示，通过共享用户的表示传递，保证在同一个向量空间中。模型的优化目标定义为：
$$
\mathcal{L} = \mathcal{L}\_I(\Theta\_I) + \mathcal{L}\_S(\Theta\_S)
$$
$\mathcal{L}\_I$ 和 $\mathcal{L}\_S$ 分别是在两个领域上的损失，$\Theta\_I \cap \Theta\_S$ 非空保证了桥梁用户的特征向量是共享的，即在两个领域中是一致的。

Step 1： 使用协同过滤方法最小化 $\mathcal{L}\_I$

Step 2：通过半监督学习方法，利用Step 1中的桥梁用户表示，得到社交领域中的非桥梁用户的表示

#### Learning of Information Domain

与传统的只采用的observed data，即用户 $u$ 和物品 $i$ 是明确的有 $y\_{ui} = 1$进行学习不同的是，使用了pairwise策略（其实就是负采样），训练和学习过程中还会使用到一些非观测数据，也会有 $y\_{uj} =0$ 的样例，最终的最小化：$\mathcal{L}\_I =\sum\_{(u,i,j) \in O}(\hat{y}\_{ui} - \hat{y}\_{uj}-1)^2 $

其二，增加了额外的辅助信息 $G\_u, G\_i$ 刻画更为全面与准确的特征。以用户角度为例，假设有 $V\_u$ 个用户附属特征$g^u\_t$ （通过 embedding 方法表示），输入层通过线性 pairwise pooling 完成信息融合：
$$
\vec{v\_u} = \varphi\_{pairwise}(u, g\_t^u)=\sum\_{t=1}^{V\_u}u\odot g\_t^u + \sum\_{t=1}^{V\_u}\sum\_{t'=t+1}^{V\_u}g^u\_t \odot g^u\_{t'}
$$
物品的表示也是类似，通过这样的操作得到 MLP 的输入层：$[\vec{v\_u}\odot \vec{v\_i}]$，MLP 输出为预测的喜好 $\hat{y}\_{ui}$

#### Learning of Social Domain

首先，在社交领域内，定义了结构一致性的损失，即认为社交网络中的相邻节点（好友）的表示应该接近，从而：
$$
\theta(U\_2) = \frac{1}{2}\sum\_{u\_1, u\_2 \in U\_2}s\_{u\_1, u\_2}\left\|\frac{\vec{v\_{u\_1}^\prime}}{\sqrt{d\_{u\_1}}}-\frac{\vec{v\_{u\_2}^\prime}}{\sqrt{d\_{u\_2}}}\right\|^2
$$
其中，$s\_{u\_1, u\_2}$ 为用户 $u\_1$ 和 $u\_2$ 的社交关系强度，$d\_u$ 表示用户网络节点的出度，进行了平滑，因此也称 Smooth 损失

另一方面，对于桥梁用户来说，应该使得社交视角下的表示与信息领域的表示尽可能相近，因此定义拟合（Fitting）损失：
$$
\theta(U) = \frac{1}{2}\sum\_{u \in U} \left\|\vec{v\_{u}^\prime}-\vec{v\_{u}^\prime}^{(0)}\right\|^2
$$
这里的 $\vec{v\_{u}^\prime}^{(0)}$ 是来自信息视角下的向量表示，我们的学习目标是社交视角下的表示：$\vec{v\_u^\prime}$，

从而定义总的损失：$\mathcal{L}\_S=\theta(U\_2)+\mu\theta(U)$

最终，通过社交视角下得到的用户表示 $\vec{v\_u^\prime}$ 与信息视角下的物品表示 $ \vec{v\_i}$ 作为 MLP 的输入，得到喜好预测 $\hat{y}\_{u^\prime,i}$

Tips: 实际训练过程中，也是通过负采样，假设一些没有社交关系的用户之间的社交强度为0.

### Experiments

#### Dataset

信息领域的数据集来自 Trip.com，将原本的rating转换为0/1，即 rated/not rated，社交关系来自与之相关的Facebook、Twitter社交网络

评价指标采用 AUC 和 Recall@K 验证

#### Model Comparison

NSCR模型比state-of-art更好，Twitter上的表现差于 Facebook，是由于Twitter上的桥梁用户少

相比简单的PopItem、MF推荐，不考虑社交数据和其他辅助数据，NSCR具有更好的表现，且社交网络正则（Smooth平滑策略）能够有效地防止整个社交网络仅被活跃用户主导

对于其他的附加属性，也体现出用户、物品之间的特征相似情况，通过特征的pooling层融合，有效减少了embedding的维度，缓解过拟合

#### Model Analysis

Dropout策略：在 pairwise pooling 层设置 dropout 能进一步提升性能，缓解过拟合

$\mathcal{L}\_S$ 中的超参 $\mu$ ：刻画了社交数据的贡献，调和 fitting 损失和 smooth 损失

MLP隐藏层数：符合经验，太少性能不好，多一些则性能提升，多到一定程度却也提升有限，且同时带来时间、内存的开销增长（进而发生过拟合，反而下降？）

embedding size：更大的embedding size 能显著提升向量的表示能力，但损害了模型的泛化能力，引起训练集上的过拟合

### Related Works

#### Social Recommendation

用户的决定受到他的朋友观点和行为的影响，可以把这种影响带入推荐系统的预测过程中，作为一种考虑因素。以往的研究都基于同一视角下的用户-物品以及用户-用户社交网络数据，本文却是从另一个外部平台上获取社交数据

#### Cross Domain Recommendation

通常做法是使用辅助信息对用户和物品建模，这些辅助信息也是同构的。而真正的交叉领域推荐，主要有两个方向：

- 用户、物品在各个独立的领域中有多种表示，丰富它们的特征。如果用户、物品在各个领域之中有交叉，可通过共享的用户或物品向量空间联系起来
- 从某些领域学习出一些用户-物品交互的规律、知识，相似地迁移到另一个领域（第一次听说，很玄）

### Conclusion

本文从传统的推荐系统的信息领域出发，向外部的、异构的社交用户进行物品的推荐，由 NSCR 模型融合两个领域的信息，由桥梁用户进行联系，向不同领域的用户进行推荐。本文最重大的发现在于：社交信息隐含着用户的偏好，即使是不同领域的用户。

本文存在局限性：所选的数据集规模不大，泛化能力待考证，因此，也未考虑一些冷启动用户。


