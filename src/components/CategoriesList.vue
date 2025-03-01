<template>
  <section>
    <section
      v-if="isLoading"
      class="flex items-center justify-center gap-8"
    >
      <Skeleton
        v-for="i in 6"
        :key="i"
        width="128px"
        height="64px"
        class="!bg-gray-100 !rounded-full"
      />
    </section>

    <Transition
      name="fade-slide"
      mode="out-in"
    >
      <section
        v-if="!isLoading"
        class="flex items-center justify-center gap-8"
      >
        <figure
          v-for="category in categories"
          :key="category"
          v-ripple
          class="
            px-8 py-4 rounded-full cursor-pointer select-none
          bg-gray-50 text-gray-800 drop-shadow-md
          [&.selected_.fa-tag]:text-white
          hover:bg-gray-100 hover:[&.selected]:bg-gray-700
            transition-all transition-duration-300
          "
          :class="{
            'selected bg-gray-800 text-white drop-shadow-xl': isCategorySelected(category),
          }"
          @click="onCategoryClick(category)"
        >
          <figcaption class="font-semibold tracking-wider">
            <i class="fa-solid fa-tag text-muted-color-emphasis transition-all transition-duration-300" />
            <span class="ml-2">{{ category }}</span>
          </figcaption>
        </figure>
      </section>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import { jokesHttpClient } from '@/lib/jokes';
import { useLoading } from '@/composables/use-loading';

const DEFAULT_CATEGORY = 'Any';

const selectedCategories = defineModel<string[]>({ default: [] });
const categories = reactive<string[]>([]);

const { isLoading, setLoading } = useLoading();

const isCategorySelected = (category: string) => {
  return selectedCategories.value.includes(category);
};

const selectCategory = (category: string) => {
  const isFirstCategorySelected = (
    selectedCategories.value.length === 1 &&
    selectedCategories.value[0] === DEFAULT_CATEGORY
  );

  if (isFirstCategorySelected) {
    selectedCategories.value.splice(0, 1, category);
    return;
  }

  selectedCategories.value.push(category);
};

const unselectCategory = (category: string) => {
  selectedCategories.value.splice(
    selectedCategories.value.indexOf(category),
    1,
  );

  if (!selectedCategories.value.length) {
    selectedCategories.value.push(DEFAULT_CATEGORY);
  }
};

const onCategoryClick = (category: string) => {
  return selectedCategories.value.includes(category)
    ? unselectCategory(category)
    : selectCategory(category);
};

onMounted(async () => {
  selectedCategories.value.push(DEFAULT_CATEGORY);
  setLoading(true);

  const categoriesData = await jokesHttpClient.getCategories();

  if (!categoriesData) {
    throw new Error('Could not fetch categories');
  }

  const targetCategories = categoriesData.filter((category) => {
    return category.toLowerCase() !== DEFAULT_CATEGORY.toLowerCase();
  });

  categories.push(...targetCategories);

  setLoading(false);
});
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.fade-slide-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.fade-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
