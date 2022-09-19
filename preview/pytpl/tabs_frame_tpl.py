from tkinter.ttk import *


class TabsFrameTpl:
    def make(self, ele, root):
        frame = Notebook(root)
        frame.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])
        return frame

    def make_tabs(self, ele, root):
        tabs = []
        for tab in ele['tabs']:
            frame = Frame(root)
            root.add(frame, text=tab)
            tabs.append(frame)
        return tabs
