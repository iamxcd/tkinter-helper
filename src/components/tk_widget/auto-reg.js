export default (Vue) => {
    const requireComponent = require.context('./', true, /\w+\.(vue)$/)
    requireComponent.keys().forEach(fileName => {
        // 这个地方直接传入fileName其实就是内部会调用了resolve方法，会返回对应的文件内容（不理解可以console一下看看）
        const config = requireComponent(fileName);
        // 获取组件的 PascalCase 命名
        const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');

        // 动态注册该目录下的所有.vue文件
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        Vue.component(componentName, config.default || config);
    })
}


