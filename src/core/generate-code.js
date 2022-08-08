import _ from "lodash";
import PyTpl from "./py-tpl/py-tpl";
import WinTpl from "./py-tpl/win-tpl";
import FrameTpl from "./py-tpl/frame-tpl";
import LabelFrameTpl from "./py-tpl/label-frame-tpl";
import TabsFrameTpl from "./py-tpl/tabs-frame-tpl";
import BaseTpl from "./py-tpl/base-tpl";

export default class GenerateCode {
    constructor(frame) {
        this.frame = frame
        this.maps = {
            'tk_win': new WinTpl(),
            'tk_frame': new FrameTpl(),
            'tk_label_frame': new LabelFrameTpl(),
            'tk_tabs': new TabsFrameTpl(),
        }
        this.tp = new BaseTpl()
    }
    build() {
        let code = ''
        let py = new PyTpl()
        code += py.depend_package()
        code += this.create_class(this.frame)
        code += py.main(this.frame)
        return code
    }

    create_class(frame) {
        let code = ""
        code = this.maps[frame.type].make(frame, frame.elements)
        let elements = _.filter(frame.elements, function (e) {
            return !e.frame
        })

        if (frame.type != "tk_tabs") {
            for (const key in elements) {
                let tmp = elements[key]
                code += this.tp[tmp.type](tmp)
            }
        }

        let frames = _.filter(frame.elements, function (e) {
            return e.frame == true
        })
        for (const key in frames) {
            code += this.create_class(frames[key])
        }
        return code
    }
}