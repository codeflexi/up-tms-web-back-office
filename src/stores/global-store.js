
//stores/Navebar.js

import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import {ref} from 'vue'
// Import axios to make HTTP requests
import axios from "axios"
export const useGlobalStore = defineStore("global", {
    state: () => ({
        isNavbar: useLocalStorage('isNavbar',true),
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
        }

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
    },
    
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