<script setup lang="ts">

const props = defineProps({
  page: { type: Object, required: true }
})

import { ref, watch, computed } from 'vue'

const parent = ref<any>(null)
const prev = ref<any>(null)
const next = ref<any>(null)

watch(() => props.page, async (p) => {
  if (!p) return
  parent.value = await queryCollection('bmop')
    .where('slug', '=', p.parent)
    .select('title', 'path', 'createdAt')
    .first()
  prev.value = await queryCollection('bmop')
    .where('parent', '=', p.parent)
    .where('createdAt', '<', p.createdAt)
    .order('createdAt', 'DESC')
    .select('title', 'path', 'createdAt')
    .first()
  next.value = await queryCollection('bmop')
    .where('parent', '=', p.parent)
    .where('createdAt', '>', p.createdAt)
    .order('createdAt', 'ASC')
    .select('title', 'path', 'createdAt')
    .first()
}, { immediate: true })

</script>

<template>
  <div class=" bg-stone-200 dark:bg-stone-900 dark:text-stone-50">
      <UHeader title="" class="">
          <template #left>
              <UButton color="neutral" variant="outline" to="/" icon="i-lucide-house"></UButton>
              <UButton color="neutral" variant="outline" v-if="parent" :to="parent.path" icon="i-lucide-arrow-big-up"></UButton>
              <UButton color="neutral" variant="outline" v-if="prev" :to="prev.path" icon="i-lucide-arrow-big-left"></UButton>
              <UButton color="neutral" variant="outline" v-if="next" :to="next.path" icon="i-lucide-arrow-big-right"></UButton>
          </template>
      </UHeader>
      <UMain class="container mx-auto max-w-screen-xl px-2">
        <ContentRenderer v-if="page" :value="page" />
      </UMain>
      <UFooter />
  </div>
</template>
