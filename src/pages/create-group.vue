<template>
  <f7-view>
  <f7-page>
    <div class="page-content">

      <p> <img src="/static/goahead.png" class="picture-center"/> </p>

      <f7-list no-hairlines-md>


      <f7-list form>

        <f7-list-item>
          <f7-icon icon-f7="demo-list-icon" slot="media"></f7-icon>
        <f7-input :value="tempname" @input="tempname = $event.target.value"  type="text" placeholder="Group name" clear-button></f7-input>


        </f7-list-item>
      </f7-list>

    </f7-list>

    <p class="segmented">
      <f7-button :disabled=disabled v-on:click="createGroup" class="loader" >Create</f7-button>
    </p>

    </div>

  </f7-page>
  </f7-view>
</template>
<script>
  import F7Page from "framework7-vue/src/components/page";
  import F7Row from "framework7-vue/src/components/row";
  import F7Toolbar from "framework7-vue/src/components/toolbar";
  import F7ListItem from "framework7-vue/src/components/list-item";
  import F7SwipeoutActions from "framework7-vue/src/components/swipeout-actions";
  import F7SwipeoutButton from "framework7-vue/src/components/swipeout-button";
  import F7List from "framework7-vue/src/components/list";
  import F7Navbar from "framework7-vue/src/components/navbar";
  import F7Col from "framework7-vue/src/components/col";
  import F7NavTitle from "framework7-vue/src/components/nav-title";
  import F7Block from "framework7-vue/src/components/block";
  import F7Searchbar from "framework7-vue/src/components/searchbar";
  import F7Link from "framework7-vue/src/components/link";
  import F7Icon from "framework7-vue/src/components/icon";
  import F7View from "framework7-vue/src/components/view";
  import {db, auth} from '../firebase'
  import shortid from "shortid"



  export default {
    components: {
      F7View,
      F7Icon,
      F7Link,
      F7Searchbar,
      F7Block,
      F7NavTitle,
      F7Col,
      F7Navbar,
      F7List,
      F7SwipeoutButton,
      F7SwipeoutActions,
      F7ListItem,
      F7Toolbar,
      F7Row,
      F7Page
    },
    data () {
      return {
        tempname: '',
        usergroup: {
          name: '',
          active: true,
          gid: '',
          code: ''
        },
        dbgroup: {
          members: [],
          places: [],
          start: false,
          name: '',
          code: ''
        },
        me: {
          name: '',
          uid: ''
        },
        disabled: true
      }
    },
    firebase: function () {
      return {
        user: {
          source: db.ref('users/' + auth.currentUser.uid)
        }
      }
    },
    methods: {
      createGroup() {
        var shortid = require('shortid')
        var c = shortid.generate()
        this.usergroup.name = this.tempname
        this.usergroup.code = c
        this.dbgroup.code = c
        this.me.name = this.$store.state.user.displayName
        this.me.uid = this.$store.state.user.uid
        this.dbgroup.members.push(this.me)
        this.dbgroup.name = this.tempname
        const ukey = db.ref('users/' + this.$store.state.user.uid + '/groups/').push(this.usergroup).getKey()
        db.ref('users/' + this.$store.state.user.uid + '/groups/').child(ukey).update({'gid': ukey})
        this.dbgroup.gid = ukey
        db.ref('groups/'+ukey).set(this.dbgroup)
        this.clear()
        this.$f7.dialog.alert('Create success! You can check your group id in home menu ヾ(＾∇＾)')
      },
      clear() {
        this.usergroup.name = ''
        this.usergroup.gid = ''
        this.usergroup.code = ''
        this.dbgroup.members = []
        this.dbgroup.places = []
        this.dbgroup.gid = ''
        this.dbgroup.name = ''
        this.dbgroup.code = ''
        console.log('clear input!')
      }
    },
    watch: {
      tempname: function () {
        console.log(this.tempname)
        if (this.tempname !== '') {
          this.disabled = false
        }
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
