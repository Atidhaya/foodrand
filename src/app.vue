<template>
  <!-- App -->
  <div id="app">

    <!--<f7-button href="/sign-up/"> asda</f7-button>-->

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left cover theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- 2 Popup -->
    <f7-popup id="popup2">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup2">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!--<f7-popup>-->
      <!--<f7-view id="sign-in" url="/sign-in/" ></f7-view>-->
    <!--</f7-popup>-->


    <!--<f7-popup>-->
      <!--<f7-view id="sign-up" url="/sign-up/" ></f7-view>-->
    <!--</f7-popup>-->




    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-item>
              <f7-label>Username</f7-label>
              <f7-input name="username" placeholder="Username" type="text"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Password</f7-label>
              <f7-input name="password" type="password" placeholder="Password"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" login-screen-close></f7-list-button>
            <f7-block-footer>
              <p>Click Sign In to close Login Screen</p>
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </div>
</template>

<script>
import F7Button from "framework7-vue/src/components/button";
import F7View from "framework7-vue/src/components/view";
import CreateGroup from "./pages/create-group";
import F7Tabs from "framework7-vue/src/components/tabs";
import F7Tab from "framework7-vue/src/components/tab";
import F7Popup from "framework7-vue/src/components/popup";
import SignIn from "./authentication/sign-in";
import {auth, db} from "./firebase"


export default {
  components: {
    SignIn,
    F7Popup,
    F7Tab,
    F7Tabs,
    CreateGroup,
    F7View,
    F7Button},
  data () {
    return{
      target:'',
      groupname:'',
      key:''
    }
  },
  firebase: function() {
    return {
      target: {
        source: db.ref('users/' + auth.currentUser.uid)
      },
      groups: {
        source: db.ref('groups/')
      }
    }
  },
  methods: {
    go() {
      console.log('passed key:',this.key)
      let tempkey = this.key
      var dbRef = db.ref('groups/'+tempkey+'/going');
      dbRef.transaction(function(snapshot) {
        snapshot.push({name: auth.currentUser.displayName, uid:auth.currentUser.uid})
        db.ref('groups/'+tempkey+'/going').set(snapshot)
        db.ref('users/'+auth.currentUser.uid).update({'target':'none'})
      })
    },
    reject () {
      console.log('REJECTED')
      let tempkey = this.key
      db.ref('users/'+auth.currentUser.uid).update({'target':'none'})
      var dbRef = db.ref('groups/'+tempkey+'/notgo');
      dbRef.transaction(function(snapshot) {
        console.log(snapshot)
        if(snapshot === null){
          db.ref('groups/'+tempkey).set({'notgo':1})
        }
        else {
          db.ref('groups/'+tempkey).update({'notgo':snapshot+1})
        }
      })
    }
  },
  watch: {
    target: function () {
      // console.log('Someone prompt the let\'s eat!')
      // console.log(this.target)
      // console.log(this.target[2]['.value'])
      // console.log(this.target['target'])
      for(let i =0; i<this.target.length;i++){
        if(this.target[i]['.key'] === 'target'){
          if(this.target[i]['.value'] !== 'none') {
            this.key = this.target[i]['.value']
            // db.ref('users/'+auth.currentUser.uid).update({'target': 'none'})
            this.$f7.dialog.confirm('Group name have invite you to eat!','Foodrand', this.go, this.reject)

          }
        }
      }
    }
  }

}
</script>
