from tkinter import *
from tkinter.ttk import *


class FrameTpl:
    def make(self, ele, root):
        frame = Frame(root)
        frame.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])
        return frame
