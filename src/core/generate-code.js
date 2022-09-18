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
        this.py = new PyTpl()
    }
    build() {
        let code = ''
        code += this.py.depend_package()
        code += this.create_class(this.frame)
        code += this.event_bind('win', this.frame)
        code += this.py.main(this.frame)
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

    event_bind(key, frame) {
        let code = ''
        let list = this.find_bind_list(key, frame)
        for (const i in list) {
            let item = list[i]
            code += this.py.create_bind_func(item.func, item.evt)
        }
        code += this.py.event_bind(list)
        return code
    }

    find_bind_list(pkey, element) {
        let list = []
        if (element.event_bind_list) {
            element.event_bind_list.forEach(item => {
                list.push({
                    key: pkey,
                    evt: item.name,
                    func: item.call,
                })
            });
        }
        if (element.frame || element.type == 'tk_win') {
            for (const key in element.elements) {
                let tmp = element.elements[key]
                let _list = []
                if (element.type == 'tk_tabs') {
                    let new_pkey = pkey + '.' + element.type + '_' + element.id + '_' + tmp.tab + '.' + tmp.type + '_' + tmp.id
                    _list = this.find_bind_list(new_pkey, tmp)
                } else {
                    _list = this.find_bind_list(pkey + '.' + tmp.type + '_' + tmp.id, tmp)
                }
                list = list.concat(_list)
            }
        }

        return list
    }
}