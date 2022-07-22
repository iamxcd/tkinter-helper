export default class ContextMenuHandler {
    constructor(contextMenu, handlerName) {
        this.contextMenu = contextMenu
        this.handlerName = handlerName
    }

    run() {
        this[this.handlerName]()
    }

    delEle() {
        let i = this.contextMenu.eleIndex;
        if (i != null) {
            this.contextMenu.frame.elements.splice(i, 1);
            this.contextMenu.eleIndex = null;
        }
    }
}