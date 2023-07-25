<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm overflow-y-scroll"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
         
          <a href="javascript:history.go(-1)">
            <IconComponent
              iconString="back"
              :iconSize=19
              iconColor="#636363"
              text="Back to inbox"
              hoverColor="hover:bg-gray-100"
            />
          </a>

         
<div class="flex items-center justify-between px-2">
        <router-link :to="`/shipment/shipment-tracking/${shipmentStore.getShipments.data?._id}`">
        <span
        class="bg-gray-100 text-gray-800  text-sm font-normal mr-2 px-2.5 py-0.5 rounded hover:bg-red-700 hover:text-white dark:bg-gray-600 dark:text-gray-300"
        >Status Tracking</span>
    </router-link>


      </div>
        </div>

  
        <div class="text-xs text-gray-500">Shipement Details</div>
      </div>
    </div>

    <div class=" bg-gray-100" v-if="shipmentStore.getShipments.data">
      <div class="w-full text-xl ml-20 font-light pt-5  text-red-800" >
        {{ shipmentStore.getShipments.data.status}}
      </div>
      <div class="w-full text-xl ml-20 font-light pt-1">
        <qrcode-vue v-if="shipmentStore.getShipments.data.waybill_number" :value="shipmentStore.getShipments.data.waybill_number" :size="100" level="H" />
      </div>
    
             
    </div>

  

    <div class="w-full flex bg-gray-100">
      <img
        class="rounded-full mt-8 mx-5 custom-img"
        src="https://via.placeholder.com/45"
      />
      <div class="w-full my-4 mx-0.5" v-if="shipmentStore.getShipments.data">
        <div class="font-semibold text-sm mt-4 mb-4">
          <div class="w-full flex justify-between items-center" >
            <div>{{ shipmentStore.getShipments.data.waybill_number}}</div>
            <div class="mr-5 text-xs font-normal">{{ formatDate(shipmentStore.getShipments.data.created_date) }} {{formatTime(shipmentStore.getShipments.data.created_date) }}
            </div>
          </div>
          <span class="text-xs text-gray-500 font-normal">Waybill Number</span>
        </div>

        
        <div id="subsigle" class=" px-6">
<!-- Start Row1 -->

<div v-if="shipmentStore.getShipments.data"
class="max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit">Sales Channel :</span>
  {{ shipmentStore.getShipments.data.sales_channel }}
</p>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit">Shipement Number :</span>
  {{ shipmentStore.getShipments.data.shipment_number }}
</p>


<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit"> Receive From :</span>
  {{ shipmentStore.getShipments.data.warehouse?.name }} {{ shipmentStore.getShipments.data.warehouse?.phone }}
</p>

<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  {{ shipmentStore.getShipments.data.warehouse?.address_line1 }}  {{ shipmentStore.getShipments.data.warehouse?.address_line2 }}
</p>
<div class="bg-gray-300 w-full h-0.5"></div>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit"> Ship To :</span>
  {{ shipmentStore.getShipments.data.shipping_full_name }} {{ shipmentStore.getShipments.data.phone }}
</p>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  {{ shipmentStore.getShipments.data?.shipping_address_line1 }} {{ shipmentStore.getShipments.data?.shipping_address_line2 }}
</p>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit"> District :</span>
  {{ shipmentStore.getShipments.data.city}}
</p>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit"> Province :</span>
  {{ shipmentStore.getShipments.data.state }}  {{ shipmentStore.getShipments.data.zipcode}} 
</p>
</div>

