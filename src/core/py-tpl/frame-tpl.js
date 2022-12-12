import CommonTpl from "./common-tpl"

export default class FrameTpl {
    make(frame, elemetns) {
        let header = `
class Frame_${frame.id}(Frame):
    def __init__(self,parent):
        super().__init__(parent)
        self.__frame()`

        let code = ""
        let ct = new CommonTpl()
        code += ct.setval(elemetns)

        return header + code + this.frame(frame)
    }

    frame(frame) {
        let place = `self.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})`
        if (!frame.width || !frame.height) {
            place = ""
        }
        return `
    def __frame(self):
        ${place}
`
    }
}