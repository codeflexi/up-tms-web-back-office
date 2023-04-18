<template>
  <div>
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

    <input type="file" @change="uploadExcelFile" />
    {{ datadisplay }}


    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3" v-for="(cell, index) in headerRow" :key="index">{{ cell }}</th>
        </tr>
      </thead>
      <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <tr v-for="(row, index) in datadisplay" :key="index">
          <td class="px-6 py-4" v-for="(cell, index) in row" :key="index">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>



    <button @click="transFormData">OK</button>
  </div>
</template>

<script setup>
import { read, utils } from "xlsx";
import { ref } from "vue";
import axios from "axios";

const headerRow = ref([]);
const datadisplay = ref([]);
const dataAll = ref([]);

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

const transFormData = () => {
  // Transform the data
  var my_obj_str = JSON.stringify(dataAll.value);

  var transformedData = [];
  var items = [];
  var contents = [];

  let randomInit = "";
  for (var i = 0; i < dataAll.value.length; i++) {
    randomInit = `TH${Date.now()}${Math.round(Math.random() * 1000)}`;

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
      contents = []
      for (var it = 0; it < content.length; it++) {
        contents.push(content[it]);
      }
    }

    if (dataAll.value[i].shipment_number != "") {
      transformedData.push({
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
        cargo_info: {
          weight: dataAll.value[i].weight_cm,
          lengths: dataAll.value[i].lengths_cm,
          width: dataAll.value[i].width_cm,
          cod_amount: dataAll.value[i].cod_amount,
          iscod: dataAll.value[i].cod_amount > 0 ? "Y" : "N",
        },
        content_items: contents,
       // shipment_items: items,
        sales_channel: "Upload",
      });
      items = [];
      contents = [];
    }
  }

  alert(JSON.stringify(transformedData));
  handleUpload(transformedData);
};
const handleUpload = async (data) => {
  try {
    const res = await axios.post("/api/v1/shipments/upload", data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
</script>
