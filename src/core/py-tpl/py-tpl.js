export default class PyCode {

    // 依赖包
    depend_package() {
        return `
from tkinter import *
from tkinter.ttk import *
`
    }

    // 程序入口
    main(frame) {
        return `

def run():
    win = Win_${frame.id}()
    # TODO 绑定点击事件或其他逻辑处理
    win.root.mainloop()

if __name__ == "__main__":
    run()

`
    }
}