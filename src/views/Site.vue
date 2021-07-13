<template>
    <div class="main-site">
        <h1>All posts</h1>
        <div v-if="posts.length" class="main-block">
            <single-post v-for="post in posts" :key="post.id"  :post="post"/>
        </div>
        <div v-else>
            <p class="no-results">There are currently no posts</p>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import SinglePost from "../components/SinglePost";

  export default {
    name: "Site",
      components: {SinglePost},
      computed: {
      ...mapState(['posts'])
    }
  }
</script>

<style scoped>
    .main-site{
        background: url(../assets/bg.jpg) no-repeat center center;
        min-height: 100vh;
        background-size: cover;
    }
    .main-site h1{
        margin:0;
        padding: 20px;
        text-align: left;
    }
.main-block{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>