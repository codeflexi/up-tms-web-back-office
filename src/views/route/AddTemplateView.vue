<script setup>
import { useRouteStore } from '@/stores/route-store'
import { ref , onMounted ,watch } from 'vue'
import Dropdown from '@/components/DropdownComponent.vue';
import Modal from '@/views/route/AddNewRouteView.vue';


const routeStore = useRouteStore()

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
let pageCount = ref(null);
let total = ref(null);
const modalActive = ref(false);

const selectedValue = ref('')

const onSelectChange = (e) => {
  selectedValue.value = e.target.value
}

const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

  onMounted(async () => {
   // userStore.getEmailsByEmailAddress()
   await routeStore.fetchShipmentRoutes();
  })

  watch(page, async () => {
  //    const res = await axios.get(`/api/v1/shipments?limit=5&page=${page.value}`)
  //    pageCount.value = response.data.count;
  //    shipments.value = res.data;
  //await routeStore.fetchShipmentRoutes();
});

const CreateUser = () => {
	if (!user_input.value.name.trim() || !user_input.value.email.trim()) {
		return alert("Please enter a name and email")
	}
	routeStore.create(user_input.value)

	user_input.value = {
		name: '',
		email: ''
	}
}
</script>

<template>
	<main class=" font-display w-full">
		<h1>Add</h1>

		<form @submit.prevent="CreateUser">
			<input 
				type="text"
				placeholder="e.g. Naruto Uzumaki"
				v-model="user_input.name"  />
			<input 
				type="email" 
				placeholder="e.g. hokage@ninja.com"
				v-model="user_input.email" />
			<input 
				type="submit" 
				value="Create user" />

				

				<div>
					<label for="gender-selection">Select gender</label>

					
					<select class="form-select px-4 py-3  rounded-xl w-full ring-red-700"
					name="gender-selection"
					@change="onSelectChange(e)"
					v-model="selectedValue"
				  >
				  <option v-for="item in route_name" :value="item.id" :key="item.id">
					{{item.title}}
				</option>
				  </select>
					<p>Selected value: {{selectedValue}}</p>
				  </div>

		</form>

		<Modal @close="toggleModal" :modalActive="modalActive">
		
		  </Modal>

		<div><button @click="toggleModal" type="button">Open Modal</button></div>

		<!-- <label><span>Sort</span><input type="checkbox" v-model="sort" /></label>

		<div class="users" v-if="!sort">
           
			<div v-for="route in routeStore.getShipmentRoutes.data" class="user">
                <router-link :to="`/route/route-detail/${route._id}`" >
				<div>ID: {{ route._id }}</div>
				<h3>{{ route.route_number }}</h3>
				<p>{{ route.memo }}</p>
            </router-link>
			</div>
       
		</div> -->

		<div class="users">
			<div v-for="route in routeStore.getShipmentRoutes.data" class="user">
				<router-link :to="`/route/route-detail/${route._id}`" >
				<div>ID: {{ route._id }}</div>
				<h3>{{ route.route_number }}</h3>
				<p>{{ route.memo }}</p>
			</router-link>
			</div>
		</div>
	</main>
</template>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	
}

body {
	background-color: #EEE;
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
}

.user div {
	color: #AAA;
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
}

.user h3 {
	font-size: 1.5rem;
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