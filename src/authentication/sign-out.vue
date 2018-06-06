<template>

  <f7-view>

    <f7-page>

      <f7-list no-hairlines-md o-hairlines-ios no-hairlines-between >

        <f7-list-item >
          <p>       <p> <img src="/static/ohno.png" class="picture-center"/> </p>

          <br/>

        </f7-list-item>

      </f7-list>

  <div id="sign-out">
    <f7-list>
      <p class="segmented">
    <f7-button login-screen-close v-on:click="logout" >Sign Out</f7-button>
      </p>
    </f7-list>
  </div>

    </f7-page>

  </f7-view>

</template>

<script>
  import {auth} from '../firebase'
  import F7ListButton from "framework7-vue/src/components/list-button";
  import F7List from "framework7-vue/src/components/list";
  import F7View from "framework7-vue/src/components/view";
  import F7Page from "framework7-vue/src/components/page";
  import F7Button from "framework7-vue/src/components/button";
    export default {
      name: "sign-out",
      components: {F7Button, F7Page, F7View, F7List, F7ListButton},
      data() {
        return {}
      },
      methods: {
        logout() {
          auth.signOut()
          this.$store.commit('setUser', null)
        }
      }
    }
</script>

<style>
  .picture-center {
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;

    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>
