<template>
    <div class=" bg-stone-200 dark:bg-stone-900 dark:text-stone-50">
        <UHeader title="" class="">
            <template #left>
                <UButton color="neutral" variant="outline" to="/" icon="i-lucide-house"></UButton>
            </template>
        </UHeader>
        <UMain class="container mx-auto max-w-screen-xl px-2">
            <slot />
        </UMain>
        <UFooter />
    </div>
</template>

<script setup lang="ts">
</script>
  