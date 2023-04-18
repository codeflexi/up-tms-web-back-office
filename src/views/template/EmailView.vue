<template>
  <div id="EmailView" class="bg-gray-50 h-screen font-display">
    <div id="TopMenu" class="flex items-center p-2">
      <div class="logo-section flex justify-start items-center px-3.5">
        <IconComponent
          @click="globalStore.toggleNavbar"
          iconString="menu"
          iconColor="#636363"
          text="Main menu"
          hoverColor="hover:bg-red-200"
          iconSize="30"
          class="-ml-2 mr-2"
        />

        <img width="107" src="/img/up_logo.png" alt="" class="logo-size" />
      </div>
      <div class="flex w-full justify-between">
        <div
          class="input-width w-full bg-gray-50 flex items-center p-1 px-2 rounded-lg"
        >
          <input
            placeholder=""
            class="w-full h-10 bg-gray-50 border-transparent border-none focus:ring-0 outline-none placeholder-gray-900 text-2xl"
            type="text"
            v-model="globalStore.getActiveMenu"
          />
        </div>

        <div class="flex w-32 justify-between items-center ml-6">
          <IconComponent
            iconString="cog"
            iconColor="#636363"
            text="Settings"
            hoverColor="hover:bg-gray-200"
          />
          <IconComponent
            iconString="apps"
            iconColor="#636363"
            text="Google apps"
            hoverColor="hover:bg-gray-200"
          />

          <UserComponent />
        </div>
      </div>
    </div>

    <div class="flex w-full">
      <div
        v-if="globalStore.getIsNavbar"
        id="SideMenu"
        class="bg-red-50 h-screen p-2 pt-2 shadow-lg font-Prompt_600"
      >
        <!-- v-if="isNavbar"  -->
        <router-link to="/shipment/upload">
        <div
          
          class="flex items-center justify-center bg-red-400 h-8 mt-1 rounded-2xl ml-2 p-8 cursor-pointer text-white uppercase racking-wider font-semibold text-sm px-5 py-3 shadow-lg hover:bg-red-500"
        >
          <PlusIcon :size="25" class="mr-2" />
          <span class="text-lg">เพิ่ม บุคกิ้ง</span>
        </div>
      </router-link>
        <div class="my-5"></div>

        <router-link to="/shipment">
          <div
            class="flex side-menu-item justify-between px-6 py-1.5 hover:bg-red-800 hover:text-white  hover:rounded-r-full"
            v-bind:class="{ 'bg-indigo-500': active === 'SHIPMENT' }"
            @click="setActive('SHIPMENT')"
          >
            <div class="flex items-center">
              <BoxIcon :size="24" />
              <div class="text-sm pl-4">SHIPMENT</div>
            </div>
          </div>
        </router-link>

        <router-link to="/pickup">
          <div
            class="flex side-menu-item justify-between px-6 py-1.5  hover:bg-red-800 hover:text-white  rounded-r-full "
            v-bind:class="{ 'bg-indigo-500': active === 'PICK UP' }"
            @click="setActive('PICK UP')"
          >
            <div class="flex items-center">
              <WarehouseIcon :size="24" />
              <div class="text-sm pl-4 font-semibold">PICK UP</div>
            </div>
          </div>
        </router-link>

        <router-link to="/receive">
          <div
            class="flex side-menu-item justify-between px-6 py-1.5 hover:bg-red-800 hover:text-white rounded-r-full "
            v-bind:class="{ 'bg-indigo-500': active === 'RECEIVE-HUB' }"
            @click="setActive('RECEIVE-HUB')"
          >
            <div class="flex items-center">
              <CubeScanIcon :size="24" />
              <div class="text-sm pl-4 font-semibold">RECEIVE [HUB]</div>
            </div>
          </div>
        </router-link>

        <router-link to="/sort">
          <div
            class="flex side-menu-item justify-between px-6 py-1.5 hover:bg-red-800 hover:text-white rounded-r-full"
            v-bind:class="{ 'bg-indigo-500': active === 'SORT' }"
            @click="setActive('SORT')"
          >
            <div class="flex items-center">
              <RobotIcon :size="24" />
              <div class="text-sm pl-4">SORT</div>
            </div>
          </div>
        </router-link>

        <router-link to="/delivery">
          <div
            class="flex side-menu-item justify-between px-6 py-1.5  hover:bg-red-800 hover:text-white  rounded-r-full active:bg-red-700"
            v-bind:class="{ 'bg-indigo-500': active === 'DELIVERY' }"
            @click="setActive('DELIVERY')"
            >
            <div class="flex items-center">
              <TruckOutline :size="24" />
              <div class="text-sm pl-4">DELIVERY</div>
            </div>
          </div>
        </router-link>
        <div class="border-b border-b-gray-300 my-2.5"></div>

        <router-link to="/receive">
          <div
            class="flex side-menu-item justify-between px-6 py-1.5  hover:bg-red-800 hover:text-white  rounded-r-full "
            v-bind:class="{ 'bg-indigo-500': active === 'RECEIVE-DC' }"
            @click="setActive('RECEIVE-DC')"
          >
            <div class="flex items-center">
              <ReceiveIcon :size="24" />
              <div class="text-sm pl-4 font-semibold">RECEIVE [DC]</div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- this is where the page changes -->
      
        <suspense>
          <template #default>
            <router-view /> 
          </template>
          <template #fallback>
            <div>
              <p>Loading....</p>
            </div>
          </template>
        </suspense>
     
     
      <!-- this is where the page changes -->

      <div class="m-4">
        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleCalendar.png" alt="" />
        </div>

        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleKeep.png" alt="" />
        </div>

        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleTasks.png" alt="" />
        </div>

        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleContacts.png" alt="" />
        </div>

        <div class="w-6 flex mb-7 border border-gray-300" />

        <div class="w-6 h-6 flex justify-center mb-7">
          <PlusIcon />
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="newMessageOpen"
    id="NewMessageSection"
    class="absolute bottom-0 right-0 mr-20 rounded-t-lg shadow-2xl bg-white font-display"
  >
    <div
      class="flex items-center justify-between rounded-t-lg w-full text-sm px-3.5 py-2.5 bg-gray-200"
    >
      <div>New message</div>
      <CloseIcon
        class="cursor-pointer"
        @click="newMessageOpen = false"
        :size="19"
      />
    </div>

    <div>
      <div class="relative flex items-center px-3.5 py-2">
        <div class="text-sm text-gray-700">To</div>
        <input
          v-model="toEmail"
          class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
          type="text"
        />
        <div class="absolute border-b w-[calc(100%-30px)] bottom-0"></div>
      </div>
      <div class="relative flex items-center px-3.5 py-2">
        <div class="text-sm text-gray-700">Subject</div>
        <input
          v-model="subject"
          class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
          type="text"
        />
        <div class="absolute border-b w-[calc(100%-30px)] bottom-0"></div>
      </div>
    </div>

    <div class="m-1">
      <textarea
        v-model="body"
        style="resize: none"
        class="w-full border-transparent border-none focus:ring-0 outline-none"
        rows="14"
      ></textarea>
    </div>

    <div class="p-4 mt-5">
      <button
        @click="sendEmail"
        class="bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full"
      >
        ส่ง แก้ไข
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";

