<template>
    <div class="w-full text-lg font-display">
      <label v-if="label">{{ label }}</label>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      
      />
    </div>
  </template>
  
  <script setup>
  let value = ""
  // Define Emit Name = handleInput
  //const emit = defineEmits(["update:modelValue"]);
  defineProps({
    label: {
      type: [String, Boolean],
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
  });


  const handleInput = ($event) => {
    //value = $event.target.value;
    // emit(name,value =  payload or value whic is returned to parrent)
    
    // ใช้แบบข้างล่างนี้ก็ได้ ประกาศตัวแปล emai 
    //@input="handleInput"
//const emit = defineEmits(["update:modelValue"]);
//emit("update:modelValue",$event.target.value)
  };
   

  </script>

    <!-- <div>
        use Emit @handleInput and calling function upDateRow
                <TextInput label="ttt" textValue="" placeholder="text" @handleInput="updateRow"></TextInput>
              </div>


              const updateRow = (payload) =>{
  console.log(payload)

  ใช้ใน template  รับค่าเข้ามาแบบนี้ก็ได้
  @handle-input="desctext = $event"

  Bind : props  :textValue และส่งตัวแปร  ref เข้าไป
      <TextInput label="MMM" :textValue="form_input.desc" placeholder="text" @handle-input="form_input.desc = $event"></TextInput>
             <label>{{form_input.desc}}</label>
}
            -->