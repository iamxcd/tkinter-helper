export default class PyCode {

    // 依赖包
    depend_package() {
        return `
from tkinter import *
from tkinter.ttk import *
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
        root = Tk()
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
        btn = Button(self.root, text="${ele?.text}")
        btn.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return btn
`
    }

    tk_input(ele) {
        return `
    def __tk_input_${ele.id}(self):
        ipt = Entry(self.root)
        ipt.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return ipt
`
    }

    tk_label(ele) {
        return `
    def __tk_label_${ele.id}(self):
        label = Label(self.root,text="${ele.text}")
        label.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return label
`
    }

    tk_text(ele) {
        return `
    def __tk_text_${ele.id}(self):
        text = Text(self.root)
        text.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return text
`
    }

    tk_radio_button(ele) {
        return `
    def __tk_radio_button_${ele.id}(self):
        rb = Radiobutton(self.root,text="${ele.text}")
        rb.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return rb
`
    }

    tk_check_button(ele) {
        return `
    def __tk_check_button_${ele.id}(self):
        cb = Checkbutton(self.root,text="${ele.text}")
        cb.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return cb
`
    }

    tk_list_box(ele) {
        return `
    def __tk_list_box_${ele.id}(self):
        lb = Listbox(self.root)
        lb.insert(END, "列表框")
        lb.insert(END, "Python")
        lb.insert(END, "Tkinter Helper")
        lb.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return lb
`
    }

    tk_select_box(ele) {
        return `
    def __tk_select_box_${ele.id}(self):
        cb = Combobox(self.root, state="readonly")
        cb['values'] = ("下拉选择框", "Python", "Tkinter Helper")
        cb.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return cb
`
    }
}