<template>
  <div id="LoginView" class="grid h-screen place-items-center">
    <div>
      <div class="flex justify-center">
        <div
          class="bg-gray-100  shadow rounded-lg flex flex-col justify-center py-12 px-6 lg:px-8 font-Prompt_400"
        >
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-12 w-auto" src="img/up_logo.png" alt="Workflow" />
           


            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              UP TMS
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600 max-w">
              Already registered?
              <a
                href="#"
                class="font-medium text-red-600 hover:text-red-500 focus:outline-none"
                >Sign in</a
              >
            </p>
          </div>

          <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
              <form
                @submit.prevent="userStore.handleLogin(form)"
                class="mb-0 space-y-6"
              >
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email address</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="form.email"
                      v-autofocus
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="form.password"
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div class="flex items-center">
               
                  <label
                    for="terms-and-privacy"
                    class="ml-2 block text-sm text-red-900 font-bold"
                   >{{userStore.authErrors}}</label>
                  
                </div>

                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user-store";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { vAutofocus } from '@/directives/vAutofocus'

const userStore = useUserStore();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

onMounted(() => {
  setTimeout(() => {
    router.push("/shipment");
  }, 250);
});

const callback = async (response) => {
  //  await userStore.getUserDetailsFromGoogle(response)
  // setTimeout(() => { router.push('/pickup') }, 250)
};
</script>
