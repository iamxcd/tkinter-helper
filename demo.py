from glob import glob
from os.path import join
from tkinter import *
from tkinter import filedialog
from tkinter.ttk import *

import pdfplumber


class Win:
    def __init__(self):
        self.root = self.__win()
        self.tk_input_l4oz6b1m = self.__tk_input_l4oz6b1m()
        self.tk_button_select_dir = self.__tk_button_select_dir()
        self.tk_button_start = self.__tk_button_start()
        self.tk_label_l4oz7m9h = self.__tk_label_l4oz7m9h()
        self.tk_label_total_file = self.__tk_label_total_file()
        self.tk_label_l4oz800m = self.__tk_label_l4oz800m()
        self.tk_label_total_page = self.__tk_label_total_page()
        self.tk_label_l4oz9qij = self.__tk_label_l4oz9qij()

    def __win(self):
        root = Tk()
        root.title("pdf页码统计")
        # 设置大小 居中展示
        width = 430
        height = 169
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(geometry)
        root.resizable(width=False, height=False)
        return root

    def show(self):
        self.root.mainloop()

    def __tk_input_l4oz6b1m(self):
        ipt = Entry(self.root)
        ipt.place(x=80, y=30, width=150, height=24)
        return ipt

    def __tk_button_select_dir(self):
        btn = Button(self.root, text="选择文件夹")
        btn.place(x=240, y=30, width=90, height=25)
        return btn

    def __tk_button_start(self):
        btn = Button(self.root, text="开始统计")
        btn.place(x=340, y=30, width=76, height=24)
        return btn

    def __tk_label_l4oz7m9h(self):
        label = Label(self.root, text="文件数")
        label.place(x=20, y=110, width=50, height=24)
        return label

    def __tk_label_total_file(self):
        label = Label(self.root, text="0")
        label.place(x=90, y=110, width=50, height=24)
        return label

    def __tk_label_l4oz800m(self):
        label = Label(self.root, text="总页数")
        label.place(x=180, y=110, width=50, height=24)
        return label

    def __tk_label_total_page(self):
        label = Label(self.root, text="0")
        label.place(x=250, y=110, width=50, height=24)
        return label

    def __tk_label_l4oz9qij(self):
        label = Label(self.root, text="文件夹")
        label.place(x=20, y=30, width=50, height=24)
        return label


def select_dir():
    dir = filedialog.askdirectory()
    win.tk_input_l4oz6b1m.insert(0, dir)


def get_total_pages():
    pdf_list = glob(join(win.tk_input_l4oz6b1m.get(), "*.pdf"))

    pages = 0
    for pdf in pdf_list:
        f = pdfplumber.open(pdf)
        page = len(f.pages)
        pages += page
    # 文件数
    win.tk_label_total_page.config(text=pages)
    win.tk_label_total_file.config(text=len(pdf_list))


def about():
    from os import system
    system("start https://www.zhihu.com/people/iamxcd")


if __name__ == "__main__":
    win = Win()

    menu = Menu(win.root)
    menu.add_command(label="关于作者", command=about)
    win.root.config(menu=menu)

    win.tk_button_select_dir.config(command=select_dir)
    win.tk_button_start.config(command=get_total_pages)
    win.show()
