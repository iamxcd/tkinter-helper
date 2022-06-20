export default class PyCode {

    // 依赖包
    depend_package() {
        return `
import tkinter as tk
from tkinter import ttk
`
    }

    vars(elemetns) {
        let header = `
class Win:
    root = None
        `
        let vars = ""
        for (const i in elemetns) {
            let e = elemetns[i]
            vars += `
    ${e.type}_${e.id} = None
        `
        }
        return header + vars
    }

    // 初始化
    init(elemetns) {
        let header = `
    def __init__(self):
        self.root = self.__win()
    `
        let code = "" // 赋值代码
        for (const i in elemetns) {
            let e = elemetns[i]
            code += `
        self.${e['type']}_${e['id']} = self.__${e['type']}_${e['id']}()
            `
        }

        return header + code
    }


    // 主窗口
    win(title, width, height) {
        return `
    def __win(self):
        root = tk.Tk()
        root.title("${title}")
        # 设置大小 居中展示
        width = ${width}
        height = ${height}
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(geometry)
        root.resizable(width=False, height=False)
        return root

`
    }

    show() {
        return `
    def show(self):
        self.root.mainloop()
        `
    }


    // 程序入口
    main() {
        return `
if __name__ == "__main__":
    win = Win()
    # TODO 绑定事件或其他处理
    win.show()
`
    }

    ////////////////////////////////////////// 以下是组件
    tk_button(ele) {
        return `
    def __tk_button_${ele.id}(self):
        btn = ttk.Button(self.root, text="${ele?.text}")
        btn.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return btn
`
    }

    tk_input(ele) {
        return ``
    }
}