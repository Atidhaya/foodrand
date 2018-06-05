<template>
  <div id="sign-in">
  <f7-page login-screen>
    <f7-login-screen-title> Foodrand </f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Email</f7-label>
        <f7-input :value="email" @input="email = $event.target.value" type="text" placeholder="Your email"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input :value="password" @input="password = $event.target.value" type="password" placeholder="Your password"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button login-screen-close v-on:click="login">Sign In</f7-list-button>
      <f7-block-footer>Don't have account?.<f7-link href="/sign-up/">Sign up</f7-link>
      </f7-block-footer>
    </f7-list>
  </f7-page>
  </div>
</template>

<script>
  import F7Link from "framework7-vue/src/components/link";
  import F7Page from "framework7-vue/src/components/page";
  import F7LoginScreenTitle from "framework7-vue/src/components/login-screen-title";
  import F7ListItem from "framework7-vue/src/components/list-item";
  import F7Label from "framework7-vue/src/components/label";
  import F7List from "framework7-vue/src/components/list";
  import F7Input from "framework7-vue/src/components/input";
  import F7ListButton from "framework7-vue/src/components/list-button";
  import F7BlockFooter from "framework7-vue/src/components/block-footer";

  export default {
    components: {
      F7BlockFooter,
      F7ListButton, F7Input, F7List, F7Label, F7ListItem, F7LoginScreenTitle, F7Page, F7Link},
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
      }
    }
  }
</script>
