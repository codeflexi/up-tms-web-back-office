<script setup>
import IconComponent from "@/components/IconComponent.vue";
</script>
<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm overflow-y-scroll"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
            
                <a href="javascript:history.go(-1)">
         
            <IconComponent
              iconString="back"
              :iconSize="19"
              iconColor="#636363"
              text="Back to inbox"
              hoverColor="hover:bg-gray-100"
            />
          
        </a>
         

        
        </div>

        <div class="text-xs text-gray-500">Shipement Tracking </div>
        
      </div>
    </div>

    <div class="w-full flex bg-gray-100 px-10 py-10">

        <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-6">
              <span
                class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
              >
                <img
                  class="rounded-full shadow-lg"
                  src="https://via.placeholder.com/48.jpg"
                  alt="Bonnie image"
                />
              </span>
              <div
                class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"
              >
                <time
                  class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                  >just now</time
                >
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                  Bonnie moved
                  <a
                    href="#"
                    class="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                    >Jese Leos</a
                  >
                  to
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300"
                    >Funny Group</span
                  >
                </div>
              </div>
            </li>
            <li class="mb-10 ml-6">
              <span
                class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
              >
                <img
                  class="rounded-full shadow-lg"
                  src="https://via.placeholder.com/48.jpg"
                  alt="Thomas Lean image"
                />
              </span>
              <div
                class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
              >
                <div class="items-center justify-between mb-3 sm:flex">
                  <time
                    class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                    >2 hours ago</time
                  >
                  <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                    Thomas Lean commented on
                    <a
                      href="#"
                      class="font-semibold text-gray-900 dark:text-white hover:underline"
                      >Flowbite Pro</a
                    >
                  </div>
                </div>
                <div
                  class="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
                >
                  Hi ya'll! I wanted to share a webinar zeroheight is having regarding
                  how to best measure your design system! This is the second session of
                  our new webinar series on #DesignSystems discussions where we'll be
                  speaking about Measurement.
                </div>
              </div>
            </li>
            <li class="ml-6">
              <span
                class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
              >
                <img
                  class="rounded-full shadow-lg"
                  src="https://via.placeholder.com/48.jpg"
                  alt="Jese Leos image"
                />
              </span>
              <div
                class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"
              >
                <time
                  class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                  >1 day ago</time
                >
                <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                  Jese Leos has changed
                  <a
                    href="#"
                    class="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                    >Pricing page</a
                  >
                  task status to
                  <span class="font-semibold text-gray-900 dark:text-white"
                    >Finished</span
                  >
                </div>
              </div>
            </li>
          </ol>
        

    </div>
  </div>
</template>
