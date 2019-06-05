import Account from "../components/Account.vue"
import NewList from "../components/Newlist.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

import VueRouter from "vue-router"


var router = new VueRouter({
    routes: [
        {
            path: "/account",
            component: Account,
            children: [
                {
                    path: "login",
                    component: Login
                },
                {
                    path: "register",
                    component: Register
                }
            ]
        },
        {
            path: "/news",
            component: NewList
        }
    ]
})

export default router