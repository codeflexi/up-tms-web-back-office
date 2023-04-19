<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/user-store";
import { useProfileStore } from "@/stores/profile-store";
import { useGlobalStore } from "@/stores/global-store";
import { useRoute } from "vue-router";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import moment from "moment";
import Card from "@/components/ShipmentCardComponent.vue";

const shipments = ref({});
let page = ref(1);
let company = ref("All");
let pageCount = ref(null);
let total = ref(null);

const route = useRoute();
const userStore = useUserStore();
const profileStore = useProfileStore();
const globalStore = useGlobalStore();

const form_input = ref({
  selectCompany: "",
  waybillNumber: "",
  shipmentNumber: ""
});

onMounted(() => {
  // const response = await axios.get('/api/v1/shipments?limit=5');
  // pageCount.value = response.data.count;
  // shipments.value  = response.data;
  globalStore.fetchCompany();
  getShipments();
});

watch(page, async () => {
  await getShipments();
});

watch(company, async () => {
  page.value = 1;
  await getShipments();

});

const onSelectChange = (e) => {
  company.value = form_input.value.selectCompany;
};

const submitKey = async (e) => {
  if (form_input.value.waybillNumber.length > 0) {
    page.value = 1;
    await getShipments()
  }
  if (form_input.value.shipmentNumber.length > 0) {
    page.value = 1;
    await getShipments()
  }
};

const getShipments = async () => {
  try {
    //alert(form_input.value.selectCompany)
    const filter = 
      form_input.value.selectCompany === ""
        ? ""
        : `&company=${form_input.value.selectCompany}`;

    const filter1 =  
    form_input.value.waybillNumber === ""
    ?""
    : `&waybill_number=${form_input.value.waybillNumber}`;

    const filter2 =  
    form_input.value.shipmentNumber === ""
    ?""
    : `&shipment_number=${form_input.value.shipmentNumber}`;


    const res = await axios.get(
      `/api/v1/shipments?status=PICKING UP&limit=25&page=${page.value}${filter}${filter1}${filter2}`
    );
    pageCount.value = Math.ceil(res.data.total / 25);
    total.value = res.data.total;
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
  return moment(dateString).format("HH:mm");
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
        <h1>ค้นหา Shipement โดย  : </h1>
        <div class="flex flex-wrap text-xs">
          <div class="w-1/8 px-4">
            <router-link to="/">
            <span
            class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
            >All</span
            >
          </router-link>
          </div>
          <div class="w-1/8 px-4">
            <span
              class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
              >Submitted</span
            >
          </div>
          <div class="w-1/8 px-4">
            <router-link to="shipment/shipment-list-picking">
              <span
                class="text-center block my-4 p-3  text-white bg-red-800 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
                >Picking Up</span
              ></router-link
            >
          </div>
          <div class="w-1/8 px-4">
            <span
              class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
              >Picked Up</span
            >
          </div>
          <div class="w-1/8 px-4">
            <span
              class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
              >Arrived Hub</span
            >
          </div>
          <div class="w-1/8 px-4">
            <router-link to="/shipment/shipment-list-sorted">
              <span
                class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
                >Sorted</span
              ></router-link
            >
          </div>
          <div class="w-1/8 px-4">
            <router-link to="/shipment/shipment-list-sort">
              <span
                class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
                >Our For Delivery</span
              ></router-link
            >
          </div>
          <div class="w-1/8 px-4">
            <span
              class="text-center block my-4 p-3 text-blueGray-700 rounded border border-solid border-red-300 hover:bg-red-800 hover:text-white"
              >Delivered</span
            >
          </div>
        </div>
        <div id="dropdown_comapany">
          <label for="countries" class="block mb-2 text-xm font-bold  text-gray-900 dark:text-white">Select your company :</label>
          <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
            name="company-selection"
            @change="onSelectChange(e)"
            v-model="form_input.selectCompany"
          >
            <option
              v-for="item in globalStore.getCompany.data"
              :value="item._id"
              :key="item._id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class=" mt-2">
          <label for="waybillNumber" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
          <input  v-model.lazy="form_input.waybillNumber"  v-on:keyup.enter="submitKey" id="form_input.waybillNumber" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light" placeholder="Waybill Number">
        </div>
        <div class="mb-2 mt-2">
          <label for="shipmentNumber" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
          <input  v-model.lazy="form_input.shipmentNumber"  v-on:keyup.enter="submitKey" id="form_input.shipmentNumber" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light" placeholder="Shipment Number">
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
            :sales_channel="ship.company?.name"
            :shipment_number="ship.shipment_number"
            :waybill_number="ship.waybill_number"
            :ship_to_name="ship.shipping_full_name"
            :ship_to_province="ship.city + ' ' + ship.state"
            :ship_from_name="ship.warehouse?.name"
            :ship_from_province="
              ship.warehouse?.city + ' ' + ship.warehouse?.state
            "
            :item_type="ship.cargo_info.item_type"
            :weight="ship.cargo_info.weight"
            :dimension="
              ship.cargo_info.lengths +
              '*' +
              ship.cargo_info.width +
              '*' +
              ship.cargo_info.height
            "
            :cod_amount="ship.cargo_info.cod_amount"
            :shipment_fee="ship.cargo_info.cod_amount"
            :picked_up_date="
              formatDate(ship.createdAt) + ' ' + formatTime(ship.createdAt)
            "
            :status="ship.status"
          >
            <!-- Card Slot -->
            <p>
              <span class="ml-2 text-xs"> isCOD? : </span
              >{{ ship.cargo_info.iscod }} ByPass : {{ ship.is_by_pass }}
            </p>
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
