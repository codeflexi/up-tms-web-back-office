<template>
  <section
    id="HomeView"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm"
  >
    <div class="border-b grid grid-cols-3">
  
      <div class="flex text-1xl text-gray-500"></div>
      <div class="flex text-3l text-gray-500 pt-2 justify-end px-2 my-2 mr-5">
        Count : {{ products.length }}
      </div>
    </div>

    <div  v-if="!products.length"
      class="input-width w-full bg-gray-200 flex items-center ml-20 rounded-lg mt-1 py-3"
    >
      <IconComponent
        iconString="magnify"
        iconColor="#636363"
        text="Search"
        hoverColor="hover:bg-gray-300"
      />
      <input
        placeholder="Scan Shipment/Waybill number"
        v-model.lazy="newItem"
        v-on:keyup.enter="submitKey"
        maxlength="100"
        v-autofocus
        class="w-full h-10 bg-gray-200 border-transparent border-none focus:ring-0 outline-none placeholder-gray-900"
        type="text"
      />

      <IconComponent
        iconString="scan"
        iconColor="#636363"
        text="Show search options"
        hoverColor="hover:bg-gray-300"
        iconSize="40"
        class="mr-2"
      />
    </div>

    <div class="container px-2 py-8 mx-auto">
      <div class="flex flex-wrap -m-4" v-if="!products.length">
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full mb-4">
          <!-- <a class="block relative h-48 rounded overflow-hidden">
            <img
              alt="ecommerce"
              class="object-cover object-center w-full h-full block"
              src="https://dummyimage.com/420x260"
            />
          </a> -->
          <div class="mt-2">
            <h3
              class="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase inline-block mr-2"
            >
              Please Scan WBN
            </h3>
            <h2 class="text-gray-900 title-font text-lg font-medium">
              Loading
            </h2>
            <p class="mt-1"></p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -m-1" v-else>
       
        <div
          class="p-4 w-full mb-1 bg-white rounded-t-xl shadow-sm"
        >
         
          <div class=" py-2 rounded-lg border-spacing-1 border-slate-500 bg-white px-1 shadow-lg mb-2">
            <p
              class="text-xl bg-red-300 text-gray-900 text-center border-spacing-1 rounded-lg"
            >แก้ไข ข้อมูล</p>
            <div class=" flex" v-for="ship in orderShipments" :key="ship.id">
              <form>
        
            <BaseInput v-model="product_input.weight"  id="TextWeight" label="น้ำหนัก Weigh(KG.):" type="text" class="base-input  w-52" />
            <div class="flex items-center justify-between my-3">
              <BaseInput v-model="product_input.l" label="ยาว(Length CM.):" type="text" class="base-input" />
            <BaseInput v-model="product_input.w" label="กว้าง(Width CM.):" type="text" class="base-input" />
            <BaseInput v-model="product_input.h" label="สูง(Height CM.):" type="text" class="base-input" />
            </div>
            <BaseInput v-model="product_input.cod_amount" label="COD Amoiunt(Bath):" type="text" class="base-input  w-52" />
           
         

                <div class="flex items-center justify-center my-2">
              
                  <span>
                    <button
                      @click="handleCancelData"
                      v-if="products.length"
                      type="button"
                      class="px-2 py-2 rounded text-center border bg-white text-gray-900 font-semibold hover:bg-gray-300 hover:text-white"
                    >
                      CANCEL
                    </button>
                  </span>
                  <span>
                    <button
                      @click="handleSubmittedData"
                      v-if="products.length"
                      type="button"
                      class="ml-2 px-2 py-2 rounded focus:outline-none bg-gray-900 text-white font-semibold hover:bg-gray-300"
                    >
                      CONFIRM RECEIVE
                    </button> 
                    </span
                  >
                </div>
        
            </form>
          
          </div>
          
          
           
          </div>

          <!-- Content Deatil -->
          <div class="p-1 text-gray-900 bg-white w-full">
            <div v-for="ship in orderShipments" :key="ship.id">
              <div class="content-center w-full mx-auto">
                <!-- Shipment Card -->
                <Card
                  :_id="ship.shipment_id"
                  :sales_channel="ship.sales_channel"
                  :shipment_number="ship.shipment_number"
                  :waybill_number="ship.waybill_numnber"
                  :ship_to_name="ship.ship_to_name"
                  :ship_to_province="ship.ship_to_province"
                  :ship_from_name="ship.ship_from_name"
                  :ship_from_province="ship.ship_from_province"
                  :item_type="ship.item_type"
                  :weight="ship.weight"
                  :dimension="ship.dimension"
                  :cod_amount="ship.cod_amount"
                  :shipment_fee="ship.shipment_fee"
                  :picked_up_date="ship.picked_up_date"
                  :status="ship.status"
                >
                  <!-- Card Slot -->
                  <p>
                    <span class="ml-2 text-xs"> isCOD? : </span>{{ ship.iscod }}
                  </p>
                </Card>
              </div>
            </div>
          </div>
          <!-- Content Footer -->
        </div>
      </div>
    </div>
  </section>
</template>

<!--  Input Text Example
    <BaseInput v-model="firstName" label="ttt" type="text" class="base-input" />
<p>{{ firstName }}</p> -->

<!-- Composition API -->

<script setup>
import { ref, reactive, defineProps, computed } from "vue";
import IconComponent from "@/components/IconComponent.vue";
import { vAutofocus } from "@/directives/vAutofocus";
import BaseInput from "@/components/TextInputComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import Card from "@/components/ShipmentCardComponent.vue";

import { useSortStore } from "@/stores/sort-store";
import { useShipmentStore } from "@/stores/shipment-store";
import ShipmentCardComponent from "../../components/ShipmentCardComponent.vue";
const sortStore = useSortStore();
const shipmentStore = useShipmentStore();

