<template>
  <!--<f7-view>-->


  <f7-page color-theme="orange" dark>
      <!--<f7-link @click="$f7router.navigate('/about/')">About</f7-link>-->
      <f7-button @click="$emit('closePopup')">Back</f7-button>
    <!--<f7-navbar sliding back-link="Back">-->

    <!--</f7-navbar>-->
      <f7-button @click="a()">sdsdsd</f7-button>
      <f7-toolbar tabbar >
        <f7-link icon="icon-add" text="Members" tab-link="#members" ></f7-link>
        <f7-link icon="icon-home" text="Food Places" tab-link="#places" ></f7-link>

      </f7-toolbar>
      <f7-button outline color="green" fill raised big>START</f7-button>

      <f7-tabs swipeable>
        <f7-tab id="members">
          <f7-block inset>
          <p>MEMBERS</p>
            <f7-list contacts-list v-for="member in members"  >
              <f7-list-item :title="member.name" @click="openPopoverUser(member.name,member.uid)"></f7-list-item>
            </f7-list>
          </f7-block>

        </f7-tab>
        <f7-tab id="places">
          <f7-block inset>
          <p>FOOD</p>
            <f7-link @click: >Add Food Place</f7-link>
            <f7-list contacts-list v-for="place in places"  >
              <f7-list-item :title="place.name" @click="openPopoverFood(place.name)"></f7-list-item>
            </f7-list>
            </f7-block>
        </f7-tab>

      </f7-tabs>

      <!--User Popover-->
      <f7-popover @popover:closed="closePopoverUser()"  :opened="popoverOpenUser">
        <f7-list>
          <f7-list-button color="red" @click="deleteMember()">Kick {{this.targetUserName}} from the group?</f7-list-button>
          <!--<f7-list-button color="green">Green Button</f7-list-button>-->
        </f7-list>
      </f7-popover>

      <!--Food place Popover-->
      <f7-popover @popover:closed="closePopoverFood()"  :opened="popoverOpenFood">
        <f7-list>
          <f7-list-button color="red" @click="deleteFood()">Delete {{this.targetFood}} from the list?</f7-list-button>
          <!--<f7-list-button color="green">Green Button</f7-list-button>-->
        </f7-list>
      </f7-popover>





    </f7-page>
  <!--</f7-view>-->
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
  import F7Button from "framework7-vue/src/components/button";
  import F7ListButton from "framework7-vue/src/components/list-button";
  import F7Tab from "framework7-vue/src/components/tab";
  import F7Popover from "framework7-vue/src/components/popover";
  import F7View from "framework7-vue/src/components/view";
  import F7Tabs from "framework7-vue/src/components/tabs";
  import {db} from '../firebase.js';


  export default {components: {
      F7Tabs,
      F7View,
      F7Popover,
      F7Tab,
      F7ListButton,
      F7Button,
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
    props: ['gid','closeFunction'],
    data () {
      return {
        alertMessage:'',
        targetUserName: '',
        targetUser: '',
        targetFood: '',
        popoverOpenFood: false,
        popoverOpenUser: false,
        addPlacePopover: false,
        members: {},
        groups: [],
        places: {},
        vlData: {},
      }
    },
    firebase: function () {
      return {
        groups:{
          source: db.ref('/groups/')
        },
        // members: {
        //   source: db.ref('/groups/'+this.gid+'/members')
        // },
        // places: {
        //   source: db.ref('/groups/')
        // },
        all: {
          source: db.ref('/')
        }
      }
    },
    methods: {
      a() {
        console.log(this.popoverOpen)
        console.log('Gid: ',this.gid.toString())
        console.log('Groups ',this.groups)
        console.log('Members ',this.members)
        console.log('Places ',this.places)
        console.log('all ',this.all)
        console.log('placesList ',this.placesList )
        this.updatePlacesAndMembers()
        // this.$f7router.navigate('/about/')
        // this.$f7.router.navigate('/about/')
        // view.router.navigate('/about/')
      },
      updatePlacesAndMembers (){
        for (var i =0; i < this.groups.length; i++){
          console.log(this.groups[i]['.key'])
          if(this.groups[i]['.key'] === this.gid){
            console.log('found group ',this.groups[i]['.key'])
            //Found the group
            this.members = this.groups[i].members
            this.places = this.groups[i].places
            return true
          }
        }
        return false

      },
      // toast() {
      //   app.toast.create({
      //     icon: app.theme === 'ios' ? '<i class="f7-icons">star</i>' : '<i class="material-icons">star</i>',
      //     text: 'I\'m with icon',
      //     position: 'center',
      //     closeTimeout: 2000,
      //   });
      // },
      openAddPlaces (){
        this.addPlacePopover = true
      },
      closeAddPlaces (){
        this.addPlacePopover = false
      },
      openPopoverFood (name) {
        this.targetFood = name
        this.popoverOpenFood =true
        console.log("Target ",this.targetFood)
      },
      closePopoverFood() {
        this.popoverOpenFood =false
      },
      closePopoverUser (){
        this.popoverOpenUser = false
      },
      openPopoverUser (name,uid){
        this.targetUser = uid
        this.targetUserName = name
        this.popoverOpenUser = true
        console.log("Target ",this.targetUser)
      },
      deleteFood () {
        const name = this.targetFood
        console.log('DELETE FOOD',name)
        // toast()
        this.closePopoverFood()
      },
      deleteMember(){
        const uid = this.targetUser
        console.log('DELETE USER',uid)

        this.closePopoverUser()
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
      placesList () {
        return this.updatePlacesAndMembers()
      }
    }
  }
</script>
