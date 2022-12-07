import _ from "lodash";
import store from '@/store'
import PyAttrs from "@/core/py-attrs.js";
import uniqid from "uniqid";

/**
 * 是否窗口元素
 * @param {*} id 
 * @returns 
 */
export function isWin(id) {
    return id == "win";
}

/**
 * 是否容器元素
 * @param {*} id 
 * @param {*} frame 
 * @returns 
 * 
 */
export function isFrame(id, frame) {
    if (isWin(id)) {
        return false;
    }
    let ele = _.find(frame.elements, { id, frame: true });
    return ele != undefined;
}
/**
 * 通过容器的ID获取容器在elemetns数组中的索引
 * @param {*} id 
 * @param {*} frame 
 * @returns 
 * 
 */
export function getFrameIndex(id, frame) {
    return _.findIndex(frame.elements, { id, frame: true });
}
/**
 * 移动组件元素
 * @param {*} e 
 * @param {*} element 
 * @param {*} index 
 * @param {*} frame 
 * @returns 
 * 
 */
export function elementMove(evt, element, index, frame) {
    // 只处理右键点击事件
    if (evt.which != 1) {
        return;
    }
    let ele = evt.currentTarget; //获取组件. 绑定事件的元素
    // ele.style.cursor = "move";
    store.dispatch("app/setCurId", element.id);
    // 将属性绑定到表单中
    store.dispatch("app/setAttrsForm", element);

    // console.log(this.curId);

    //算出鼠标相对元素的位置
    let disX = evt.clientX - ele.offsetLeft;
    let disY = evt.clientY - ele.offsetTop;

    document.onmousemove = (evt1) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = evt1.clientX - disX;
        let top = evt1.clientY - disY;

        top = parseInt(top / 10) * 10 + (top % 10 >= 5 ? 10 : 0);
        left = parseInt(left / 10) * 10 + (left % 10 >= 5 ? 10 : 0);

        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }

        frame.elements[index].top = top;
        frame.elements[index].left = left;
    };
    document.onmouseup = (evt2) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // ele.style.cursor = "default";
    };
}

/**
 * 调整组件大小
 * @param {*} param0 
 * @param {*} element 
 * @param {*} index 
 * @param {*} frame 
 * 
 */
export function elementResize({ x, y, w, h }, element, index, frame) {
    if (x != undefined) frame.elements[index].left = x;
    if (y != undefined) frame.elements[index].top = y;
    if (w != undefined) frame.elements[index].width = w;
    if (h != undefined) frame.elements[index].height = h;
}

/**
 * 调整窗口大小
 * @param {*} param0 
 * @param {*} frame 
 */
export function winResize({ width, height }, frame) {
    frame.width = width;
    frame.height = height;
}

/**
 * 组件的键盘事件处理
 * @param {*} evt 
 * @param {*} attrsForm 
 */
export function elementKeyDown(evt, attrsForm) {
    let keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (keys.indexOf(evt.key) > -1) {
        evt.preventDefault();
        switch (evt.key) {
            case "ArrowUp":
                if (attrsForm.top >= 1) attrsForm.top -= 1;
                break;
            case "ArrowDown":
                attrsForm.top += 1;
                break;
            case "ArrowLeft":
                if (attrsForm.left >= 1) attrsForm.left -= 1;
                break;
            case "ArrowRight":
                attrsForm.left += 1;
                break;
            default:
                break;
        }
    }
}

/**
 * 组件的右键菜展示
 * @param {*} event 
 * @param {*} index 
 * @param {*} frame 
 */
export function elementShowMenu(event, index, frame) {
    event.preventDefault();
    store.dispatch("app/showContextMenu", {
        x: event.clientX,
        y: event.clientY,
        index,
        frame,
        position: "element",
    });
}

/**
 * 是否展示组件元素 处理特殊情况 切换选项卡 隐藏非当前选项卡的组件
 * @param {*} frame 
 * @param {*} ele 
 * @returns 
 */
export function isShowTabElement(frame, ele) {
    if (!ele.is_show) {
        return false
    }
    if (frame.type != "tk_tabs") {
        return true;
    }
    return frame.curTab == ele.tab;
}

/**
 * 允许被拖动的元素到当前元素上
 * @param {*} evt 
 * @param {*} frame 
 * 
 */
export function allowDrop(evt, frame) {
    let id = evt.target.id;
    if (isWin(id) || isFrame(id, frame)) {
        evt.preventDefault();
    }
}

/**
 * 拖动元素到框架容器元素
 * @param {*} evt 
 * @param {*} frame 
 * 
 */
export function dragToFrame(evt, frame) {
    evt.preventDefault();
    let type = evt.dataTransfer.getData("type");

    let x = evt.dataTransfer.getData("x");
    let y = evt.dataTransfer.getData("y");

    let top = evt.layerY - y;
    let left = evt.layerX - x;

    top = parseInt(top / 10) * 10 + (top % 10 >= 5 ? 10 : 0);
    left = parseInt(left / 10) * 10 + (left % 10 >= 5 ? 10 : 0);

    if (top < 0) {
        top = 0;
    }
    if (left < 0) {
        left = 0;
    }

    let py = new PyAttrs();
    let newele = {
        ...py[type](),
        id: uniqid(),
        type: type,
        top: top,
        left: left,
    };

    let id = evt.target.id;
    if (isWin(id)) {
        frame.elements.push(newele);
    } else if (isFrame(id, frame)) {
        let index = getFrameIndex(id, frame);
        let subframe = frame.elements[index];
        // 处理特殊情况 选项卡 记录当前的tab索引
        if (subframe.type == "tk_tabs") {
            newele.tab = subframe.curTab;
        }
        subframe.elements.push(newele);
    }
}
/**
 * 窗口移动
 * @param {*} evt 
 * @param {*} frame 
 * @returns 
 */
export function winMove(evt, frame) {
    // 只处理右键点击事件
    if (evt.which != 1) {
        return;
    }
    let ele = evt.currentTarget; //获取组件. 绑定事件的元素
    // ele.style.cursor = "move";
    store.dispatch("app/setCurId", "win");
    // 将属性绑定到表单中
    store.dispatch("app/setAttrsForm", frame);

    // console.log(this.curIndex);

    //算出鼠标相对元素的位置
    let disX = evt.clientX - ele.offsetLeft;
    let disY = evt.clientY - ele.offsetTop;

    disY = disY - 30; // 减去标题栏的高度

    document.onmousemove = (evt1) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = evt1.clientX - disX;
        let top = evt1.clientY - disY;

        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }
        frame.top = top;
        frame.left = left;
    };
    document.onmouseup = (evt2) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // ele.style.cursor = "default";
    };
}