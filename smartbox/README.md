# HVML智能音响

**目录**

[//]:# (START OF TOC)

- [介绍](#介绍)
- [安装](#安装)
- [运行项目](#运行项目)
- [目录结构](#目录结构)
- [初始化wifi](#初始化wifi)

[//]:# (END OF TOC)

## 介绍

该项目在`HVML`环境下实现智能音响的基础功能。其功能包括WIFI连接，MP3，视频资源播放，天气API接口调用，本地图片相册，闹钟功能。

## 安装

### 该项目依赖一下环境
1. `Purc` 0.9.15或更高版本
1. `xGUI Pro` 0.8.3或更高版本
1. `HBDBus` 2.0或更高版本
1. `HBDInetd` 2.0或更高版本

### 构建步骤
假设在Linux系统下，您已完成了`Purc`、`xGUI Pro`、`HBDBus`、`HBDInetd`的安装。现在您需要将该项目放置到`/app/`目录下。

## 运行项目

### 运行环境
请输入以下指令运行`HBDBus`
```bash
$ hbdbus &
```
请输入以下指令运行`HBDInetd`
```bash
$ hbdinetd &
```
请输入一下指令运行`xGUI`（查看`/var/tmp/`目录下是否存在`purcmc.sock`文件，如果存在先删除后，再运行）
```bash
$ xguipro
```
### 运行项目
请在`/app/smartbox/`目录下运行如下命令
```bash
$ purc -c socket -d remote -a cn.fmsoft.hybridos.settings -r radio -v main.hvml &
```
## 目录结构
```
├─assets           静态资源目录
│  ├─css                样式文件
│  ├─js                 js脚本
│  ├─videojs            视频播放器
├─json             音乐、视频、图片、闹钟本地数据保存
│  ├─ ...
├─static           项目图片文件
│  ├─screensaver        屏保图片
│  ├─weather            天气图片
│  ├─...
├─...              
```
## 初始化wifi
删除 `/etc/wpa_supplicant-hbd.conf`中的内容