// 通用属性
const common_attr = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    text: "",
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
            height: 24,
            text: "输入框",
        }
    }
}