// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

import {auth} from './firebase'

// import 'framework7-icons';


// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

//Import Vuefire
import VueFire from 'vuefire';


// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app';
import signUp from './authentication/sign-up'
import {store} from "./store";
// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

// Init VueFire
Vue.use(VueFire)

// console.log("Sign me up boi",signUp)

// Init App

export const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
  const vue = new Vue({
    el: '#app',
    template: '<app/>',
    store,
    // Init Framework7 by passing parameters here
    framework7: {
      id: 'io.framework7.testapp', // App bundle ID
      name: 'Framework7', // App name
      theme: 'auto', // Automatic theme detection
      // App routes
      routes: Routes,
      dialog: {
        // set default title for all dialog shortcuts
        title: 'Foodrand'
      },
      touch: {
        disableContextMenu: false
      }
    },
    // Register App Component
    components: {
      // app: gd
      app: App
    },
    beforeCreate () {
      unsubscribe()
    },
    methods: {
      onF7Ready(f7) {
        auth.onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            store.dispatch("autoSignIn", firebaseUser)
          }
          else {
            f7.router.navigate('/sign-in/')
          }
        })
      }
    }
  })
  unsubscribe()
  return vue
})

// export default main
