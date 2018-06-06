import Vue from 'vue'
import Vuex from 'vuex'
// import main from '../main'


import {auth, db} from '../firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    appTitle: 'Foodrand',
    user: null,
    error: null,
    loading: false,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
  },
  actions: {
    pushMe ({commit}) {
      // console.log(unsubscribe)
      console.log(this)
      // main.unsubscribe.$f7.router.navigate('/sign-up/')
    },
    getUser ({commit}) {
      console.log('user from store', this.user);
    },
    signUp ({commit}, payload) {
      console.log(payload.name)
      var success = false
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          console.log('In sign up.............')
          auth.currentUser.updateProfile({ displayName: payload.name }).then( () => {
            commit('setUser', {email: firebaseUser.email})
            console.log('name:' ,payload.name)
            console.log(auth.currentUser.displayName)
            db.ref('users/' + auth.currentUser.uid).set({ email: payload.email, name: payload.name })
            commit('setLoading', false)
            location.reload()
          })
          // main.$f7.router.navigate('/sign-in/')
        })
        .catch(error => {
          console.log('can\'t sign up')
          console.log(error.message)
          commit('setError', error.message)
          commit('setLoading', false)
          this.$f7.dialog.alert(error.message)
        })
      return success
    },
    signIn ({commit}, payload) {
      // main.$f7.router.navigate('/sign-up/')
      commit('setLoading', true)
      var success = false
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', {email: firebaseUser.email})
          commit('setLoading', false)
          commit('setError', null)
          console.log(auth.currentUser.displayName)
          this.$f7.router.navigate('/')
        })
        .catch(error => {
          console.log('can\'t sign in')
          console.log(error.message)
          commit('setError', error.message)
          commit('setLoading', false)
        })
      return success
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
      console.log(this.state.user)
      console.log(auth.currentUser.displayName)
    },
    userSignOut ({commit}) {
      auth.signOut()
      commit('setUser', null)
    },
    socialMediaSignUp ({commit}, payload) {
      commit('setUser', payload)
    }
  }
});
