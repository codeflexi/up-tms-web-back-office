<template>
  <div id="HomeView" class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm">

    <div class="container px-4 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-1/5 px-4">
          <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">All</span>

        </div>
        <div class="w-1/5 px-4">
          <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">Submitted</span>
        </div>
        <div class="w-1/5 px-4">
          <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">Pickedup</span>
        </div>
        <div class="w-1/5 px-4">
          <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">Sorted</span>
        </div>
        <div class="w-1/5 px-4">
          <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">Shiped</span>
        </div>
      </div>
    </div>

    <div class=" border-b grid grid-cols-3">
      <div class="flex items-center justify-between px-2 my-3">
        <IconComponent
          @click="deleteSelected"
          class="-m-2 -ml-2.5"
          iconString="trash"
          :iconSize=19
          iconColor="#636363"
          text="Delete selected"
          hoverColor="hover:bg-gray-100"
        />
       
    </div>
    <div class="flex text-1xl  text-gray-500">
    </div>
    <div class="flex text-xs text-gray-500  pt-2 justify-end px-2 my-2">
      <span>Page : {{ page }}</span> of  <span>{{ pageCount }}</span> Results:
      <span>{{ total }} records</span>
    </div>
  </div>
   
    <div v-for="ship in shipments.data" :key="ship._id">
        <MessageRow
          :id="ship._id"
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
  import { onMounted , ref ,watch} from 'vue'
  import VPagination from "@hennge/vue3-pagination";
  import MessageRow from "@/components/MessageRow.vue";
  import IconComponent from '@/components/IconComponent.vue';
  import { useUserStore } from "@/stores/user-store";
  import axios from 'axios';
  const userStore = useUserStore()
  

  const shipments = ref({});
let page = ref(1);
let status = ref('Submitted');
let pageCount = ref(null);
let total = ref(null);



  let emailsToDelete = []

  onMounted(async () => {
   // userStore.getEmailsByEmailAddress()
   await getShipments();
  })

  watch(page, async () => {
  //    const res = await axios.get(`/api/v1/shipments?limit=5&page=${page.value}`)
  //    pageCount.value = response.data.count;
  //    shipments.value = res.data;
  await getShipments();
  
});
watch(status, async () => {
  await getShipments();
});

  const getShipments = async () => {
  try {
    const res = await axios.get(`/api/v1/shipments?limit=20&page=${page.value}`);
    pageCount.value = Math.ceil(res.data.total / 5);
    total.value = res.data.total;
    shipments.value = res.data;
    console.log(shipments.value);
  } catch (err) {
    console.log(err);
  }
};

  const selectedId = (e) => {
    if (!emailsToDelete.length) {
      emailsToDelete.push(e.id)
    } else if (e.bool && !emailsToDelete.includes(e.id)) {
      emailsToDelete.push(e.id)
    } else if (!e.bool && emailsToDelete.includes(e.id)) {
      const index = emailsToDelete.indexOf(e.id);
      if (index > -1) { 
        emailsToDelete.splice(index, 1); 
      }
    }
  }

  const deleteSelected = () => {
    if (!emailsToDelete.length) return
    
    let res = confirm("Are you sure you want to delete the selected emails?");
    if (res) { 
      emailsToDelete.forEach(async id => {
        await userStore.deleteEmail(id)
      })

      emailsToDelete = []
    }
  }

</script>
