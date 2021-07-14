<template>
    <li>
        <!--parent-->
        <span v-if="isFolder">
            <span class="" :class="icon"  @click="toggle(data, $event)"> {{data.categoryName}}</span>
        </span>
        <!--if not folding, we do not need an binding event-->
        <span v-else :title="data.categoryName" :class="{active: data.id === categoryId}">
            <span class=""></span>
            {{data.categoryName}}
        </span>
        <!--children-->
        <ul v-if="isFolder" :class="isShow">
            <list-category v-for="(data, index) in data.children" :key="index" :data="data" :search="search"
                           :category-id="categoryId"></list-category>
        </ul>
    </li>
</template>

<script>
  export default {
    name: "ListCategory",
    props: ['data', 'categoryId', 'search'],
    data() {
      return {
        open: false,
        rout: ''
      }
    },
    created() {
      this.rout = this.$route.fullPath
    },
    computed: {
      icon() {
        return {
          'single': !this.open,
          'multiple': this.open,
        }
      },
      isFolder() {
        return this.data.children && this.data.children.length
      },
      isShow() {
        return this.open ? 'show' : 'hide'
      }
    },
    methods: {
      toggle(val, e) {
        this.open = !this.open
        this.$store.commit('setSelectedCategories', val.categoryName)
        console.log(e.target)
        e.target.classList.add('selected')
      },
      editCategory(){

      }

    }
  }
</script>

<style scoped>
    ul {
        list-style: none;
    }

    .selected{
        background: #39557c;
    }
</style>