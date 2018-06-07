<template>

  <f7-view>
  <f7-page>


    <!--<f7-button v-on:click="a"  >asdasdads</f7-button>-->

    <f7-block inset>
    <div v-if="!ready" class="resultBox" style="text-align: center" >
      <p></p>
      <br/>
      <f7-block >
        <p class="gid" >:Result:</p>
        <h1 class="gid" >Pending..</h1><p><br/></p>
        <h5  >:Waiting for all members to participate:</h5>

      </f7-block>
      <p></p>
      <br/>
    </div>
    <div v-else class="resultBox" style="background-color: rgba(76,217,100,0.7);" >
      <p></p>
      <br/>
      <p class="gid" >:Result:</p><br/>
      <f7-block >
        <h2 class="gid" >{{this.result}}</h2><br/>
      </f7-block>
      <p></p>



        <div v-if="vote === ''" >
          <f7-row style="background-color: rgba(76,217,100,0.7)">
        <f7-col>
          <f7-button v-on:click="voteYes" style="color: whitesmoke; background-color: rgba(70,181,255,1)" big>I'm In!!</f7-button>
        </f7-col>
        <f7-col>
          <f7-button v-on:click="voteNo" style="color: whitesmoke; background-color: rgba(255,83,89,1)" big>Nayy.</f7-button>
        </f7-col>
          </f7-row>
        </div>
        <div v-else-if="vote === 'yes'" style="background-color: rgba(70,181,255,1)">
          <h3 style="text-align: center">You Voted YES !</h3>
        </div>
        <div v-else-if="vote === 'no'" style="background-color: rgba(255,83,89,1) ">
          <h3 style="text-align: center">You Voted NO !</h3>
        </div>
    </div>

      </f7-block>
    <f7-block inset>

      <p>LOBBY</p>
      <f7-list contacts-list v-for="participant in participants">
        <f7-list-item :title="participant.name"></f7-list-item>
      </f7-list>
    </f7-block>

  </f7-page>
  </f7-view>
</template>

<script>
    import F7Page from "framework7-vue/src/components/page";
    import F7ListItemContent from "framework7-vue/src/components/list-item-content";
    import F7ListItem from "framework7-vue/src/components/list-item";
    import F7Button from "framework7-vue/src/components/button";
    import {db} from '../firebase'
    import F7Block from "framework7-vue/src/components/block";
    import F7List from "framework7-vue/src/components/list";
    import F7View from "framework7-vue/src/components/view";
    import F7Row from "framework7-vue/src/components/row";
    import F7Col from "framework7-vue/src/components/col";

    export default {
      name: "lobby",
      components: {
        F7Col,
        F7Row,
        F7View,
        F7List,
        F7Block,
        F7Button,
        F7ListItem,
        F7ListItemContent,
        F7Page},
      props: ['gid'],
      data () {
        return {
          ready: false,
          participants:[],
          result:'',
          vote:'',
          groups: [],
          previousFood: '',
        }
      },
      firebase: function () {
        return {
          groups : {
            source: db.ref('groups/')
          }
        }
      },
      methods: {
        a() {
          // this.updateParticipants()
          console.log(this.ready)
          console.log(this.result)
          console.log(this.previousFood)
          console.log(this.vote)
        },
        voteYes(){
          this.vote = 'yes'
          const gid = this.gid
          var dbRef = db.ref('groups/'+gid+'/vote');
          dbRef.transaction(function(snapshot) {

            if(snapshot !== null){
              if(snapshot.yes == null){
                db.ref('groups/'+gid+'/vote').update({'yes':1})
              }else{
                let temp = snapshot.yes
                temp += 1
                db.ref('groups/'+gid+'/vote').update({'yes':temp})
              }
            }else{
              db.ref('groups/'+gid+'/vote').update({'yes':1})

            }
          })
        },
        voteNo(){
          this.vote = 'no'
          const gid = this.gid
          var dbRef = db.ref('groups/'+gid+'/vote');
          dbRef.transaction(function(snapshot) {

            if(snapshot !== null){
              if(snapshot.no == null){
                db.ref('groups/'+gid+'/vote').update({'no':1})
              }else{
                let temp = snapshot.no
                temp += 1
                db.ref('groups/'+gid+'/vote').update({'no':temp})
              }
            }else{
                db.ref('groups/' + gid + '/vote').update({'no': 1})

            }
          })
        },
        getIndexByKey(list, key){
          for(let i =0;i < list.length;i++){
            if(list[i]['.key'] === key){
              return i
            }
          }
          return -1
        },
        updateParticipants(){

          const i = this.getIndexByKey(this.groups,this.gid)
          this.participants = this.groups[i].going
          // console.log("Participants ", this.participants)
        },
        updateResult(){

          const i = this.getIndexByKey(this.groups,this.gid)
          this.result = this.groups[i].chosenfood
          if(this.previousFood !== this.result){
            //Different Food New Rand
            this.vote = ''
            this.previousFood = this.result
          }
          //  Same food dont do anything

          //If result is undefind result = false
          if(this.result && this.result !== ''){
            this.ready =true
          }else{
            this.ready =false
          }
          // console.log("Food result Found?",this.result)
        },
        allProcessCompleted (){
          let allDone = false
          db.ref('groups/'+this.gid).once('value').then(function (snapshot) {
            console.log('Start',snapshot.val().start)
            if(snapshot.val().start===false){
              // console.log("Let's go home")

              allDone =true
            }
          }).then(() => {if(allDone === true && this.vote !== ''){
            this.vote = ''
            this.$f7.dialog.alert("Enjoy your food! (ﾉ≧∀≦)ﾉ*:・ﾟ✧",this.backToHome)
          }})
        },
        backToHome(){
          // this.$emit('backHome')
          location.reload()
        }
      },
      watch:{
        groups: function (){
          console.log("Group Changes")
          this.allProcessCompleted()
          this.updateParticipants()
          this.updateResult()
        },
        popupOverride(){
          console.log("Reload Going List")
          this.updateParticipants()
        },
      },
      computed: {
        popupOverride () {
          return  this.$store.state.going
        }
      },
    }
</script>

<style scoped>

  .resultBox{
    border-radius: 10px;
    background-color: rgba(255, 1, 23, 0.7);
    color: white;
  }
  .gid{
    color: whitesmoke;
  }

</style>
