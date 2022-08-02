import CommonTpl from "./common-tpl"

export default class LabelFrameTpl {
    make(frame, elemetns) {
        let header = `
class Frame_${frame.id}:
    def __init__(self,parent):
        self.root = self.__frame(parent)`
        
        let code = ""
        let ct = new CommonTpl()
        code += ct.setval(elemetns)

        return header + code + this.label_frame(frame)
    }

    label_frame(frame) {
        return `
    def __frame(self,parent):
        frame = LabelFrame(parent,text="${frame.text}")
        frame.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})
        return frame
`
    }
}