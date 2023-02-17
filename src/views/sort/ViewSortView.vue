<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm overflow-y-scroll"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
         
          <router-link to="/sort">
            <IconComponent
              iconString="back"
              :iconSize=19
              iconColor="#636363"
              text="Back to inbox"
              hoverColor="hover:bg-gray-100"
            />
          </router-link>

          <IconComponent
            @click="deleteEmail(email.id)"
            iconString="trash"
            :iconSize=19
            iconColor="#636363"
            text="Delete"
            hoverColor="hover:bg-gray-100"
            class="ml-3"
          />
        </div>

      

        <div class="text-xs text-gray-500">Shipement Details</div>
      </div>
    </div>

    <div class=" bg-gray-100" v-if="sortStore.sort">
      <div class="w-full text-xl ml-20 font-light pt-5">
        {{ sortStore.sort?.status}}
      </div>
    </div>

  
   

    <div class="w-full flex bg-gray-100">
      <img
        class="rounded-full mt-8 mx-5 custom-img"
        src="https://via.placeholder.com/45"
      />
      <div class="w-full my-4 mx-0.5" v-if="sortStore.sort">
        <div class="font-semibold text-sm mt-4 mb-4">
          <div class="w-full flex justify-between items-center" >
            <div> {{ sortStore.sort?.sort_number}}</div>
            <div class="mr-5 text-xs font-normal">{{ moment(sortStore.sort?.createAt).format("MMM D HH:mm") }} </div>
          </div>
          <span class="text-xs text-gray-500 font-normal">Sort Number</span>
        </div>

        
        <div id="subsigle" class=" px-6">
<!-- Start Row1 -->

<div v-if="sort.id"
class="max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit">Route :</span>
  {{ sortStore.sort.route?.name}} - {{ sortStore.sort.route?.description }} [{{ sortStore.sort.route?.code }} ]
</p>
<p class="mb-3 font-display text-gray-700 dark:text-gray-400">
  <span class="font-kanit">Created By :</span>
  {{ sortStore.sort.user?.name}}
</p>

</div>

<!-- End Row1 -->
<div class="mt-6">
<span> <h1>Shipments:</h1></span><span> <h2> Total : {{sortStore.shipmentItems.length }}</h2> </span>  
<div class="bg-gray-300 w-full h-0.5 mt-1"></div>
</div>
          <!-- Start Product Table -->
          <div
         
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
                  <th scope="col" class="py-3 px-6 font-kanit">AWB</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Shipment#</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Channel</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Created Date</th>
                  <th scope="col" class="py-3 px-6 font-kanit">Ship to</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="ship in sortStore.shipmentItems"
                  :key="ship._id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-display"
                >
                
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship?.waybill_number }}
                  </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship?.shipment_number }}
                  </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship?.sales_channel}}
                  </td>
                  <td
                  class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                >
                {{ moment(ship?.createAt).format("MMM D HH:mm") }} 
                </td>
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ ship?.city}} -  {{ ship?.state}} -  {{ ship?.zipcode}}
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
import moment from "moment";


import { useSortStore } from "@/stores/sort-store";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const sortStore = useSortStore();

let sort = ref({});

// //Create Compute
// const getCargoInfos = computed(() => {
//   return shipmentStore.getCargoInfos;
// });

onMounted(async () => {
  const res = await sortStore.fetchShipmentSortbyId(route.params.id);
  // sortStore.setShipmentSort(res.data.data[0])
  sortStore.setShipmentSort(res.data.data)
  console.log(res.data.data._id)
 
  // await userStore.emailHasBeenViewed(res.id)
  
  sort.value = {
     id: res.data.data._id,
    // body: res.body,
    // createdAt: res.createdAt
    
  };
});

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
