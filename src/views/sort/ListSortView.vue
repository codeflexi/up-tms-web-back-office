<script setup>

import { useSortStore } from '@/stores/sort-store'
import { ref , onMounted ,watch } from 'vue'
import Dropdown from '@/components/DropdownComponent.vue';
import Modal from '@/views/route/AddNewRouteView.vue';
import IconComponent from "@/components/IconComponent.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import moment from "moment";

const sortStore = useSortStore()

const user_input = ref({
	name: '',
	email: ''
})

const route_name = ref([

          {
            title: 'Bangna',
			id:'bn',
            link: '#'
          },
          {
            title: 'Samutprakarn',
			id:'sm',
            link:'#'
          },
          {
            title: 'Korat',
			id:'kr',
            link: '#'
          }
     

])


const sort = ref(false)

const shipments = ref({});
let page = ref(1);
let pageCount = ref(0);
let total = ref(0);
const modalActive = ref(false);

const selectedValue = ref('')
const isrefresh = ref('')

const onSelectChange = (e) => {
  selectedValue.value = e.target.value
}



const toggleModal =  () => {
      modalActive.value = !modalActive.value;
	
    };

  onMounted(async () => {
   // userStore.getEmailsByEmailAddress()
  
   fechShipmentSorts()
  })

watch(isrefresh,  () => {
console.log(isrefresh)
fechShipmentSorts()
});

watch(page, async () => {
	fechShipmentSorts()
});

const fechShipmentSorts = async () => {
	await sortStore.fetchShipmentSorts(page.value);
  pageCount.value = Math.ceil(sortStore.getShipmentSorts.total / 12);
   total.value = sortStore.getShipmentSorts.total
}

const CreateUser = () => {
	if (!user_input.value.name.trim() || !user_input.value.email.trim()) {
		return alert("Please enter a name and email")
	}
	sortStore.create(user_input.value)

	user_input.value = {
		name: '',
		email: ''
	}
}
</script>

<template>
	<div
    id="SingleMessageSection"
    class="w-full bg-gray-100 ml-2 rounded-t-xl h-full shadow-sm overflow-y-scroll"
  >
    <div class="border-b  bg-white">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
			<!-- add-new -->

			<router-link to="/sort/add-new" active-class="active">

				<div
			class="py-2 focus:outline-none text-red-600 rounded mt-4 flex items-center"
		  >
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  fill="none"
			  viewBox="0 0 24 24"
			  class="w-6 stroke-current mr-2"
			>
			  <path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 6v6m0 0v6m0-6h6m-6 0H6"
			  />
			</svg>
			Add another Sort
		  </div>
			</router-link>
		
        </div>
        <div class="text-xs text-gray-500">Sort Details</div>
      </div>
    </div>


	<div class="p-1 text-gray-900 bg-gray-100">
		<span>Page : {{ page }}</span> of <span>{{ pageCount }}</span> Results:
		<span>{{ total }} records</span>
  
		<div class="flex items-center justify-center p-1 text-xl">
		  <v-pagination
			v-model="page"
			:pages="pageCount"
			:range-size="5"
			active-color="#DCEDFF"
			@update:modelValue="sortStore.fetchShipmentSorts(page)"
		  />
		</div>
	  </div>

	
<div class=" mt-2 ml-10 bg-gray-100">
		<div class="users grid md:grid-cols-3" >
			<div v-for="sort in sortStore.getShipmentSorts.data" class="user w-fit box-border  border">
				<router-link :to="`/sort/sort-detail/${sort._id}`" >
				<div>Sort Number: {{ sort.sort_number }} </div>
				<div>Deliver Date: {{ moment(sort.sorted_date).format("MMM D HH:mm") }} </div>
				<h3 class=" text-lg">{{ sort.route?.name }} - {{ sort.route?.description }} </h3>
			
				<h2 class="  text-sm">{{ sort?.status }}</h2>
				<h4 class="  text-xs">{{ sort.user?.name }}</h4>
				<p class="text-end text-xs"><span>#of Shipments:</span>  {{ sort.shipment_ids.length }}</p>
			</router-link>
			</div>
		</div>
	</div>
	</div>
</template>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	
}



main {
	padding: 1.5rem;
}

h1 {
	color: #AAA;
	font-weight: 900;
	line-height: 1;
	text-transform: uppercase;
	margin-bottom: 1.5rem;
}

form {
	display: block;
	padding: 1.5rem;
	background-color: #fff;
	border-radius: 0.5rem;
	box-shadow: 0 3px 6px rgba(0,0,0,0.1);
	margin-bottom: 2rem;
}

input:not([type="checkbox"]) {
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

input:not([type="submit"]):not([type="checkbox"]) {
	display: block;
	width: 100%;
	border: 1px solid #EEE;
	padding: 1rem;
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	font-size: 1rem;
	transition: 0.4s;
}

input:not([type="submit"]):focus {
	border-color: #AAA;
}

input[type="submit"] {
	display: block;
	padding: 0.5rem 1rem;
	background-color: crimson;
	border-radius: 0.5rem;
	cursor: pointer;
	margin-left: auto;

	color: #FFF;
	font-size: 1rem;
	font-weight: 900;
	text-transform: uppercase;

	transition: 0.4s;
}

input[type="submit"]:hover {
	transform: scale(1.05);
	background-color: red;
}

label {
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
}

label input {
	margin-left: 0.5rem;
}

.user {
	display: block;
	padding: 1rem;
	background-color: #FFF;
	margin-bottom: 1rem;
	border-radius: 0.5rem;
	transition: 0.2s;
	width: 95%;
}

.user div {
	color: #AAA;
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
}

.user h3 {
	
	margin-bottom: 0.5rem;
	transition: 0.2s;
}

.user:hover {
	box-shadow: 0 3px 6px rgba(0,0,0,0.1);
	transform: scale(1.05);
}

.user:hover h3 {
	color: crimson;
}

.user:last-of-type {
	margin-bottom: 0;
}
</style>