<template>
    <div class="d-flex">
        <dashboard-nav/>
        <div class="content-categories">
            <ul class="filter-category" v-for="(list, index) in categories" :key="index">
                <list-category :data="list" :category-id="list.categoryId"></list-category>
            </ul>
        </div>
    </div>
</template>

<script>
  import DashboardNav from "../components/DashboardNav";
  import ListCategory from "../components/ListCategory";
  import {mapState} from "vuex";

  export default {
    name: "Categories",
    components: {ListCategory, DashboardNav},
    data(){
      return{
      }
    },
    computed: {
      ...mapState(['categories'])
    },
    created() {
      this.$store.dispatch('getAllCategory')
    }
  }
</script>

<style scoped>
    .d-flex {
        display: flex;
    }

    .content-categories {
        margin-left: 240px;
    }
    ul, ul > ul{
        list-style: none;
    }
</style>