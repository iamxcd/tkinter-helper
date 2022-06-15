export default (Vue) => {
    Vue.component("py-button", () => import("./py-button.vue"))
}