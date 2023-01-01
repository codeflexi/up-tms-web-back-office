import {defineStore} from 'pinia'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import {ref , reactive} from 'vue'
import Swal from 'sweetalert2'

import moment from 'moment'

import { useRouter } from 'vue-router';


//import {ref} from '@vue/reactivity'


const router = useRouter()
let profile = ref({})
let users = ref({})
let meprofile = ref({})
let shipmentId = ref({})



export const useUserStore = defineStore('user', {
 
  state: () => ({
    sub: '',
    id:'',
    email: '',
    picture: '',
    firstName: '',
    lastName: '',
    authErrors:'',
    users:{},
    emails: [],
    shipment:[]
  }),
  actions: {
   
    async getUserDetailsFromGoogle(data) {
        let res = await axios.post('api/google-login', {
            token: data.credential
        })

        this.$state.sub = res.user.id
        this.$state.email = res.user.email
        this.$state.picture = res.user.email
        this.$state.firstName = res.user.name
        this.$state.lastName = res.user.name
       
    },
    async setProfileDetails(me) {
      users =  me;
      this.$state.users = users.data.data;
      console.log(users.data);
      this.$state.lastName = users._id;
      this.$state.firstName = users.name;
      this.$state.email = users.email;
  },
  async getUserProfile() {

       // profileStore.fetchProfileById(userStore.id)
       profile.value = await axios.get('/api/v1/auth/me')
       await this.setProfileDetails(profile.value)
   
},
 

    async handleLogin(data) {
      try {
        meprofile.value = await axios.post("/api/v1/auth/login", {
              email: data.email,
              password: data.password,
          });
          // this.authUser = response.data;
          localStorage.setItem('token', meprofile.value.data.token);
          console.log(meprofile.value.data.token);

          this.$state.sub = '1'
          this.$state.id = meprofile.value.data.user.id
          this.$state.email = meprofile.value.data.user.email
          this.$state.picture = 'https://via.placeholder.com/48.jpg'
          this.$state.firstName = meprofile.value.data.user.name
          this.$state.lastName = meprofile.value.data.user.name

         // this.getUserProfile();

          this.router.push('/pickup')
      
        

      } catch (error) {
        // console.log(error);
              this.authErrors = error.response.data.error;
              Swal.fire(
                "" + error.response.data.error,
                "Please login again!!",
                "warning"
              );
      }
  },
  async handleLogout() {
    await axios.get("/api/v1/auth/logout");
   
     localStorage.clear('token');
     this.clearUser()
     this.router.push('/pickup')
},
  async getUser() {
    // await this.getToken();
    
     let res = await axios.get("/api/v1/auth/me");
    // this.authUser = response.data;
  
     this.$state.sub = res.data.sub
     this.$state.email = res.data.email
     this.$state.picture = res.data.picture
     this.$state.firstName = res.data.given_name
     this.$state.lastName = res.data.family_name
     this.$state.lastName = res.data.family_name
 },

  
    async getEmailById(id) {
      try{
        let apiURL = `/api/v1/shipments/${id}`;
      shipmentId.value = await axios.get(apiURL)
console.log(apiURL);
this.$state.shipment = shipmentId.value.data.data;
      }catch(err) {
        console.log(err);
      }
     
      if (shipmentId) {
       
        return {
          id: id,
          body: shipmentId.value.data,
          createdAt: moment(shipmentId.value.data.createdAt).format("MMM D HH:mm"),
          firstName:shipmentId.value.data.data._id,
          fromEmail:shipmentId.value.data.data._id,
          lastName:shipmentId.value.data.data._id,
          subject:shipmentId.value.data.data.shipment_number,
          toEmail:shipmentId.value.data.data._id,
          shipmentDetail:shipmentId.value.data.data.cargo_info,
          shipment_number:shipmentId.value.data.data.shipment_number,
          waybill_number:shipmentId.value.data.data.waybill_number,
          hasViewed: false,
        }
      } else {
        console.log("No such document!");
      }
    },

    async sendEmail(data) {
      try {
        await setDoc(doc(db, "emails/" + uuid()), {
          firstName: this.$state.firstName,
          lastName: this.$state.lastName,
          fromEmail: this.$state.email,
          toEmail: data.toEmail,
          subject: data.subject,
          body: data.body,
          hasViewed: false,
          createdAt: Date.now()
        });
      } catch (error) {
        console.log(error)
      }
    },

    async emailHasBeenViewed(id) {
      try {
        await setDoc(doc(db, "emails/" + id), {
          hasViewed: true,
        }, { merge: true });
      } catch (error) {
        console.log(error)
      }
    },

    async deleteEmail(id) {
      try {
        await deleteDoc(doc(db, "emails", id));
      } catch (error) {
        console.log(error)
      }
    },

    clearUser() {
        this.$state.firstName = ''
        this.$state.lastName = ''
        this.$state.email = ''
        this.$state.picture = ''
        this.$state.sub = ''
        this.$state.id = ''
        this.authErrors = ''
        this.$state.emails = []
        this.$state.shipment = []
    }
  },
  persist: true
})