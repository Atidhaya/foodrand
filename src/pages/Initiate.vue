<template>

  <f7-view>

    <f7-page>

      <f7-button v-on:click="showload" >Show loader</f7-button>


    </f7-page>

  <!--<f7-preloader color="green" size="44px"></f7-preloader>-->


  </f7-view>

</template>

<script>
    import F7Preloader from "framework7-vue/src/components/preloader";
    import F7Page from "framework7-vue/src/components/page";
    import F7Button from "framework7-vue/src/components/button";
    export default {
      name: "Initiate",
      components: {F7Button, F7Page, F7Preloader},
      props: ['gid'],
      data() {
          return {

          }
      },
      mounted () {
        // this.$f7.preloader.show()
      },
      methods: {
        showload() {
          console.log(this.$f7.preloader)
          this.$f7.preloader.show()
          setTimeout(this.$f7.preloader.hide(), 3000)
        }
      },
      firebase: function () {
        return {

        }
      }
    }
</script>

<style scoped>

</style>
