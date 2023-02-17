<template>
    <div class="bg-gray-200 p-2">
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
    </div>
  </template>
  
  <script setup>
 import { StreamBarcodeReader } from "vue-barcode-reader";
  const onDecode = async (result) => {
  try {
   console.log(result)
  } catch (err) {
    console.log(err);
  }
};
</script>