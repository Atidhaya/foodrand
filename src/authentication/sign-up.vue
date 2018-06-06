<template>

  <f7-view id="sign-up">
    <f7-page>
      <f7-navbar>
        <f7-link href="/sign-in/">Back</f7-link>
      </f7-navbar>

      <f7-list form>
        <f7-list-item>
          <f7-label>Name</f7-label>
          <f7-input :value="name" @input="name = $event.target.value" type="text" placeholder="Name" clear-button> </f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>E-mail</f7-label>
          <f7-input :value="email" @input="email = $event.target.value" type="email" placeholder="E-mail" clear-button></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Password</f7-label>
          <f7-input :value="password" @input="password = $event.target.value"
                    type="password" placeholder="Password" clear-button
                    error-message="password must be at least 6 characters" required validate pattern=".{6,}" ></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Confirm Password</f7-label>
          <f7-input :value="confirmpassword" @input="confirmpassword = $event.target.value"
                    type="password" placeholder="Password" clear-button
                    error-message="password must be at least 6 characters" required validate pattern=".{6,}" ></f7-input>
        </f7-list-item>


        <div class="block">
          <p><a class="link popup-open" href="#" data-popup=".popup-about">terms and condition</a></p>
        </div>

        <div class="popup popup-about">
          <div class="view popup-view">
            <div class="page">
              <div class="page-content block">
                <p>Terms and Conditions</p>
                <!-- Close Popup -->
                <p>1. You agree that doggo is awesome</p>
                <p>2. You agree that doggo is also awesome</p>
                <p>3. You agree that gaming is important</p>

                <label class="checkbox"><input type="checkbox" v-on:change="agreement" ><i class="icon-checkbox"></i></label> I've read and agree on terms and condition
                <p><a class="link popup-close" href="#">back</a></p>

              </div>
            </div>
          </div>
        </div>


        <p class="segmented">
          <f7-button :disabled=disabled v-on:click="submit">Sign me up</f7-button>
        </p>

      </f7-list>

      <!--<f7-link @click="$f7router.navigate('/about/')">About</f7-link>-->
      <!--<f7-link href="/about/">About App</f7-link>-->


      <!--<f7-tab id="join-group" >-->
        <!--<f7-link @click="r()">go to j</f7-link>-->
        <!--<join-group> </join-group>-->

      <!--</f7-tab>-->


    </f7-page>

  </f7-view>

</template>
<script>
  import F7View from "framework7-vue/src/components/view";
  import F7Page from "framework7-vue/src/components/page";
  import F7Navbar from "framework7-vue/src/components/navbar";
  import F7List from "framework7-vue/src/components/list";
  import F7Button from "framework7-vue/src/components/button";
  import F7ListItem from "framework7-vue/src/components/list-item";
  import F7Label from "framework7-vue/src/components/label";
  import F7Input from "framework7-vue/src/components/input";
  import F7Link from "framework7-vue/src/components/link";
  import F7Tab from "framework7-vue/src/components/tab";
  import JoinGroup from "../pages/join-group";
  import {auth, db} from "../firebase"

  export default {
    components: {JoinGroup, F7Tab, F7Link, F7Input, F7Label, F7ListItem, F7Button, F7List, F7Navbar, F7Page, F7View},
    data () {
      return {
        disabled: true,
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
      }
    },
    mounted () {
    },
    watch: {
      name: function () {
        console.log(this.name)
      },
      password: function () {
        console.log('password ', this.password)
      },
      confirmpassword: function () {
        console.log('confirmed password', this.confirmpassword)
      }
    },
    methods: {
      agreement() {
        this.disabled = !this.disabled
        console.log(this.disabled)
      },
      submit() {
        this.$store.dispatch('pushMe')
        console.log(this.password === this.confirmpassword)
        if (this.password !== this.confirmpassword) {
          this.$f7.dialog.alert('Password mismatch, please double check');
        }
        else if (this.name === '') {
          this.$f7.dialog.alert('Please enter your name')
        }
        else if (this.email === '') {
          this.$f7.dialog.alert('Please enter your email')
        }
        else {
          this.$store.dispatch('setLoading', true)
          auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(firebaseUser => {
              console.log('In sign up.............')
              auth.currentUser.updateProfile({ displayName: this.name }).then( () => {
                this.$store.dispatch('setUser', {email: this.email})
                console.log('name:' , this.name)
                console.log(auth.currentUser.displayName)
                db.ref('users/' + auth.currentUser.uid).set({ email: this.email, name: this.name })
                this.$store.dispatch('setLoading', false)
                location.reload()
              })
              // main.$f7.router.navigate('/sign-in/')
            })
            .catch(error => {
              console.log('can\'t sign up')
              console.log(error.message)
              this.$store.dispatch('setError', error.message)
              this.$store.dispatch('setLoading', false)
              this.$f7.dialog.alert(error.message)
            })
        }
      },
      r() {
        console.log(this)
        this.$f7router.navigate('/jasdasd/')
      }
    }
  }
</script>
