<template>
    <ul class="points">
        <li>
            <router-link to="/">Dashboard</router-link>
        </li>
        <li>
            <router-link to="/settings">Settings</router-link>
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