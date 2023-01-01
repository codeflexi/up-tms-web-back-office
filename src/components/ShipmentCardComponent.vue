<script setup>
    import {} from "vue"

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
          'cod_amount',
          'shipment_fee',
          'status'
    ])
</script>
<template>
    <router-link :to="`/shipment/shipment-detail/${_id}`" class="w-full">
    <div class="  p-1 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 font-display grid grid-cols-1 divide-y cursor-pointer">
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
                    <span class=" font-kanit">Picked up time: </span>
                    <span class="px-2"> {{picked_up_date}}</span>                 
                </div>


              </div>
            
              <div class="flex justify-end gap-1 p-1 bg-white w-1/6">
                <div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {{status}}
                      </button>
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
            <div class="p-1 text-gray-900 w-4/12"> <span class="font-kanit"> Cod Amount(Bath) :</span>  {{cod_amount}} </div>
          </div>
<!-- End 4 Row -->
          <slot></slot>

          <div class="flex justify-end gap-1 p-1 bg-white">
            <div class="p-1 text-white bg-red-500">1</div>
            <div class="p-1 text-white bg-red-500">2</div>
            <div class="p-1 text-white bg-red-500">3</div>
          
          </div>
        
     
        
    </div>
</router-link>

</template>


  
 

