import CommonTpl from "./common-tpl"

export default class FrameTpl {
    make(frame, elemetns) {
        let header = `
class Frame_${frame.id}:
    def __init__(self,parent):
        self.root = self.__frame(parent)`

        let code = ""
        let ct = new CommonTpl()
        code += ct.setval(elemetns)
        
        return header + code + this.frame(frame)
    }

    frame(frame) {
        let place = `frame.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})`
        if (!frame.width | !frame.height) {
            place = ""
        }
        return `
    def __frame(self,parent):
        frame = Frame(parent)
        ${place}
        return frame
`
    }
}