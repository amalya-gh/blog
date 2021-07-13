<template>
    <ul class="points menu">
        <li>
            <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
            <router-link to="/categories">Categories</router-link>
        </li>
        <li>
            <router-link to="/posts">Posts</router-link>
        </li>
        <li><a @click="logout()">logout</a></li>
    </ul>
</template>

<script>
    export default {
        name: "DashboardNav",
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<style scoped>
    .points{
        list-style: none;
        text-align: left;
        margin: 0;
    }
    .menu {
        background: #39557c;
        color: #fff;
        width: 200px;
        min-width: 200px;
        height: 100%;
        position: fixed;
    }
    .points li{
        margin-top: 20px;
        text-transform: uppercase;
    }
    .points li a{
        color:#fff;
        text-decoration: none;
    }
</style>