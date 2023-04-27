import { defineStore } from "pinia"
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter()

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
       routes:[],
       branchs:[]
       ,
    vehicles:[]
    }),
	actions: {
		create(shipment) {
      let currentDate = new Date().getTime()
			this.shipments.push({...shipment, id: uuid(),createAt: currentDate.toString()})
		},
		delete(id) {
			this.shipments = this.shipments.filter(shipment => shipment.id !== id)
		},

        async fetchShipmentRoutes(page) {
            try {

             let apiURL = `/api/v1/shipment-routes?limit=25&page=${page}`;
             const data = await axios.get(apiURL)
              this.$state.routes = data.data
              // this.$state.routefrom = data.data.from_source
              // this.$state.routeto = data.data.to_destination
             
              }
              catch (error) {
                alert(error)
                console.log(error)
            }
          },

          async fetchBranch() {
            try {
              const data = await axios.get('/api/v1/branches')
              this.$state.branchs = data.data

              console.log(this.$state.branchs )
              }
              catch (error) {
        
                console.log(error)
            }
          },

          async fetchVehicle() {
            try {
              const data = await axios.get('/api/v1/vehicles')
              this.$state.vehicles = data.data
              console.log(this.$state.vehicles)
            }
            catch (error) {
            
              console.log(error)
            }
          },
      

        async handleCreateRoute(data) {
            try {
              const res = await axios.post("/api/v1/shipment-routes", {
                    from_source: data.selectedValueFrom,
                    to_destination: data.selectedValueTo,
                    memo: data.memo,
                    shiped_date: data.deliveryDate,
                    vehicle:data.selectedVehicle

                });

          
                // this.authUser = response.data;
                this.router.push('/delivery')
      
            } catch (error) {
             console.log(error);
                  
            }
        },
      

	},
	getters: {
        getShipmentRoutes(state){
            return state.routes
          },
          getBranch(state){
            return state.branchs
          },
          getVehicle(state) {
            return state.vehicles
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
  ,
  persist: true
})


// let colors = ['red', 'green', 'blue'];
// for (const color of colors){
//     console.log(color);
// }
