import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8Wb1bKGY3qQHcRs69n5XPmmiVwHMVVts",
    authDomain: "willingandable-ed688.firebaseapp.com",
    projectId: "willingandable-ed688",
    storageBucket: "willingandable-ed688.appspot.com",
    messagingSenderId: "997334913471",
    appId: "1:997334913471:web:6808fdc590a3e0dac5d10a"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
const categoriesCollection = db.collection('categories')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    // postsCollection,
    categoriesCollection
}