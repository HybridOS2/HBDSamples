# Samples for HybridOS 2.0

[toc]

## Introduction

## Usage

The `smartbox` is a smart speaker sample application implemented in HTML programming language.
  It uses bootstrap to implement some functions, so it uses xGUI Pro as the renderer.

The `smart-panel` is a smart panel sample application implemented in HTML programming language.
  It uses bootstrap to implement some functions, so it uses xGUI Pro as the renderer.

The `instrument` is a smart car instrument sample application implemented in HTML programming language.
  It uses bootstrap to implement some functions, so it uses xGUI Pro as the renderer.

The `access-control` is a access control sample application implemented in HTML programming language.
  It only uses HTML and CSS, so it can use xGUI as a renderer.

## Install and Run

* smartbox

```SHELL
$ sudo mkdir -p app
$ sudo cp -r smartbox /app/cn.fmsoft.hybridos.settings
$ sudo ln -sf  /app/cn.fmsoft.hybridos.settings /app/smartbox
$ sudo chown -R $USER /app/cn.fmsoft*
$ xguipro &
$ cd /app/cn.fmsoft.hybridos.settings
$ purc  -c socket -d remote -s false -a cn.fmsoft.hybridos.settings -r radio -v main.hvml
```

* smart-panel

```SHELL
$ sudo mkdir -p app
$ sudo cp -r smart-panel /app/cn.fmsoft.hybridos.smartcontrolpanel
$ sudo chown -R $USER /app/cn.fmsoft*
$ xguipro &
$ cd /app/cn.fmsoft.hybridos.smartcontrolpanel
$ purc  -c socket -d remote -s false -a cn.fmsoft.hybridos.smartcontrolpane -r smartpanel -L "window-size:480px 480px; window-position:center" -v single_runner_app.hvml
```

* instrument

```SHELL
$ sudo mkdir -p app
$ sudo cp -r instrument /app/cn.fmsoft.hybridos.instrument
$ sudo chown -R $USER /app/cn.fmsoft*
$ xguipro &
$ cd /app/cn.fmsoft.hybridos.instrument
$ purc  -c socket -d remote -s false -a cn.fmsoft.hybridos.instrument -r instrument -v index.hvml
```

* access-control

```SHELL
$ sudo mkdir -p app
$ sudo cp -r access-control /app/cn.fmsoft.hybridos.ac
$ sudo chown -R $USER /app/cn.fmsoft*
$ cd /app/cn.fmsoft.hybridos.ac
# xgui4gtk
$ xgui4gtk -i skia -d remote -S true -a cn.fmsoft.hybridos.ac -r ac -k -v atd_main.hvml
# xgui4mgsa
$ xgui4mgsa -i minigui -d remote -S true -a cn.fmsoft.hybridos.ac -r ac -k -v atd_main.hvml
```

## Install with one command

```SHELL
$ ./install.sh
```

## Copying

Copyright (C) 2023 [FMSoft Technologies]

All programs are licensed under the Apache License, Version 2.0.

For more information, please see `LICENSE` file.

## Tradmarks

1) 飛漫

![飛漫](https://www.fmsoft.cn/application/files/cache/thumbnails/87f47bb9aeef9d6ecd8e2ffa2f0e2cb6.jpg)

2) FMSoft

![FMSoft](https://www.fmsoft.cn/application/files/cache/thumbnails/44a50f4b2a07e2aef4140a23d33f164e.jpg)

3) 合璧

![合璧](https://www.fmsoft.cn/application/files/4716/1180/1904/256132.jpg)
![合璧](https://www.fmsoft.cn/application/files/cache/thumbnails/9c57dee9df8a6d93de1c6f3abe784229.jpg)
![合壁](https://www.fmsoft.cn/application/files/cache/thumbnails/f59f58830eccd57e931f3cb61c4330ed.jpg)

4) HybridOS

![HybridOS](https://www.fmsoft.cn/application/files/cache/thumbnails/5a85507f3d48cbfd0fad645b4a6622ad.jpg)

5) HybridRun

![HybridRun](https://www.fmsoft.cn/application/files/cache/thumbnails/84934542340ed662ef99963a14cf31c0.jpg)

6) MiniGUI

![MiniGUI](https://www.fmsoft.cn/application/files/cache/thumbnails/54e87b0c49d659be3380e207922fff63.jpg)

7) xGUI

![xGUI](https://www.fmsoft.cn/application/files/cache/thumbnails/7fbcb150d7d0747e702fd2d63f20017e.jpg)

8) miniStudio

![miniStudio](https://www.fmsoft.cn/application/files/cache/thumbnails/82c3be63f19c587c489deb928111bfe2.jpg)

9) HVML

![HVML](https://www.fmsoft.cn/application/files/8116/1931/8777/HVML256132.jpg)

10) 呼噜猫

![呼噜猫](https://www.fmsoft.cn/application/files/8416/1931/8781/256132.jpg)

11) Purring Cat

![Purring Cat](https://www.fmsoft.cn/application/files/2816/1931/9258/PurringCat256132.jpg)

12) PurC

![PurC](https://www.fmsoft.cn/application/files/5716/2813/0470/PurC256132.jpg)

[Beijing FMSoft Technologies Co., Ltd.]: https://www.fmsoft.cn
[FMSoft Technologies]: https://www.fmsoft.cn
[FMSoft]: https://www.fmsoft.cn
[HybridOS Official Site]: https://hybridos.fmsoft.cn
[HybridOS]: https://hybridos.fmsoft.cn

[HVML]: https://github.com/HVML
[Vincent Wei]: https://github.com/VincentWei
[MiniGUI]: https://github.com/VincentWei/minigui

