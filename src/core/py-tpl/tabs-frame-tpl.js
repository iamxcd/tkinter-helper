import BaseTpl from "./base-tpl"
import CommonTpl from "./common-tpl"
import FrameTpl from "./frame-tpl"

export default class TabsFrameTpl {
    make(frame, elemetns) {
        let header = `
class Frame_${frame.id}(Notebook):
    def __init__(self,parent):
        super().__init__(parent)
        self.__frame()`

        return header + this.tabs_frame(frame) + this.create_class(frame)
    }
    tabs_frame(frame) {
        let tabs_frame = ""
        for (const i in frame.tabs) {
            let tmp = `
        self.${frame['type']}_${frame['id']}_${i} = Frame_${frame['id']}_${i}(self)
        self.add(self.${frame['type']}_${frame['id']}_${i}, text="${frame.tabs[i]}")
`
            tabs_frame += tmp
        }
        return `
    def __frame(self):
${tabs_frame}
        self.place(x=${frame.left}, y=${frame.top}, width=${frame.width}, height=${frame.height})
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
                // 容器组件不再重复生成代码
                if (tmp.frame) {
                    continue
                }
                code += base_tp[tmp.type](tmp)
            }
        }

        return code
    }
}