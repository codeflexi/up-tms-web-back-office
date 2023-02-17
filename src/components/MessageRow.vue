<template>
    <div id="MessageRow">
        <div 
            class="
                border-b 
                hover:border-gray-200 
                hover:border-t 
                hover:border-y-1 
                hover:border-x
                cursor-pointer
            "
            :class="[hasViewed ? 'bg-gray-100' : '']"
        >
            <div class="flex items-center px-4 py-2">
            
                <div class="flex items-center">
                    <component 
                        :is="isSelected ? CheckboxOutlineIcon : CheckboxBlankOutlineIcon"
                        @click="isSelected = !isSelected" 
                        :size="19" 
                        fillColor="#636363" 
                    />
                  
                </div>

                <div class="flex items-center w-full hover:bg-slate-200">
                    <router-link :to="`/pickup/shipment-detail/${id}`" class="w-full">

                        <div class="flex justify-between items-center">
                            <div class="flex items-center w-full">
                                <div class="font-semibold text-sm ml-1 truncate-status">
                                    {{ status }} 
                                </div>
                                <div class="font-semibold text-sm ml-4 truncate-from">
                                    {{ from }} 
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="mr-1.5 text-sm font-semibold truncate-subject">
                                        {{ subject }}
                                    </div>
                                    <div class="text-sm text-gray-500 truncate-body pr-2">
                                        - {{ body }}... 
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <div class="text-right truncate mr-4 w-full text-xs font-semibold">{{ fomatDate(time)}}</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, watch, ref } from "vue";
import CheckboxOutlineIcon from "vue-material-design-icons/CheckboxOutline.vue";
import CheckboxBlankOutlineIcon from "vue-material-design-icons/CheckboxBlankOutline.vue";
import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";
import moment from "moment";
import { onMounted } from "vue";

const emit = defineEmits(['selectedId'])

let isSelected = ref(false)

const props = defineProps({
  id: String,
  status:String,
  from: String,
  subject: String,
  body: String,
  time: String,
  hasViewed: Boolean
});

const { id, from, subject, body, time ,hasViewed} = toRefs(props);



watch(isSelected, (bool) => {
    emit('selectedId', { id: id.value, bool: bool})
})

const fomatDate = (dtime)=> {
    return moment(dtime).format("MMM D HH:mm");
}

</script>

<style lang="scss">
#MessageRow {
    .truncate-status {
        width: 80px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .truncate-from {
        width: 250px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .truncate-subject {
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .truncate-body {
        max-width: 400px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>
