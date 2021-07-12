<template>
    <div class="col2">
        <div v-if="posts.length">
            <div v-for="post in posts" :key="post.id" class="post">
                <h5>{{ post.userName }}</h5>
                <span>{{ post.createdOn | formatDate }}</span>
                <p>{{ post.content}}</p>
            </div>
        </div>
        <div v-else>
            <p class="no-results">There are currently no posts</p>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import moment from "moment";

  export default {
    name: "Site",
    computed: {
      ...mapState(['posts'])
    },
    filters: {
      formatDate(val) {
        if (!val) { return '-' }

        let date = val.toDate()
        return moment(date).fromNow()
      }
    }
  }
</script>

<style scoped>

</style>