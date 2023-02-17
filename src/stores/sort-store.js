import { defineStore } from "pinia"
import { stringify, v4 as uuid } from 'uuid';
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter()

// state: () => {
//     return {
//         route:{},
//         shipments: []
//     }
// },

export const useSortStore = defineStore("sort", {
  state: () => ({
    sort: {},
    route_master: {},
    routeId: null,
    routeCode: null,
    routeName: null,
    routeDes: null,
    shipments: [],
    shipmentItems: [],
    sorts: []
  }),
  actions: {
    create(shipment) {
      let currentDate = new Date().getTime()
      this.shipments.push({ ...shipment, id: uuid(), createAt: currentDate.toString() })
    },
    delete(id) {
      this.shipments = this.shipments.filter(shipment => shipment.id !== id)
    },

    async fetchShipmentSorts(page) {
      try {

        let apiURL = `/api/v1/shipment-sorts?limit=12&page=${page}`;
        const data = await axios.get(apiURL)
        this.$state.sorts = data.data

      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async fetchShipmentSortbyId(id) {
      try {

        let apiURL = `/api/v1/shipment-sorts/${id}`;
        return await axios.get(apiURL)
        // const data = await axios.get(apiURL)
        // this.$state.sort = data.data

      }
      catch (error) {
        if (error) throw error
        // console.log(error)
      }
    },

    setShipmentSort(payload) {

      if (payload._id)  this.$state.sort = payload
      if (payload._id) this.$state.shipmentItems = payload.shipment_ids

    },

    async fetchRouteMaster(postcode) {
      try {
        //  api/v1/route-masters/mapping?postcode=10250
        let apiURL = `/api/v1/route-masters/mapping?postcode=${postcode}`;
        return await axios.get(apiURL)
        // if (data) {
        //  // this.$state.route_master = data.data.data
        //   return data
          
        //  // console.log(this.$state.route_master)
        // }

      } catch (error) {
        if (error) throw error
        // console.log(error)
      }
    },
    setRouteMaster(payload) {

      if (payload.route.id) this.routeId = payload.route.id
      if (payload.route.code) this.routeCode = payload.route.code
      if (payload.route.name) this.routeName = payload.route.name
      if (payload.route.description) this.routeDes = payload.route.description
      if (payload.route.id)  this.$state.route_master = payload

    },
    clearRouteMaster(payload) {
    routeId = null,
    routeCode = null,
    routeName = null,
    routeDes =null
    },

    async fetchBranch() {
      try {
        const data = await axios.get('/api/v1/branches')
        this.$state.branchs = data.data

        console.log(this.$state.branchs)
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },

  
    async handleCreateSort(data) {
      try {
        const res = await axios.post("/api/v1/shipment-sorts", {
          shipment_ids: data.shipment_ids,
          to_destination: data.selectedValueTo,
          memo: data.memo
        });

        // this.authUser = response.data;
        this.router.push('/sort')

      } catch (error) {
        console.log(error);

      }
    },


  },
  getters: {
    getShipmentSorts(state) {
      return state.sorts
    },
    getShipmentSortById(state) {
      return state.sort
    },
    getRouteMaster(state) {
      return state.route_master
    },
    getBranch(state) {
      return state.branchs
    }
    ,
    
    shipmentsByDate(state) {
      const sortable = [...state.shipments]

      return sortable.sort((a, b) => {

        return b.createAt - a.createAt
      });
    },
    getRouteId: (state) => state.routeId,
    getRouteCode: (state) => state.routeCode,
    getRouteName: (state) => state.routeName,
    getRouteDes: (state) => state.routeDes,

  }
  ,
  persist: true
})
