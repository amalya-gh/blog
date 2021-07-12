<template>
    <div class="main">
        <div class="menu">
           <dashboard-nav/>
        </div>
        <div class="content"></div>
    </div>
</template>

<script>
    import DashboardNav from "../components/DashboardNav";
    export default {
        name: "Dashboard",
        components: {DashboardNav}
    }
</script>

<style scoped>
    .main {
        display: flex;
        justify-content: space-between;
        height:100vh
    }

    .menu {
        background: #39557c;
        color: #fff;
        width: 300px;
        height: 100%;
    }

    .content {
        flex-grow: 2
    }
</style>