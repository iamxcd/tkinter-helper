import json
from operator import methodcaller
from tkinter import Menu

from pytpl.base_tpl import BaseTpl
from pytpl.frame_tpl import FrameTpl
from pytpl.label_frame_tpl import LabelFrameTpl
from pytpl.tabs_frame_tpl import TabsFrameTpl
from pytpl.win_tpl import WinTpl


class GenerateWin:
    def __init__(self, tk_json):
        self.tk_json = tk_json
        self.maps = {
            'tk_frame': FrameTpl(),
            'tk_label_frame': LabelFrameTpl(),
            'tk_tabs': TabsFrameTpl(),
        }

    def build(self):
        win = self.tk_json['win']
        root = WinTpl().make(win)
        root.attributes("-topmost", True)
        self.create_elements(win['elements'], root)
        root.config(menu=self.create_menu(win['menus'], root))
        root.mainloop()

    def create_elements(self, elements, root):
        base_tpl = BaseTpl(root)
        for ele in elements:
            if "frame" in ele.keys() and ele['frame'] is True:
                if ele['type'] != 'tk_tabs':
                    frame = self.maps[ele['type']].make(ele, root)
                    self.create_elements(ele['elements'], frame)
                else:
                    frame = self.maps[ele['type']].make(ele, root)
                    tabs = self.maps[ele['type']].make_tabs(ele, frame)
                    tabs_elements = ele['elements']
                    for tab_index, tab in enumerate(tabs):
                        self.create_elements([e for e in tabs_elements if e['tab'] == tab_index], tab)

            else:
                caller = methodcaller(ele['type'], ele)
                caller(base_tpl)

    def create_menu(self, menus, root):
        menu_obj = Menu(root, tearoff=False)
        for menu in menus:
            if 'children' in menu.keys():
                submenu = self.create_submenu(menu['children'], menu_obj)
                menu_obj.add_cascade(label=menu['name'], menu=submenu)
            else:
                menu_obj.add_command(label=menu['name'])
        return menu_obj

    def create_submenu(self, menus, parent):
        menu_obj = Menu(parent, tearoff=False)
        for menu in menus:
            if 'children' in menu.keys():
                submenu = self.create_submenu(menu['children'], menu_obj)
                menu_obj.add_cascade(label=menu['name'], menu=submenu)
            else:
                menu_obj.add_command(label=menu['name'])
        return menu_obj


if __name__ == "__main__":
    with open(file="tk.json", encoding="utf8") as f:
        tkjson = json.load(f)
        tp = GenerateWin(tkjson)
        tp.build()
