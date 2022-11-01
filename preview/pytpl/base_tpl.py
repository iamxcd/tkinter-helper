from tkinter import *
from tkinter.ttk import *


class BaseTpl:
    def __init__(self, root):
        self.root = root

    def tk_button(self, ele):
        btn = Button(self.root, text=ele['text'])
        btn.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_input(self, ele):
        ipt = Entry(self.root)
        ipt.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_label(self, ele):
        label = Label(self.root, text=ele['text'], anchor="center")
        label.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_text(self, ele):
        text = Text(self.root)
        text.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_radio_button(self, ele):
        rb = Radiobutton(self.root, text=ele['text'])
        rb.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_check_button(self, ele):
        cb = Checkbutton(self.root, text=ele['text'])
        cb.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_list_box(self, ele):
        lb = Listbox(self.root)
        lb.insert(END, "列表框")
        lb.insert(END, "Python")
        lb.insert(END, "Tkinter Helper")
        lb.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_select_box(self, ele):
        cb = Combobox(self.root)
        cb.configure(values=ele['options'])
        cb.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_progressbar(self, ele):
        cb = Progressbar(self.root)
        orient = HORIZONTAL
        if ele['width'] < ele['height']:
            orient = VERTICAL
        cb.configure(orient=orient)
        cb.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])

    def tk_table(self, ele):
        # 表头字段 表头宽度
        columns = dict()
        for e in ele['columns']:
            columns[e['name']] = int((e['width'] * ele['width']) / 100)

        # 初始化表格 表格是基于Treeview，tkinter本身没有表格。show="headings" 为隐藏首列。
        tk_table = Treeview(self.root, show="headings", columns=list(columns))
        for text, width in columns.items():  # 批量设置列属性
            tk_table.heading(text, text=text, anchor='center')
            tk_table.column(text, anchor='center', width=width, stretch=False)  # stretch 不自动拉伸

        tk_table.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])
