<template xmlns:>
  <f7-page color-theme="orange" class="nopadding">
  <f7-tabs swipeable animated>

    <f7-tab id="create-group" >
    <create-group></create-group>
    </f7-tab>

    <f7-tab id="home" tab-active >
      <f7-page id="noPadding">


      <!--<f7-link @click="r()">HOMEDEBUG</f7-link>-->
      <f7-row >
        <f7-col >
          <div class="swiper-container swiper-init demo-swiper" data-pagination='{"el": ".swiper-pagination"}'>
            <div class="swiper-pagination"></div>
            <div class="swiper-wrapper">
              <div class="swiper-slide"> <img src="static/foodrand.png" style="width: 200px"/> </div>
              <div class="swiper-slide">Ad 2</div>
              <div class="swiper-slide"><img src="static/aj.jpg" style="width: 300px; height: 150px"/></div>
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


        <f7-list class="searchbar-found" id="search-list">
          <f7-list-item   v-for="group in userGroups"   @swipeout:deleted="leaveGroup">

            <p @click="selectGroup(group['.key'],group.name)" >{{group.name}}</p>
            <f7-button @click="leaveGroup(group['.key'])">Leave</f7-button>

          </f7-list-item>
        </f7-list>

      </f7-block>
      </f7-page>
    </f7-tab>

    <f7-tab id="join-group" >
      <!--<f7-link @click="r()">go to j</f7-link>-->
      <join-group></join-group>

    </f7-tab>

    <f7-tab id="sign-out" >
      <sign-out></sign-out>
    </f7-tab>

  </f7-tabs>


  <f7-toolbar tabbar labels>
    <f7-link icon-f7="icon-add" text="New group" tab-link="#create-group" ></f7-link>
    <f7-link  icon-f7="icon-home" text="Home" tab-link="#home" tab-link-active ></f7-link>
    <f7-link icon-f7="icon-download" text="Join group" tab-link="#join-group" ></f7-link>
    <f7-link icon-f7="icon-logout" text="Signout" tab-link="#sign-out"></f7-link>
    <!--<f7-link icon-f7="icon-add" text="Initiate" tab-link="#initiate"></f7-link>-->
  </f7-toolbar>

    <!--<f7-button @click="closePopup()">Back</f7-button>-->
    <f7-popup :opened= popupOpen @popup:close="closePopup()" >
      <f7-button @click="closePopup()">Back</f7-button>
      <group-dashboard :gid= groupTarget  @closePopup="closePopup"  ></group-dashboard>
    </f7-popup>


  </f7-page>

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
import SignOut from "../authentication/sign-out";
import Initiate from "./Initiate";
import {Dom7} from "framework7";
import * as Framework7 from "framework7";
import F7Progressbar from "framework7-vue/src/components/progressbar";
import F7Swiper from "framework7-vue/src/components/swiper";
import F7SwiperSlide from "framework7-vue/src/components/swiper-slide";



export default {components: {
    F7SwiperSlide,
    F7Swiper,
    F7Progressbar,
    Initiate,
    SignOut,
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
  props: ['popupOverrideFlag'],
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
      user: auth.currentUser,
      vlData: {},
      // groups: [],
      reload: true,
      infiniteLoading: true,
    }
  },

  firebase: function () {
  this.$store.dispatch('getUser')
    console.log('dispatched user')
    return {
      groups:{
        source: db.ref('/groups/')
      },
      userGroups:{
        source: db.ref('/users/'+auth.currentUser.uid+'/groups')
      },
      users:{
        source: db.ref('/users/')
      }
    }
  },
  methods: {
    r(){
      console.log(this.infiniteLoading)
      console.log(this.groups);
      console.log(this.users);
      console.log(this.groupList);
      console.log(this.$store.state.going)

    },
    updateGroupList (){
      const uid = this.$store.state.user.uid
      // const uid = "bsbbteLSIMOg4vhIuZa1m91LZRe2"
      const userInfo = this.users.filter(user => user['.key'] === uid)[0]
      //If user is in a group
      // console.log(userInfo.groups)
      if(userInfo.groups !== undefined){
          this.groupList = userInfo.groups
        }
   },
    findIndexUsingKey (list, key){
      for(let i = 0; i<list.length; i++){
        // console.log(list[i],key)
        if(list[i]['.key'] === key){
          return i
        }
      }
      return -1
    } ,
    findIndexUsingUid (list, targetUid){
      // console.log('TargetList: ',list)
      for(let i = 0; i<list.length; i++){
        // console.log(list[i],targetUid)
        if(list[i].uid === targetUid){
          return i
        }
      }
      return -1
    },
    leaveGroup( gid ){
      const uid = this.$store.state.user.uid
      const groupIndex = this.findIndexUsingKey(this.groups, gid)
      const userIndex = this.findIndexUsingUid(this.groups[groupIndex].members,uid)

      if(this.groups[groupIndex].members.length === 1){
        console.log("Last user !! Delete the group")
        this.$firebaseRefs.groups.child(gid).remove()
      }else{
        this.$firebaseRefs.groups.child(gid +'/members/' + userIndex).remove()
      }
      // console.log("Delete Member ... ", uid ,' in ' , gid)

      //Access that member group list and set flag group
      // console.log('UserGroup',this.userGroups)
      this.$firebaseRefs.userGroups.child(gid).remove()
      // console.log('Leave',gid)
      this.updateGroupList()
    },
    selectGroup( id, name ){
      // console.log('SELECT',id,name)
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
  computed: {
    popupOverride () {
      return  this.$store.state.going
    }
  },
  watch: {
    groups() {
      console.log("Groups Watch")
      this.updateGroupList()
    },
    popupOverride(){
      console.log("OVERRIDE POPUP")
      this.closePopup()
    },

  },

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
  .noPadding {
    padding: 0 0 0 0;
  }
  .noPadding:after{
    content: '';
    height: 48px; /* required padding bottom */
    display: block;
    width: 1px;
  }
  .item{
    width: 100%;
  }
</style>
