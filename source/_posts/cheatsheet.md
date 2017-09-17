---
title: 文本编辑器的快捷键
date: 2017-09-17 17:04:36
categories: Collections
tags: [Vim, Sublime, VSCode, Cheatsheet, Shortcuts]
---

Vim, Sublime Text, VSCode 快捷键，虽然也不常用，有备无患

<!--more-->

{% note primary %}
Mac OS 和 Windows 下的差异请自行体验！
{% endnote %}

## Vim
{% note info %}
来自 viemu.com
{% endnote %}

### 汉化版本：
Donglu Feng制作

![vimcheat](http://blog.ngedit.com/vi-vim-cheat-sheet-sch.gif)

![Lesson1](vi-vim-tutorial-1.svg)

![Lesson2](vi-vim-tutorial-2.svg)

![Lesson3](vi-vim-tutorial-3.svg)

![Lesson4](vi-vim-tutorial-4.svg)

![Lesson5](vi-vim-tutorial-5.svg)

![Lesson6](vi-vim-tutorial-6.svg)

![Lesson7](vi-vim-tutorial-7.svg)

## Sublime Text

### Editing

| Keypress | Command |
|:---|:---|
| ⌘ + X           | Cut line                                                  |
| ⌘ + ↩           | Insert line after                                         |
| ⌘ + ⇧ + ↩       | Insert line before                                        |
| ⌘ + ⌃ + ↑       | Move line/selection up                                    |
| ⌘ + ⌃ + ↓       | Move line/selection down                                  |
| ⌘ + L           | Select line - Repeat to select next lines                 |
| ⌘ + D           | Select word - Repeat to select next occurrence            |
| ⌃ + ⌘ + G       | Select all occurrences of current selection               |
| ⌃ + ⇧ + ↑       | Extra cursor on the line above                            |
| ⌃ + ⇧ + ↓       | Extra cursor on the line below                            |
| ⌃ + M           | Jump to closing parentheses                               |
|                 | Repeat to jump to opening parentheses                     |
| ⌃ + ⇧ + M       | Select all contents of the current parentheses            |
| ⌃ + A           | Move to beginning of line                                 |
| ⌘ + Left        | Move to beginning of text on line                         |
| ⌃ + E, ⌘ + Right| Move to end of line                                       |
| ⌘ + K, ⌘ + K    | Delete from cursor to end of line                         |
| ⌘ + K + ⌫       | Delete from cursor to start of line                       |
| ⌘ + ]           | Indent current line(s)                                    |
| ⌘ + [           | Un-indent current line(s)                                 |
| ⌘ + ⇧ + D       | Duplicate line(s)                                         |
| ⌘ + J           | Join line below to the end of the current line            |
| ⌘ + /           | Comment/un-comment current line                           |
| ⌘ + ⌥ + /       | Block comment current selection                           |
| ⌘ + Y           | Redo, or repeat last keyboard shortcut command            |
| ⌘ + ⇧ + V       | Paste and indent correctly                                |
| ⌃ + Space       | Select next auto-complete suggestion                      |
| ⌃ + U           | Soft undo; jumps to your last change before               |
|                 | undoing change when repeated                              |
| ⌃ + ⇧ + Up      | Column selection up                                       |
| ⌃ + ⇧ + Down    | Column selection down                                     |
| ⌃ + ⇧ +  W      | Wrap  Selection in html tag                               |
| ⌃ + ⇧ +  K      | Delete current line of cursor                             |

### Navigation/Goto Anywhere

| Keypress | Command |
|:---|:---|
| ⌘ + P or ⌘ + T  | Quick-open files by name                                  |
| ⌘ + R           | Goto symbol                                               |
|                 | Goto word in current file                                 |
| ⌃ + G           | Goto line in current file                                 |

### General

| Keypress | Command |
|:---|:---|
| ⌘ + ⇧ + P       | Command Palette                                           |
| ⌃ + `           | Python Console                                            |
| ⌃ + ⌘ + F       | Toggle fullscreen mode                                    |
| ⌃ + ⇧ + ⌘ + F   | Toggle distraction-free mode                              |
| ⌘ + K, ⌘ + B    | Toggle side bar                                           |
| ⌃ + ⇧ + P       | Show scope in status bar                                  |

### Find/Replace

| Keypress | Command |
|:---|:---|
| ⌘ + F           | Find                                                      |
| ⌘ + ⌥ + F       | Replace                                                   |
| ⌘ + ⇧ + F       | Find in files                                             |

### Scrolling

| Keypress | Command |
|:---|:---|
| ⌃ + V           | Scroll down one page                                      |
| ⌃ + L           | Center current line vertically in page                    |
| ⌘ + Down        | Scroll to end of file                                     |
| ⌘ + Up          | Scroll to start of file                                   |

### Tabs

| Keypress | Command |
|:---|:---|
| ⌘ + ⇧ + t       | Open last closed tab                                      |
| ⌘ + [NUM]       | Jump to tab in current group where num is 1-9             |
| ⌘ + 0           | Jump to 10th tab in current group                         |
| ⌘ + ⇧ + [       | Cycle left through tabs                                   |
| ⌘ + ⇧ + ]       | Cycle right through tabs                                  |
| ^ + Tab         | Cycle up through recent tabs                              |
| ⇧ + ^ + Tab     | Cycle down through recent tabs                            |
|                 | Find in files                                             |

### Split window

| Keypress | Command |
|:---|:---|
| ⌘ + ⌥ + 1       | Revert view to single column                              |
| ⌘ + ⌥ + 2       | Split view into two columns                               |
| ⌘ + ⌥ + 3       | Split view into three columns                             |
| ⌘ + ⌥ + 4       | Split view into four columns                              |
| ⌘ + ⌥ + 5       | Set view to grid (4 groups)                               |
| ⌃ + [NUM]       | Jump to group where num is 1-4                            |
| ⌃ + ⇧ + [NUM]   | Move file to specified group where num is 1-4             |


### Bookmarks

| Keypress | Command |
|:---|:---|
| ⌘ + F2          | Toggle bookmark                                           |
| F2              | Next bookmark                                             |
| ⇧ + F2          | Previous bookmark                                         |
| ⇧ + ⌘ + F2      | Clear bookmarks                                           |

### Text manipulation

| Keypress | Command |
|:---|:---|
| ⌘ + K, ⌘ + U              | Transform to Uppercase                          |
| ⌘ + K, ⌘ + L              | Transform to Lowercase                          |
| ⌘ + ⌃ + up,  ⌘ + ⌃ + down |  Clip text upwards / downwards                  |


## VSCode

![vscode](vscode-cheatsheet.png)