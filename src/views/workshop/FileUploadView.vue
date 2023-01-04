<template>
  <div id="file-upload">
    <input type="file" @change="onChange" />
   {{ post }}
  </div>
</template>

<script setup>
import { read } from 'xlsx';
import { ref } from 'vue';

const posts = ref([]);
const post = ref({
    title:'',
    author:'',
    released:''
});

const onChange =  (event) => {
    console.log('ssss');
  let file = event.target.files ? event.target.files[0] : null;
  
  if (file) {
    
      /* Parse data */
      const bstr = event.target.result
     
      const wb = read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[1];
      const worksheet = wb.Sheets[wsname];

    console.log(bstr)
     
    };

};
</script>
