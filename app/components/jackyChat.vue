<script setup lang="ts">
import jackyData from '~/assets/jackyChat.json'

const opinion = ref('')
const messages = ref<{ role: 'user' | 'jacky', text: string }[]>([
])
const loading = ref(false)
const chatContainer = ref<any>(null)

watch(messages, async () => {
  await nextTick()
  scrollToBottom()
}, {
  deep: true
})

async function askJacky() {
  if (!opinion.value.trim() || loading.value) return

  // ユーザーの正論を追加
  const userText = opinion.value
  messages.value.push({ role: 'user', text: userText })
  opinion.value = ''
  loading.value = true

  try {
    const response = await $fetch('/api/jacky', {
      method: 'POST',
      body: { message: userText }
    })
    
    // ジャッキーの反論を追加
    messages.value.push({ role: 'jacky', text: response.message })
  } catch (e) {
    messages.value.push({ role: 'jacky', text: jackyData.messages.error })
  } finally {
    loading.value = false
  }
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
      <div class="flex-shrink-0 bg-orange-100 dark:bg-orange-900/30">
        <UTooltip>
          <div>
            <img src="/img/jacky.png" :alt="jackyData.profile.name" class="w-64 h-64" />
          </div>
          <template #content>
            <p>{{ jackyData.profile.name }}</p>
            <p>{{ jackyData.profile.details }}</p>
          </template>
        </UTooltip>
      </div>
      <div class="relative w-full max-w-md md:w-auto">
        <p class="relative bg-white dark:bg-gray-800 p-4 rounded-lg text-lg text-gray-600 dark:text-gray-300 shadow">
          {{ jackyData.messages.greeting }}
        </p>
        <!-- Tail for md screens (points left) -->
        <div class="hidden md:block absolute top-auto bottom-6 -left-3 w-0 h-0
                    border-t-[10px] border-t-transparent
                    border-b-[10px] border-b-transparent
                    border-r-[12px] border-r-white dark:border-r-gray-800"></div>
        <!-- Tail for small screens (points up) -->
        <div class="block md:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-0 h-0
                    border-l-[10px] border-l-transparent
                    border-r-[10px] border-r-transparent
                    border-b-[12px] border-b-white dark:border-b-gray-800"></div>
      </div>
    </div>

    <UCard v-if="messages.length > 0" ref="chatContainer" class="mb-6 min-h-[400px] bg-orange-50/50 dark:bg-gray-900/50">
      <div class="space-y-4">
        <div v-for="(msg, i) in messages" :key="i" 
             :class="['flex items-end gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start']">
          <div v-if="msg.role === 'jacky'" class="flex-shrink-0">
            <div class="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <UIcon name="i-lucide-cat" class="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div :class="[
            'max-w-[90%] p-3 rounded-2xl text-lg shadow-sm',
            msg.role === 'user' ? 'bg-green-200 dark:bg-green-700 text-gray-800 dark:text-gray-200 rounded-tr-none' : 
            'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-orange-200 dark:border-orange-900/50'
          ]">
            {{ msg.text }}
          </div>
          <div v-if="msg.role === 'user'" class="flex-shrink-0">
            <div class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
              <UIcon name="i-lucide-user" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>
        <div v-if="loading" class="flex justify-start italic text-gray-400 text-xs animate-pulse">
          {{ jackyData.messages.loading }}
        </div>
      </div>
    </UCard>

    <div class="flex items-end gap-2">
      <UTextarea v-model="opinion" :placeholder="jackyData.messages.placeholder" class="flex-1" :rows="2" autoresize :disabled="loading" :ui="{ base: 'text-lg md:text-lg' }" />
      <UButton class="rounded-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 cursor-pointer disabled:cursor-not-allowed" 
      variant="solid" :loading="loading" icon="i-lucide-paw-print" @click="askJacky" :disabled="!opinion.trim()" />
    </div>
  </div>
</template>