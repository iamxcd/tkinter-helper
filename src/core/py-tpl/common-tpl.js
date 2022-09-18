export default class CommonTpl {
    /**
     * 
     * 公用赋值
     * 
     */
    setval(elemetns) {
        let code = ''
        for (const i in elemetns) {
            let tmp = elemetns[i]
            if (tmp.frame) {
                code += `
        self.${tmp['type']}_${tmp['id']} = Frame_${tmp['id']}(self)`
            } else {
                code += `
        self.${tmp['type']}_${tmp['id']} = self.__${tmp['type']}_${tmp['id']}()`
            }
        }
        return code
    }
}