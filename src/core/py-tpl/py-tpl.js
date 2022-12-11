import config from "@/config"
export default class PyCode {

    // 依赖包
    depend_package() {
        return `"""
本代码由[${config.name}]生成
当前版本:${config.version}
官网:${config.web}
QQ交流群:${config.qq_group}
"""
from tkinter import *
from tkinter.ttk import *
`
    }

    create_bind_func(func, evt) {
        return `
    def ${func}(self,evt):
        print("${evt}事件未处理",evt)
        `
    }
    create_menu_func(func) {
        return `
    def ${func}(self):
        print("点击了菜单")
        `
    }

    create_class(cls) {
        let code = `
class ${cls}:
    def __init__(self):
        super().__init__()
        self.config(menu=self.create_menu())
        self.__event_bind()
`
        return code
    }
    create_menu(menus) {
        let code = `
    def create_menu(self):
        menu = Menu(self,tearoff=False)`
        for (const key in menus) {
            if (menus[key]?.children) {
                code += `
        menu.add_cascade(label="${menus[key].name}",menu=self.menu_${menus[key].id}(menu))`
            } else {
                let call_code = ""
                if (menus[key].call) {
                    call_code = `command=self.${menus[key].call}`
                }
                code += `
        menu.add_command(label="${menus[key].name}",${call_code})`
            }

        }
        code += `
        return menu`
        return code
    }

    create_submenu(menus, parentId) {
        let code = `
    def menu_${parentId}(self,parent):
        menu = Menu(parent,tearoff=False)`
        for (const key in menus) {
            let call_code = ""
            if (menus[key].call) {
                call_code = `command=self.${menus[key].call}`
            }
            code += `
        menu.add_command(label="${menus[key].name}",${call_code})`
        }
        code += `
        return menu`
        return code
    }

    event_bind(list) {
        let code = ''
        for (const i in list) {
            let item = list[i]
            code += `
        ${item.key}.bind('${item.evt}',self.${item.func})`
        }
        if (code == '') {
            code = `
        pass`
        }
        return `
    def __event_bind(self):${code}
        `
    }

    // 程序入口
    main(frame) {
        return `
if __name__ == "__main__":
    win = Win()
    win.mainloop()
`
    }
}

