<template>
    <div class="edit-modal">
        <div class="modal-content">
            <p class="close">
                <svg @click="close()" height="20" viewBox="0 0 329.26933 329" width="20">
                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                </svg>
            </p>
            <p>Category Name</p>
            <input type="text" v-model="category.name">
            <p>Category Id</p>
            <input type="text" v-model="category.catId">
            <p>Parent Category</p>
            <ul class="filter-category" v-for="(list, index) in categories" :key="index">
                <list-category :data="list" :category-id="list.categoryId" />
            </ul>
            {{selectedCategories}}
            <button @click="saveChanges()">Save</button>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import ListCategory from "./ListCategory";

  export default {
    name: "AddNewCategory",
    components: {ListCategory},
    data(){
      return {
        category:{
          name: '',
          parentId: '',
          catId:''
        }
      }
    },
    computed:{
      ...mapState(['categories', 'selectedCategories'])
    },
    methods:{
      close(){
        this.$store.commit('setAddCategoryModal', false)
      },
      saveChanges(){
        this.category.parentId = this.selectedCategories.categoryId
        this.category.id = this.selectedCategories.id
        this.$store.dispatch('addNewCategory', this.category)
      }

    }
  }
</script>

<style scoped>
    .edit-modal {
        background: rgba(0, 0, 0, .5);
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        box-sizing: border-box;
    }

    .modal-content {
        background: #fff;
        padding: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 6px;
        box-shadow: 0 0 10px #000;
        width: 300px;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    input, textarea, button {
        padding: 10px 5px;
        border-radius: 6px;
    }

    textarea {
        min-height: 150px;
    }

    button {
        background: #39557c;
        margin-top: 20px;
        color: #fff;
        border: none;
        border-radius: 6px;
    }
    .close{
        text-align: right;
        margin: 0;
        cursor: pointer;
    }
</style>