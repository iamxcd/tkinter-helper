import PyTpl from "./py-tpl";
export default class GenerateCode {
    constructor(win, elements) {
        this.win = win
        this.elements = elements
    }

    build() {
        let py = new PyTpl()
        let depend_package_code = py.depend_package();
        let win_code = py.win(
            this.win.text,
            this.win.width,
            this.win.height
        );
        let init_code = py.init(this.elements);
        let show_code = py.show()
        let func_code = ""
        for (const k in this.elements) {
            func_code += this.create_func(py, this.elements[k])
        }
        let main_code = py.main();
        let all_code = depend_package_code + init_code + win_code + show_code + func_code + main_code
        return all_code
    }

    create_func(py, ele) {
        return py[ele.type](ele)
    }
}