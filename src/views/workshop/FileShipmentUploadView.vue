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
      SVG, PNG, JPG or GIF (MAX. 800x400px).
    </p>

    <input type="file" @change="uploadExcelFile" />
    {{ datadisplay }}
    <table>
      <thead>
        <tr>
          <th v-for="(cell, index) in headerRow" :key="index">{{ cell }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in datadisplay" :key="index">
          <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
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
  var items = []
  var contents = []


  let randomInit = "";
  for (var i = 0; i < dataAll.value.length; i++) {
    randomInit = `TH${Date.now()}${Math.round(Math.random() * 1000)}`;
    
    const item = dataAll.value[i].product_description.split("_");

    if (item)
    {
      for (var it=0; it < item.length; it++) {
        items.push(item[it]);
      }
     
    }
  
    transformedData.push({
      shipment_number: dataAll.value[i].shipment_number,
      waybill_number: randomInit,
      shipping_full_name: dataAll.value[i].shipping_full_name,
      shipping_address_line1: dataAll.value[i].shipping_address_line1,
      shipping_address_line2: dataAll.value[i].shipping_address_line2,
      city: dataAll.value[i].city,
      state: dataAll.value[i].state,
      zipcode: dataAll.value[i].zipcode,
      phone: dataAll.value[i].shipment_number,
      weight_kg: dataAll.value[i].phone,
      lengths_cm: dataAll.value[i].lengths_cm,
      width_cm: dataAll.value[i].width_cm,
      cod_amount: dataAll.value[i].cod_amount,
      iscod:dataAll.value[i].cod_amount > 0?'Y':'N',
      content_items:items,
      sales_channel: "Upload",
    });
    items = []
    contents = []
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
