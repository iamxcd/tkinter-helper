import PyCode from "./py-code";
export default class GenerateCode {
    constructor(win, elements) {
        this.win = win
        this.elements = elements
    }

    build() {
        let py = new PyCode()
        let exportcode = py.export_code();
        let main_win_code = py.main_win(
            this.win.text,
            this.win.width,
            this.win.height
        );
        let init_code = py.init(this.elements);
        let func_code = ""
        for (const k in this.elements) {
            func_code += this.create_func(py, this.elements[k])
        }
        let main_code = py.main();
        let all_code = exportcode + main_win_code + init_code + func_code + main_code
        return all_code
    }

    create_func(py, ele) {
        return py[ele.type](ele)
    }
}