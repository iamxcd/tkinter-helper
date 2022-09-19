from tkinter import *
from tkinter.ttk import *


class LabelFrameTpl:
    def make(self, ele, root):
        frame = LabelFrame(root, text=ele['text'])
        frame.place(x=ele['left'], y=ele['top'], width=ele['width'], height=ele['height'])
        return frame
