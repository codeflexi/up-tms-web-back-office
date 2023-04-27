<script setup>
import { useRouteStore } from "@/stores/route-store";
import { ref, onMounted, watch } from "vue";
import Dropdown from "@/components/DropdownComponent.vue";
import Modal from "@/views/route/AddNewRouteView.vue";
import IconComponent from "@/components/IconComponent.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import moment from "moment";
import axios from "axios";

const routeStore = useRouteStore();

const user_input = ref({
  name: "",
  email: "",
});

const sort = ref(false);

const pickings = ref({});
let page = ref(1);
let pageCount = ref(0);
let total = ref(0);
const modalActive = ref(false);

const selectedValue = ref("");
const isrefresh = ref("");

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

onMounted(async () => {
  getPickings()
 // fechShipmentRoutes();
});

watch(isrefresh, () => {
  console.log(isrefresh);
  getPickings()
 // fechShipmentRoutes();
});

watch(page, async () => {
  getPickings()
  //fechShipmentRoutes();
});

const getPickings = async () => {
  try {
    const res = await axios.get(
      `/api/v1/shipment-dispatchs?status=CREATED&sort=-planned_date&limit=25&page=${page.value}`
    );
    pageCount.value = Math.ceil(res.data.total / 25);
    total.value = res.data.count;
    pickings.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

const fechShipmentRoutes = async () => {
  await routeStore.fetchShipmentRoutes(page.value);
  pageCount.value = Math.ceil(routeStore.getShipmentRoutes.total / 25);
  total.value = routeStore.getShipmentRoutes.total;
};


</script>

<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm overflow-y-scroll"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
          <button
            @click="toggleModal"
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
            COMPLEATED
          </button>

          <Modal
            @close="toggleModal"
            @refresh="isrefresh = $event"
            :modalActive="modalActive"
          >
          </Modal>
        </div>
        <div class="text-xs text-gray-500">Delivery Details</div>
      </div>
    </div>

    <div class="p-1 text-gray-900 bg-gray-100">
      <span>Page : {{ page }}</span> of <span>{{ pageCount }}</span> Results:
      <span>{{ total }} records</span>

      <div class="flex items-center justify-center p-1 text-xl">
        <v-pagination
          v-model="page"
          :pages="pageCount"
          :range-size="5"
          active-color="#DCEDFF"
          @update:modelValue="routeStore.fetchShipmentRoutes(page)"
        />
      </div>
    </div>

    <div class="mt-2 ml-10">
      <div class="users grid md:grid-cols-3">
        <div
          v-for="pick in pickings?.data"
          class="user w-fit box-border border"
        >
          <router-link :to="`/dispatch/load-detail/${pick._id}`">
            <div>
              <h2>Loading#: {{ pick.dispatch_number }}</h2>
          
            </div>
            <div class=" px-2 py-2 bg-blue-900 rounded-lg  text-white">
              <h3><b> Loading Date:</b>
                {{ moment(pick.planned_date).format("MMM D HH:mm") }}</h3>
            <h3 class="text-lg">
              <b> คนขับ:</b>
              {{ pick.driver?.name }} {{ pick.driver?.last_name }}</h3>
            <h3 class="text-lg">
              <b> รถ:</b>
              {{ pick.vehicle?.type }} - {{ pick.vehicle?.plate_number }} {{ pick.vehicle?.plate_province }}
            </h3>

          </div>
          <h2>FROM: {{pick.company?.name}}</h2>
          <h2>WH: {{pick.warehouse?.name}}</h2>
            <p><span><b> Details: </b></span>{{ pick.memo }}</p>
            <p class="text-end text-xs">
              <span>#of Shipments:</span> {{ pick.shipment_ids.length }}
            </p>
         
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #eee;
}

main {
  padding: 1.5rem;
}

h1 {
  color: #100f0f;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
h2 {
  color: #746f6f;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}


form {
  display: block;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

input:not([type="checkbox"]) {
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

input:not([type="submit"]):not([type="checkbox"]) {
  display: block;
  width: 100%;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: 0.4s;
}

input:not([type="submit"]):focus {
  border-color: #aaa;
}

input[type="submit"] {
  display: block;
  padding: 0.5rem 1rem;
  background-color: crimson;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left: auto;

  color: #fff;
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;

  transition: 0.4s;
}

input[type="submit"]:hover {
  transform: scale(1.05);
  background-color: red;
}

label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

label input {
  margin-left: 0.5rem;
}

.user {
  display: block;
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  transition: 0.2s;
  width: 95%;
}

.user div {
  color: #aaa;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.user h3 {
  margin-bottom: 0.5rem;
  transition: 0.2s;
}

.user:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.user:hover h3 {
  color: rgb(244, 241, 242);
}

.user:last-of-type {
  margin-bottom: 0;
}
</style>
