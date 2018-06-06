<template xmlns:>
  <f7-page color-theme="orange" >
    <!--swipeable-->
  <f7-tabs swipeable animated>
    <f7-tab id="create-group" >
    <create-group></create-group>

    </f7-tab>

    <f7-tab id="home" tab-active>


      <f7-page>

      <f7-link @click="r()">go to j</f7-link>
      <f7-row >
        <f7-col >
          <div class="swiper-container swiper-init demo-swiper" data-pagination='{"el": ".swiper-pagination"}'>
            <div class="swiper-pagination"></div>
            <div class="swiper-wrapper">
              <div class="swiper-slide">Ad 1</div>
              <div class="swiper-slide">Ad 2</div>
              <div class="swiper-slide">Ad 3</div>
              <div class="swiper-slide">Ad 4</div>
              <div class="swiper-slide">Ad 5</div>
            </div>
          </div>
        </f7-col>
      </f7-row>
      <f7-row >
        <f7-navbar >
          <f7-nav-title>Group List</f7-nav-title>
        </f7-navbar>
      </f7-row>

      <f7-block>
        <f7-searchbar
          placeholder ="Search"
          search-container="#search-list"
          search-item="li"
          search-in=".item-title"

        ></f7-searchbar>
        <!--Loading Symbol, Will be disable when groups is loaded-->
        <f7-popover :opened= loading >
          <f7-preloader color="orange" size="44px"></f7-preloader>
        </f7-popover>

        <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
        <f7-list class="searchbar-not-found">
          <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list>

        <!--<f7-page>-->
        <!-- Search through this list -->
        <f7-list class="searchbar-found" id="search-list">

          <!--:title="group.name"-->
          <f7-list-item  v-for="group in groups"   @swipeout:deleted="leaveGroup">
            <p @click="selectGroup(group['.key'],group.name)" >{{group.name}}</p>
            <f7-button @click="leaveGroup(group['.key'])">Leave</f7-button>
            <!--<f7-swipeout-actions>-->
              <!--<f7-swipeout-button delete>Delete</f7-swipeout-button>-->
            <!--</f7-swipeout-actions>-->
          </f7-list-item>
        </f7-list>

        <!--</f7-page>-->
      </f7-block>

      </f7-page>

    </f7-tab>

    <f7-tab id="join-group" >
      <f7-link @click="r()">go to j</f7-link>
      <join-group></join-group>

    </f7-tab>
  </f7-tabs>


  <f7-toolbar tabbar labels>
    <f7-link icon-f7="icon-add" text="New group" tab-link="#create-group" ></f7-link>
    <f7-link  icon-f7="icon-home" text="Home" tab-link="#home" tab-link-active ></f7-link>
    <f7-link icon-f7="icon-login" text="Join group" tab-link="#join-group" ></f7-link>
  </f7-toolbar>

    <!--<f7-button @click="closePopup()">Back</f7-button>-->
    <f7-popup :opened= popupOpen @popup:close="closePopup()" >
      <f7-button @click="closePopup()">Back</f7-button>
      <group-dashboard :gid= groupTarget  @closePopup="closePopup"  ></group-dashboard>
    </f7-popup>

  </f7-page>

  <!--<f7-page>-->
    <!--<f7-navbar>-->
      <!--<f7-nav-left>-->
        <!--<f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>-->
      <!--</f7-nav-left>-->
      <!--<f7-nav-title>My App</f7-nav-title>-->
      <!--<f7-nav-right>-->
        <!--<f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>-->
      <!--</f7-nav-right>-->
    <!--</f7-navbar>-->
    <!--<f7-toolbar>-->
      <!--<f7-link>Left Link</f7-link>-->
      <!--<f7-link>Right Link</f7-link>-->
    <!--</f7-toolbar>-->
    <!--<f7-block strong>-->
      <!--<p>Here is your blank Framework7 app. Let's see what we have here.</p>-->
    <!--</f7-block>-->
    <!--<f7-block-title>Navigation</f7-block-title>-->
    <!--<f7-list>-->
      <!--<f7-list-item link="/about/" title="About"></f7-list-item>-->
      <!--<f7-list-item link="/form/" title="Form"></f7-list-item>-->
    <!--</f7-list>-->
    <!--<f7-block-title>Modals</f7-block-title>-->
    <!--<f7-block strong>-->
      <!--<f7-row>-->
        <!--<f7-col width="50">-->
          <!--<f7-button fill raised popup-open="#popup">Popup</f7-button>-->
          <!--<f7-button fill raised popup-open="#popup2">Popup2</f7-button>-->
        <!--</f7-col>-->
        <!--<f7-col width="50">-->
          <!--<f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>-->
        <!--</f7-col>-->
      <!--</f7-row>-->
    <!--</f7-block>-->
    <!--<f7-block-title>Panels</f7-block-title>-->
    <!--<f7-block strong>-->
      <!--<f7-row>-->
        <!--<f7-col width="50">-->
          <!--<f7-button fill raised panel-open="left">Left Panel</f7-button>-->
        <!--</f7-col>-->
        <!--<f7-col width="50">-->
          <!--<f7-button fill raised panel-open="right">Right Panel</f7-button>-->
        <!--</f7-col>-->
      <!--</f7-row>-->
    <!--</f7-block>-->
    <!--<f7-list>-->
      <!--<f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>-->
      <!--<f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>-->
    <!--</f7-list>-->
  <!--</f7-page>-->

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
import CreateGroup from "./create-group";
import JoinGroup from "./join-group";
import F7View from "framework7-vue/src/components/view";
import F7Popup from "framework7-vue/src/components/popup";
import F7Button from "framework7-vue/src/components/button";
import GroupDashboard from "./group-dashboard";
import F7Tab from "framework7-vue/src/components/tab";
import F7Tabs from "framework7-vue/src/components/tabs";
import {db,auth} from '../firebase.js';
import F7Preloader from "framework7-vue/src/components/preloader";
import F7Popover from "framework7-vue/src/components/popover";



