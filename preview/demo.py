pycode = """
from tkinter import *
from tkinter.ttk import *

class Win_l6k5sg9k:
    def __init__(self):
        self.root = self.__win()
        self.tk_label_l6k5sj0k = self.__tk_label_l6k5sj0k()
        self.tk_button_l6k5skei = self.__tk_button_l6k5skei()

    def __win(self):
        root = Tk()
        root.title("我是标题 ~ Tkinter布局助手")
        # 设置大小 居中展示
        width = 600
        height = 500
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(geometry)
        root.resizable(width=False, height=False)
        return root

    def __tk_label_l6k5sj0k(self):
        label = Label(self.root,text="标签")
        label.place(x=140, y=80, width=50, height=24)
        return label

    def __tk_button_l6k5skei(self):
        btn = Button(self.root, text="按钮")
        btn.place(x=420, y=140, width=50, height=24)
        return btn


def run():
    win = Win_l6k5sg9k()
    # TODO 绑定点击事件或其他逻辑处理
    win.root.mainloop()

if __name__ == "__main__":
    run()


run()
"""


def preview(code):
    exec(code, globals())


preview(pycode)
