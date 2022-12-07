import _ from "lodash"

const conmon = {
    virtual_events: [],// 虚拟事件,
    cursor: [
        {
            'name': '',
            'intro': '继承父组件(默认)'
        }
    ]
}

const widget = [
    {
        title: '标签',
        type: 'tk_label',
        ...conmon,
    },
    {
        title: '按钮',
        type: 'tk_button',
        ...conmon,
    },
    {
        title: '输入框',
        type: 'tk_input',
        ...conmon,
    },
    {
        title: '文本框',
        type: 'tk_text',
        ...conmon,
    },
    {
        title: '单选框',
        type: 'tk_radio_button',
        ...conmon,
    },
    {
        title: '多选框',
        type: 'tk_check_button',
        ...conmon,
    },
    {
        title: '列表框',
        type: 'tk_list_box',
        ...conmon,
        virtual_events: [
            {
                'name': '<<ListboxSelect>>',
                'intro': '列表框被选中事件',
            }
        ],
    },
    {
        title: '下拉框',
        type: 'tk_select_box',
        ...conmon,
        virtual_events: [
            {
                'name': '<<ComboboxSelected>>',
                'intro': '下拉列表中元素被选中事件',
            }
        ],
    },
    {
        title: '进度条',
        type: 'tk_progressbar',
        ...conmon,
    },
    {
        title: '表格',
        type: 'tk_table',
        ...conmon,
        virtual_events: [
            {
                'name': '<<TreeviewSelect>>',
                'intro': '选中项发生变化事件',
            }
        ],
    },
    {
        title: '容器',
        type: 'tk_frame',
        ...conmon,
    },
    {
        title: '标签容器',
        type: 'tk_label_frame',
        ...conmon,
    },
    {
        title: '选项卡',
        type: 'tk_tabs',
        ...conmon,
        virtual_events: [
            {
                'name': '<<NotebookTabChanged>>',
                'intro': '选项卡切换事件',
            }
        ],
    }
]


export function getWidgetConfig(type) {
    let config = _.find(widget, { 'type': type })
    // console.log(config)
    return config
}

export default widget