import IconComponent from "@/components/IconComponent.vue";
import UserComponent from "@/components/UserComponent.vue";

import PencilOutlineIcon from "vue-material-design-icons/PencilOutline.vue";
import WarehouseIcon from "vue-material-design-icons/Warehouse.vue";
import TruckOutline from "vue-material-design-icons/TruckOutline.vue";
import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";
import RobotIcon from "vue-material-design-icons/RobotIndustrialOutline.vue";
import BoxIcon from "vue-material-design-icons/ArchiveOutline.vue";
import ReceiveIcon from "vue-material-design-icons/HandCoinOutline.vue";





import ClockOutlineIcon from "vue-material-design-icons/ClockOutline.vue";
import SendOutlineIcon from "vue-material-design-icons/SendOutline.vue";
import FileOutlineIcon from "vue-material-design-icons/FileOutline.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import CubeScanIcon from 'vue-material-design-icons/CubeScan.vue';

import { useUserStore } from "@/stores/user-store";
import { useGlobalStore } from "@/stores/global-store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const globalStore = useGlobalStore();

let newMessageOpen = ref(false);
let isNavbar = ref(true);
//let isNavbar = ref(false)
let toEmail = ref("");
let subject = ref("");
let body = ref("");

const sendEmail = async () => {
  // eslint-disable-next-line no-useless-escape
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(toEmail.value)) {
    alert("Please provide a valid email address");
    return;
  }

  await userStore.sendEmail({
    toEmail: toEmail.value,
    subject: subject.value,
    body: body.value,
  });

  newMessageOpen.value = false;
  toEmail.value = "";
  subject.value = "";
  body.value = "";
};

const setActive = async (name) => {
  await globalStore.setMenuActive(name);
};

</script>

<style lang="scss">
#EmailView {
  overflow: visible;

  .logo-section {
    min-width: 250px;
  }

  .logo-size {
    width: 50px;
    height: 40px;
  }

  .help-icon-gray {
    border: 2px solid rgb(132, 132, 132);
  }

  .input-width {
    max-width: 700px;
  }

  .custom-gray-color {
    background-color: rgb(232, 232, 232);
  }

  .side-menu {
    width: 400px;
  }

  .side-menu-item {
    width: 250px;
  }
}

#NewMessageSection {
  overflow: hidden;
  width: 560px;
  height: 570px;
}
</style>
