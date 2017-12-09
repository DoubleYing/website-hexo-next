---
title: Algorithm - 图的最短路径算法
date: 2014-11-05
description: 图的经典算法，除了 DFS 和 BFS 之外，最短路径（Shortest Path）也是很重要的类别，并且与最小生成树（MST）中的 Prim 算法、Kruskal 算法也有千丝万缕的联系，可以用贪心策略解决...
categories: Algorithm
tags: [Graph]
---

随着算法教学进度的推进，虽然关于图论的专题只开了头，讲了 DFS 和 BFS...

可是，万恶的计算机网络作业居然都是这样的题目，此处省略脏话 1000+ 字，本着离散数学曾经学过的良心，默默温习一下~但是，与此同时也算是对算法的一点点预习吧
（你心态真好！！喂，刚刚搞完 JAVA 的大作业，然后就得知马上要交网络的作业啊喂！！！

## Dijkstra Algorithm

中文维基百科译为"戴克斯特拉"。很遗憾，这种算法不能解决权值为负的情况，可是谁叫我们一般情况下权值都是正值呢？它的主要特点是以起始点为中心向外层层扩展，直到扩展到终点为止。

下面又开始了无耻的转载了......

### 算法思想

设 $G=(V,E)$是一个带权有向图，把图中顶点集合 $V$ 分成两组，第一组为已求出最短路径的顶点集合（用 $S$ 表示，初始时 $S$中只有一个源点，以后每求得一条最短路径 , 就将加入到集合 $S$ 中，直到全部顶点都加入到 $S$ 中，算法就结束了），第二组为其余未确定最短路径的顶点集合（用 $U$表示），按最短路径长度的递增次序依次把第二组的顶点加入 $S$ 中。在加入的过程中，总保持从源点 $v$ 到 $S$ 中各顶点的最短路径长度不大于从源点 $v$ 到 $U$ 中任何顶点的最短路径长度。此外，每个顶点对应一个距离，$S$ 中的顶点的距离就是从 $v$ 到此顶点的最短路径长度，$U$ 中的顶点的距离，是从 $v$ 到此顶点只包括 $S$ 中的顶点为中间顶点的当前最短路径长度。

### 算法步骤

1. 初始时，$S$ 只包含源点，即 $S＝\\{v\\}$，$v$ 的距离为 0。$U$ 包含除 $v$ 外的其他顶点，即 $U=\\{ \text{其余顶点} \\}$，若 $v$ 与 $U$ 中顶点 $u$ 有边，则 $\langle u,v\rangle$ 正常有权值，若 $u$ 不是 $v$ 的出边邻接点，则 $\langle u,v\rangle$ 权值为 $\infty$。

2. 从 $U$ 中选取一个距离 $v$ 最小的顶点 $k$，把 $k$，加入 $S$ 中（该选定的距离就是 $v$ 到 $k$ 的最短路径长度）。

3. 以 $k$ 为新考虑的中间点，修改 $U$ 中各顶点的距离；若从源点 $v$ 到顶点 $u$ 的距离（经过顶点 $k$ ）比原来距离（不经过顶点 $k$ ）短，则修改顶点 $u$ 的距离值，修改后的距离值的顶点k的距离加上边上的权。

4. 重复步骤 2 和 3 直到所有顶点都包含在 $S$ 中。

### 动画示例