const { route_master } = storeToRefs(useSortStore());

//import {ref} from '@vue/reactivity'

const route = useRoute();
const router = useRouter();

const product_input = ref({
	weight: 0,
	h: 0,
  w:0,
  l:0,
  cod_amount:0,
  id:''
})

// Props
const props = defineProps({
  title: String,
});

// Data Attributes
const products = ref([]);
const unique = ref([]);

// Methods
const addShipment = () => {
  if (newItem.value.trim() === "") {
    return;
  }
  addRouting(newItem.value.trim());
};
const removeShipment = (product) => {
  products.value = products.value.filter((t) => t !== product);
};


const formatCurrency = (amount) => {
  amount = amount / 100;
  return amount.toLocaleString("en-TH", { style: "currency", currency: "THB" });
};

const handleSubmittSort = async (data) => {
  try {
    alert('summit')
    // let apiURL = "/api/v1/shipment-sorts";

    // const res = await axios.post(apiURL, {
    //   route: data.sortId,
    //   shipment_ids: data.shipmentId,
    // });

    // Swal.fire(
    //   "Create New Sorting succesfully!",
    //   "You clicked the button!",
    //   "success"
    // );
  } catch (error) {
    console.log(error);
  }
};

const handleSubmittedData = async () => {
  try {
    shipmentStore.handleCreateReceiving(product_input.value.id,product_input.value)
    products.value = [];
  } catch (error) {
    console.log(error);
    Swal.fire(`Data incorrect - ${error}`, "Please try again!!", "warning");
  }
};

const handleCancelData = async () => {
  try {
    products.value = [];
   
  } catch (error) {
    console.log(error);
    Swal.fire(`Data incorrect - ${error}`, "Please try again!!", "warning");
  }
};

const addRouting = async (shipment_number) => {
  // Get Data
  // Example /api/v1/shipments?status[in]=PICKED UP&status[in]=ARRIVED HUB
  let res = await axios.get(
    `/api/v1/shipments?waybill_number=${shipment_number}&status[in]=PICKED UP&status[in]=UN DELIVERED`
  );

  // if(res) {
  //   document.getElementById("TextWeight").focus();
  // }
  const shipment1 = ref([res.data]);

  for (const item in shipment1.value) {
    let currentDate = new Date().getTime();


    product_input.value.weight = shipment1.value[item].data[0].cargo_info.weight || 0;
    product_input.value.l = shipment1.value[item].data[0].cargo_info.lengths || 0;
    product_input.value.w =  shipment1.value[item].data[0].cargo_info.width || 0;
    product_input.value.h = shipment1.value[item].data[0].cargo_info.height || 0;
    product_input.value.cod_amount = shipment1.value[item].data[0].cargo_info.cod_amount || 0;
    product_input.value.id = shipment1.value[item].data[0]._id


    products.value.push({
      id: `SO${Date.now()}${Math.round(Math.random() * 10)}`,
      shipment_id: shipment1.value[item].data[0]._id,
      waybill_numnber: shipment1.value[item].data[0].waybill_number,
      shipment_number: shipment1.value[item].data[0].shipment_number,
      sales_channel: shipment1.value[item].data[0].company.name,
      ship_to_name: shipment1.value[item].data[0].shipping_full_name,
      ship_to_province:
        shipment1.value[item].data[0].city +
        " " +
        shipment1.value[item].data[0].state,
      ship_from_name: shipment1.value[item].data[0].warehouse.name,
      ship_from_province:
        shipment1.value[item].data[0].warehouse.city +
        " " +
        shipment1.value[item].data[0].warehouse.state,
      categories: [
        { name: shipment1.value[item].data[0].waybill_number },
        { name: shipment1.value[item].data[0].shipment_number },
      ],
      company: shipment1.value[item].data[0].company.name,
      shipto: shipment1.value[item].data[0].shipping_full_name,
      status: shipment1.value[item].data[0].status,
      postcode: shipment1.value[item].data[0].zipcode,
      createAt: currentDate.toString(),
      item_type: shipment1.value[item].data[0].cargo_info.item_type,
      weight: shipment1.value[item].data[0].cargo_info.weight,
      dimension: shipment1.value[item].data[0].cargo_info.lengths + '*' +  shipment1.value[item].data[0].cargo_info.width + '*' + shipment1.value[item].data[0].cargo_info.height ,
      cod_amount: shipment1.value[item].data[0].cargo_info.cod_amount,
      iscod: shipment1.value[item].data[0].cargo_info.cod_amount,
      shipment_fee: shipment1.value[item].data[0].cargo_info.iscod,
      picked_up_date:
        formatDate(shipment1.value[item].data[0].created_date) +
        " " +
        formatTime(shipment1.value[item].data[0].created_date),
    });
  }
 
};

// // getRoute Master Not use
// const getRouteMaster = (postcode) => {
//   sortStore.fetchRouteMaster(postcode);
// };

// Computed Properties
const totalCost = computed(() => {
  return products.value
    .reduce((acc, product) => (acc += product.price * product.quantity), 0)
    .toFixed(2);
});

const orderShipments = computed(() => {
  //return orderBy(this.products,'createAt')
  return products.value.sort((a, b) => {
    return b.createAt - a.createAt;
  });
});

const newItem = ref();

// User Stuff
const user = reactive({
  name: "",
  email: "",
});

const userString = computed(() => {
  return user.name + " " + user.email;
});

const submitKey = async (e) => {
  if (newItem.value.length > 0) {
    addShipment();
  }
  e.target.value = "";
  newItem.value = "";
};

const deleteInvoiceItem = (id) => {
  this.products = this.products.filter((item) => item.id !== id);
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

/*
  focus textarea
*/
</script>
