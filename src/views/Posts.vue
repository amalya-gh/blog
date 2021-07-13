<template>
    <div class="">
        <h3>Existing posts </h3>
        <div v-if="posts.length" class="post-block">
            <single-post v-for="post in posts" :key="post.id" :post="post"/>
        </div>
        <div v-else>
            <p class="no-results">There are currently no posts</p>
        </div>
    </div>
</template>

<script>
  import SinglePost from "../components/SinglePost";
  import {mapState} from "vuex";
  export default {
    name: "Posts",
    components: {SinglePost},
    computed: {
      ...mapState(['posts'])
    },
    created() {
      this.$store.dispatch('getCategory', '0')
    },
  }
</script>

<style scoped>
    .post-block {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
    }

</style>