import Vue from 'vue'
import Vuex from 'vuex'
import main from '../main'


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
      main.$f7.router.navigate('/sign-up/')
    },
    signUp ({commit}, payload) {
      // console.log('main', main)
      console.log(main.$f7)
      main.$f7.router.navigate('/about/')
      console.log('pushed, shouldn\'t reach here')
      // main.$f7route.load('/about/')
      // console.log(main.$f7Route)
      // main.$f7.router
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', {email: firebaseUser.email})
          auth.currentUser.updateProfile({ displayName: payload.name })
          db.ref('users/' + auth.currentUser.uid).set({ sid: payload.sid, email: payload.email, name: payload.name })
          commit('setLoading', false)
          // main.$f7.router.navigate('/')
          // this.$f7router.navigate('/jasdasd/')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    signIn ({commit}, payload) {
      commit('setLoading', true)
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', {email: firebaseUser.email})
          commit('setLoading', false)
          commit('setError', null)
          location.reload()
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
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
