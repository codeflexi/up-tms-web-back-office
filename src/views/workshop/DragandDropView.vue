<script setup>
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';

const lists = ref([
	{
		id: 1,
		title: 'List 1'
	},
	{
		id: 2,
		title: 'List 2'
	}
])
const items = ref([
	{
		id: 13123,
		content: 'Item 1',
		list: 1,
		editing: false
	},
	{
		id: 13145,
		content: 'Item 2',
		list: 2,
		editing: false
	}
])

const GetListItems = listId => {
	return items.value.filter(item => item.list === listId);
}

const DragStart = (evt, itemID) => {
	evt.dataTransfer.setData('itemID', itemID);
	evt.dataTransfer.effectAllowed = 'move';
	evt.dataTransfer.dropEffect = 'move';
}

const DropItem = (evt, listID) => {
	const itemID = evt.dataTransfer.getData('itemID');
	const item = items.value.find(item => item.id == itemID);
	item.list = listID;
}

const CreateNewItem = (evt, listID) => {
	evt.stopPropagation();

	items.value.push({
		id: uuid(),
		content: 'New Item',
		list: listID,
		editing: true
	});
}

const EditItem = (evt, itemID) => {
	evt.stopPropagation();
	const item = items.value.find(item => item.id == itemID);
	item.editing = true;
}

const CreateNewList = () => {
	lists.value.push({
		id: uuid(),
		title: 'List ' + (lists.value.length + 1)
	});
}

</script>

<template>
	<main>

		<div>
			<h1>Kaban Board</h1>
			<button @click="CreateNewList">Create List</button>
		</div>

		<div class="lists">

			<div 
				v-for="list in lists" 
				class="list"
				@dblclick="CreateNewItem($event, list.id)">
				<h2>{{ list.title }}</h2>

				<div 
					class="items"
					@dragover.prevent
					@drop.prevent="DropItem($event, list.id)">

					<div 
						v-for="item in GetListItems(list.id)" 
						class="item"
						draggable="true"
						@dragstart="DragStart($event, item.id)"
						@dblclick="EditItem($event, item.id)">
						<input 
							type="text" 
							v-model="item.content"
							:disabled="!item.editing"
							@blur="item.editing = false" />
					</div>

				</div>

			</div>

		</div>

	</main>
</template>

<style>

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
	user-select: none;
}

body {
	background-color: #282947;
	color: white;
}

main {
	padding: 1.5rem;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

h1 {
	margin-bottom: 1rem;
}

button {
	appearance: none;
	border: none;
	outline: none;
	background-color: crimson;
	color: white;
	padding: 0.5rem;
	border-radius: 0.25rem;
	cursor: pointer;
	margin-bottom: 1.5rem;
}

.lists {
	flex: 1 1 0%;
	display: flex;
	align-items: flex-start;
	width: 100%;
	overflow: auto;
	margin: 0 -1rem;
}

.list {
	margin: 0 1rem;
	min-width: 192px;
	background-color: rgba(255, 255, 255, 0.1);
	padding: 1rem;
	border-radius: 0.5rem;
	box-sizing: initial;
}

.list h2 {
	margin-bottom: 1rem;
}

.list .items {
	min-height: 1.5rem;
}

.items .item {
	margin-bottom: 0.5rem;
	padding: 0.5rem;
	background-color: #EEE;
	color: #282947;
}

.items .item input {
	color: #282947;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

</style>