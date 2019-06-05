<template>
    <div>我是一个登陆组件,就是那么牛皮---{{msg}}</div>
</template>

<script>
    export default {
        data: function () {
            return {
                msg: "我是组件数据"
            }
        },
        methods: {
            show: function () {
                console.log("我是组件内部方法")
            }
        }
    }
</script>

<style scoped>

</style>