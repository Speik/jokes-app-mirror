<template>
  <section class="flex items-center justify-center gap-8">
    <figure
      v-for="category in CATEGORIES"
      :key="category"
      v-ripple
      class="
        px-8 py-4 rounded-full cursor-pointer select-none
        bg-gray-50 text-gray-800 border-2-solid border-gray-200 drop-shadow-md
        hover:bg-gray-100 transition-all transition-duration-300
      "
    >
      <figcaption class="font-semibold tracking-wider">
        <i class="fa-solid fa-tag text-muted-color-emphasis" />
        <span class="ml-2">{{ category }}</span>
      </figcaption>
    </figure>
  </section>
</template>

<script setup lang="ts">
const CATEGORIES = ['Misc', 'Programming', 'Dark', 'Pun', 'Spooky', 'Christmas'];
const DEFAULT_CATEGORY = 'Any';
</script>
