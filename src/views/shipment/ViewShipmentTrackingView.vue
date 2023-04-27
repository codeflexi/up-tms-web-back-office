<script setup>
import IconComponent from "@/components/IconComponent.vue";
import { useShipmentStore } from "@/stores/shipment-store";
import { useRoute } from "vue-router";
import { onMounted, ref, reactive, computed } from "vue";
import moment from 'moment';
const route = useRoute();
const shipmentStore = useShipmentStore();

onMounted(async () => {
    await shipmentStore.fetchShipmentLogs(route.params.id)
    await shipmentStore.fetchShipmentById(route.params.id)
});


</script>
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
              :iconSize="19"
              iconColor="#636363"
              text="Back to inbox"
              hoverColor="hover:bg-gray-100"
            />
          
        </a>
         

        
        </div>

        <div class="text-xs text-gray-500">Shipement Tracking </div>
       
      </div>
    </div>

    <div class="w-full flex bg-gray-100 px-10 py-10">

        <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-6" v-for="log in shipmentStore.getShipmentLogs.data" :key="log._id">
                
              <span
                class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
              >
                <img
                  class="rounded-full shadow-lg"
                  src="https://via.placeholder.com/48.jpg"
                  alt="Bonnie image"
                />
              </span>
              <div
                class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"
              >
                <time
                  class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                  ><div>Date: {{ moment(log.logged_date).format("MMM D HH:mm") }} </div></time
                >
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                 By :  {{ log.user?.name}}
                  <a
                    href="#"
                    class="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                    >{{ log.event }}</a
                  >
                  Document# :
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300"
                    >{{ log.ref_number }}</span
                  >

                  
                </div>
              </div>
              <div  v-if="log.event === 'OUT FOR DELIVERY'" class=" flex p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                <a :href="shipmentStore.getShipments.data.loaded_info?.photo">
                  <img class="rounded-lg" width="200" :src="shipmentStore.getShipments.data.loaded_info?.photo" alt="image description">
                </a>
                <a :href="shipmentStore.getShipments.data.loaded_info?.signature">
                  <img class="rounded-lg ml-6 " width="200" :src="shipmentStore.getShipments.data.loaded_info?.signature" alt="description">
                </a>
              </div>

              <div  v-if="log.event === 'DELIVERED'" class=" flex p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                <a :href="shipmentStore.getShipments.data.delivered_info?.photo">
                  <img class="rounded-lg" width="200" :src="shipmentStore.getShipments.data.delivered_info?.photo" alt="image description">
                </a>
                <a :href="shipmentStore.getShipments.data.delivered_info?.signature">
                  <img class="rounded-lg ml-6 " width="200" :src="shipmentStore.getShipments.data.delivered_info?.signature" alt="description">
                </a>
              </div>


              <div  v-if="log.event === 'PICKED UP'  " class=" flex p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                <a :href="shipmentStore.getShipments.data.picked_up_info?.photo">
                  <img class="rounded-lg" width="200" :src="shipmentStore.getShipments.data.picked_up_info?.photo" alt="image description">
                </a>
                <a :href="shipmentStore.getShipments.data.picked_up_info?.signature">
                  <img class="rounded-lg ml-6 " width="200" :src="shipmentStore.getShipments.data.picked_up_info?.signature" alt="description">
                </a>
              </div>

            </li>
           
          </ol>
        

    </div>
  </div>
</template>
