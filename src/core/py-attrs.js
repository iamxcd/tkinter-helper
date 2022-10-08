// 通用属性
const common_attr = {
    top: 0,
    left: 0,
    width: 0
}
export default class Attrs {
    tk_button() {
        return {
            ...common_attr,
            width: 50,
            height: 24,
            text: "按钮",
        }
    }

    tk_input() {
        return {
            ...common_attr,
            width: 150,
            height: 24
        }
    }

    tk_label() {
        return {
            ...common_attr,
            width: 50,
            height: 24,
            text: "标签",
        }
    }

    tk_text() {
        return {
            ...common_attr,
            width: 150,
            height: 100
        }
    }

    tk_radio_button() {
        return {
            ...common_attr,
            width: 80,
            height: 24,
            text: '单选框'
        }
    }

    tk_check_button() {
        return {
            ...common_attr,
            width: 80,
            height: 24,
            text: '多选框'
        }
    }

    tk_list_box() {
        return {
            ...common_attr,
            width: 150,
            height: 100,
            options: ["列表框", "Python", "Tkinter Helper"],
        }
    }

    tk_select_box() {
        return {
            ...common_attr,
            width: 150,
            height: 24,
            options: ["列表框", "Python", "Tkinter Helper"],
        }
    }

    tk_progressbar() {
        return {
            ...common_attr,
            width: 150,
            height: 24
        }
    }

    tk_table() {
        return {
            ...common_attr,
            width: 450,
            height: 70
        }
    }

    tk_frame() {
        return {
            ...common_attr,
            width: 200,
            height: 150,
            frame: true,
            elements: []
        }
    }

    tk_label_frame() {
        return {
            ...common_attr,
            width: 200,
            height: 150,
            frame: true,
            elements: [],
            text: "标签容器"
        }
    }

    tk_tabs() {
        return {
            ...common_attr,
            width: 200,
            height: 150,
            frame: true,
            curTab: 0,
            tabs: ['选项卡1', '选项卡2'],
            elements: [] // 子元素通过  tab: 0  字段 区分是哪一个选项上的
        }
    }
}