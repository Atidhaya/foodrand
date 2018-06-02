<template>
  <f7-view id="sign-up">
    <f7-page>
      <f7-navbar title="Sign up" back-link="Back"></f7-navbar>
      <f7-list form>
        <f7-list-item>
          <f7-label>Name</f7-label>
          <f7-input type="text" placeholder="Name"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>E-mail</f7-label>
          <f7-input type="email" placeholder="E-mail"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Password</f7-label>
          <f7-input type="password" placeholder="Password"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Confirm Password</f7-label>
          <f7-input type="password" placeholder="Password"></f7-input>
        </f7-list-item>

        <f7-list-item v-for="n in 1" :key="n" checkbox name="my-checkbox" :value="n" :title="'I\'ve read and agree on terms and conditions'"></f7-list-item>

        <f7-row tag="p">
        <f7-button class="col" round outline>Sign me up</f7-button>
        </f7-row>

        <p class="segmented">
          <f7-button class="button button-outline">Sign me up</f7-button>
        </p>

      </f7-list>

    </f7-page>
  </f7-view>
</template>
<script>
  import F7View from "framework7-vue/src/components/view";

  export default {components: {F7View}}
</script>
