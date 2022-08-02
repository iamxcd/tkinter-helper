import uniqid from "uniqid";
export default class ContextMenuHandler {
    constructor(contextMenu, handlerName) {
        this.contextMenu = contextMenu
        this.handlerName = handlerName
    }

    run() {
        this[this.handlerName]()
    }

    eleDel() {
        let i = this.contextMenu.eleIndex;
        if (i != null) {
            this.contextMenu.frame.elements.splice(i, 1);
            this.contextMenu.eleIndex = null;
        }
    }
    eleCopy() {
        let ele = _.cloneDeep(this.contextMenu.frame.elements[this.contextMenu.eleIndex])
        ele.id = uniqid()
        ele.top += 10
        ele.left += 10
        this.contextMenu.frame.elements.push(ele)
    }
}