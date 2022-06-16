export default class PyCode {

    // 依赖
    export_code() {
        return `
import tkinter as tk
from tkinter import ttk
`
    }

    // 主窗口
    main_win(title, width, height) {
        return `
def main_win(root):
    root.title("${title}")
    # 设置大小 居中展示
    width = ${width}
    height = ${height}
    screenwidth = root.winfo_screenwidth()
    screenheight = root.winfo_screenheight()
    alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
    root.geometry(alignstr)
    root.resizable(width=False, height=False)

`
    }

    // 初始化
    init(elemetns) {
        let header = `
def init():
    root = tk.Tk()
    
    main_win(root) 
       
`

        let footer = `
    
    root.mainloop()
`
        let code = ""


        for (const i in elemetns) {
            let e = elemetns[i]
            code += `
    ${e['type']}_${e['id']}(root)
        `
        }

        return header + code + footer
    }

    // 程序入口
    main() {
        return `
if __name__ == "__main__":
    init()

`
    }

    tk_button(ele) {
        return `

def tk_button_${ele.id}(root):
    btn = ttk.Button(root, text ="${ele?.text}")
    btn.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
`
    }
}