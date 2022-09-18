import CommonTpl from "./common-tpl"

export default class LabelFrameTpl {
    make(frame, elemetns) {
        let header = `
class Frame_${frame.id}(LabelFrame):
    def __init__(self,parent):
        super().__init__(parent)
        self.__frame()`
        
        let code = ""
        let ct = new CommonTpl()
        code += ct.setval(elemetns)

        return header + code + this.label_frame(frame)
    }

    label_frame(frame) {
        return `
    def __frame(self):
        self.configure(text="${frame.text}")
        self.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})
`
    }
}