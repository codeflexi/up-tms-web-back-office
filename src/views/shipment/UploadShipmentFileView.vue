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
          <h1 class="font-bold mb-2 ml-2 mt-2">
            เลือกบริษัท เลือกไฟล์ เพื่อทำการ Upload Shipment
          </h1>
        </div>

        <div class="text-xs text-gray-500">Shipement Upload</div>
      </div>
    </div>

    <div class="w-full flex bg-gray-100">
      <div id="subsigle" class="px-6 mt-5">
        <!-- Start Row1 -->
        <div
          class="max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <label class="mb-1 block" for="title">Select Company</label>
            <select
              class="text-lg px-4 py-3 rounded-xl w-full ring-red-700"
              name="company-selection"
              @change="onSelectChange(e)"
              v-model="form_input.selectCompany"
            >
              <option
                v-for="item in globalStore.getCompany.data"
                :value="item._id + '||' + item.warehouse"
                :key="item._id"
              >
                {{ item.name }}
              </option>
            </select>
        
          </div>

          <div class="ml-2 mt-1">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
              >Upload file</label
            >

            <input
              class="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-200 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              @change="uploadExcelFile"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              XLS,XLSX Only.
            </p>
          </div>
        </div>

        <div
          v-if="!isChangedComputed"
          class="mt-3 max-w-max p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex space-x-4 mb-2">
            <button
              @click="close"
              type="button"
              class="px-4 py-2 rounded focus:outline-none border-2 border-gray-300 text-gray-900 font-semibold"
            >
              Cancel
            </button>
            <button
              v-if="!isChangedComputed"
              @click="transFormData"
              class="px-4 py-2 rounded focus:outline-none bg-gray-900 text-white font-semibold"
            >
              Confirm to Upload Shipments
            </button>
          </div>

          <div class="relative overflow-x-auto">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3"
                    v-for="(cell, index) in headerRow"
                    :key="index"
                  >
                    {{ cell }}
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <tr v-for="(row, index) in datadisplay" :key="index">
                  <td
                    class="px-6 py-4"
                    v-for="(cell, index) in row"
                    :key="index"
                  >
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex space-x-4 mt-2">
            <button
              @click="close"
              type="button"
              class="px-4 py-2 rounded focus:outline-none border-2 border-gray-300 text-gray-900 font-semibold"
            >
              Cancel
            </button>
            <button
              v-if="!isChangedComputed"
              @click="transFormData"
              class="px-4 py-2 rounded focus:outline-none bg-gray-900 text-white font-semibold"
            >
              Confirm to Upload Shipments
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { read, utils } from "xlsx";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import IconComponent from "@/components/IconComponent.vue";
import { useGlobalStore } from "@/stores/global-store";
import { useUserStore } from "@/stores/user-store";
import { useRoute, useRouter } from "vue-router";
import  mongoose  from 'mongoose'

//import bson from 'bson';


const globalStore = useGlobalStore();
const userStore = useUserStore();
const headerRow = ref([]);
const datadisplay = ref([]);
const dataAll = ref([]);

//import {ref} from '@vue/reactivity'

const route = useRoute();
const router = useRouter();

const form_input = ref({
  selectCompany: "",
});

onMounted(() => {
  globalStore.fetchCompany();
  // const randomInit = `RO${Date.now()}${(Math.round(Math.random() * 10))}`
  //form_input.routeNumber.value = randomInit
});

const onSelectChange = (e) => {
  //alert(form_input.value.selectCompany);
};

const uploadExcelFile = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(sheet, { header: 1 });
    dataAll.value = utils.sheet_to_json(sheet);
    headerRow.value = jsonData[0];
    datadisplay.value = jsonData.slice(1);
  };
  reader.readAsBinaryString(file);

  // const workbook = read(file, { type: "buffer" });
  // const sheetName = workbook.SheetNames[0];
  // const worksheet = workbook.Sheets[sheetName];
  // const rawData = utils.sheet_to_json(worksheet);
  // console.log(datadisplay.value);
};

