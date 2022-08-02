import BaseTpl from "./base-tpl"
import CommonTpl from "./common-tpl"
import FrameTpl from "./frame-tpl"

export default class TabsFrameTpl {
    make(frame, elemetns) {
        let header = `
class Frame_${frame.id}:
    def __init__(self,parent):
        self.root = self.__frame(parent)`

        return header + this.tabs_frame(frame) + this.create_class(frame)
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
    def __frame(self,parent):
        frame = Notebook(parent)
${tabs_frame}
        frame.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})
        return frame
`
    }

    create_class(frame) {
        let code = ""
        let frame_tp = new FrameTpl()
        let base_tp = new BaseTpl()
        for (const i in frame.tabs) {
            let _frame = _.cloneDeep(frame)
            let elements = _.filter(_frame.elements, function (e) {
                return e.tab == Number(i)
            })
            _frame.id = _frame.id + '_' + i
            code += frame_tp.make(_frame, elements)

            for (const key in elements) {
                let tmp = elements[key]
                code += base_tp[tmp.type](tmp)
            }
        }

        return code
    }
}