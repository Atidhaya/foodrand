<template>
  <f7-view id="group-create">
    <f7-page>
      <f7-navbar title="Create group" back-link="Back"></f7-navbar>
      <f7-list form>
        <f7-list-item>
          <f7-label>Name</f7-label>
          <f7-input type="text" placeholder="Name"></f7-input>
        </f7-list-item>

        <f7-list-item v-for="n in 1" :key="n" checkbox name="my-checkbox" :value="n" :title="'I\'ve read and agree on terms and conditions'"></f7-list-item>

        <f7-row tag="p">
          <f7-button class="col" round outline>Create</f7-button>
        </f7-row>

        <p class="segmented">
          <f7-button class="button button-outline">Create</f7-button>
        </p>

      </f7-list>

    </f7-page>
  </f7-view>
</template>

<script>
    export default {
        name: "group-create"
    }
</script>

<style scoped>

</style>
