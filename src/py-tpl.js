export default class PyCode {

    // 依赖包
    depend_package() {
        return `
from tkinter import *
from tkinter.ttk import *
`
    }

    // 初始化
    init(elemetns) {
        let header = `
class Win:
    def __init__(self):
        self.root = self.__win()`
        let code = "" // 赋值代码
        for (const i in elemetns) {
            let e = elemetns[i]
            if (e.frame) {
                code += `
        self.${e['type']}_${e['id']} = Frame_${e['id']}(self.root)`
            } else {
                code += `
        self.${e['type']}_${e['id']} = self.__${e['type']}_${e['id']}()`
            }
        }
        code += `
`
        return header + code
    }


    frame_init(frame, elemetns) {
        let header = `
class Frame_${frame.id}:
    def __init__(self,root):
        self.root = self.__frame(root)`
        let code = "" // 赋值代码
        if (frame.type != "tk_tabs") {
            for (const i in elemetns) {
                let e = elemetns[i]
                code += `
        self.${e['type']}_${e['id']} = self.__${e['type']}_${e['id']}()`
            }
            code += `
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
    frame(frame) {
        let place = `frame.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})`
        if (!frame.width | !frame.height) {
            place = ""
        }
        return `
    def __frame(self,root):
        frame = Frame(root)
        ${place}
        return frame
`
    }

    label_frame(frame) {
        return `
    def __frame(self,root):
        frame = LabelFrame(root,text="${frame.text}")
        frame.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})
        return frame
`
    }

    tabs_frame(frame) {
        let tabs_frame = ""
        for (const i in frame.tabs) {
            let tmp = `
        ${frame['type']}_${frame['id']}_${i} = Frame_${frame['id']}_${i}(frame)
        frame.add(${frame['type']}_${frame['id']}_${i}.root, text="${frame.tabs[i]}")
`
            tabs_frame += tmp
        }
        return `
    def __frame(self,root):
        frame = Notebook(root)
${tabs_frame}
        frame.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})
        return frame
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
    # TODO 绑定点击事件或其他逻辑处理
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

    tk_progressbar(ele) {
        let orient = "HORIZONTAL" // 默认横向
        if (ele.width < ele.height) {
            orient = "VERTICAL"  // 高度大于宽度  改为竖向
        }

        return `
    def __tk_progressbar_${ele.id}(self):
        progressbar = Progressbar(self.root, orient=${orient})
        progressbar.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return progressbar
`
    }

    tk_table(ele) {
        return `
    def __tk_table_${ele.id}(self):
        # 表头字段 表头宽度
        columns = {"ID":50, "网站名": 100, "地址": 300}
        # 初始化表格 表格是基于Treeview，tkinter本身没有表格。show="headings" 为隐藏首列。
        tk_table = Treeview(self.root, show="headings", columns=list(columns))
        for text, width in columns.items():  # 批量设置列属性
            tk_table.heading(text, text=text, anchor='center')
            tk_table.column(text, anchor='center', width=width, stretch=False) # stretch 不自动拉伸
        
        data = [
            [1,"github", "https://github.com/iamxcd/tkinter-helper"],
            [2,"演示地址", "https://www.codingstudy.cn/tkinter-helper"]
        ]
        
        # 导入初始数据
        for values in data:
            tk_table.insert('', END, values=values)
        
        tk_table.place(x=${ele.left}, y=${ele.top}, width=${ele.width}, height=${ele.height})
        return tk_table
`
    }
}