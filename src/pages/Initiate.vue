<template>

  <f7-view>


    <f7-page>

      <f7-button v-on:click="initiate()" >Let's go eat!</f7-button>


      <f7-button v-on:click="randomize()" >Randomize!</f7-button>


      <p id="demo-determinate-container"></p>

    </f7-page>

  <!--<f7-preloader color="green" size="44px"></f7-preloader>-->


  </f7-view>

</template>

<script>
    import F7Preloader from "framework7-vue/src/components/preloader";
    import F7Page from "framework7-vue/src/components/page";
    import F7Button from "framework7-vue/src/components/button";
    import F7Progressbar from "framework7-vue/src/components/progressbar";
    import {db, auth} from '../firebase'
    import F7View from "framework7-vue/src/components/view";
    import F7Navbar from "framework7-vue/src/components/navbar";
    import F7Link from "framework7-vue/src/components/link";


    export default {
      name: "Initiate",
      components: {F7Link, F7Navbar, F7View, F7Progressbar, F7Button, F7Page, F7Preloader},
      props: ['gid'],
      data() {
          return {
            determinateLoading: false,
            progressBarEl: '',
            progress: 0,
            food: [],
            groups: [],
            chosenOne: '',
            notifypeople: []
          }
      },
      beforeCreate () {
        // console.log("GID in Rand ",this.gid)
      },
      methods: {
        initiate() {
          var temp = this.gid
          db.ref('groups/'+this.gid+'/going').set({name:auth.currentUser.displayName, uid:auth.currentUser.uid})
          db.ref('groups/'+this.gid).update({'start':true})
          db.ref('groups/'+this.gid+'/members').once('value').then(function (snapshot){
            console.log(snapshot.val())
            for(let people in snapshot.val()){
              console.log(snapshot.val()[0])
              console.log(snapshot.val()[people].uid)
              if(auth.currentUser.uid !== snapshot.val()[people].uid){
              db.ref('users/'+snapshot.val()[people].uid).update({'target': temp})
              }
            }
          })
        },
        randomize() {
          console.log(this.food)
          console.log(this.food.length)
          this.chosenOne = Math.floor(Math.random() * (this.food.length+ 1))
          console.log(this.chosenOne)
        },
        setFood() {
          let temp = []
          // // console.log(this.groups)
          // // console.log(this.groups.length)
          // // console.log('our key',this.gid)
          for(let i = 0; i < this.groups.length; i++) {
            // console.log('loop through group....',this.groups[i]['.key'])
            // console.log('Correct ? ..', this.groups[i]['.key'] === this.gid)
            if(this.groups[i]['.key'] === this.gid) {
              for(let p in this.groups[i].places){
                console.log('our food:',this.groups[i].places[p])
                console.log(this.groups[i].places[p].name)
                temp.push(this.groups[i].places[p].name)
              }
            }
          }
          this.food = temp
        },
    },
      watch: {
        gid: function (){
          console.log('watch gid from Initiate')
          this.setFood()
        },
        groups: function (){
          console.log('watch groups')
          this.setFood()
        }
      },
      firebase: function () {
        return {
          groups : {
            source: db.ref('groups/')
          }
        }
      }
    }
</script>

<style scoped>

</style>
