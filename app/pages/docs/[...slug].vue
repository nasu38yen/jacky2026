<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('bmop').path(route.path).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description
})

// blog用のレイアウト
definePageMeta({
  layout: 'bloglayout'
})
</script>

<template>
  <BmopPost v-if="post" :page="post"/>
</template>
