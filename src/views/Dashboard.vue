<template>
    <div class="main">
        <div class="menu">
            <dashboard-nav/>
        </div>
        <div class="content">
            <h3> Welcome
                {{userProfile.username}}
            </h3>
            <div class="categories">
                <h2>Create a post</h2>
                <p class="m-0">Choose category</p>
                <div class="post-categories">
                    <ul class="filter-category" v-for="(list, index) in categories" :key="index">
                        <list-category :data="list" :category-id="list.categoryId"  @click="selectCategory(list, $event)"></list-category>
                    </ul>
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
        <edit-post v-if="editModalStatus.status"/>
    </div>
</template>

<script>
  import DashboardNav from "../components/DashboardNav";
  import {mapState} from "vuex";
  import EditPost from "../components/EditPost";
  import ListCategory from "../components/ListCategory";

  export default {
    name: "Dashboard",
    components: {ListCategory, EditPost, DashboardNav},
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
      ...mapState(['userProfile', 'posts', 'categories', 'editModalStatus', 'selectedCategories'])
    },
    watch: {
      categories(val) {
        return val
      }
    },
    created() {
      this.$store.dispatch('getAllCategory')
    },
    methods: {
      createPost() {
        this.$store.dispatch('createPost', {
          content: this.post.content,
          category: this.selectedCategories,
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

    .content {
        flex-grow: 2;
        text-align: left;
        padding: 20px;
        margin-left: 240px;
    }

    .post-block {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .filter-category, .filter-category ul {
       list-style: none;
    }

    .clicked {
        background: #39557c;
        color: #fff
    }

    .post-content {
        width: 300px;
        height: 200px;
        border: 1px solid #ccc;
    }

    .button {
        background: #39557c;
        padding: 10px 30px;
        border-radius: 6px;
        border: none;
        text-transform: uppercase;
        color: #fff;
        margin-bottom: 50px;
    }

    .crete-post-form {
        display: flex;
        flex-direction: column;
        /*justify-content: flex-start;*/
        width: 50%;
    }

    .crete-post-form input,
    .crete-post-form textarea,
    .crete-post-form button {
        width: 100%;
        padding: 15px 5px;
        border: 1px solid #ccc
    }

    .crete-post-form button {
        align-self: center;
    }

    .crete-post-form label {
        margin-top: 20px;
    }

    .m-0 {
        margin: 0;
    }
</style>