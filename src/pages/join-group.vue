<template>
  <f7-view>
  <f7-page>

    <div class="page-content">

      <p><img src="/static/backup.png" class="picture-center"/></p>

      <f7-list no-hairlines-md>


        <f7-list form>

          <f7-list-item>
            <f7-icon icon-f7="demo-list-icon" slot="media"></f7-icon>
            <f7-input :value="code" @input="code = $event.target.value"  type="text" placeholder="Group code here...!" clear-button></f7-input>


          </f7-list-item>
        </f7-list>

      </f7-list>

      <p class="segmented">
        <f7-button :disabled=disabled v-on:click="join" class="loader" >Join group!</f7-button>
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
  import F7Input from "framework7-vue/src/components/input";
  import shortid from "shortid"
  import {auth, db} from '../firebase'


  export default {components: {
      F7Input,
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
        code: '',
        disabled: true,
      }
    },
    firebase: function () {
      return {
        allgroups: {
          source: db.ref('groups/')
        }
      }
    },
    methods: {
      join() {
        var temp = []
        var shortid = require('shortid')
        if (shortid.isValid(this.code)) {
          for (let i = 0; i < this.allgroups.length; i++) {
            if (this.allgroups[i].code === this.code) {
              db.ref('groups/' + this.allgroups[i]['.key']).once('value').then(function (snapshot) {
                console.log(snapshot.val().members)
                temp = snapshot.val().members
              }).then( () => {
                console.log(this.$store.state.user.displayName)
                const user = {name: auth.currentUser.displayName, uid: auth.currentUser.uid}
                console.log(user)
                temp.push(user)
                // db.ref('groups/' + key + '/members').set(temp)
              })
            }
          }
          this.$f7.dialog.alert('valid!')
        }
        else {
          this.$f7.dialog.alert('invalid code group!')
        }
      }
    },
    watch: {
      code: function () {
        console.log(this.code)
        if (this.code !== '') {
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