export default {components: {
    F7Popover,
    F7Preloader,
    F7Tabs,
    F7Tab,
    GroupDashboard,
    F7Button,
    F7Popup,
    F7View,
    JoinGroup,
    CreateGroup,
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
        items: [{gid: '1', name: 'group 1',
          info: 'Food and stuff'},
          {gid: '2', name: 'group 2',
            info: 'Games'},
          {gid: '3', name: 'group 3',
            info: 'whatever'}],
      groupList: [],
      loading: true,
      popupOpen: false,
      groupTarget: '',
      vlData: {},
    }
  },
  firebase: function () {
    return {
      // groups:{
      //   source: db.ref('/groups/')
      // },
      groups:{
        source: db.ref('/users/' + auth.currentUser.uid + '/groups')
      }
    }
  },
  methods: {
    r(){
      // console.log(this)
      console.log(this.groups);
      // this.$f7router.navigate('/j/')
      // this.updateGroupList()
    },
    updateGroupList (){
      // const uid = this.$store.state.user.uid
      // const uid ="6oJhVsJRpmgY4yFMQthMs9JzZXj1"
      let temp =[]
      const uid = "bsbbteLSIMOg4vhIuZa1m91LZRe2"
      const userInfo = this.users.filter(user => user['.key'] === uid)[0]
      // if(userInfo.)
      //If user is in a group
      console.log(userInfo.groups)
      if(userInfo.groups !== undefined){
        console.log(userInfo.groups)
        // let iter = userInfo.groups.values()
        for (let userGroup in userInfo.groups) {
          // const groupKey = userGroup['.key']
          console.log(groups[groupKey])
        }
        // for(let i = 0; i<userInfo.groups.length; i++){
        //   const groupKey = userInfo.groups[i]['.key']
        //   console.log(groups[groupKey])
        //   // temp.push(groups[groupKey])
        // }

        // temp = this.groups.filter(group =>
        //   userInfo.groups.some(userGroup =>
        //     userGroup['.key'] === group['.key']))
      }
      // let temp = this.

      // this.groupList = temp
    },
    leaveGroup( gid ){
      const uid = this.$store.state.user.uid
      this.$firebaseRefs.groups.child(gid).child('members').child(uid).remove()
      console.log("Delete Member ... ", uid ,' in ' , gid)
      //Access that member group list and set flag group
      this.$firebaseRefs.all.child('users').child(uid).child('groups').child(gid).remove()
      console.log('Leave',gid)
      // this.updatePlacesAndMembers()
    },
    selectGroup( id, name ){
      console.log('SELECT',id,name)
      this.popupOpen = true
      this.groupTarget = id
    },
    closePopup(){
      this.popupOpen = false
    },
    searchList (query, items) {
      var found = [];
      for (var i = 0; i < items.length; i += 1) {
        if (items[i].title.toLowerCase().indexOf(query) >= 0 || query.trim() === '') found.push(i);
      }
      return found; // return array with mathced indexes
    },
    renderExternal(vl, vlData) {
      this.vlData = vlData;
    },
  },
  watch: {
    groups() {

    }
  }
}
</script>

<style>
  div[class*="row"] {
    background: #fff;
    text-align: center;
    color: #000;
    border: 1px solid #ddd;
    padding: 5px;
    margin-bottom: 15px;
    font-size: 12px;
  }

  .demo-swiper .swiper-slide {
    font-size: 25px;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: #000;
  }
  .demo-swiper .swiper-slide {
    box-sizing: border-box;
    border: 1px solid #ddd;
    background: #fff;
  }
  .demo-swiper {
    margin: 0px 0 0px;
    font-size: 18px;
    height: 120px;
  }
  /*.demo-swiper.demo-swiper-auto .swiper-slide {*/
    /*width: 85%;*/
  /*}*/
  /*.demo-swiper.demo-swiper-auto .swiper-slide:nth-child(2n) {*/
    /*width: 70%;*/
  /*}*/
  /*.demo-swiper.demo-swiper-auto .swiper-slide:nth-child(3n) {*/
    /*width: 30%;*/
  /*}*/
  .statusbar {
    background: pink;
  }
</style>
