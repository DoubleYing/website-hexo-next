---
title: 大数据之 Kafka
description: 实习开始，头儿让我一起参与数据库服务器迁移的项目，是 Flume+Kafka+HBase(Storm)+Hadoop 的解决方案。
date: 2015-07-23 19:51:49
categories: [Big Data]
tags: [Internship, Kafka]
---
## 大数据框架简介
可以参照这篇文章：[大数据架构：flume-ng+Kafka+Storm+HDFS 实时系统组合](http://www.aboutyun.com/thread-6855-1-1.html)
## Kafka 简介
### Kafka 综述
Kafka 是一个分布式发布订阅消息系统。对于网页中的流动数据（页面访问量、搜索情况等），通常的处理方式是先把各种活动以日志的形式写入某种文件，然后周期性地对这些文件进行统计分析。
### Kafka 架构设计
我们将消息的发布（publish）称作 producer，将消息的订阅（subscribe）表述为 consumer，将中间的存储阵列称作 broker，这样我们就可以大致描绘出这样一个场面：
![producer+broker+consumer](http://static.oschina.net/uploads/space/2012/1129/184449_rAo6_589742.png)
生产者将数据生产出来，丢给 broker 进行存储，消费者需要消费数据了，就从broker中去拿出数据来，然后完成一系列对数据的处理。
![Kafka架构](http://static.oschina.net/uploads/space/2012/1129/184508_93uG_589742.jpg)
多个 broker 协同合作，producer 和 consumer 部署在各个业务逻辑中被频繁的调用，三者通过 zookeeper 管理协调请求和转发。这样一个高性能的分布式消息发布与订阅系统就完成了。图上有个细节需要注意，producer 到 broker 的过程是 push，也就是有数据就推送到 broker，而 consumer 到 broker 的过程是 pull，是通过 consumer 主动去拉数据的，而不是 broker 把数据主动发送到 consumer 端的。这样就能一定程度上缓解 producer 和 consumer 之间对资源竞争的冲突，像一种异步通信方式。
### 主题和日志
Topics（主题）是 Kafka 中的一个高级抽象概念，producer 向某个确定的 Topic 发布消息，对应地，consumer 也向某个确定的 Topic 订阅消息。对于每个 topic，Kafka 会维护一个如下所示的日志分组队列：
![Kafka topics and logs](http://kafka.apache.org/images/log_anatomy.png)
新的日志都直接加在每个消息队列的最后，通过一个 Offset 偏移量来访问每一条日志信息。并且我们可以设置一个过期时间，超过一般为两天为限，就会把这些没有被消费的日志清楚，释放空间。
[Reference](http://my.oschina.net/ielts0909/blog/92972) Here.
## 快速入门
### 运行环境
操作系统：CentOS 6.5（64位）（VMware 虚拟机）
JDK 版本：[1.7.0_79](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jdk-7u79-oth-JPR)（对 1.8 的支持可能存在一些问题，建议 1.7 即可）
Kafka版本：[0.8.2.1](http://kafka.apache.org/downloads.html)，我下载的是带有 Scala 的二进制文件，较为便捷。kafka_2.11-0.8.2.1.tgz，截止当前为最新稳定版。
### 准备工作
#### JDK
假设 JDK 环境配置已经完成，如果还没有配置，请参看 [这里](http://www.centoscn.com/image-text/install/2014/0827/3585.html)。
#### 解压缩
{% codeblock lang:bash line_number:false %}tar -xzf kafka_2.11-0.8.2.1.tgz {% endcodeblock %}
也可以指定 Extract 的目录，加上`-C 指定目录`即可。
{% codeblock lang:bash line_number:false %}cd kafka_2.11-0.8.2.1.tgz{% endcodeblock %}
### 运行服务器
Kafka 使用 ZooKeeper 作为服务器，这在我们下载的包中已经有一个单节点的 ZooKeeper 服务实例。
{% codeblock lang:bash line_number:false %}bin/zookeeper-server-start.sh config/zookeeper.properties{% endcodeblock %}
会输出一些运行信息
{% codeblock lang:bash line_number:false %}[2015-07-23 16:26:01,356] INFO Reading configuration from: config/zookeeper.properties (org.apache.zookeeper.server.quorum.QuorumPeerConfig)
[2015-07-23 16:26:01,358] INFO autopurge.snapRetainCount set to 3 (org.apache.zookeeper.server.DatadirCleanupManager)
...
[2015-07-23 16:26:01,490] INFO binding to port 0.0.0.0/0.0.0.0:2181 (org.apache.zookeeper.server.NIOServerCnxnFactory)
{% endcodeblock %}
运行 Kafka 服务器，
{% codeblock lang:bash line_number:false %}bin/kafka-server-start.sh config/server.properties
[2015-07-23 16:30:51,956] INFO Verifying properties (kafka.utils.VerifiableProperties)
[2015-07-23 16:30:52,043] INFO Property broker.id is overridden to 0 (kafka.utils.VerifiableProperties)
...
[2015-07-23 16:37:02,576] FATAL [Kafka Server 0], Fatal error during KafkaServer startup. Prepare to shutdown (kafka.server.KafkaServer)
org.I0Itec.zkclient.exception.ZkTimeoutException: Unable to connect to zookeeper server within timeout: 6000
{% endcodeblock %}
连接失败了，但是不用担心，我们需要使用 sudo 权限！本地测试时，如果仅仅使用 sudo 会提示 `exec: java: not found` 的异常，所以请使用 `su` 进入超级用户模式，以后的其他操作也请在超级模式，使用 '#' 作为提示符。
终于，两边分别有提示连接成功的输出：
{% codeblock lang:bash line_number:false %} # Zookeeper Server部分
[2015-07-23 16:39:32,106] INFO Accepted socket connection from /0:0:0:0:0:0:0:1:47857 (org.apache.zookeeper.server.NIOServerCnxnFactory)
...
[2015-07-23 16:45:52,347] INFO Established session 0x14eba1705cf0000 with negotiated timeout 6000 for client /127.0.0.1:43744 (org.apache.zookeeper.server.ZooKeeperServer)
> # Kafka Server部分
[2015-07-23 16:45:52,247] INFO Opening socket connection to server localhost/127.0.0.1:2181. Will not attempt to authenticate using SASL (unknown error) (org.apache.zookeeper.ClientCnxn)
...
[2015-07-23 16:45:52,645] INFO 0 successfully elected as leader (kafka.server.ZookeeperLeaderElector)
[2015-07-23 16:45:52,867] INFO New leader is 0 (kafka.server.ZookeeperLeaderElector$LeaderChangeListener)
[2015-07-23 16:45:52,867] INFO Registered broker 0 at path /brokers/ids/0 with address localhost:9092. (kafka.utils.ZkUtils$)
[2015-07-23 16:45:52,888] INFO [Kafka Server 0], started (kafka.server.KafkaServer)
{% endcodeblock %}
### 创建Topic
我们首先创建一个只有一个 Broker 分组、只有一个副本的话题，test 
{% codeblock lang:bash line_number:false %}bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test{% endcodeblock %}
我们可以测试一下是否创建成功，首先会有提示 `Created topic "test"`，使用命令：
{% codeblock lang:bash line_number:false %}bin/kafka-topics.sh --list --zookeeper localhost:2181{% endcodeblock %}
`list`命令提示`test`，说明创建成功。
### 发送消息
我们在 test 这个主题下，使用 Producer 发送一些消息
{% codeblock lang:bash line_number:false %}bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
hi, what's your name?
nihao~memeda~啵啵叽
Test ending..... {% endcodeblock %}
输入一些消息，下面我们创建 Consumer 来消费。这里的一些参数可以通过输入
{% codeblock lang:bash line_number:false %}bin/kafka-console-producer.sh{% endcodeblock %}
命令来查看具体说明，下面的 consumer 也是一样。
### 订阅消息
在 test 这个主题下，使用 Consumer 来消费这些日志消息
{% codeblock lang:bash line_number:false %}bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning{% endcodeblock %}
我们得到如下信息，表明信息的发布和订阅都成功了~！
{% codeblock lang:bash line_number:false %}bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
hi, what's your name?
nihao~memeda~啵啵叽
Test ending.....
^CConsumed 3 messages
{% endcodeblock %}
## 单机版的多 Broker 方式
### 两台服务器
我们假设有两台服务器，使用不同的端口进行连接。首先我们先为每一个 broker 建立一个服务器的配置文件
{% codeblock lang:bash line_number:false %}cp config/server.properties config/server-1.properties
cp config/server.properties config/server-2.properties{% endcodeblock %}
分别在这些文件中修改为如下内容：
{% codeblock lang:yml line_number:false %}config/server-1.properties:
    broker.id=1
    port=9093
    log.dir=/tmp/kafka-logs-1 
config/server-2.properties:
    broker.id=2
    port=9094
    log.dir=/tmp/kafka-logs-2
{% endcodeblock %}
此时我们运行 Kafka 的两台服务器，'&' 表示可以在后台运行
{% codeblock lang:bash line_number:false %}bin/kafka-server-start.sh config/server-1.properties &
bin/kafka-server-start.sh config/server-2.properties & {% endcodeblock %}

{% codeblock lang:bash line_number:false %} # server-1, 被选为leader
[2015-07-23 17:09:29,281] INFO 1 successfully elected as leader (kafka.server.ZookeeperLeaderElector)
[2015-07-23 17:09:29,497] INFO Registered broker 1 at path /brokers/ids/1 with address localhost:9093. (kafka.utils.ZkUtils$)
[2015-07-23 17:09:29,501] INFO New leader is 1 (kafka.server.ZookeeperLeaderElector$LeaderChangeListener)
[2015-07-23 17:09:29,508] INFO [Kafka Server 1], started (kafka.server.KafkaServer)
> # server-2
[2015-07-23 17:10:03,602] INFO Registered broker 2 at path /brokers/ids/2 with address localhost:9094. (kafka.utils.ZkUtils$)
[2015-07-23 17:10:03,623] INFO [Kafka Server 2], started (kafka.server.KafkaServer)
{% endcodeblock %}
### 创建新的话题
创建一个新的话题，叫做 multitest，注意这里的 `--replication-factor` 参数，表示了 server 的个数，不能超过当前的所有 running 的服务器个数。（加上前面的一共有三个，这里 1，2，3 都是可以的，但是 >=4 不行)
{% codeblock lang:bash line_number:false %}bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 2 --partitions 1 --topic multitest{% endcodeblock %}
提示 `Created topic "multitest".` 我们可以通过 describe 的方式来查询一个主题的信息，如输入
{% codeblock lang:bash line_number:false %} bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic multitest
Topic: multitest PartitionCount:1 ReplicationFactor:2 Configs:
Topic: multitest Partition: 0 Leader: 1 Replicas: 2,1 Isr: 1,2 {% endcodeblock %}
### 新的 Producer 和 Consumer
同上建立新的 Producer 发布消息日志，
{% codeblock lang:bash line_number:false %}bin/kafka-console-producer.sh --broker-list localhost:9092 --topic multitest{% endcodeblock %}
输入 message1(2\3\4) 发布。
建立新的 Consumer 去订阅消息日志，
{% codeblock lang:bash line_number:false %}bin/kafka-console-consumer.sh --zookeeper localhost:2181 --from-beginning --topic multitest
message1
message2
message3
message4 {% endcodeblock %}
### 检测容错的机制
我们现在关闭 server-1
{% codeblock lang:bash line_number:false %}ps | grep server-1.properties{% endcodeblock %}
但是在新的版本中，并没有相关信息，直接通过 `ps` 查得进程，找到对应的，都以'java'标识，大约揣摩了一下，能够杀掉这个进程，请看人品，啧啧啧。然后再次执行
{% codeblock lang:bash line_number:false %}bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic multitest`
Topic: multitest PartitionCount:1 ReplicationFactor:2 Configs: 
Topic: multitest Partition: 0 Leader: 2 Replicas: 2,1 Isr: 2 {% endcodeblock %}
如果此时再开启一个 Consumer ，仍然可以得到原本完整 4 条消息的日志。
## 其他
其他完整且详细的资料请参看 [kafka系列文章](http://my.oschina.net/ielts0909/blog/117489)，本文也同时参考了 [Apache Kafka](https://kafka.apache.org/quickstart) 的官方文档。

