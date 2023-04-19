<script setup>
    import {computed} from "vue"
    import QrcodeVue from 'qrcode.vue'

    const {_id,sales_channel,
         shipment_number ,
         picked_up_date,
          waybill_number,
          ship_to_province,
          ship_to_name,
          ship_from_province,
          ship_from_name,
          item_type,
          weight,
          dimension,
          cod_amount,
          shipment_fee,
          status
         } = defineProps([
        '_id',
        'sales_channel',
        'shipment_number',
        'waybill_number',
        'picked_up_date',
          'waybill_number',
          'ship_to_province',
          'ship_to_name',
          'ship_from_province',
          'ship_from_name',
          'item_type',
          'weight',
          'dimension',
          'cod_amount',
          'shipment_fee',
          'status'
    ])


    // 'DATA SUBMITTED',
    //         'PICKING UP',
    //         'PICKED UP',
    //         'ARRIVED HUB',
    //         'SORTED',
    //         'TRANSIT',
    //         'ARRIVED DC',
    //         'OUT FOR DELIVERY',
    //         'DELIVERED'

    // Computed Properties
const statusClass = computed(() => {
    if (status === 'DATA SUBMITTED') {
        return 'bg-yellow-200 text-gray-1000 p-3'
      } else if (status === 'PICKING UP') {
        return 'bg-red-500 text-white p-3'
      }
      else if (status === 'PICKED UP') {
        return 'bg-gray-600 text-white p-3'
      }else if (status === 'ARRIVED HUB') {
        return 'bg-orange-500 text-black p-3'
      }else if (status === 'SORTED') {
        return 'bg-blue-500 text-white p-3'
      }else if (status === 'TRANSIT') {
        return 'bg-yellow-500 text-black p-3'
      }else if (status === 'ARRIVED DC') {
        return 'bg-blue-900 text-white p-3'
      }
    else if (status === 'OUT FOR DELIVERY') {
        return 'bg-orange-500 text-black p-3'
      }
      else if (status === 'DELIVERED') {
        return 'bg-green-500 text-black p-3'
      }
      else {
        return 'bg-yellow-500 text-black p-3'
      }
    }
);
</script>
<template>
    <router-link :to="`/shipment/shipment-detail/${_id}`" class="w-full">
    <div class="  p-1 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 font-display grid grid-cols-1 divide-y text-sm hover:text-lg hover:text-red-700 cursor-pointer">
        <!-- Start 1st Row -->
        <div class=" flex  justify-start " >
            <div class="flex gap-1 p-1  justify-around w-5/6">
                <div class="p-2 text-gray-900  w-1/2"> 
                    <span class=" font-kanit">Waybill Number:</span>
                    <span>
                       
                                 {{waybill_number}}
                       
                    </span>
<br>
                    <span class=" font-kanit">Shipment Number:</span>
                    <span>
                        <span class="px-2"> {{shipment_number}}</span>  
                    </span>
                </div>

              

                <div class="p-1 text-gray-900 w-1/2">
                    <span class=" font-kanit">Shipment Date/Time : </span>
                    <span class="px-2"> {{picked_up_date}}</span>                 
                </div>

                <!-- "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -->
              </div>
              
              <div class="flex justify-end gap-1 p-1 bg-white w-1/6">
                <div>
                    <button :class="statusClass" class="font-bold py-2 px-4 rounded " v-if="status">{{status}}
                      </button>
                </div>
                <div>
                  <qrcode-vue v-if="waybill_number" :value="waybill_number" :size="50" level="H" />
             
              </div>
                
              </div>
         </div>
        <!-- End 1st Row -->

         
<!-- Start Second Row -->
          <div class="flex justify-center gap-10 p-2 text-gray-600">
            <div class="p-2 text-center ">
                <span class="font-Prompt_600 text-2xl text-center">{{ship_from_province}}</span> <br> <span class="text-center">{{ship_from_name}}</span> 
            </div>
            <div class="p-2 text-center "> {{sales_channel}}</div>
            <div class="p-2 text-center ">
                <span class="font-Prompt_600  text-2xl text-center">{{ship_to_province}}</span> <br> <span class="text-center">{{ship_to_name}}</span> 
            </div>
          </div>
          <!-- End Secound Row -->
         
<!-- Start 4 Row -->
          <div class="flex justify-around gap-1 p-1">
            <div class="p-1 text-gray-900  w-4/12">
                <span class="font-kanit"> Item Type :</span>  {{item_type}} </div>
                
            <div class="p-1 text-gray-900 w-4/12">   <span class="font-kanit"> Weight(KG.) :</span>  {{weight}}</div>
            <div class="p-1 text-gray-900 w-4/12">   <span class="font-kanit"> Dimension L*W*H (CM.) :</span>  {{dimension}}</div>
            <div class="p-1 text-gray-900 w-4/12"> <span class="font-kanit"> Cod Amount(Bath) :</span>  {{cod_amount}} </div>
          </div>
<!-- End 4 Row -->
          <slot></slot>

      
        
     
        
    </div>
</router-link>

</template>


  
 

