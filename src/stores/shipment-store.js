//stores/users.js

import { defineStore } from 'pinia'
import { ref } from 'vue'
// Import axios to make HTTP requests
import Swal from "sweetalert2";
import axios from "axios"
export const useShipmentStore = defineStore("shipment", {
  state: () => ({
    shipments: [],
    shipment_logs: [],
    shipments_id: [],
    cargo_info: [],
    shipment_items: []
  }),


  getters: {
    getShipments(state) {
      return state.shipments
    },
    getCargoInfos(state) {
      return state.cargo_info
    },
    getShipmentItems(state) {
      return state.shipment_items
    },
    getShipmentsById(state) {
      return state.shipments_id
    },
    getShipmentLogs(state) {
      return state.shipment_logs
    },

  },
  actions: {

    async fetchShipmentById(id) {
      try {

        let apiURL = `/api/v1/shipments/${id}`;
        const data = await axios.get(apiURL)
        this.$state.shipments = data.data
        this.$state.cargo_info = data.data.data.cargo_info
        this.$state.shipment_items = data.data.data.shipment_items
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }
    },
    async fetchShipmentLogs(id) {
      try {

        let apiURL = `/api/v1/shipments/${id}/shipmentlogs`;
        // api/v1/shipments/63fad9485f7d13a3c2f33b6d/shipmentlogs
        const data = await axios.get(apiURL)
        this.$state.shipment_logs = data.data
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }
    },
    async fetchShipmentByIds(id) {
      try {

        let apiURL = `/api/v1/shipments/list/${id}`;
        const data = await axios.get(apiURL)
        this.$state.shipments_id = data.data
        console.log(data.data)
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }
    },
    async handleCreatePickUp(data) {
      try {
        const res = await axios.post("/api/v1/shipment-picks", {
          //driver: "637f31761deb473649f7027b",
          company: data.company,
          memo: data.memo,
          planned_date: data.pickupDate,
          vehicle: data.vehicle,
          shipment_ids: data.shipmentId,
          warehouse: data.warehouse,
        });
        // this.authUser = response.data;
        this.router.push('/pickup')
      } catch (error) {
        console.log(error);
      }
    },
    async handleCreateDispatch(data) {
      try {
        //console.log('Post Dispatch')
        const res = await axios.post("/api/v1/shipment-dispatchs", {
          //driver: "637f31761deb473649f7027b",
          company: data.company,
          memo: data.memo,
          planned_date: data.pickupDate,
          vehicle: data.vehicle,
          shipment_ids: data.shipmentId,
          warehouse: data.warehouse,
        });
        // this.authUser = response.data;
        this.router.push('/dispatch')
      } catch (error) {
        console.log(error);
      }
    },
    async handleCreateReceiving(id, data) {
      try {
        console.log(data.weight)
        let apiURL = `/api/v1/shipments/${id}`;
        const res = await axios.put(apiURL, {
          status: 'ARRIVED HUB',
          updated_date: Date.now(),
          cargo_info: {
            weight: data.weight,
            lengths: data.l,
            width: data.w,
            height: data.h,
            iscod: data.cod_amount > 0 ? "Y" : "N",
            cod_amount: data.cod_amount,
          },
        });
        Swal.fire(
          "Update Data succesfully!",
          "You clicked the button!",
          "success"
        );
        //this.router.push('/receive')
      } catch (error) {
        console.log(error);
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