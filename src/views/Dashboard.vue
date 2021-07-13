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
                    <h2>Create a post</h2>
                    <p>Choose category</p>
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
                        <form class="crete-post-form" @submit.prevent>
                            <label>
                                Post title<br>
                                <input type="text" v-model="post.title">
                            </label>
                            <label>
                                Post content<br>
                                <textarea v-model="post.content" class="post-content"></textarea>
                            </label>
                            <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="">
                <h3>Existing posts </h3>
                <div v-if="posts.length" class="post-block">
                    <single-post v-for="post in posts" :key="post.id" :post="post"/>
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
  import SinglePost from "../components/SinglePost";

  export default {
    name: "Dashboard",
    components: {SinglePost, DashboardNav},
    data() {
      return {
        post: {
          content: '',
          title: ''
        },
        categoriesList: []
      }
    },
    computed: {
      ...mapState(['userProfile', 'posts', 'categories'])
    },
    // update u delete + masivi mas@ categorianeri + dizayn@ u code review commentner
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
        this.$store.dispatch('createPost', {
          content: this.post.content,
          category: this.categoriesList,
          title: this.post.title
        })
        this.post.content = ''
        this.post.title = ''
      },
      selectCategory(val, e) {
        this.categoriesList.push(val.categoryName)
        this.$store.dispatch('getCategory', val.id)
        e.target.classList.add('clicked')
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
    .post-content{
        width: 300px;
        height: 200px;
        border: 1px solid #ccc;
    }
    .button{
        background: #39557c;
        padding: 10px 30px;
        border-radius: 6px;
        border: none;
        text-transform: uppercase;
        color:#fff
    }
    .crete-post-form{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>