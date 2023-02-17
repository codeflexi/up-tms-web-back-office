<template>
  <section
    id="HomeView"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm"
  >
    <div class="border-b grid grid-cols-3">
      <div class="flex items-center justify-between px-2 my-3">
        <span>
          <router-link to="/sort">
            <IconComponent
              iconString="back"
              :iconSize=19
              iconColor="#636363"
              text="Back to sort"
              hoverColor="hover:bg-gray-100"
            />
          </router-link>

          <button  @click="handleSubmittedData"   v-if="products.length"
          type="button"
            class="px-4 py-2 rounded focus:outline-none bg-gray-900 text-white font-semibold hover:bg-gray-500"
          >
            CONFIRM SORT
          </button>


        </span>
        <span class="flex justify-start">
          <IconComponent
            class="-m-2 -ml-2.5"
            iconString="trash"
            :iconSize=19
            iconColor="#636363"
            text="Delete selected"
            hoverColor="hover:bg-red-300"
          />
        </span>
      </div>
      <div class="flex text-1xl text-gray-500"></div>
      <div class="flex text-3l text-gray-500 pt-2 justify-end px-2 my-2 mr-5">
        Count : {{ products.length }}
      </div>
    </div>

    <div
      class="input-width w-full bg-gray-200 flex items-center ml-20 rounded-lg mt-3 py-3"
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
        iconSize=40
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
          <div class="mt-4">
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

       <!-- {{ route_master.route}} -->

        <!-- {{sortStore.getRouteMaster.count?sortStore.route_master.name:'error'}} -->
        <div
          class="lg:w-1/4 md:w-1/2 p-4 w-full mb-4 bg-white rounded-t-xl shadow-sm"
          v-for="product in orderShipments"
          :key="product.id"
        >
          <!-- <router-link
            class="block relative h-48 rounded overflow-hidden"
            :to="{ name: 'products.show', params: { id: product.id } }"
          >
            <img
              alt="ecommerce"
              class="object-cover object-center w-full h-full block"
              src="https://dummyimage.com/420x260"
            />
          </router-link> -->
          <div class="mt-4">
            <p class="mt-1 text-xl bg-yellow-300 text-gray-900 text-center border-spacing-1 rounded-lg" v-text="product.routename"></p>
            <h3
              class="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase inline-block mr-2"
              v-for="category in product.categories"
              v-text="category.name"
            ></h3>
            <h2
              class="text-gray-900 title-font text-lg font-medium"
              v-text="product.name"
            ></h2>
            <p class="mt-1" v-text="product.status"></p>
            <p class="mt-1" v-text="product.shipto"></p>
            <p class="mt-1" v-text="product.postcode"></p>
            <p class="mt-1" v-text="product.routeid"></p>
            <p>
              <IconComponent
                @click="removeShipment(product)"
                v-if="products.length"
                class="-m-2 -ml-2.5"
                iconString="trash"
                :iconSize=19
                iconColor="#636363"
                text="Delete selected"
                hoverColor="hover:bg-red-300"
              />
            </p>
          </div>
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
import { useRoute , useRouter } from "vue-router";

import { useSortStore } from '@/stores/sort-store'
const sortStore = useSortStore()

const {route_master} = storeToRefs(useSortStore())


//import {ref} from '@vue/reactivity'

const route = useRoute();
const router = useRouter();

const firstName = ref("");

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

const decreaseQuantity = (index) => {
  products.value[index].quantity -= 1;

  if (products.value[index].quantity === 0) {
    products.value.splice(index, 1);
  }
};

const increaseQuantity = (index) => {
  products.value[index].quantity += 1;
};

const formatCurrency = (amount) => {
  amount = amount / 100;
  return amount.toLocaleString("en-TH", { style: "currency", currency: "THB" });
};

const handleSubmittSort = async (data) => {
  try {
    let apiURL = "/api/v1/shipment-sorts";

    const res = await axios.post(apiURL, {
      route: data.sortId,
      shipment_ids: data.shipmentId,
    });

    Swal.fire(
  'Create New Sorting succesfully!',
  'You clicked the button!',
  'success'
)

  } catch (error) {
    console.log(error);
  }
};

const handleSubmittedData = async () => {
  try {
   
    // Delete Duplicate
    unique.value = [];
    for (const item of products.value) {
      const isDuplicate = unique.value.find(
        (obj) => obj.shipment_id === item.shipment_id
      );
      if (!isDuplicate) {
        unique.value.push({id: item.shipment_id,
          routeid:item.routeid,
          routename:item.routename
        }
        );
      }
    }


// Grouping by Route Master

let ObjMap =[];

unique.value.forEach(element => {
    var makeKey = element.routeid;
  
     if(!ObjMap[makeKey]) {
       ObjMap[makeKey] = [];
     }
    ObjMap[makeKey].push([
      element.id
]);
   });

  let ObjArr = Object.entries(ObjMap);
  
  let upload = {}

for (const item of ObjArr){
  upload  = {
    sortId:item[0],
    shipmentId:item[1]
  } 
const res = await handleSubmittSort(upload)

}

    router.push("/sort");
  } catch (error) {
    console.log(error);
    Swal.fire(`Data incorrect - ${error}`, "Please try again!!", "warning");
  }
};

const addRouting = async (shipment_number) => {
 
  // Get Data
  let res = await axios.get(
    `/api/v1/shipments?waybill_number=${shipment_number}`
  );

  const shipment1 = ref([res.data]);

  for (const item in shipment1.value) {
    let currentDate = new Date().getTime();

     // Call fetch Router Master from store
    const postcode = shipment1.value[item].data[0].zipcode
    const rt =  await sortStore.fetchRouteMaster(postcode);

    // set Route master
   // console.log(rt.data.data[0])
    sortStore.setRouteMaster(rt.data.data[0])
  
    

    // const rt_master = ref([route_master])

    // for (const rt of rt_master.value) {
    //   console.log(rt[0].data[0]._id)
    // }

    products.value.push({
      id: `SO${Date.now()}${Math.round(Math.random() * 10)}`,
      shipment_id: shipment1.value[item].data[0]._id,
      waybill_numnber: shipment1.value[item].data[0].waybill_number,
      shipment_number: shipment1.value[item].data[0].shipment_number,
      categories: [
        { name: shipment1.value[item].data[0].waybill_number },
        { name: shipment1.value[item].data[0].shipment_number },
      ],
      company: shipment1.value[item].data[0].company.name,
      shipto: shipment1.value[item].data[0].shipping_full_name,
      status: shipment1.value[item].data[0].status,
      postcode: shipment1.value[item].data[0].zipcode,
      routename: sortStore.routeName ,
      routeid: sortStore.routeId ,
      createAt: currentDate.toString(),
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

/*
  focus textarea
*/
</script>
