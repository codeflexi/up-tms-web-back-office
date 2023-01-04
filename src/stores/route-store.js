import { defineStore } from "pinia"
import { v4 as uuid } from 'uuid';
import axios from "axios";



// state: () => {
//     return {
//         route:{},
//         shipments: []
//     }
// },

export const useRouteStore = defineStore("route", {
	state: () => ({
       route:{},
       shipments: [],
       routes:[]
    }),
	actions: {
		create(shipment) {
            let currentDate = new Date().getTime()

			this.shipments.push({...shipment, id: uuid(),createAt: currentDate.toString()})
		},
		delete(id) {
			this.shipments = this.shipments.filter(shipment => shipment.id !== id)
		},

        async fetchShipmentRoutes() {
            try {
              const data = await axios.get('/api/v1/shipment-routes')
              this.$state.routes = data.data
              }
              catch (error) {
                alert(error)
                console.log(error)
            }
          },

        async handleCreateRoute(data) {
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
      

	},
	getters: {
        getShipmentRoutes(state){
            return state.routes
          },
		shipmentsByDate(state) {
			const sortable = [...state.shipments]
		
            return sortable.sort((a,b) => {
           
                return  b.createAt - a.createAt 
                });
		},
        buildShipement(state){
            1
        }
	}
})


// let colors = ['red', 'green', 'blue'];
// for (const color of colors){
//     console.log(color);
// }
