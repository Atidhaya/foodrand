<template>
  <!-- App -->
  <div id="app">

    <!--<f7-button v-on:click="a"> asda</f7-button>-->

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>




    <f7-popup :opened= lobbyPopup @popup:close="deactivatePopup()" >
      <!--<f7-button @click="closePopup()">Back</f7-button>-->
      <lobby :gid= targetGid  @backToHome="deactivatePopup(post)"></lobby>
    </f7-popup>

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
import Lobby from "./pages/lobby";


export default {
  components: {
    Lobby,
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
      targetGid:'',
      lobbyPopup: false,
      popupOverride: false
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
    a() {
      console.log(this.$store.state.going)
    },
    activatePopup(){
      this.lobbyPopup = true
    },
    deactivatePopup(){
      this.lobbyPopup = false
      this.$store.dispatch('setGoing', false)
    },
    go() {
      let tempkey = this.targetGid
      console.log('passed key:',tempkey)
      var dbRef = db.ref('groups/'+tempkey+'/going');
      dbRef.transaction(function(snapshot) {
        snapshot.push({name: auth.currentUser.displayName, uid:auth.currentUser.uid})
        db.ref('groups/'+tempkey+'/going').set(snapshot)
        db.ref('users/'+auth.currentUser.uid).update({'target':'none'})
      }).then(() =>{
        console.log("THEN>>")
        this.$store.dispatch('setGoing', true)
        this.activatePopup()
        // this.$f7.router.navigate('/lobby/')
      })
    },
    reject () {
      console.log('REJECTED')
      let tempkey = this.targetGid
      db.ref('users/'+auth.currentUser.uid).update({'target':'none'})
      var dbRef = db.ref('groups/'+tempkey+'/notgo');
      dbRef.transaction(function(snapshot) {
        console.log(snapshot)
        if(snapshot === null){
          db.ref('groups/'+tempkey).update({'notgo':1})
        }
        else {
          db.ref('groups/'+tempkey+'/notgo').set(snapshot+1)
        }
      })
    }
  },
  watch: {
    target: function () {

      for(let i =0; i<this.target.length;i++){
        if(this.target[i]['.key'] === 'target'){
          if(this.target[i]['.value'] !== 'none') {
            this.targetGid = this.target[i]['.value']
            this.$f7.dialog.confirm('Group name have invite you to eat!','Foodrand', this.go, this.reject)

          }
        }
      }
    }
  }

}
</script>
