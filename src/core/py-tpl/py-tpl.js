export default class PyCode {

    // 依赖包
    depend_package() {
        return `
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

    create_class(cls) {
        let code = `
class ${cls}:
    def __init__(self):
        super().__init__()
        self.__event_bind()
`
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

