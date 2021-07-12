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
    categories: []
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
      // await dispatch('getCategory', {parent:'0'})
      if (router.currentRoute.path === '/login') {
        router.push('/dashboard')
      }
    },
    logout({ commit }) {
      fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    },
    async getCategory({ state }, parent) {
      const categoryList = await fb.categoriesCollection.where('parentId', '==', parent).get()
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
        category: post.category
      })
    }
  }
})

export default store