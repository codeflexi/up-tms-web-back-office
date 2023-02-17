//stores/users.js

import { defineStore } from 'pinia'
import {ref} from 'vue'
// Import axios to make HTTP requests
import axios from "axios"
export const useShipmentStore = defineStore("shipment", {
    state: () => ({
        shipments: [],
        cargo_info: [],
        shipment_items:[]
    }),


    getters: {
      getShipments(state){
          return state.shipments
        },
        getCargoInfos(state){
          return state.cargo_info
        },
        getShipmentItems(state){
          return state.shipment_items
        }

    },
    actions: {
      async fetchShipments() {
        try {
          const data = await axios.get('https://jsonplaceholder.typicode.com/users')
          this.$state.shipments = data.data
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      },
      async fetchShipmentById(id) {
        try {

          let apiURL = `/api/v1/shipments/${id}`;
          const data = await axios.get(apiURL)
          this.$state.shipments = data.data
          this.$state.cargo_info = data.data.data.cargo_info
          this.$state.shipment_items = data.data.data.shipment_items
         
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      }
    },
    
  persist: true
})


// // stores/users.js
// import { defineStore } from 'pinia'
// // Import axios to make HTTP requests
// import axios from "axios"

// export const useUserStore = defineStore("user",{
//     state: () => ({}),
//     getters: {},
//     actions: {},
// })