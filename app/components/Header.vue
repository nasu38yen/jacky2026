<script setup lang="ts">
</script>

<template>
    <div class="">
      <div class="bg-stone-300">
        <div class="h-[40px] flex items-center" >
          <div class="h-full">
            <img src="/img/pyramid.svg" class="h-full p-1" alt="ci" />
          </div>
          <span class="text-cyan-900 text-xl md:text-3xl font-brand">
            <nuxt-link to="/">PEACE2</nuxt-link>
          </span>
          <div class="flex flex-auto justify-end px-2">
          </div>
        </div>
      </div>
      <nav class="bg-gradient-to-b from-stone-500 to-stone-700 flex justify-start text-white text-base font-semibold">
        <div class="px-4 py-1 hover:bg-gray-50 hover:text-orange-500"><nuxt-link to="/">ホーム</nuxt-link></div>
        <!-- <div class="px-4 py-1 hover:bg-gray-50 hover:text-orange-500"><nuxt-link to="/">aaaaa</nuxt-link></div> -->
        <!-- <div class="px-4 py-1 hover:bg-gray-50 hover:text-orange-500"><nuxt-link to="/dashboard">Dashboard</nuxt-link></div> -->
      </nav>
    </div>
</template>
  