<template>
  <f7-view>

  <f7-page color-theme="orange" dark>

    <!--<f7-button @click="a()">sdsdsd</f7-button>-->

    <f7-button outline color="green" fill raised big @click="start()">Let's go eat!</f7-button>

      <f7-tabs  animated>

        <f7-tab id="members" tab-active>
          <f7-block inset>
            <div class="codeBox"  >
              <p></p>
              <br/>
            <f7-block style="color: #7a7a7a">
            <p class="gid" >:Access Code:</p><br/>
            <h1 class="gid" >{{this.code}}</h1><br/>
            </f7-block>
              <p></p>
              <br/>
            </div>
            <!--<h2 class="gid" >hhhhhhjhhhkjhkjhkjhjkhjkhkjhjkkjhk</h2>-->
            <p>MEMBERS</p>
            <f7-list contacts-list v-for="member in members"  >
              <f7-list-item :title="member.name" @click="openPopover(member.name,member.uid,'user')"></f7-list-item>
            </f7-list>
          </f7-block>

        </f7-tab>
        <f7-tab id="places">
          <f7-block inset>
          <p>FOOD</p>
            <f7-link @click="createFood" >Add Food Place</f7-link>
            <f7-list contacts-list v-for="place in places"  >
              <f7-list-item :title="place.name" @click="openPopover(place.name,place.key,'food')"></f7-list-item>
            </f7-list>
            </f7-block>
        </f7-tab>

      </f7-tabs>

      <!--User Popover-->
      <f7-popover class=""  @popover:closed="closePopoverUser()"  :opened="popoverOpenUser">
        <f7-list>
          <f7-list-button color="red" @click="deleteMember()">Kick {{this.targetName}} from the group?</f7-list-button>
          <!--<f7-list-button color="green">Green Button</f7-list-button>-->
        </f7-list>
      </f7-popover>

      <!--Food place Popover-->
      <f7-popover  @popover:closed="closePopoverFood()"  :opened="popoverOpenFood">
        <f7-list>
          <f7-list-button color="red" @click="deleteFood()">Delete {{this.targetName}} from the list?</f7-list-button>
          <!--<f7-list-button color="green">Green Button</f7-list-button>-->
        </f7-list>
      </f7-popover>

    <f7-popup :opened= popupStart >
      <!--<f7-button @click="closePopup()">Back</f7-button>-->
      <initiate :gid= this.gid ></initiate>
    </f7-popup>

    <f7-toolbar tabbar labels>
      <f7-link icon-f7="persons_fill" text="Members" tab-link="#members" ></f7-link>
      <f7-link icon-f7="heart_fill" text="Food Places" tab-link="#places" ></f7-link>
    </f7-toolbar>

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
  import F7Button from "framework7-vue/src/components/button";
  import F7ListButton from "framework7-vue/src/components/list-button";
  import F7Tab from "framework7-vue/src/components/tab";
  import F7Popover from "framework7-vue/src/components/popover";
  import F7View from "framework7-vue/src/components/view";
  import F7Tabs from "framework7-vue/src/components/tabs";
  import {auth,db} from '../firebase.js';
  import F7Popup from "framework7-vue/src/components/popup";
  import Initiate from "./Initiate";


  export default {components: {
      Initiate,
      F7Popup,
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
        targetId:'',
        targetName: '',
        popoverOpenFood: false,
        popoverOpenUser: false,
        addPlacePopover: false,
        popupStart: false,
        members: [],
        groups: [],
        places: {},
        vlData: {},
        code:'',
      }
    },

    firebase: function () {
      return {
        groups:{
          source: db.ref('/groups/')
        },
        // groupInfo: {
        //   source: db.ref('/groups/'+this.gid)
        // },
        // places: {
        //   source: db.ref('/groups/'+this.gid+'/places/')
        // },
        users:{
          source: db.ref('/users/')
        },
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
        console.log('GroupsInfo ',this.groupInfo)
        console.log('Members ',this.members)
        console.log('Places ',this.places)
        console.log('all ',this.all)
        console.log('placesList ',this.placesList )
        // this.$firebaseRefs.all.push("test push 1")
        // this.updatePlacesAndMembers()
        // this.$f7router.navigate('/about/')
        // this.$f7.router.navigate('/about/')
        // view.router.navigate('/about/')
      },

      start (){
        // console.log("Starting Rand")
        db.ref('groups/'+this.gid+'/going').set({name:auth.currentUser.displayName, uid:auth.currentUser.uid})
        db.ref('groups/'+this.gid).update({'start':true})
        this.popupStart =true
        this.initiate()
      },
      createFood (){
        // console.log("Add food")
        this.$f7.dialog.prompt('Enter your preferred food','Add Food',this.addFood )
      },
      deleteFood(){
        const key =this.targetId
        // console.log("Remove... ", key)
        this.$firebaseRefs.groups.child(this.gid).child('places').child(key).remove()
        this.updatePlacesAndMembers()
        this.closePopoverFood()
      },
      addFood (food){
        // console.log("Add...", food)
        const key = this.$firebaseRefs.groups.child(this.gid).child('places').push({name: food}).getKey()
        this.$firebaseRefs.groups.child(this.gid).child('places').child(key).update({key: key})
        this.updatePlacesAndMembers()
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
          console.log(list[i],targetUid)
          if(list[i].uid === targetUid){
            return i
          }
        }
        return -1
      },
      findLength(list){
        let count = 0
        // console.log("Find l")
        for(let a in list){
          count = count + 1
          // console.log('item: ',list[a])
          // if(list.hasOwnProperty(key)) {
          //   console.log('item: ',list[key])
          // }
        }
        return count
      },
      deleteMember( ){
        const uid = this.targetId
        const groupIndex = this.findIndexUsingKey(this.groups, this.gid)
        const userIndex = this.findIndexUsingUid(this.groups[groupIndex].members,uid)
        // console.log('Groups',this.groups)
        // console.log("Groups User",this.groups[groupIndex].members[uid])
        // console.log("Users Group", this.users)
        // console.log("Delete Member ... ", uid ,' in ' , this.gid)
        // console.log("Length", this.groups[groupIndex].members.length)
        // console.log("Members", this.groups[groupIndex].members)
        const len = this.findLength(this.groups[groupIndex].members)
        // console.log("Get Length",len)
        if(len === 1){
          console.log("Last user !! Delete the group")
          this.$firebaseRefs.groups.child(this.gid).remove()
          this.$firebaseRefs.users.child(uid+'/groups/'+this.gid).remove()
          location.reload()
        }else{
          console.log("Not Last User")
          this.$firebaseRefs.groups.child(this.gid +'/members/' + uid).remove()
        }
        // console.log("Delete Member ... ", uid ,' in ' , this.gid)
        //Access that member group list and set flag group
        this.$firebaseRefs.users.child(uid+'/groups/'+this.gid).remove()
        // console.log('Leave',this.gid)
        this.updatePlacesAndMembers()
        this.closePopoverUser()
      },
      updatePlacesAndMembers (){
        for (var i =0; i < this.groups.length; i++){
          // console.log(this.groups[i]['.key'])
          if(this.groups[i]['.key'] === this.gid){
            // console.log('found group ',this.groups[i]['.key'])
            this.code = this.groups[i].code
            //Found the group
            this.members = this.groups[i].members
            this.places = this.groups[i].places
            return true
          }
        }
        return false

      },
      // openPopover (name,id,type) {
      //
      //   this.targetName = name
      //   this.targetId = id
      //   if(type === 'food'){
      //     this.popoverOpenFood =true
      //
      //   }else if (type === 'user'){
      //     this.popoverOpenUser = true
      //   }
      //
      //   // console.log("Target ",this.targetName)
      // },

      openPopover (name,id,type) {

        this.targetName = name
        this.targetId = id
        if(type === 'food'){
          this.$f7.dialog.confirm("Delete "+ this.targetName +" from the list?","Foodrand",this.deleteFood,this.closePopoverFood)

        }else if (type === 'user'){
          this.$f7.dialog.confirm("Kick "+ this.targetName +" from the list?","Foodrand",this.deleteMember,this.closePopoverFood)

        }

        // console.log("Target ",this.targetName)
      },
      closePopup() {
        this.popupStart = false
      },
      closePopoverFood() {
        this.popoverOpenFood = false
      },
      closePopoverUser (){
        this.popoverOpenUser = false
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
      initiate() {
        var temp = this.gid
        var group = []
        group.push({name:auth.currentUser.displayName, uid:auth.currentUser.uid})
        db.ref('groups/'+this.gid+'/going').set(group)
        db.ref('groups/'+this.gid).update({'start':true})
        db.ref('groups/'+this.gid+'/members').once('value').then(function (snapshot){
          for(let people in snapshot.val()){
            if(auth.currentUser.uid !== snapshot.val()[people].uid){
              db.ref('users/'+snapshot.val()[people].uid).update({'target': temp})
            }
          }
        })
      },
    },

    watch: {
      gid: function () {
        console.log('watch')
        this.updatePlacesAndMembers()
      },
      groups() {
        this.updatePlacesAndMembers()
      }

    }
  }
</script>

<style>
  .codeBox{
    border-radius: 10px;
    background-color: rgba(255,149,0,0.7);
    color: white;
  }
  .gid {
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
