import { _ } from "core-js";
import PyTpl from "./py-tpl";
export default class GenerateCode {
    constructor(frame) {
        this.frame = frame
    }

    build() {
        let py = new PyTpl()
        let depend_package_code = py.depend_package();
        let win_code = py.win(
            this.frame.text,
            this.frame.width,
            this.frame.height
        );
        let init_code = py.init(this.frame.elements);
        let show_code = py.show()
        let func_code = ""
        let frames = []
        for (const k in this.frame.elements) {
            let ele = this.frame.elements[k]
            if (ele.frame) {
                frames.push(this.create_class(py, ele))
            } else {
                func_code += this.create_func(py, ele)
            }
        }
        let main_code = py.main();
        let all_code = depend_package_code + init_code + win_code + show_code + func_code + frames.join("\n") + main_code
        return all_code
    }

    create_func(py, ele) {
        return py[ele.type](ele)
    }

    create_class(py, ele) {
        /**
         * 创建 类定义  容器类的组件 需要传入窗口对象
         * 创建构造函数 向外暴露组件
         * 创建各个组件 创建组件的方法 私有
         */

        const maps = {
            'tk_frame': 'frame',
            'tk_label_frame': 'label_frame',
            'tk_tabs': 'tabs_frame',
        }
        let init_code = py.frame_init(ele, ele.elements)
        let frame_code = py[maps[ele.type]](ele)
        let func_code = ""
        let cls = ""
        if (ele.type != 'tk_tabs') {
            for (const k in ele.elements) {
                let tmp = _.cloneDeep(ele.elements[k])
                func_code += this.create_func(py, tmp)
            }
        } else {
            cls = this.create_tabs_frame(py, ele)
        }

        let all_code = init_code + frame_code + func_code + cls

        return all_code
    }

    create_tabs_frame(py, ele) {
        let cls = ""
        for (const i in ele.tabs) {
            let tmp = {
                type: 'tk_frame',
                id: ele.id + "_" + i,
                elements: _.filter(ele.elements, { 'tab': Number(i) })
            }
            cls += this.create_class(py, tmp)
        }

        return cls
    }
}