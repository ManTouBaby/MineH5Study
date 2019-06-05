console.log("测试数据")

import Vue from "vue"
import VueRouter from "vue-router"
import App from "../components/App.vue"
import router from "../src/router.js"

Vue.use(VueRouter)

var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            msg: "我是数据模式sssssss"
        }
    },
    render: c => c(App),
    router
})
