import CommonTpl from "./common-tpl"

export default class WinTpl {
    make(frame, elemetns) {
        let header = `
class WinGUI(Tk):
    def __init__(self):
        super().__init__()
        self.__win()`

        let code = ""
        let ct = new CommonTpl()
        code += ct.setval(elemetns)

        code += `
`
        let win = this.win(frame.text, frame.width, frame.height)
        return header + code + win
    }

    // 主窗口
    win(title, width, height) {
        return `
    def __win(self):
        self.title("${title}")
        # 设置窗口大小、居中
        width = ${width}
        height = ${height}
        screenwidth = self.winfo_screenwidth()
        screenheight = self.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        self.geometry(geometry)
        self.resizable(width=False, height=False)
`
    }
}