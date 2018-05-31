<template>
  <div id="sign-in">
  <f7-page login-screen>
    <f7-login-screen-title>My App</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Username</f7-label>
        <f7-input type="text" placeholder="Your username"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button login-screen-close>Sign In</f7-list-button>
      <f7-block-footer>Don't have account?.<f7-link href="/sign-up/">Sign up</f7-link>
      </f7-block-footer>
    </f7-list>
  </f7-page>
  </div>
</template>
<script>
  import F7Link from "framework7-vue/src/components/link";

  export default {components: {F7Link}}
</script>
