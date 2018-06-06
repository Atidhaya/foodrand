<template>

  <f7-view>


    <f7-page>

      <f7-button v-on:click="initiate" >Let's go eat!</f7-button>


      <f7-button v-on:click="initiate" >Randomize!</f7-button>


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

    export default {
      name: "Initiate",
      components: {F7View, F7Progressbar, F7Button, F7Page, F7Preloader},
      props: ['gid'],
      data() {
          return {
            determinateLoading: false,
            progressBarEl: '',
            progress: 0
          }
      },
      beforeCreate () {
      },
      methods: {
        initiate() {
          db.ref('groups'+this.gid+'/going').set({name:auth.currentUser.displayName, uid:auth.currentUser.uid})
          db.ref('groups'+this.gid).update({'start':true})
        },
        randomize() {

        }
    },
      firebase: function () {
        return {
          going: {
            source: db.ref('groups/' + this.gid + '/going')
          },
          food: {
            source: db.ref('groups/' + this.gid + '/places')
          }
        }
      }
    }
</script>

<style scoped>

</style>
