"""
本代码由[Tkinter布局助手]生成
当前版本:2.5.3
官网:https://www.pytk.net/tkinter-helper
QQ交流群:788392508
"""
from tkinter import *
from tkinter.ttk import *


class WinGUI(Tk):
    def __init__(self):
        super().__init__()
        self.__win()
        self.tk_label_l661vxba = self.__tk_label_l661vxba()
        self.tk_input_dir = self.__tk_input_dir()
        self.tk_button_select_dir = self.__tk_button_select_dir()
        self.tk_button_start = self.__tk_button_start()
        self.tk_table_list = self.__tk_table_list()
        self.tk_label_l661zmw9 = self.__tk_label_l661zmw9()
        self.tk_label_total_file = self.__tk_label_total_file()
        self.tk_label_l66208uy = self.__tk_label_l66208uy()
        self.tk_label_total_page = self.__tk_label_total_page()

    def __win(self):
        self.title("PDF页面统计")
        # 设置窗口大小、居中
        width = 460
        height = 300
        screenwidth = self.winfo_screenwidth()
        screenheight = self.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height,
                                    (screenwidth - width) / 2, (screenheight - height) / 2)
        self.geometry(geometry)
        self.resizable(width=False, height=False)

    def __tk_label_l661vxba(self):
        label = Label(self, text="文件夹", anchor="center")
        label.place(x=10, y=10, width=68, height=24)
        return label

    def __tk_input_dir(self):
        ipt = Entry(self)
        ipt.place(x=90, y=10, width=150, height=24)
        return ipt

    def __tk_button_select_dir(self):
        btn = Button(self, text="选择文件夹")
        btn.place(x=250, y=10, width=110, height=24)
        return btn

    def __tk_button_start(self):
        btn = Button(self, text="开始统计")
        btn.place(x=370, y=10, width=80, height=24)
        return btn

    def __tk_table_list(self):
        # 表头字段 表头宽度
        columns = {"ID": 88, "字段#1": 132, "字段#2": 220}
        # 初始化表格 表格是基于Treeview，tkinter本身没有表格。show="headings" 为隐藏首列。
        tk_table = Treeview(self, show="headings", columns=list(columns))
        for text, width in columns.items():  # 批量设置列属性
            tk_table.heading(text, text=text, anchor='center')
            tk_table.column(text, anchor='center', width=width,
                            stretch=False)  # stretch 不自动拉伸

        # 插入数据示例
        # data = [
        #     [1, "github", "https://github.com/iamxcd/tkinter-helper"],
        #     [2, "演示地址", "https://www.pytk.net/tkinter-helper"]
        # ]
        #
        # # 导入初始数据
        # for values in data:
        #     tk_table.insert('', END, values=values)

        tk_table.place(x=10, y=50, width=440, height=200)
        return tk_table

    def __tk_label_l661zmw9(self):
        label = Label(self, text="文件数", anchor="center")
        label.place(x=10, y=260, width=50, height=24)
        return label

    def __tk_label_total_file(self):
        label = Label(self, text="0", anchor="center")
        label.place(x=80, y=260, width=50, height=24)
        return label

    def __tk_label_l66208uy(self):
        label = Label(self, text="总页数", anchor="center")
        label.place(x=240, y=260, width=50, height=24)
        return label

    def __tk_label_total_page(self):
        label = Label(self, text="0", anchor="center")
        label.place(x=310, y=260, width=50, height=24)
        return label


class Win(WinGUI):
    def __init__(self):
        super().__init__()
        self.config(menu=self.create_menu())
        self.__event_bind()

    def create_menu(self):
        menu = Menu(self, tearoff=False)
        return menu

    def __event_bind(self):
        pass


if __name__ == "__main__":
    win = Win()
    win.mainloop()
