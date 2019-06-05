<template>
    <div>
        <div>我是账号模块</div>
        <router-link to="/account/login">登录界面</router-link>
        <router-link to="/account/register">注册界面</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        beforeCreate: function () {
            console.log("测试数据")
        }
    }
</script>

<style scoped>

</style>