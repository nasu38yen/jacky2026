<template>
  <div class="grid w-full grid-cols-1 items-start gap-4 overflow-hidden rounded-lg border border-gray-200 dark:border-stone-700 md:grid-cols-2 md:gap-6 my-6">
    <div class="min-w-0 w-full overflow-hidden" :class="{ 'md:order-2': reverse }">
      <iframe
          :src="`https://www.youtube.com/embed/${id}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen 
          class="w-full aspect-video"
      ></iframe>
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
  id: {
    type: String,
    required: true
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>
