<template>
    <div class="login">
        <section>
            <div class="col2">
                <form @submit.prevent>
                    <h1>Admin Login</h1>
                    <div class="input-block">
                        <label for="email">Email</label>
                        <input v-model="loginForm.email" type="text" placeholder="you@email.com" id="email" />
                    </div>
                    <div class="input-block">
                        <label for="password">Password</label>
                        <input v-model="loginForm.password" type="password" placeholder="******" id="password" />
                    </div>
                    <button @click="login()" class="button">Log In</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                }
            }
        },
        methods:{
            login() {
                this.$store.dispatch('login', {
                    username: this.loginForm.email,
                    password: this.loginForm.password
                })
            }
        }
    }
</script>

<style scoped>
    .login{
        width: 500px;
        margin: 0 auto;
        transform: translateY(50%);
        box-shadow: 0 0 10px grey;
        padding: 35px;
        border-radius:6px;
    }
    .button{
        background: #39557c;
        color:#fff;
        border-radius:10px;
        width:100%;
        padding:20px;
        border: none;
        outline: none;
    }
    .input-block {
        margin-top:20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
    }
    .input-block input{
        flex-grow: 2;
        margin-left: 20px;
        padding: 10px;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 6px;
    }
    .input-block label{
        width:100px;
    }

</style>