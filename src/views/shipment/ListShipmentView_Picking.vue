<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/user-store";
import { useProfileStore } from "@/stores/profile-store";
import { useRoute } from "vue-router";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import moment from "moment";
import Card from "@/components/ShipmentCardComponent.vue";

const shipments = ref({});
let page = ref(1);
let pageCount = ref(null);
let total = ref(null);

const route = useRoute();
const userStore = useUserStore();
const profileStore = useProfileStore();

onMounted(async () => {
  // const response = await axios.get('/api/v1/shipments?limit=5');
  // pageCount.value = response.data.count;
  // shipments.value  = response.data;
  await getShipments();
});

watch(page, async () => {
  //    const res = await axios.get(`/api/v1/shipments?limit=5&page=${page.value}`)
  //    pageCount.value = response.data.count;
  //    shipments.value = res.data;
  await getShipments();
});

const getShipments = async () => {
  try {
    const res = await axios.get(`/api/v1/shipments?status=PICKING UP&limit=5&page=${page.value}`);
    pageCount.value = Math.ceil(res.data.total / 10);
    total.value = res.count;
    shipments.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

const formatDate = (dateString) => {
  const event = new Date(dateString);
  return moment(event.toLocaleDateString("en-TH")).format("DD-MM-YYYY");
};

const formatTime = (dateString) => {
    
  const event = new Date(dateString);
  //MMM D HH:mm
  return moment(dateString).format("HH:mm")
  //return event.toLocaleTimeString("en-TH").toString();
};
</script>

<template>
  <div
    class="flex flex-col gap-3 font-display max-w-6xl mx-auto border border-gray-200 rounded-lg w-full"
  >
    <!-- Header -->
    <div class="p-1 text-gray-90 max-h-80 font-Prompt_600 text-3xl"></div>

    <!-- Search -->
    <div class="p-1 text-gray-900">
      <div class="container px-4 mx-auto bg-slate-100">
        <div class="flex flex-wrap">
          <div class="w-1/6 px-4">
            <span
              class="text-sm text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100"
              >All</span
            >
          </div>
          <div class="w-1/6 px-4">
            <span
              class="text-sm text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100"
              >Submitted</span
            >
          </div>
          <div class="w-1/6 px-4">
            <span
              class="text-sm text-center block my-4 p-3  text-white bg-red-900 rounded border border-solid border-blueGray-100"
              >Picking Up</span
            >
          </div>
          <div class="w-1/6 px-4">
            <span
              class="text-sm text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100"
              >Picked Up</span
            >
          </div>
          <div class="w-1/6 px-4">
            <span
              class="text-sm text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100"
              >Sorted</span
            >
          </div>
          <div class="w-1/6 px-4">
            <span
              class="text-sm text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100"
              >Delivered</span
            >
          </div>
        </div>
      </div>
  
    </div>
    <!-- Content Header -->
    <div class="p-1 text-gray-900 bg-gray-100">
      <span>Page : {{ page }}</span> of <span>{{ pageCount }}</span> Results:
      <span>{{ total }} records</span>

      <div class="flex items-center justify-center p-1 text-xl">
        <v-pagination
          v-model="page"
          :pages="pageCount"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="getShipments"
        />
      </div>
    </div>
    <!-- Content Deatil -->
    <div class="p-1 text-gray-900 bg-white w-full">
      <div class="container" v-for="ship in shipments.data" :key="ship._id">
        <div class="content-center w-full mx-auto">
          <!-- Shipment Card -->
          <Card
            :_id="ship._id"
            :sales_channel="ship.company.name"
            :shipment_number="ship.shipment_number"
            :waybill_number="ship.waybill_number"
            :ship_to_name="ship.shipping_full_name"
            :ship_to_province="ship.city + ' ' + ship.state"
            :ship_from_name="ship.warehouse.name"
            :ship_from_province="ship.warehouse.city + ' ' +  ship.warehouse.state"
            :item_type="ship.cargo_info.item_type"
            :weight="ship.cargo_info.weight"
            :dimension="ship.cargo_info.lengths + '*' + ship.cargo_info.width +
              '*' + ship.cargo_info.height"
            :cod_amount="ship.cargo_info.cod_amount"
            :shipment_fee="ship.cargo_info.cod_amount"
            :picked_up_date="
              formatDate(ship.created_date) + ' ' + formatTime(ship.created_date)
            "
            :status="ship.status"
          >
            <!-- Card Slot -->
            <p><span class="  ml-2 text-xs"> isCOD? : </span>{{ ship.cargo_info.iscod }}</p>
          </Card>
        </div>
      </div>
    </div>
    <!-- Content Footer -->
    <div class="p-2 text-gray-900">
      <div class="flex items-center justify-center p-2 text-xl">
        <v-pagination
          v-model="page"
          :pages="pageCount"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="getShipments"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination-button {
  padding: 8px;
  margin: 2px;
  border: 1px;
  border-radius: 3px;
  border-color: red;
  cursor: pointer;
}
.container {
  align-items: center;
  padding: 10px;
}
</style>
