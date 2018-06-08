<template>
  <f7-view>
  <f7-page>


        <!--<f7-list>-->

          <!--<f7-list-item >-->
            <div>
            <img src="static/backup.png" class="item"/>

            <br/>
            </div>

          <!--</f7-list-item>-->

        <!--</f7-list>-->

    <!--<f7-list no-hairlines-md o-hairlines-ios no-hairlines-between>-->

        <f7-list form no-hairlines-md o-hairlines-ios no-hairlines-between>

          <f7-list-item>
            <f7-input :value="code" @input="code = $event.target.value"  type="text" placeholder="Group code here...!" clear-button></f7-input>


          </f7-list-item>
        </f7-list>

      <!--</f7-list>-->
      <p class="segmented">
        <f7-button :disabled=disabled v-on:click="join" class="loader" >Join group!</f7-button>
      </p>

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
  import {auth, db} from '../firebase'
  import F7Button from "framework7-vue/src/components/button";


  export default {components: {
      F7Button,
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
        me: {
          name: '',
          uid: ''
        }
      }
    },
    firebase: function () {
      return {
        allgroups: {
          source: db.ref('groups/')
        },
        mygroups: {
          source: db.ref('users/' + auth.currentUser.uid + '/groups')
        }
      }
    },
    methods: {
      join() {
        var found = false
        this.me.name = auth.currentUser.displayName
        this.me.uid = auth.currentUser.uid
        var temp = []
        let gname = ''
        var shortid = require('shortid')
        if (shortid.isValid(this.code)) {
          for (let i = 0; i < this.allgroups.length; i++) {
            if (this.allgroups[i].code === this.code) {
              found = true
              if (this.mygroups.some(c => c.code === this.code)) {
                this.$f7.dialog.alert('You\'re already in this group (✖╭╮✖) ')
              }
              else {
                db.ref('groups/' + this.allgroups[i]['.key']).once('value').then(function (snapshot) {
                  temp = snapshot.val().members
                  gname = snapshot.val().name
                }).then(() => {
                  const user = {name: auth.currentUser.displayName, uid: auth.currentUser.uid}
                  temp[auth.currentUser.uid] = user
                  db.ref('groups/' + this.allgroups[i]['.key']).child('members').set(temp)
                  db.ref('users/' + auth.currentUser.uid + '/groups/' + this.allgroups[i]['.key']).set({
                    'name': gname,
                    'active': true,
                    'gid': this.allgroups[i]['.key'],
                    'code': this.code})
                  this.$f7.dialog.alert('join success! ヾ（〃＾∇＾）ﾉ♪')
                })
              }
            }
          }
          if(!found) {
            this.$f7.dialog.alert('invalid code group! (✖╭╮✖)')
          }
        }
        else {
          this.$f7.dialog.alert('invalid code group! (✖╭╮✖)')
        }
      }
    },
    watch: {
      code: function () {
        if (this.code !== '') {
          this.disabled = false
        }
      }
    }
  }
</script>

<style>
  /*.picture-center {*/
    /*position: absolute;*/
    /*top: 7%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*display: block;*/

    /*text-align: center;*/
    /*margin-left: auto;*/
    /*margin-right: auto;*/
  /*}*/
  .item{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45%;
  }
</style>
