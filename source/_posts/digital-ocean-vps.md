---
title: DigitalOcean：Ubuntu VPS 下配置VPN
date: 2015-01-09 21:12:41
categories: [VPN]
tags: [Digital Ocean, VPN, 黑科技, 翻墙]
description: 在 GFW 越来越厉害的时代，在 Digital Ocean 上申请最廉价的 5 刀/月的 VPS 服务器，对于个人用户来说是足够了，就可以科学上网！安心学术上不了谷歌，真是辛酸。
---

## Goagent
一直在用，但是也总是不太稳定，虽然一直在更新，但是速度也不是十分快，可能跟政策什么的有关系。身边大神搞了几个，我就手痒跃跃欲试，可惜 Github 的学生申请还没通过，都等了好久了啊喂，又听说针对 edu.cn 的学生身份可能都直接拒了...所以现在也没有 $100 的抵价券，也罢，先花个 30RMB 试试吧~加上注册送的 10 刀，也能用三个月。

## $5/month的配置
512MB Ram 20GB SSD Disk 流量 1TB
我选择的是荷兰阿姆斯特丹的机房，装的是 Ubuntu 14.04 x64，速度还不错哒~
![speedtest](speedtest.png)

## VPN配置过程
下面是在windows下使用 [putty](http://the.earth.li/~sgtatham/putty/0.63/x86/putty.exe) (点击即可下载)进行操作的过程：
首先填入 IP，端口保持 22 默认
![puttyface](putty1.png)
open, Go Go Go!
![puttycmd](putty2.png)
好，准备工作做好，就不多说了，记录一下配置的过程
原文出处：[kunyu 的 blog](http://blog.kunyu.li/digitalocean-ubuntu-vps-vpn.html)
原文是用 vim 进行文本编辑的，但是考虑到某些操作上的问题，故采用了nano，操作简单些！
### 安装 pptpd
{% codeblock lang:bash line_number:false %}$ sudo apt-get install pptpd
{% endcodeblock %}

### 编辑配置文件
{% codeblock lang:bash line_number:false %}$ sudo nano /etc/pptpd.conf{% endcodeblock %}
找到最下面，修改IP
{% codeblock lang:bash line_number:false %}localip 188.166.xxx.xxx
remoteip 10.100.0.2-10 {% endcodeblock %}
第二行为分配的 IP 段，不用修改，如果一定要修改的话，注意与后面建立 NAT 保持一致！
使用 nano 编辑后，按下 `Ctrl+X` 键，选择 `Y`，最后回车 `Enter` 保存写入即可，下同。

### 设置dns
{% codeblock lang:bash line_number:false %}$ sudo nano /etc/ppp/pptpd-options{% endcodeblock %}
修改以下部分为 google 的 dns
{% codeblock lang:bash line_number:false %}ms-dns 8.8.8.8
ms-dns 8.8.4.4{% endcodeblock %}
可以直接加在最后，或者把#(注释符)去掉，并修改内容

### 设置账号
{% codeblock lang:bash line_number:false %}$ sudo nano /etc/ppp/chap-secrets{% endcodeblock %}
添加一行，依次为：用户名，服务，密码，限制 IP
{% codeblock lang:bash line_number:false %} username pptpd userpassword *
{% endcodeblock %}

### 重启服务

{% codeblock lang:bash line_number:false %}$ sudo /etc/init.d/pptpd restart 
{% endcodeblock %}

### 设置转发
{% codeblock lang:bash line_number:false %}$ sudo nano /etc/sysctl.conf {% endcodeblock %}
去掉文件中这一行的注释
{% codeblock lang:bash line_number:false %}net.ipv4.ip_forward=1{% endcodeblock %}
允许转发设置！并使它立刻生效{% codeblock lang:bash line_number:false %}$ sudo sysctl -p
{% endcodeblock %}

### NAT设置
先安装 `iptables`:{% codeblock lang:bash line_number:false %}$ sudo apt-get install iptables {% endcodeblock %}
建立一个 NAT{% codeblock lang:bash line_number:false %}$ sudo iptables -t nat -A POSTROUTING -s 10.100.0.0/24 -o eth0 -j MASQUERADE{% endcodeblock %}将规则保存，使重启后规则不丢失{% codeblock lang:bash line_number:false %}$ sudo iptables-save > /etc/iptables-rules{% endcodeblock %}
若此处提示：{% codeblock lang:bash line_number:false %}-bash: /etc/iptables-rules: Permission denied{% endcodeblock %}则可使用root用户，命令：`su` - 进入root用户保存

### 编辑网卡文件
{% codeblock lang:bash line_number:false %}sudo nano  /etc/network/interfaces{% endcodeblock %}
加载网卡时自动加载规则，在末尾加入{% codeblock lang:bash line_number:false %}pre-up iptables-restore < /etc/iptables-rules
{% endcodeblock %}

### 设置MTU
{% codeblock lang:bash line_number:false %}sudo iptables -A FORWARD -s 10.100.0.0/24 -p tcp -m tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1200{% endcodeblock %}
可以防止包过大，若设置了，记得保存
{% codeblock lang:bash line_number:false %}sudo iptables-save > /etc/iptables-rules{% endcodeblock %}
至此，Ubuntu 上的操作结束

## Windows 下的 VPN 连接设置
进入控制面板 -> 网络连接 -> 打开网络与共享中心
![CP1](cp1.png)
建立新的网络连接，选择连接到工作空间，Next，
![SetupNew](cp2.png)
选择使用我自己的网络连接，有 VPN 的那个
![VPN](cp3.png)
填入你的 VPN 地址，取个别名
![IPName](cp4.png)
创建完成后，网络连接中会出现对应的 VPN 连接，输入上面设置的用户名和密码即可连接，科学上网！
## iPhone, iPad上使用
只有 iPad，就以此为例
### VPN配置
Settings 设置，在 General 选项中，添加 VPN Configuration
![PAD1](pad1.png)
选择 PPTP 方式，上面的 Description 是 VPN 的名字，Server 填 VPN 的 IP，Account 是用户名，Password 对应密码，Save 保存以后即可使用！
![PAD2](pad2.png)
### 尽情使用
Enjoy yourself！

参考： [知乎 - 如何自行架设VPN服务？](http://www.zhihu.com/question/20113381)

