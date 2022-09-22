
from tkinter import *
from tkinter.ttk import *


class WinGUI(Tk):
    def __init__(self):
        super().__init__()
        self.__win()
        self.tk_table_l8cs3hj1 = self.__tk_table_l8cs3hj1()
        self.tk_frame_l8cs3mqf = Frame_l8cs3mqf(self)
        self.tk_label_frame_l8cs3r61 = Frame_l8cs3r61(self)
        self.tk_text_l8cs47v5 = self.__tk_text_l8cs47v5()
        self.tk_list_box_l8cs4gan = self.__tk_list_box_l8cs4gan()
        self.tk_tabs_l8cs4smw = Frame_l8cs4smw(self)
        self.tk_select_box_l8cs5os2 = self.__tk_select_box_l8cs5os2()

    def __win(self):
        self.title("我是标题 ~ Tkinter布局助手")
        # 设置窗口大小、居中
        width = 600
        height = 500
        screenwidth = self.winfo_screenwidth()
        screenheight = self.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height,
                                    (screenwidth - width) / 2, (screenheight - height) / 2)
        self.geometry(geometry)
        self.resizable(width=False, height=False)

    def __tk_table_l8cs3hj1(self):
        # 表头字段 表头宽度
        columns = {"ID": 50, "网站名": 100, "地址": 300}
        # 初始化表格 表格是基于Treeview，tkinter本身没有表格。show="headings" 为隐藏首列。
        tk_table = Treeview(self, show="headings", columns=list(columns))
        for text, width in columns.items():  # 批量设置列属性
            tk_table.heading(text, text=text, anchor='center')
            tk_table.column(text, anchor='center', width=width,
                            stretch=False)  # stretch 不自动拉伸

        data = [
            [1, "github", "https://github.com/iamxcd/tkinter-helper"],
            [2, "演示地址", "https://www.pytk.net/tkinter-helper"]
        ]

        # 导入初始数据
        for values in data:
            tk_table.insert('', END, values=values)

        tk_table.place(x=30, y=420, width=450, height=70)
        return tk_table

    def __tk_text_l8cs47v5(self):
        text = Text(self)
        text.place(x=450, y=50, width=150, height=100)
        return text

    def __tk_list_box_l8cs4gan(self):
        lb = Listbox(self)
        lb.insert(END, "列表框")
        lb.insert(END, "Python")
        lb.insert(END, "Tkinter Helper")
        lb.place(x=20, y=190, width=150, height=100)
        return lb

    def __tk_select_box_l8cs5os2(self):
        cb = Combobox(self, state="readonly")
        cb['values'] = ("下拉选择框", "Python", "Tkinter Helper")
        cb.place(x=10, y=320, width=150, height=24)
        return cb


class Frame_l8cs3mqf(Frame):
    def __init__(self, parent):
        super().__init__(parent)
        self.__frame()
        self.tk_input_l8cs3oe4 = self.__tk_input_l8cs3oe4()
        self.tk_radio_button_l8cs4cw1 = self.__tk_radio_button_l8cs4cw1()
        self.tk_check_button_l8cs4ect = self.__tk_check_button_l8cs4ect()

    def __frame(self):
        self.place(x=20, y=10, width=200, height=150)

    def __tk_input_l8cs3oe4(self):
        ipt = Entry(self)
        ipt.place(x=30, y=40, width=150, height=24)
        return ipt

    def __tk_radio_button_l8cs4cw1(self):
        rb = Radiobutton(self, text="单选框")
        rb.place(x=10, y=80, width=80, height=24)
        return rb

    def __tk_check_button_l8cs4ect(self):
        cb = Checkbutton(self, text="多选框")
        cb.place(x=100, y=80, width=80, height=24)
        return cb


class Frame_l8cs3r61(LabelFrame):
    def __init__(self, parent):
        super().__init__(parent)
        self.__frame()
        self.tk_label_l8cs3u95 = self.__tk_label_l8cs3u95()
        self.tk_button_l8cs3w0i = self.__tk_button_l8cs3w0i()

    def __frame(self):
        self.configure(text="标签容器")
        self.place(x=240, y=20, width=200, height=150)

    def __tk_label_l8cs3u95(self):
        label = Label(self, text="标签")
        label.place(x=30, y=40, width=50, height=24)
        return label

    def __tk_button_l8cs3w0i(self):
        btn = Button(self, text="按钮")
        btn.place(x=130, y=30, width=50, height=24)
        return btn


class Frame_l8cs4smw(Notebook):
    def __init__(self, parent):
        super().__init__(parent)
        self.__frame()

    def __frame(self):

        self.tk_tabs_l8cs4smw_0 = Frame_l8cs4smw_0(self)
        self.add(self.tk_tabs_l8cs4smw_0, text="选项卡1")

        self.tk_tabs_l8cs4smw_1 = Frame_l8cs4smw_1(self)
        self.add(self.tk_tabs_l8cs4smw_1, text="选项卡2")

        self.place(x=200, y=200, width=371, height=188)


class Frame_l8cs4smw_0(Frame):
    def __init__(self, parent):
        super().__init__(parent)
        self.__frame()
        self.tk_progressbar_l8cs56bp = self.__tk_progressbar_l8cs56bp()
        self.tk_button_l8cs6lpz = self.__tk_button_l8cs6lpz()

    def __frame(self):
        self.place(x=200, y=200, width=371, height=188)

    def __tk_progressbar_l8cs56bp(self):
        progressbar = Progressbar(self, orient=HORIZONTAL)
        progressbar.place(x=20, y=110, width=150, height=24)
        return progressbar

    def __tk_button_l8cs6lpz(self):
        btn = Button(self, text="按钮")
        btn.place(x=180, y=50, width=50, height=24)
        return btn


class Frame_l8cs4smw_1(Frame):
    def __init__(self, parent):
        super().__init__(parent)
        self.__frame()
        self.tk_button_l8cs5hjl = self.__tk_button_l8cs5hjl()

    def __frame(self):
        self.place(x=200, y=200, width=371, height=188)

    def __tk_button_l8cs5hjl(self):
        btn = Button(self, text="按钮")
        btn.place(x=90, y=90, width=50, height=24)
        return btn


class Win(WinGUI):
    def __init__(self):
        super().__init__()
        self.__event_bind()

    def __event_bind(self):
        pass


if __name__ == "__main__":
    win = Win()
    win.mainloop()
