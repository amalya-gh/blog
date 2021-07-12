<template>
    <div class="main">
        <div class="menu">
            <h3> Welcome
                {{userProfile.username}}
            </h3>
            <dashboard-nav/>
        </div>
        <div class="content">
            <div class="col1">
                <div class="categories">
                    <h2>Categories List</h2>
                    <div class="post-categories">
                        <p v-for="(i, index) in categories"
                           :key="index"
                           @click="selectCategory(i, $event)"
                           class="category"
                        >
                            {{i.categoryName}}
                        </p>
                    </div>
                    <div class="create-post">
                        <p>create a post</p>
                        <form @submit.prevent>
                            <textarea v-model="post.content"></textarea>
                            <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="">
                <div v-if="posts.length" class="post-block">
                    <div v-for="post in posts" :key="post.id" class="post">
                        <h5>{{ post.userName }}</h5>
                        <span>{{ post.createdOn | formatDate }}</span>
                        <p>{{ post.content}}</p>
                        Categories
                        <div class="post-categories">
                        <p v-for="i in post.category" :key="i+'post'">{{i}}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import DashboardNav from "../components/DashboardNav";
  import {mapState} from "vuex";
  import moment from 'moment';

  export default {
    name: "Dashboard",
    components: {DashboardNav},
    data() {
      return {
        post: {
          content: ''
        },
        categoriesList: []
      }
    },
    computed: {
      ...mapState(['userProfile', 'posts', 'categories'])
    },
    // single post@ arandznin component + update u delete + masivi mas@ categorianeri + dizayn@ u code review commentner
    watch: {
      categories(val) {
        return val
      }
    },
    created() {
      this.$store.dispatch('getCategory', '0')
    },
    methods: {
      createPost() {
        this.$store.dispatch('createPost', {content: this.post.content, category: this.categoriesList})
        this.post.content = ''
      },
      selectCategory(val, e) {
        this.categoriesList.push(val.categoryName)
        this.$store.dispatch('getCategory', val.id)
        e.target.classList.add('clicked')
      }
    },
    filters: {
      formatDate(val) {
        if (!val) {
          return '-'
        }

        let date = val.toDate()
        return moment(date).fromNow()
      }
    }
  }
</script>

<style scoped>
    .main {
        display: flex;
        justify-content: space-between;
        height: 100vh
    }

    .menu {
        background: #39557c;
        color: #fff;
        width: 250px;
        min-width: 250px;
        height: 100%;
    }

    .content {
        flex-grow: 2;
        text-align: left;
        padding: 20px;
    }

    .post {
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 6px;
        width: 45%
    }

    .post-block {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .category {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        display: inline-block;
    }

    .clicked {
        background: #39557c;
        color: #fff
    }
    .post-categories{
        display: flex;
    }
    .post-categories p{
        margin:6px;
    }
</style>