<template>
  <section class="h-dvh bg-gradient-to-tr from-orange-100 to-violet-200">
    <section class="relative h-full w-full overflow-y-auto flex flex-col">
      <section class="flex flex-initial items-center justify-center uppercase font-caption text-gray-800 text-8xl py-32 select-none">
        Jokes App
      </section>

      <section class="flex flex-col items-center flex-auto">
        <CategoriesList class="flex-initial" />
        <Joke class="flex-auto py-24 max-w-[30%]" />
      </section>

      <section class="flex-initial text-center text-muted-color-emphasis py-4">
        {{ new Date().getFullYear() }} &copy; Jokes App
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
</script>
