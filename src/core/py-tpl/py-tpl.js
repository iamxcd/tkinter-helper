export default class PyCode {

    // 依赖包
    depend_package() {
        return `
from tkinter import *
from tkinter import messagebox
from tkinter.ttk import *
`
    }

    create_bind_func(func, evt) {
        return `
def ${func}(evt):
    messagebox.showinfo("提示", "${evt}事件 未处理")
        `
    }

    event_bind(list) {
        let code = ''
        for (const i in list) {
            let item = list[i]
            code += `
    ${item.key}.bind('${item.evt}',${item.func})`
        }
        return `
def event_bind():${code}
    pass
        `
    }

    // 程序入口
    main(frame) {
        return `
if __name__ == "__main__":
    win = Win_${frame.id}()
    event_bind()
    win.root.mainloop()
`
    }
}

