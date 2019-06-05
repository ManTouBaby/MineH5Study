console.log("Are you OK")
// console.log("yes,I`am Ok")

import vm from "vue"

import login from "./login.vue"

new vm({
    el: "#app",
    data: function () {
        return {
            msg: "123456"
        }
    },
    render: function (c) {
        return c(login);
    }

})