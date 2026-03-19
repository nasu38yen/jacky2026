<template>
  <div class="grid w-full grid-cols-1 items-start gap-4 overflow-hidden rounded-lg border border-gray-200 dark:border-stone-700 md:grid-cols-2 md:gap-6 my-6">
    <div class="min-w-0 w-full overflow-hidden">
      <NuxtImg
        :src="image"
        :alt="alt"
        class="block h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
      />
    </div>
    <div class="min-w-0 w-full overflow-hidden">
      <NuxtImg v-if="image2"
        :src="image2"
        :alt="alt2"
        class="block h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'photo image'
  },
  image2: {
    type: String,
    required: false
  },
  alt2: {
    type: String,
    default: 'photo image'
  },
})
</script>
