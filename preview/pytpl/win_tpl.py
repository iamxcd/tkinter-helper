from tkinter import *


class WinTpl:
    def make(self, ele):
        root = Tk()
        root.title(ele['text'])
        width = ele['width']
        height = ele['height']
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(geometry)
        root.resizable(width=False, height=False)
        return root
