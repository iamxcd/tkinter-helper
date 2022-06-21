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
}