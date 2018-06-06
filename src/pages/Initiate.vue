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
    import {db} from '../firebase'
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
            groupid: ''
          }
      },
      beforeCreate () {
        console.log("GID in Rand ",this.gid)
      },
      methods: {
        initiate() {
          db.ref('groups'+this.gid+'/going').set({name:auth.currentUser.displayName, uid:auth.currentUser.uid})
          db.ref('groups'+this.gid).update({'start':true})
        },
        randomize() {
          this.setgid()
          console.log(this.gid)
          console.log(this.food)
          console.log(this.food.length)
          console.log(this.database)
          // console.log("GID in Rand ",this.gid)
        },
        setgid() {
          this.groupid = this.gid
          console.log(this.groupid)
          console.log(this.gid)
        }
    },
      firebase: function () {
        this.setgid()
        return {
          going: {
            source: db.ref('groups/' + this.groupid + '/going')
          },
          food: {
            source: db.ref('groups/' + this.groupid + '/places')
          },
          database: {
            source: db.ref('groups/' + this.groupid)
          }
        }
      }
    }
</script>

<style scoped>

</style>
