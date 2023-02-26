<template>
  <transition name="modal-animation" class="h-fit">
    <div v-show="modalActive" class="modal border-b overflow-scroll">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <!-- Start Content -->
          {{ shipmentId }}
          <form
            @submit.prevent="handleSubmittedData"
            class="rounded-lg mx-auto max-w-2xl w-full mt-5 shadow-lg bg-white border-t-4 border-red-600 font-Prompt_400"
          >
            <div class="px-8 pt-4 pb-4 space-y-6">
              <div class="flex justify-between items-start mb-16">
                <div>
                  <h1 class="text-4xl font-bold">Assign Pick up</h1>
                  <p class="text-gray-600">นัดเวลา เข้ารับของ</p>
                </div>
                <button type="button" class="focus:outline-none" @click="close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-8 text-gray-600 hover:text-gray-700 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {{ form_input.routeNumber }}

              <div>
                <label class="mb-1 block" for="title"
                  >Plan Picking Up Date/Time</label
                >
                <input
                  type="datetime-local"
                  class="form-input px-4 py-3 rounded-xl"
                  v-model="form_input.deliveryDate"
                />
              </div>

              <div>
                <label class="mb-1 block" for="title">Vehicle</label>
                <select
                  v-if="routeStore.getVehicle"
                  class="form-select px-4 py-3 rounded-xl w-full ring-red-700"
                  name="gender-selection"
                  @change="onSelectChange(e)"
                  v-model="form_input.selectedVehicle"
                >
                  <option
                    v-for="item in routeStore.getVehicle.data"
                    :value="item._id"
                    :key="item._id"
                  >
                    {{ item.plate_number }} {{ item.plate_province }}
                  </option>
                </select>
                <p>Selected value: {{ form_input.selectedVehicle }}</p>
              </div>

              <div>
                <p class="mb-2">Details</p>
                <textarea
                  class="form-textarea px-4 py-3 rounded-xl w-full"
                  v-model="form_input.memo"
                >
                </textarea>
              </div>
            </div>
            <div
              class="flex justify-between bg-gray-100 px-8 py-6 rounded-b-lg"
            >
              <button
                type="button"
                class="py-2 rounded focus:outline-none text-red-600 font-semibold"
              ></button>
              <div class="flex space-x-4">
                <button
                  @click="close"
                  type="button"
                  class="px-4 py-2 rounded focus:outline-none border-2 border-gray-300 text-red-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  @click="close"
                  type="submit"
                  class="px-4 py-2 rounded focus:outline-none bg-red-600 text-white font-semibold"
                >
                  Update Route
                </button>
              </div>
            </div>
          </form>
          <!-- End Content -->
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, ref, onMounted, toRefs } from "vue";
import { useRouteStore } from "@/stores/route-store";
import { useShipmentStore } from "@/stores/shipment-store";
import TextInput from "@/components/shares/Textinput.vue";
import Swal from "sweetalert2";

const emit = defineEmits(["close", "refresh"]);
const routeStore = useRouteStore();
const shipmentStore = useShipmentStore();

// Data Attributes
const products = ref([]);
const unique = ref([]);

// Props
const props = defineProps({
  modalActive: {
    type: [String, Boolean],
    default: false,
  },
  shipmentId: Array,
});
const close = () => {
  emit("close");
};

const refresh = (routeNumber) => {
  emit("refresh", routeNumber);
};

const { shipmentId } = toRefs(props);

const form_input = ref({
  routeNumber: "",
  selectedValueTo: "",
  selectedValueFrom: "",
  deliveryDate: "",
  selectedVehicle: "",
  memo: "",
  desc: "",
});

onMounted(() => {
  routeStore.fetchBranch();
  routeStore.fetchVehicle();
});

const getShipments = async () => {
  console.log(shipmentId.value);
  shipmentStore.fetchShipmentByIds(shipmentId.value);
  console.log(shipmentStore.getShipmentsById);
};

const createPickUp = () => {
  if (
    !form_input.value.selectedValueTo.trim() ||
    !form_input.value.selectedValueFrom.trim()
  ) {
    return alert("Please enter a source and destination");
  }

  routeStore.handleCreateRoute(form_input.value);

  const randomInit = `RO${Date.now()}${Math.round(Math.random() * 10)}`;
  form_input.value.routeNumber = randomInit;
  refresh(randomInit);

  form_input.value = {
   
    deliveryDate: "",
    selectedVehicle: "",
    memo: "",
  };
};

const getAllShipment = () => {
  //selectedValueTo.value = e.target.value
};

const onSelectChange = (e) => {
  //selectedValueTo.value = e.target.value
};

const groupedShipments =  async () => {
  // Grouping Shipment by company and warehouse
  const arr = Array.from(shipmentStore.getShipmentsById.data);
  const grouped = {};
  arr.forEach((shipment) => {
    const key = `${shipment.company}_${shipment.warehouse}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push([shipment._id]);
  });
  //return grouped;
  console.log(grouped);

  // Generate JSON to create new Picking Up Plan
  let ObjArr = Object.entries(grouped);

  let upload = {};
  for (const item of ObjArr) {
    const text = item[0];
    const parts = text.split("_");
    upload = {
      company: parts[0],
      warehouse: parts[1],
      shipmentId: item[1],
      vehicle:form_input.value.selectedVehicle,
      pickupDate:form_input.value.deliveryDate,
      memo: form_input.value.memo,

    };

    await shipmentStore.handleCreatePickUp(upload)

  }
  return upload
};

const handleSubmittedData = () => {
  try {
    const submit = groupedShipments()
    console.log('submit')
    console.log(submit)
  } catch (error) {
    console.log(error);
    Swal.fire(`Data incorrect - ${error}`, "Please try again!!", "warning");
  }
};

// const updateRow = (payload) =>{
//   console.log(payload)
// }
</script>

<!-- <script>
export default {
  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
};
</script> -->

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;

    max-width: 100%;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;

    i {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: crimson;
      }
    }
  }
}
</style>
