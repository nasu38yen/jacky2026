<template>
  <div class="grid w-full grid-cols-1 items-start gap-4 overflow-hidden rounded-lg border border-gray-200 dark:border-stone-700 md:grid-cols-2 md:gap-6 my-6">
    <div class="min-w-0 w-full overflow-hidden" :class="{ 'md:order-2': reverse }">
      <NuxtImg
        :src="image"
        :alt="alt"
        class="block h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
      />
    </div>
    <div class="flex min-w-0 w-full flex-col gap-3 p-6" :class="{ 'md:order-1': reverse }">
      <div class="wrap-break-word text-lg leading-relaxed text-gray-600 dark:text-stone-300 *:m-0 *:p-0 [&_p]:inline [&_p+p]:before:whitespace-pre [&_p+p]:before:content-['\A']">
        <slot />
      </div>
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
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>
