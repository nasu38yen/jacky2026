<template>
  <section class="w-full rounded-lg border border-gray-200 dark:border-stone-700 my-6 overflow-hidden bg-white dark:bg-stone-800/50">
    <div class="p-6">
      <h2 class="mb-4 text-2xl font-bold text-gray-600 dark:text-stone-200 border-b border-gray-100 dark:border-stone-700 pb-2">{{ title }}</h2>

      <div v-if="isLoading" class="text-stone-500 dark:text-stone-400 animate-pulse">読み込み中…</div>

      <ul v-else-if="children && children.length" class="flex flex-col divide-y divide-gray-100 dark:divide-stone-700">
        <li v-for="child in children" :key="child.path" class="py-3 first:pt-0 last:pb-0">
          <NuxtLink :to="child.path" class="group block no-underline">
            <strong class="block text-lg text-gray-500 dark:text-stone-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{{ child.title }}</strong>
            <small class="text-sm text-stone-500 dark:text-stone-400 mt-1 block">{{ formattedDate(child.createdAt) }}</small>
          </NuxtLink>
        </li>
      </ul>

      <p v-else class="text-stone-500 italic dark:text-stone-400 text-sm">関連記事はありません。</p>
    </div>
  </section>
</template>

<script setup lang="ts">

const props = defineProps({
  slug: { type: String },
  title: { type: String, default: '関連記事' }
})

const { data: children = [], pending: isLoading } = await useAsyncData(
  `children-${props.slug}`, () => {
    const results = queryCollection('bmop')
                    .where('parent', '=', props.slug)
                    .order('createdAt', 'DESC')
                    .select('title', 'path', 'createdAt')
                    .all()
    return results
  }, {
    watch: [() => props.slug]
  }
)

function formattedDate(d: string | undefined) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString()
  } catch (e) {
    return d
  }
}
</script>
