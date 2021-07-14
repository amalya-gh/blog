import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id
    postsArray.push(post)
  })
  store.commit('setPosts', postsArray)
})


const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    categories: [],
    editModalStatus: false,
    selectedCategories: [],
    addCategoryStatus: false
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setCategories(state, val) {
      state.categories = val
    },
    setEditModalStatus(state, val){
      state.editModalStatus = val
    },
    setSelectedCategories(state, val){
      state.selectedCategories = val
      console.log(state.selectedCategories)
    },
    setAddCategoryModal(state, val){
      state.addCategoryStatus = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.username, form.password)
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      if (router.currentRoute.path === '/login') {
        router.push('/dashboard')
      }
    },
    logout({ commit }) {
      fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    },
    async getAllCategory({ state }) {
      const categoryList = await fb.categoriessCollection.get()
      state.categories=[]
      categoryList.forEach(doc => {
        let cat = doc.data()
        cat.id = doc.id
        state.categories.push(cat)
        // commit('setCategories', cat)
      })
    },

    async createPost({ state }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.username,
        category: post.category,
        title: post.title
      })
    },
    // eslint-disable-next-line no-empty-pattern
    async deletePostFromFb({ }, post) {
      await fb.postsCollection.doc(post).delete()
    },
    // eslint-disable-next-line no-empty-pattern
    async editPostData({}, postData) {
      await fb.postsCollection.doc(postData.id).update({
        content: postData.content,
        title: postData.title
      })
    },
    // eslint-disable-next-line no-empty-pattern
    async addNewCategory({}, categoryData) {
      console.log(categoryData);
      const catRef = fb.ref('children');
      console.log(catRef);
      // await fb.categoriessCollection.doc(categoryData.id).update({
      //   categoryName: categoryData.name,
      //   parentId: categoryData.parentId,
      //   categoryId: categoryData.catId
      // })
    },
    changeTask(task, column) {
      this.$firebaseRefs.tasks.orderByChild('id').equalTo(task.id).once('value').then( (snapshot) => {
        const key = Object.keys(snapshot.val())[0]
        const data = {
          text: task.text,
          column: column
        }
        // Update firebase entry with new data
        const updates = data

        this.$firebaseRefs.tasks.child(key).update(updates)

      })
    }

  }
})

export default store