const isChangedComputed = computed(() => {
  if (dataAll.value.length > 0) {
    return false;
  }
  return true;
});

const transFormData = () => {
  if (form_input.value.selectCompany === "") {
    alert("โปรดระบุ Company");
    return;
  }


  const company = form_input.value.selectCompany.split("||");
  // Transform the data
  var my_obj_str = JSON.stringify(dataAll.value);

  var transformedData = [];
  var transformedDataLog = [];
  var items = [];
  var contents = [];

  let randomInit = "";
  let randomLogInt = "";
  let id = "";
  for (var i = 0; i < dataAll.value.length; i++) {
    randomInit = `TH${Date.now()}${Math.round(Math.random() * 1000)}`;
    randomLogInt = `LG${Date.now()}${Math.round(Math.random() * 1000)}`;
    id = new mongoose.Types.ObjectId();
   
// 5cabe64dcf0d4447fa60f5e2
  
    const content = dataAll.value[i].product_description.split("||");
    const item = dataAll.value[i].sku_id.split("||");

    // if (item) {
    //   items = []
    //   for (var it = 0; it < item.length; it++) {

    //    const product = item[it].split(",").map((val) => val.trim());

    //    var data = {
    //     product:product[0],
    //     quantity:product[1]
    //     };

    //     items.push(data);
    //   }
    // }
    // console.log(items)

    if (content) {
      contents = [];
      for (var it = 0; it < content.length; it++) {
        contents.push(content[it]);
      }
    }

    if (dataAll.value[i].shipment_number != "") {
      transformedData.push({
        _id:id,
        shipment_number: dataAll.value[i].shipment_number,
        waybill_number: randomInit,
        shipping_full_name: dataAll.value[i].shipping_full_name,
        shipping_address_line1: dataAll.value[i].shipping_address_line1,
        shipping_address_line2: dataAll.value[i].shipping_address_line2,
        city: dataAll.value[i].city,
        state: dataAll.value[i].state,
        zipcode: dataAll.value[i].zipcode,
        phone: dataAll.value[i].phone,
        is_by_pass: dataAll.value[i].is_by_pass,
        user: userStore.id,
        company: company[0],
        warehouse: company[1],
        cargo_info: {
          weight: dataAll.value[i].weight_kg,
          lengths: dataAll.value[i].lengths_cm,
          width: dataAll.value[i].width_cm,
          height: dataAll.value[i].height_cm,
          cod_amount: dataAll.value[i].cod_amount,
          iscod: dataAll.value[i].cod_amount > 0 ? "Y" : "N",
        },

        content_items: contents,
        // shipment_items: items,
        sales_channel: "Upload",
      });

      //Create Log of New Shipments
      const shipmentlog = {
        user: userStore.id,
        log_number: randomLogInt,
        waybill_number: randomInit,
        shipment_number: dataAll.value[i].shipment_number,
        event: "DATA SUBMITTED",
     shipment_id: id,
        ref_number: `Upload${Date.now()}`,
      };

      transformedDataLog.push(shipmentlog);

      items = [];
      contents = [];
    }
  }

   //alert(JSON.stringify(transformedDataLog));
  handleUpload(transformedData,transformedDataLog);
};

const handleUpload = async (data,datalog) => {
    const title = `Do you want to upload this data? total records are ${data.length}`
    
  try {
    Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Upload",
      denyButtonText: `Don't upload`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        const res = await axios.post("/api/v1/shipments/upload", data);
        const reslog = await axios.post("/api/v1/shipments/log-upload", datalog);

        Swal.fire("Data was uploaded Successfully!", "", "success");
        router.push("/shipment");
      } else if (result.isDenied) {
        Swal.fire("Changes are not uploaded", "", "info");
      }
    });
  } catch (error) {
    // Swal.fire(`Data incorrect - ${error}`, "Please try again!!", "warning");
    swalMessage(
      `Data upload incorrect - ${error}`,
      "Please try again!!",
      "warning"
    );
  }
};

const swalMessage = (err_msg, next_process, err_type) => {
  return Swal.fire(err_msg, next_process, err_type);
};
</script>
