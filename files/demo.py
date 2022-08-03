
from tkinter import *
from tkinter.ttk import *

class Win:
    def __init__(self):
        self.root = self.__win()
        self.tk_table_l5w6b5uv = self.__tk_table_l5w6b5uv()
        self.tk_frame_l5w6b966 = Frame_l5w6b966(self.root)
        self.tk_label_frame_l5w6bqvd = Frame_l5w6bqvd(self.root)
        self.tk_progressbar_l5w6c93g = self.__tk_progressbar_l5w6c93g()
        self.tk_progressbar_l5w6cc5k = self.__tk_progressbar_l5w6cc5k()
        self.tk_list_box_l5w6d2zq = self.__tk_list_box_l5w6d2zq()
        self.tk_text_l5w6d9q6 = self.__tk_text_l5w6d9q6()

    def __win(self):
        root = Tk()
        root.title("组件演示DEMO ~ Tkinter布局助手")
        # 设置大小 居中展示
        width = 600
        height = 500
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(geometry)
        root.resizable(width=False, height=False)
        return root

    def show(self):
        self.root.mainloop()

    def __tk_table_l5w6b5uv(self):
        # 表头字段 表头宽度
        columns = {"ID":50, "网站名": 100, "地址": 300}
        # 初始化表格 表格是基于Treeview，tkinter本身没有表格。show="headings" 为隐藏首列。
        tk_table = Treeview(self.root, show="headings", columns=list(columns))
        for text, width in columns.items():  # 批量设置列属性
            tk_table.heading(text, text=text, anchor='center')
            tk_table.column(text, anchor='center', width=width, stretch=False) # stretch 不自动拉伸
        
        data = [
            [1,"github", "https://github.com/iamxcd/tkinter-helper"],
            [2,"演示地址", "https://www.pytk.net/tkinter-helper"]
        ]
        
        # 导入初始数据
        for values in data:
            tk_table.insert('', END, values=values)
        
        tk_table.place(x=40, y=390, width=450, height=70)
        return tk_table

    def __tk_progressbar_l5w6c93g(self):
        progressbar = Progressbar(self.root, orient=HORIZONTAL)
        progressbar.place(x=20, y=190, width=150, height=24)
        return progressbar

    def __tk_progressbar_l5w6cc5k(self):
        progressbar = Progressbar(self.root, orient=VERTICAL)
        progressbar.place(x=20, y=250, width=24, height=105)
        return progressbar

    def __tk_list_box_l5w6d2zq(self):
        lb = Listbox(self.root)
        lb.insert(END, "列表框")
        lb.insert(END, "Python")
        lb.insert(END, "Tkinter Helper")
        lb.place(x=410, y=240, width=150, height=100)
        return lb

    def __tk_text_l5w6d9q6(self):
        text = Text(self.root)
        text.place(x=80, y=250, width=286, height=101)
        return text

class Frame_l5w6b966:
    def __init__(self,root):
        self.root = self.__frame(root)
        self.tk_label_l5w6bcqu = self.__tk_label_l5w6bcqu()
        self.tk_label_l5w6bfit = self.__tk_label_l5w6bfit()
        self.tk_select_box_l5w6blb1 = self.__tk_select_box_l5w6blb1()
        self.tk_button_l5w6cwf9 = self.__tk_button_l5w6cwf9()

    def __frame(self,root):
        frame = Frame(root)
        frame.place(x=10, y=20, width=200, height=150)
        return frame

    def __tk_label_l5w6bcqu(self):
        label = Label(self.root,text="标签")
        label.place(x=20, y=20, width=50, height=24)
        return label

    def __tk_label_l5w6bfit(self):
        label = Label(self.root,text="标签")
        label.place(x=20, y=60, width=50, height=24)
        return label

    def __tk_select_box_l5w6blb1(self):
        cb = Combobox(self.root, state="readonly")
        cb['values'] = ("下拉选择框", "Python", "Tkinter Helper")
        cb.place(x=20, y=100, width=150, height=24)
        return cb

    def __tk_button_l5w6cwf9(self):
        btn = Button(self.root, text="按钮")
        btn.place(x=100, y=30, width=50, height=24)
        return btn


class Frame_l5w6bqvd:
    def __init__(self,root):
        self.root = self.__frame(root)
        self.tk_label_l5w6bw4m = self.__tk_label_l5w6bw4m()
        self.tk_input_l5w6byq2 = self.__tk_input_l5w6byq2()
        self.tk_radio_button_l5w6cmo3 = self.__tk_radio_button_l5w6cmo3()
        self.tk_check_button_l5w6crvh = self.__tk_check_button_l5w6crvh()

    def __frame(self,root):
        frame = LabelFrame(root,text="标签容器")
        frame.place(x=280, y=30, width=226, height=152)
        return frame

    def __tk_label_l5w6bw4m(self):
        label = Label(self.root,text="标签")
        label.place(x=10, y=30, width=50, height=24)
        return label

    def __tk_input_l5w6byq2(self):
        ipt = Entry(self.root)
        ipt.place(x=70, y=30, width=150, height=24)
        return ipt

    def __tk_radio_button_l5w6cmo3(self):
        rb = Radiobutton(self.root,text="单选框")
        rb.place(x=10, y=80, width=80, height=24)
        return rb

    def __tk_check_button_l5w6crvh(self):
        cb = Checkbutton(self.root,text="多选框")
        cb.place(x=120, y=80, width=80, height=24)
        return cb

if __name__ == "__main__":
    win = Win()
    # TODO 绑定点击事件或其他逻辑处理
    win.show()
