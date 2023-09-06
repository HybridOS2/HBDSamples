# HVML汽车仪表盘

**目录**

[//]:# (START OF TOC)

- [介绍](#介绍)
- [安装](#安装)
- [运行项目](#运行项目)
- [数据结构](#数据结构)

[//]:# (END OF TOC)

## 介绍

该项目在`HVML`环境下实现汽车仪表的基础功能。其功能包括根据状态机实现仪表数据变换、页面切换、仪表指示灯显示等功能。

## 安装

### 该项目依赖于以下环境
1. `Purc` 0.9.15或更高版本
1. `xGUI Pro` 0.8.3或更高版本

### 构建步骤

假设在Linux系统下，您已完成了`Purc`和`xGUI Pro`的安装。现在您需要将该项目放置到`/app/`目录下。

## 运行项目

### 运行xGUI
通过以下方式使用 `xGUI`（查看`/var/tmp/`目录下是否存在`purcmc.sock`文件，如果存在先删除后，再运行）
```bash
$ xguipro
```
### 运行项目
请在`/app/instrument/`目录下运行如下命令
```bash
$ purc -c socket -v index.hvml
```

## 数据结构

1. `timestamp`为项目运行到该值的秒数时，触发其`action`
1. `action`具体需要进行的动作其属性有：
    
    1. `sysType`：车辆模式：`eco`、`standard`、`sport`
    1. `page`：需要跳转的页面
    1. `label_text`：提示文本
    1. `tire_info`：轮胎状态
    1. `warningABS`：ABS报警灯
    1. `warningAirbag`：安全气囊报警灯
    
        ......
    1. `temp`：当前温度
    1. `gear`：档位
    1. `speed`：速度仪表值
    1. `speed_acc`：速度仪表变化速度
    1. `mileage`：里程仪表值
    1. `mileage_acc`：里程仪表变化速度
    1. `rev`：转速仪表值
    1. `rev_acc`：转速仪表变化速度
    1. `engine_temp`：引擎温度
    1. `engine_temp_acc`：引擎温度变化速度


```json
[
    {
        timestamp:0,
        action:{
            sysType:"eco",
            page:"carUnderpanInfo",
            label_text:"""
                <p>开机自检</p>
            """,
            tire_info:"RightRear-2.5-34,RightFront-2.5-34,LeftRear-2.5-34,LeftFront-2.5-34",
            warningABS:true,
            warningAirbag:true,
            warningBattery:true,
            warningBrakingFault:true,
            warningEngineTemp:true,
            warningSafetyBelt:true,
            lowBeam:false,
            highBeam:false,
            leftBeam:false,
            rightBeam:false,
            temp:25,
            gear:'P',

            speed:0,
            speed_acc:0,
            mileage:0,
            mileage_acc:0,
            rev:0,
            rev_acc:0,
            engine_temp:0,
            engine_temp_acc:0     
        }
    }
]
```
