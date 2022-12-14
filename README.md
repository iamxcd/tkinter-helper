# Tkinter Helper（Tkinter布局助手）

>TkinterHelper（Tkinter布局助手）是一款为Tkinter打造，仅需拖拽组件进行布局，所见即所得，非常方便就能做出一个GUI界面，再配合 pyinstaller 库将程序打包成exe，简直是开发小工具的利器。

Github: [https://github.com/iamxcd/tkinter-helper](https://github.com/iamxcd/tkinter-helper)

Gitee: [https://gitee.com/iamxcd/tkinter-helper](https://gitee.com/iamxcd/tkinter-helper)

## 快速开始
[立即体验](https://www.pytk.net/tkinter-helper/)Tkinter布局助手， [在这](./files/demo.tk)可下载布局文件，并尝试在编辑器中导入，[查看](./files/demo.py)生成的python代码。

### 布局界面效果图
![布局界面效果图](./files/img.png)

### win10下运行后效果图
![运行后效果图](./files/win10.png)

## 项目定位
当第一次接触到Tkinter，觉得它很方便，兼容性也挺不错，而且是Python自带的，用来写小工具挺方便的。
后面更为了方便设计界面，我开发了Tkinter布局助手，并且开源了。
由于Tkinter本身的不足和我并非要打造一款专业的设计软件，所以我给它的定位是：面向非专业开发人员、Python爱好者等，并且主要是用于小工具开发，所以一些复杂的组件或其他的布局方式将不会去支持。

## 布局助手使用说明文档(详细)

[文档地址](https://www.pytk.net/blog/1660703137.html)

## Tkinter 简介
tkinter 是 Python 自带的标准库，因此无须另行安装，它支持跨平台运行，不仅可以在 Windows 平台上运行，还支持在 Linux 和 Mac 平台上运行。

## Tkinter适用场景
- 有Python基础，想做个图形化界面程序，但不会C++、C#。
- 简单的小工具、小程序开发。
- 程序需要给不懂编程的小白人员使用（例如外包、兼职场景）。
- 外观要求不高。

## Tkinter的缺点
- 对界面美观、性能、大小有要求的程序不适用。
- 打包成单个exe体积过大。

## 功能
- [x] 组件拖拽布局。
- [x] 即时生成代码，[实时预览](./files/preview.gif)。
- [x] 上下左右按键微调整组件位置。
- [x] 页面自动缓存布局数据，防止刷新丢失，可手动清理。
- [x] 布局文件导出、导入，方便二次修改。
- [x] 容器、组件嵌套布局。
- [x] 鼠标、键盘、窗口事件绑定。
- [x] 组件配置(列表框选项、下拉选择框选项，选项卡编辑、表格表头配置)。
- [x] 项目管理 支持将布局文件存储到服务端，防止丢失。（后端代码不开源）
- [x] tk布局文件修复。用于修复，随着版本的更新，布局文件出现的不兼容。

## 目前支持的组件
- 标签
- 按钮
- 输入框
- 文本框
- 单选框
- 多选框
- 列表框
- 进度条(垂直/水平)
- 表格组件
- 容器(Frame)
- 标签容器(LabelFrame)
- 选项卡(Notebook)

## 实现原理

tinker有三种布局模式，pack() 按照组件添加的顺序布局，grid()网格布局，place()指定位置和大小，TkinterHelper则是采用的place()的布局方式，通过HTML的元素的绝对定位，拖拽组件到不同位置，记录相应的坐标位置和组件大小，再生成Python代码时再转为tinker的place布局方式。

## 代码生成规则
导出代码会构建一个视图类，类名 Win ，每一个组件生成一个私有方法，再构造函数中调用，并赋值到成员变量里，方便外部访问和调用。成员变量命名规则：组件类型+随机ID，这个ID可在页面上进行修改，建议按照功能命名，方便后面的事件绑定和其他逻辑的处理。
```python
from tkinter import *
from tkinter.ttk import *

class WinGUI(Tk):
    def __init__(self):
        super().__init__()
        self.__win()
        self.tk_button_l8cpojhp = self.__tk_button_l8cpojhp()

    def __win(self):
        self.title("我是标题 ~ Tkinter布局助手")
        # 设置窗口大小、居中
        width = 600
        height = 500
        screenwidth = self.winfo_screenwidth()
        screenheight = self.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        self.geometry(geometry)
        self.resizable(width=False, height=False)

    def __tk_button_l8cpojhp(self):
        btn = Button(self, text="按钮")
        btn.place(x=260, y=200, width=50, height=24)
        return btn

class Win(WinGUI):
    def __init__(self):
        super().__init__()
        self.__event_bind()

    def on_click_btn(self,evt):
        print("<Button-1>事件未处理",evt)
        
    def __event_bind(self):
        self.tk_button_l8cpojhp.bind('<Button-1>',self.on_click_btn)
        
if __name__ == "__main__":
    win = Win()
    win.mainloop()

```
## 使用方法

将生成的代码复制到你的编辑器中，执行这段代码就能看到界面的效果，如果程序较为简单，可在以下位置添加你的逻辑处理代码
```python
if __name__ == "__main__":
    win = Win()    # 实例化窗口界面
    # TODO 其他逻辑处理
    win.mainloop()     # 展示界面
```

如果逻辑相对复杂可再其他python文件中导入该模块，再进行业务逻辑处理。

## 如何编译成exe
编译成exe需要用到 pyinstaller 库，安装好包后执行以下打包代码

```bash
pyinstaller ./view.py -F -w

# -F 打包成单个文件
# -w 不展示命令框
```


## 开源说明
个人用户开源免费使用，禁止用于商业用途。
目前项目分为master和pro分支，pro暂不开源。
两者区别，master分支仅支持本地缓存存储，pro增加了用户模块，支持多项目管理，文件存储在服务器上。

## 二次开发

本套系统基于Vue实现

```bash
# 安装依赖
npm install 

# 启动开发服务
npm run serve

# 打包
npm run build

```

## 交流群

QQ群: 788392508