![Sorry~](http://pic002.cnblogs.com/images/2012/426620/2012073019540660.gif)

### 代码实现

{% codeblock lang:c line_number:false %}const int  MAXINT = 32767;
const int MAXNUM = 10;
int dist[MAXNUM];
int prev[MAXNUM];

int A[MAXUNM][MAXNUM];

void Dijkstra(int v0)
{
  　　bool S[MAXNUM]; //判断是否已存入该点到S集合中
    int n=MAXNUM;
  　　for(int i=1; i<=n; ++i)
 　　 {
      　　dist[i] = A[v0][i];
      　　S[i] = false; //初始都未用过该点
      　　if(dist[i] == MAXINT)    
            　　prev[i] = -1;
 　　     else 
            　　prev[i] = v0;
   　　}
   　 dist[v0] = 0;
   　 S[v0] = true; 　　
 　　 for(int i=2; i<=n; i++)
 　　 {
       　　int mindist = MAXINT;
       　　int u = v0; // 找出当前未使用的点j的dist[j]最小值
      　　 for(int j=1; j<=n; ++j)
      　　    if((!S[j]) && dist[j]<mindist)
      　　    {
         　　       u = j; // u保存当前邻接点中距离最小的点的号码 
         　 　      mindist = dist[j];
       　　   }
       　　S[u] = true; 
       　　for(int j=1; j<=n; j++)
       　　    if((!S[j]) && A[u][j]<MAXINT)
       　　    {
           　    　if(dist[u] + A[u][j] < dist[j]) //在通过新加入的u点路径找到离v0点更短的路径  
           　    　{
                   　　dist[j] = dist[u] + A[u][j]; //更新dist 
                   　　prev[j] = u; //记录前驱顶点 
            　　    }
        　    　}
   　　}
} {% endcodeblock %}


### 算法实例

给出一个无向图 $G$ 如下所示：
![Graph G](http://pic002.cnblogs.com/images/2012/426620/2012073019593375.jpg)

用 Dijkstra 算法找出以A为起点的单源最短路径步骤如下

![Dijkstra](http://pic002.cnblogs.com/images/2012/426620/2012073020014941.jpg)

转载自 [华山大师兄](http://www.cnblogs.com/biyeymyhjob/archive/2012/07/31/2615833.html) 博客。

## Bellman-Ford 算法

贝尔曼-福特算法，它的原理是对图进行 $V-1$ 次松弛操作，得到所有可能的最短路径。其优于 Dijkstra 算法的方面是边的权值可以为负数、实现简单，缺点是时间复杂度过高，高达 $O(VE)$。

### 算法流程

给定图 $G(V, E)$（其中 $V$、$E$ 分别为图 $G$ 的顶点集与边集），源点 $s$ ，数组 `Distant[i]` 记录从源点 $s$ 到顶点 $i$ 的路径长度，初始化数组 `Distant[n]`为 $\infty$，而 `Distant[s]` 为 0；

以下操作循环执行至多 $n-1$ 次，$n$ 为顶点数：
对于每一条边 $e(u, v)$ ，如果 $Distant[u] + w(u, v) < Distant[v]$
则令 $Distant[v] = Distant[u]+w(u, v)$。$w(u, v)$ 为边 $e(u,v)$ 的权值；
若上述操作没有对 Distant 进行更新，说明最短路径已经查找完毕，或者部分点不可达，跳出循环。否则执行下次循环；

为了检测图中是否存在负环路，即权值之和小于 0 的环路，对于每一条边 $e(u, v)$ ，如果存在 $Distant[u] + w(u, v) < Distant[v]$ 的边，则图中存在负环路，即是说该图无法求出单源最短路径。否则数组 `Distant[n]` 中记录的就是源点 $s$ 到各顶点的最短路径长度。

我个人倒是觉得有点像 DFS 啊，对刚刚更新的结点继续下一层的搜索、计算权值，取更小的那个作为新的权值。当每个结点在这一轮都不再更新的时候，算法结束。

### 算法的三部分

第一，初始化所有点。每一个点保存一个值，表示从原点到达这个点的距离，将原点的值设为 0，其它的点的值设为无穷大（表示不可达）。
第二，进行循环，循环下标为从 $1$ 到 $n－1$（$n$ 等于图中点的个数）。在循环内部，遍历所有的边，进行松弛计算。
第三，遍历途中所有的边 $edge(u,v)$，判断是否存在这样情况：
$d(v)>d(u) + w(u,v)$
则返回 `false`，表示途中存在从源点可达的权为负的回路。 

之所以需要第三部分的原因，是因为，如果存在从源点可达的权为负的回路。则应为无法收敛而导致不能求出最短路径。

可知，Bellman-Ford 算法寻找单源最短路径的时间复杂度为 $O(VE)$.

### 算法示例

![Example Bellman-Ford](http://images.cnitblog.com/blog/632767/201411/051928507675106.png)

### 代码实现

{% codeblock lang:c line_number:false %}#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
using namespace std;
//表示一条边
struct Edge
{
    int src, dest, weight;
};

//带权值的有向图
struct Graph
{
    // V 顶点的数量， E 边的数量
    int V, E;

    // 用边的集合 表示一个图
    struct Edge* edge;
};

// 创建图
struct Graph* createGraph(int V, int E)
{
    struct Graph* graph = (struct Graph*) malloc( sizeof(struct Graph) );
    graph->V = V;
    graph->E = E;

    graph->edge = (struct Edge*) malloc( graph->E * sizeof( struct Edge ) );

    return graph;
}

// 打印结果
void printArr(int dist[], int n)
{
    printf("Vertex   Distance from Source\n");
    for (int i = 0; i < n; ++i)
        printf("%d \t\t %d\n", i, dist[i]);
}

// 获得单源最短路径，同时检测负权回路
void BellmanFord(struct Graph* graph, int src)
{
    int V = graph->V;
    int E = graph->E;
    int dist[V];

    // 第一步初始化
    for (int i = 0; i < V; i++)
        dist[i]   = INT_MAX;
    dist[src] = 0;

    // 第二步：松弛操作
    for (int i = 1; i <= V-1; i++)
    {
        for (int j = 0; j < E; j++)
        {
            int u = graph->edge[j].src;
            int v = graph->edge[j].dest;
            int weight = graph->edge[j].weight;
            if (dist[u] + weight < dist[v])
                dist[v] = dist[u] + weight;
        }
    }

    // 第三步： 检测负权回路.  上面的操作保证没有负权回路的存在，
    // 如果找到了更短的路径，则说明存在负权回路
    for (int i = 0; i < E; i++)
    {
        int u = graph->edge[i].src;
        int v = graph->edge[i].dest;
        int weight = graph->edge[i].weight;
        if (dist[u] + weight < dist[v])
            printf("Graph contains negative weight cycle");
    }

    printArr(dist, V);
    return;
}

// 测试
int main()
{
    /* 创建 例子中的那个图的结构 */
    int V = 5;
    int E = 8;
    struct Graph* graph = createGraph(V, E);

    // add edge 0-1 (or A-B in above figure)
    graph->edge[0].src = 0;
    graph->edge[0].dest = 1;
    graph->edge[0].weight = -1;

    // add edge 0-2 (or A-C in above figure)
    graph->edge[1].src = 0;
    graph->edge[1].dest = 2;
    graph->edge[1].weight = 4;

    // add edge 1-2 (or B-C in above figure)
    graph->edge[2].src = 1;
    graph->edge[2].dest = 2;
    graph->edge[2].weight = 3;

    // add edge 1-3 (or B-D in above figure)
    graph->edge[3].src = 1;
    graph->edge[3].dest = 3;
    graph->edge[3].weight = 2;

    // add edge 1-4 (or A-E in above figure)
    graph->edge[4].src = 1;
    graph->edge[4].dest = 4;
    graph->edge[4].weight = 2;

    // add edge 3-2 (or D-C in above figure)
    graph->edge[5].src = 3;
    graph->edge[5].dest = 2;
    graph->edge[5].weight = 5;

    // add edge 3-1 (or D-B in above figure)
    graph->edge[6].src = 3;
    graph->edge[6].dest = 1;
    graph->edge[6].weight = 1;

    // add edge 4-3 (or E-D in above figure)
    graph->edge[7].src = 4;
    graph->edge[7].dest = 3;
    graph->edge[7].weight = -3;

    BellmanFord(graph, 0);
    return 0;
} {% endcodeblock %}

Bellman-Ford 算法转载自 [WuTianQi](http://www.wutianqi.com/?p=1912) 博客。

## Floyd-Warshall 算法

### 算法简介

Floyd-Warshall 算法是解决任意两点间的最短路径的一种算法，可以正确处理有向图或负权的最短路径问题，同时也被用于计算有向图的传递闭包。Floyd-Warshall 算法的时间复杂度为 $O(N^3)$，空间复杂度为 $O(N^2)$。 

### 算法描述 

#### 思想原理

Floyd 算法是一个经典的动态规划算法。用通俗的语言来描述的话，首先我们的目标是寻找从点i到点j的最短路径。从动态规划的角度看问题，我们需要为这个目标重新做一个诠释（这个诠释正是动态规划最富创造力的精华所在） 

从任意节点 $i$ 到任意节点 $j$ 的最短路径不外乎两种可能，一是直接从 $i$ 到 $j$，二是从$i$经过若干个节点 $k$ 到 $j$。所以，我们假设 $Dis(i,j)$ 为节点 $u$ 到节点 $v$ 的最短路径的距离，对于每一个节点 $k$，我们检查 $Dis(i,k) + Dis(k,j) < Dis(i,j)$ 是否成立，如果成立，证明从 $i$ 到 $k$ 再到 $j$ 的路径比 $i$ 直接到 $j$ 的路径短，我们便设置 $Dis(i,j) = Dis(i,k) + Dis(k,j)$，这样一来，当我们遍历完所有节点 $k$，$Dis(i,j)$中记录的便是 $i$ 到 $j$ 的最短路径的距离。 

#### 算法过程 

①  从任意一条单边路径开始。所有两点之间的距离是边的权，如果两点之间没有边相连，则权为无穷大。 　　 
②  对于每一对顶点 $u$ 和 $v$ ，看看是否存在一个顶点 $w$ 使得从 $u$ 到 $w$ 再到 $v$ 比己知的路径更短。如果是更新它。 

#### Floyd 算法过程矩阵的计算——十字交叉法 

方法：两条线，从左上角开始计算一直到右下角，如下所示

给出矩阵，其中矩阵A是邻接矩阵，而矩阵 $Path$ 记录 $u$, $v$两点之间最短路径所必须经过的点
$$A\_{-1}=\left[\begin{array}{cccc}
0 & 5 & \infty & 7 \\\
 \infty & 0 & 4 & 2 \\\
3 & 3 & 0 & 2 \\\
\infty & \infty &1 & 0\\\
\end{array}\right], Path\_{-1}=\left[\begin{array}{cccc}
-1 & -1&-1 & -1  \\\
 -1& -1 & -1 & -1 \\\
-1 & -1 & -1 & -1 \\\
-1 & -1 &-1 & -1 \\\
\end{array}\right]$$

相应计算方法如下： 

![Floyd Example](http://pic002.cnblogs.com/images/2012/426620/2012073109460084.jpg)

![Floyd Example](http://pic002.cnblogs.com/images/2012/426620/2012073109453085.jpg)

![fLoyd Example](http://pic002.cnblogs.com/images/2012/426620/2012073109463549.jpg)

最后 $A_3$ 即为所求结果。

### 算法代码

这种算法的代码写起来超级简单啊~

{% codeblock lang:c line_number:false %}typedef struct          
{        
    char vertex[VertexNum]; //顶点表         
    int edges[VertexNum][VertexNum]; //邻接矩阵,可看做边表         
    int n,e; //图中当前的顶点数和边数         
}MGraph; 

void Floyd(MGraph g)
{
 　　int A[MAXV][MAXV];
 　　int path[MAXV][MAXV];
 　　int i,j,k,n=g.n;
 　　for(i=0;i<n;i++)
    　　for(j=0;j<n;j++)
    　　{ 　　
             A[i][j]=g.edges[i][j];
         　　 path[i][j]=-1;
     　 }
 　　for(k=0;k<n;k++)
 　　{ 
      　　for(i=0;i<n;i++)
         　　for(j=0;j<n;j++)
             　　if(A[i][j]>(A[i][k]+A[k][j]))
             　　{
                   　　A[i][j]=A[i][k]+A[k][j];
                   　　path[i][j]=k;
              　 } 
    　} 
}
{% endcodeblock %}


算法时间复杂度: $O(n^3)$

Floyd-Warshall 算法转载自 [华山大师兄](http://www.cnblogs.com/biyeymyhjob/archive/2012/07/31/2615833.html) 博客。