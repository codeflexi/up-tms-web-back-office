<template>
  <div id="HomeView" class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm">
    
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
          :range-size="5"
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
        :from="ship.company.name + ' ' + ship.waybill_number"
        :subject="ship.shipment_number"
        :body="ship.shipping_address_line1"
        :time="ship.createdAt"
        :shipment="ship.shipmentDetail"
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
import Modal from "@/views/pickup/AddPickupView.vue";

import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import { useUserStore } from "@/stores/user-store";
import { useShipmentStore } from "@/stores/shipment-store";
import axios from "axios";
const userStore = useUserStore();
const shipmentStore = useShipmentStore();

const shipments = ref({});
let page = ref(1);
let status = ref("Submitted");
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

onMounted(async () => {
  // userStore.getEmailsByEmailAddress()
  await getShipments();
});

watch(page, async () => {
  await getShipments();
});
watch(status, async () => {
  await getShipments();
});

const getShipments = async () => {
  try {
    const res = await axios.get(
      `/api/v1/shipments?status=DATA SUBMITTED&limit=20&page=${page.value}`
    );
    pageCount.value = Math.ceil(res.data.count / 20);
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

  let res = confirm("Are you sure you want to assign pick up?");
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
