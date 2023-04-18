
//stores/Navebar.js
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import {ref} from 'vue'
// Import axios to make HTTP requests
import axios from "axios"
export const useGlobalStore = defineStore("global", {
    state: () => ({
        companies:[],
        isNavbar: useLocalStorage('isNavbar',true),
        menuActive:"SHIPMENT",
        menus: [
            {menuId:1,
                menuNameTH:'รับสินค้า',
                menuNameEn: 'PICK UP'
            },
            {menuId:2,
                menuNameTH:'รับสินค้า',
                menuNameEn: 'PICK UP'
            },
            {menuId:3,
                menuNameTH:'รับสินค้า',
                menuNameEn: 'PICK UP'
            },
            {menuId:4,
                menuNameTH:'รับสินค้า',
                menuNameEn: 'PICK UP'
            }
     
    ]
    }),
    getters: {
      getIsNavbar(state){
          return state.isNavbar
        },
        getActiveMenu(state){
          return state.menuActive
        },
        getCompany(state){
          return state.companies
        },

    },
    actions: {
      async toggleNavbar() {
        try {
            this.$state.isNavbar = this.$state.isNavbar === true ? false : true
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      },
      async setMenuActive(name) {
        this.$state.menuActive = name
        console.log(name)
      },
      async fetchCompany() {
        try {
          const data = await axios.get('/api/v1/companies')
          this.$state.companies = data.data

          }
          catch (error) {
            console.log(error)
        }
      },
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