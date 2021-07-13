<template>
    <div class="d-flex">
        <dashboard-nav/>
        <div class="post-content">
            <h3>Existing posts </h3>
            <div v-if="posts.length" class="post-block">
                <single-post v-for="post in posts" :key="post.id" :post="post"/>
            </div>
            <div v-else>
                <p class="no-results">There are currently no posts</p>
            </div>
        </div>
        <edit-post v-if="editModalStatus.status"/>
    </div>
</template>

<script>
  import SinglePost from "../components/SinglePost";
  import {mapState} from "vuex";
  import EditPost from "../components/EditPost";
  import DashboardNav from "../components/DashboardNav";

  export default {
    name: "Posts",
    components: {DashboardNav, EditPost, SinglePost},
    computed: {
      ...mapState(['posts', 'editModalStatus'])
    }
  }
</script>

<style scoped>
    .d-flex{
        display: flex;
    }
    .post-block {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-top: 20px;
    }
    .post-content{
        margin-left: 240px;
    }
</style>