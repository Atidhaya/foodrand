<template>

  <f7-view>


    <f7-page>


      <!--<div v-if="infiniteLoading" >-->
      <!--<f7-button v-on:click="initiate()" >Let's go eat!</f7-button>-->
      <!--</div>-->

      <div v-if="allowrandom" >
        <img src="static/chomp.png" class="item"/>
      <f7-button style="background-color: cornsilk" :disabled=waitForResponse v-on:click="randomize()" >Randomize!</f7-button>
      </div>

      <div v-if="infiniteLoading" >
      <f7-progressbar infinite color="multi"></f7-progressbar>
        <img src="static/waitforbackup.png" class="item"/>
      </div>


      <div v-if="waitForResponse" class="align-self-center">
        <f7-progressbar infinite color="multi"></f7-progressbar>
      </div>



      <div v-if="waitForResponse || finalized" class="align-self-center" >
        <f7-block inset style=" color:slategray; background-color: #f1cbff; border-radius: 10px" >

        <p></p>
        <br/>
        <p class="gid" >:Result:</p><br/>
        <f7-block >
          <h1 class="gid" >{{this.food[this.chosenOne]}}</h1><br/>
        </f7-block>
        <p></p>
          <br/>
        </f7-block>

      </div>

      <div v-if="waitForResponse || finalized" class="align-self-center">
        <f7-block inset  style=" text-align: center; color:whitesmoke;  border-radius: 10px">
        <h1 style=" color:slategray; background-color: #e1f7d5"> Yes : {{this.yes}}</h1>
          <h1 style="color:slategray; background-color: #ffbdbd"> No : {{this.no}}</h1>
        </f7-block >
      </div>

      <div v-if="waitForResponse || finalized" class="align-self-center">

    </div>

      <div v-if="finalized" class="align-self-center">
        <f7-button  v-on:click="confirm" >I'm happy ﾍ(=￣∇￣)ﾉ</f7-button>
      </div>

      <div v-if="finalized" class="align-self-center">
        <f7-button  v-on:click="reset()" >Again please ヽ(´ー`)ﾉ</f7-button>
      </div>

    </f7-page>

  </f7-view>

</template>

<script>
    import F7Preloader from "framework7-vue/src/components/preloader";
    import F7Page from "framework7-vue/src/components/page";
    import F7Button from "framework7-vue/src/components/button";
    import F7Progressbar from "framework7-vue/src/components/progressbar";
    import {db, auth} from '../firebase'
    import F7View from "framework7-vue/src/components/view";
    import F7Navbar from "framework7-vue/src/components/navbar";
    import F7Link from "framework7-vue/src/components/link";
    import F7Block from "framework7-vue/src/components/block";


    export default {
      name: "Initiate",
      components: {
        F7Block,
        F7Link, F7Navbar, F7View, F7Progressbar, F7Button, F7Page, F7Preloader},
      props: ['gid'],
      data() {
          return {
            determinateLoading: false,
            progressBarEl: '',
            progress: 0,
            food: [],
            groups: [],
            chosenOne: '',
            goingpeople: [],
            allpeople: 0,
            notgopeople: 0,
            infiniteLoading: true,
            allowrandom: false,
            waitForResponse: false,
            finalized: false,
            yes: 0,
            no: 0,
            total: 0,
            satisfied: false
          }
      },
      beforeCreate () {
        // console.log("GID in Rand ",this.gid)
      },
      methods: {

        randomize() {
          this.chosenOne = Math.floor(Math.random() * (this.food.length))
          db.ref('groups/'+this.gid).update({'chosenfood': this.food[this.chosenOne]})
          this.waitForResponse = true
          this.finalized = false
          this.allowrandom = false

        },
        setFood() {
          let temp = []
          for(let i = 0; i < this.groups.length; i++) {
            if(this.groups[i]['.key'] === this.gid) {
              for(let p in this.groups[i].places){
                temp.push(this.groups[i].places[p].name)
              }
            }
          }
          this.food = temp
        },
        setPeople() {
          let temppeep = 0
          for(let i = 0; i < this.groups.length; i++) {
            if(this.groups[i]['.key'] === this.gid) {
              if(this.groups[i].going !== undefined) {
                this.goingpeople = this.groups[i].going
              }
              if(this.groups[i].notgo !== undefined) {
                this.notgopeople = this.groups[i].notgo
              }
              console.log('groups member: ', this.groups[i].members)
              for(let people in this.groups[i].members){
                temppeep += 1
              }
            }
          }
          this.allpeople = temppeep
        },
        setLoading() {
          console.log(this.goingpeople)
          if ((this.goingpeople.length + this.notgopeople) === this.allpeople) {
            this.infiniteLoading = false
          }
        },
        setVote() {
          let tempyes = 0
          let tempno = 0
          db.ref('groups/'+this.gid+'/vote').once('value').then(function(snapshot){
            if(snapshot.val() === null){
            }
            else{
              if(snapshot.val().yes !== undefined) {
                console.log('yes before pass in ', snapshot.val().yes )
                tempyes = snapshot.val().yes
              }
              if(snapshot.val().no !== undefined) {
                console.log('no before pass in ', snapshot.val().no )
                tempno = snapshot.val().no
              }
            }
          }).then( ()=> {
            this.yes  = tempyes
            this.no = tempno
          })
        },
        confirm() {
          db.ref('groups/'+this.gid).update({'start':false})
          db.ref('groups/'+this.gid).child('chosenfood').remove()
          db.ref('groups/'+this.gid).child('going').remove()
          db.ref('groups/'+this.gid).child('vote').remove()
          db.ref('groups/'+this.gid).child('notgo').remove()
          this.satisfied = true
          this.$f7.dialog.alert("Enjoy your food! (ﾉ≧∀≦)ﾉ*:・ﾟ✧", this.reload)
        },
        reset() {
          db.ref('groups/'+this.gid).update({'chosenfood': ''})
          db.ref('groups/'+this.gid).child('vote').remove()
          this.randomize()
        },
        reload() {
          location.reload()
        }
    },
      watch: {
        gid: function (){
          console.log('watch gid from Initiate')
          this.setFood()
          this.setPeople()
          this.setVote()
        },
        groups: function (){
          console.log('watch groups')
          this.setFood()
          this.setPeople()
          this.setVote()
        },
        goingpeople: function () {
          this.setLoading()
        },
        allpeople: function () {
          this.setLoading()
        },
        notgopeople: function () {
          this.setLoading()
        },
        infiniteLoading: function () {
          if(this.infiniteLoading === false){
            this.allowrandom = true
          }
        },
        yes: function () {
          this.setVote()
          this.total = this.yes + this.no
          if (this.total === (this.goingpeople.length) - 1) {
            this.waitForResponse = false
            this.finalized = true
          }
        },
        no: function () {
          this.setVote()
            this.total = this.yes+this.no
            if(this.total >= (this.goingpeople.length)-1) {
              // this.allowrandom = true
              this.waitForResponse = false
              this.finalized = true
            }
        }
      },
      firebase: function () {
        return {
          groups : {
            source: db.ref('groups/')
          }
        }
      }
    }
</script>

<style>

  .picture-center {
    position: absolute;
    top: 7%;
    left: 40%;
    transform: translate(-50%, -50%);
    display: block;

    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .item{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 45%;
  }
</style>

