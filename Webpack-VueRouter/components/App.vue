<template>
    <div>
        <div>我是App主体</div>
        <router-link to="/account">我的账号</router-link>
        <router-link to="/news">新闻列表</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>