<!-- End Row1 -->

      <!-- Start Shipement Card -->
          <div class="grid grid-cols-2 py-2 w-full space-x-2">
            <div class="p-3 shadow-md sm:rounded-lg border-gray-200 bg-white">
              <p>
                <span class="text-xs text-gray-500 font-normal">Item Type</span>
                : <span>{{ shipmentStore.getCargoInfos.item_type }}</span>
              </p>
              <p>
                <span class="text-xs text-gray-500 font-normal"
                  >Weight(KG)</span
                >
                : <span>{{ shipmentStore.getCargoInfos.weight }} </span>
              </p>
              <p>
                <span class="text-xs text-gray-500 font-normal"
                  >Dimension L*W*H (CM)</span
                >
                :
                <span
                  >{{ shipmentStore.getCargoInfos.lengths }}*{{
                    shipmentStore.getCargoInfos.width
                  }}*{{ shipmentStore.getCargoInfos.height }}
                </span>
              </p>
              <p>
                <span class="text-xs text-gray-500 font-normal"
                  >COD Amount(Bath)</span
                >
                : <span>{{ shipmentStore.getCargoInfos.cod_amount }} </span>
              </p>
             
            </div>
            <div class="p-3  shadow-md sm:rounded-lg border-gray-200 bg-white">
              <p>

                <span class="text-xs text-gray-500 font-normal">Ordered Date :</span>
                : <span>{{ formatDate(shipmentStore.getShipments.data?.created_date) }} {{ formatTime(shipmentStore.getShipments.data?.created_date) }}</span>
              </p>
              <p>
                <span class="text-xs text-gray-500 font-normal"
                  >Planed Pickup Date:</span
                >
                : <span>{{ formatDate(shipmentStore.getShipments.data?.picking_date) }} {{ formatTime(shipmentStore.getShipments.data?.picking_date) }} </span>
              </p>
              <p>
                <span class="text-xs text-gray-500 font-normal"
                  >Driver :</span
                >
                :
                <span
                  >{{ shipmentStore.getShipments.data.driver?.name }} {{ shipmentStore.getShipments.data.driver?.last_name }}
                  
                </span>
              </p>
              <p>
                <span class="text-xs text-gray-500 font-normal"
                  >Vehicle</span
                >
                : <span>{{ shipmentStore.getShipments.data.vehicle?.plate_number }} {{ shipmentStore.getShipments.data.vehicle?.plate_province }} {{ shipmentStore.getShipments.data.vehicle?.type }} </span>
              </p>
            
            </div>
          </div>
          <!-- End Shipment Card -->

          <!-- Start Contents -->
          <div class="grid grid-cols-1 py-2 w-full space-x-2  text-xs" v-show="shipmentStore?.getOrderContents">
            <div class="p-3 shadow-md sm:rounded-lg border-gray-200 bg-white">
          <p> <b>Contents :</b></p>
          <p>{{shipmentStore?.getOrderContents}}</p>
            </div>
          </div>
          <!-- End Contents -->

          <!-- Start Product Table Order Items -->
         <div v-show="shipmentStore?.getOrderItems"
         
            class="max-w-3xl overflow-x-auto relative shadow-md sm:rounded-lg"
          >
          <p class="mt-3"></p>
            <table 
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                
                  
                  <th scope="col" class="py-3 px-6 font-kanit">Sku</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Product</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Quantity</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Discount Amount</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Net Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="ship in shipmentStore?.order_items"
                  :key="ship._id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-display"
                >
                <td
                class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
              >
                {{ ship.sku }}
              </td>

                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.product_name}}
                  </td>

                
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.order_quantity }}
                  </td>
                  <td
                  class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                >
                  {{ ship.discount_amount }}
                </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.net_amount }}
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
          <!-- Product Table Order Items -->

      

          <!-- Start Product Table -->
          <div v-show="shipmentStore.getShipmentItems"
         
            class="max-w-3xl overflow-x-auto relative shadow-md sm:rounded-lg"
          >
          <p class="mt-3"></p>
            <table 
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="py-3 px-6 font-kanit">
                    <span>Image</span>
                  </th>
                  <th scope="col" class="py-3 px-6 font-kanit">Product</th>
                  <th scope="col" class="py-3 px-6 font-kanit">code</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Qty</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="ship in shipmentStore.shipment_items"
                  :key="ship._id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-display"
                >
                  <td class="p-4 w-32">
                    <img
                      class="object-fill"
                      src="https://via.placeholder.com/20.png"
                    />
                  </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.product.name }}
                  </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.product.code }}
                  </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.quantity }}
                  </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship.product.price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End Product Table -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user-store";
import IconComponent from "@/components/IconComponent.vue";
import QrcodeVue from 'qrcode.vue'
import moment from "moment";

import { useShipmentStore } from "@/stores/shipment-store";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const shipmentStore = useShipmentStore();

let email = ref({});

const getCargoInfos = computed(() => {
  return shipmentStore.getCargoInfos;
});

onMounted(async () => {
  const res = await userStore.getEmailById(route.params.id);
  shipmentStore.fetchShipmentById(route.params.id);

  // await userStore.emailHasBeenViewed(res.id)
  let shipment_detail = reactive({});
  shipment_detail = res.shipmentDetail;
  email.value = {
    id: res.id,
    body: res.body,
    createdAt: res.created_date,
    firstName: res.firstName,
    fromEmail: res.fromEmail,
    lastName: res.lastName,
    subject: res.subject,
    hasViewed: res.hasViewed,
    shipment: shipment_detail,
    shipment_number: res.shipment_number,
    waybill_number: res.waybill_number,
    toEmail: res.toEmail,
  };
});

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

const deleteEmail = async (id) => {
  let res = confirm("Are you sure you want to delete this?");
  if (res) {
    await userStore.deleteEmail(id);
    setTimeout(() => {
      router.push("/email");
    }, 250);
  }
};
</script>

<style lang="scss">
#SingleMessageSection {
  .custom-img {
    width: 40px;
    height: 40px;
  }
}
</style>
