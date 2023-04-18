import axios from 'axios'
import { defineStore } from 'pinia'


import {ref } from 'vue'
let users = ref({})

export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: null,
    name: null,
    lastName: null,
    email: null,
    user:{}
   
  }),
  actions: {
  async setProfileDetails(user) {
    users =  user;
    this.$state.user = users.data.data;
    console.log(users.data);
    this.$state.id = users._id;
    this.$state.name = users.name;
    this.$state.email = users.email;
},
  
    async fetchProfileById(userid) {
         let response = await axios.get('/api/v1/users/'+ userid);
       
console.log(userid);
console.log(response.data);

try{
        this.$state.id = userid
        this.$state.name = response.success;
        this.$state.email= response.data.email;
      }catch(err) {
        console.log(err);
      }
        // this.$state.description = res.data.user.description
        // if (res.data.user.image) {
        //   this.$state.image = process.env.VUE_APP_API_URL + 'images/users/' + res.data.user.image
        // } else {
        //   this.$state.image = process.env.VUE_APP_URL + 'DefaultUserAvatar.png'
        // }
    },

    // profileImage(image) {
    //   return process.env.VUE_APP_API_URL + 'images/users/' + image
    // },

    clearProfile() {
        this.$state.id = null
        this.$state.name = null
        this.$state.email = null
        this.$state.user = {}
      
    }
  },
 persist: true
})