<template>
  <div id="HomeView" class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm">
    
    
       <!-- Search -->
       <div class="p-1 text-gray-900">
        <div class="container px-4 pt-5 pb-5 mx-auto bg-slate-100">
      
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
          <div  class=" grid grid-cols-3">
          <div class=" mt-2">
            <label for="waybillNumber" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
            <input  v-model.lazy="form_input.waybillNumber"  v-on:keyup.enter="submitKey" id="form_input.waybillNumber" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light" placeholder="Waybill Number">
          </div>
          <div class="mb-2 mt-2 ml-5">
            <label for="shipmentNumber" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
            <input  v-model.lazy="form_input.shipmentNumber"  v-on:keyup.enter="submitKey" id="form_input.shipmentNumber" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light" placeholder="Shipment Number">
          </div>
          <div class="mb-2 mt-2 ml-5">
            <label for="uploadDocNumber" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
            <input  v-model.lazy="form_input.uploadDocNumber"  v-on:keyup.enter="submitKey" id="form_input.uploadDocNumber" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light" placeholder="Upload Doc. Number">
          </div>
        </div>
        </div>
      </div>
      <!-- End Search -->


    <div class="border-b grid grid-cols-3">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
          <button
        
            @click="deleteSelected"
            type="button"
            class="py-2 focus:outline-none text-red-600 rounded mt-4 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 stroke-current mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Assign Vehicle
          </button>

          <Modal
            @close="toggleModal"
            @refresh="isrefresh = $event"
            :modalActive="modalActive"
            :shipmentId="shipmentDetail"
          >
          </Modal>
        </div>
      </div>



      <div class="flex text-1xl text-gray-500">
        <v-pagination
          v-model="page"
          :pages="pageCount"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="getShipments"
        />
      </div>
      <div class="flex text-xs text-gray-500 pt-2 justify-end px-2 my-2">
        <span>Page : {{ page }}</span> of <span>{{ pageCount }}</span> Results:
        <span>{{ total }} records</span>
      </div>
    </div>

    <div v-for="ship in shipments.data" :key="ship._id">
      <ShipmentRow
        :id="ship._id"
        :status="ship.status"
        :from="ship.company?.name + ' ' + ship.waybill_number"
        :subject="ship.shipment_number"
        :body="ship.shipping_address_line1"
        :time="ship.created_date"
        :shipment="ship.shipmentDetail"
        :bypass="ship.is_by_pass"
        :hasViewed="true"
        @selectedId="selectedId"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import VPagination from "@hennge/vue3-pagination";
import ShipmentRow from "@/components/ShipmentRow.vue";
import IconComponent from "@/components/IconComponent.vue";
import Modal from "@/views/dispatch/AddDispatchView.vue";

import { useGlobalStore } from "@/stores/global-store";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import { useUserStore } from "@/stores/user-store";
import { useShipmentStore } from "@/stores/shipment-store";
import axios from "axios";
const userStore = useUserStore();
const shipmentStore = useShipmentStore();

const shipments = ref({});
let page = ref(1);
let status = ref("Submitted");
let company = ref("All");
let pageCount = ref(null);
let total = ref(null);

const modalActive = ref(false);
const shipmentDetail = ref([]);

const selectedValue = ref("");
const isrefresh = ref("");

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

let shipmentToAssigne = [];
const globalStore = useGlobalStore();

const form_input = ref({
  selectCompany: "",
  waybillNumber: "",
  shipmentNumber: "",
  uploadDocNumber:""
});

onMounted(async () => {
  // userStore.getEmailsByEmailAddress()
  globalStore.fetchCompany();
  await getShipments();
});

watch(page, async () => {
  await getShipments();
});
watch(status, async () => {
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
  if (form_input.value.uploadDocNumber.length > 0) {
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

    const filter3 =  
    form_input.value.uploadDocNumber === ""
    ?""
    : `&upload_doc=${form_input.value.uploadDocNumber}`;


    const res = await axios.get(
     // `/api/v1/shipments?status=DATA SUBMITTED&limit=100&page=${page.value}`
     `/api/v1/shipments?status=ARRIVED HUB&limit=100&page=${page.value}${filter}${filter1}${filter2}${filter3}`
    );
    pageCount.value = Math.ceil(res.data.total / 25);
    total.value = res.data.count;
    shipments.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

const selectedId = (e) => {
  if (!shipmentToAssigne.length) {
    shipmentToAssigne.push(e.id);
  } else if (e.bool && !shipmentToAssigne.includes(e.id)) {
    shipmentToAssigne.push(e.id);
  } else if (!e.bool && shipmentToAssigne.includes(e.id)) {
    const index = shipmentToAssigne.indexOf(e.id);
    if (index > -1) {
      shipmentToAssigne.splice(index, 1);
    }
  }
};

const  deleteSelected = async () => {
  if (!shipmentToAssigne.length) return;

  let res = confirm("Are you sure you want to assign loading?");
  if (res) {
    shipmentToAssigne.forEach(async (id) => {
      //await userStore.deleteEmail(id);
      //console.log(id);
    });

    shipmentDetail.value = shipmentToAssigne//
    await shipmentStore.fetchShipmentByIds(shipmentToAssigne) 
    shipmentToAssigne = [];
    toggleModal()
  }
};
</script>
