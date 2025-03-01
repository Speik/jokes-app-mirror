<template>
  <section>
    <figure class="flex justify-center gap-4">
      <section class="flex items-start justify-center flex-initial opacity-40">
        <i class="fa-solid fa-quote-left text-4xl" />
      </section>

      <figcaption
        v-tooltip.top="setupTooltipOptions"
        class="text-4xl font-black text-center flex-auto select-none cursor-pointer"
      >
        {{ data.joke ?? data.setup }}
      </figcaption>

      <section class="flex items-end justify-center flex-initial opacity-40">
        <i class="fa-solid fa-quote-right text-4xl" />
      </section>
    </figure>

    <section
      v-if="data.type === JokeType.TWO_PART"
      class="flex items-center justify-center mt-8"
    >
      <Transition
        name="fade-slide"
        mode="out-in"
      >
        <figure
          v-if="!isPunchlineShown"
          v-ripple
          class="
            px-8 py-4 rounded-full cursor-pointer select-none
          text-gray-100 border-2-solid border-gray-200 drop-shadow-lg
            bg-gradient-to-bl from-orange-400 to-violet-400
            hover:scale-105 hover:drop-shadow-xl
            transition-all transition-duration-300
          "
          @click="isPunchlineShown = true"
        >
          <figcaption class="font-semibold tracking-wider">
            <i class="fa-regular fa-eye" />
            <span class="ml-2">Show Punchline</span>
          </figcaption>
        </figure>

        <section
          v-else
          class="flex items-start justify-center gap-2 mt-2 select-none min-h-[54px]"
        >
          <figure class="line-through select-none">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </figure>

          <p class="text-muted-color-emphasis font-semibold text-2xl">
            {{ data.delivery }}
          </p>
        </section>
      </Transition>
    </section>

    <section class="flex items-center justify-center mt-8 gap-4">
      <figure
        v-for="tag in tags"
        :key="tag"
        class="
          px-4 py-2 rounded-full cursor-pointer select-none
        bg-gray-100 text-gray-800 border-2-solid border-gray-200
          drop-shadow-md text-base opacity-50
          hover:opacity-100 transition-all duration-300
        "
      >
        <figcaption>
          <i class="fa-solid fa-hashtag text-muted-color-emphasis" />
          <span class="ml-1 capitalize">{{ tag }}</span>
        </figcaption>
      </figure>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TooltipOptions } from 'primevue';

import { JokeType } from '@/declarations';

type JokeProps = {
  selectedCategories: string[];
}

const props = defineProps<JokeProps>();

const SINGLE_JOKE = JSON.parse('{\n' +
  '  "error": false,\n' +
  '  "category": "Programming",\n' +
  '  "type": "single",\n' +
  '  "joke": "If Bill Gates had a dime for every time Windows crashed ... Oh wait, he does.",\n' +
  '  "flags": {\n' +
  '    "nsfw": false,\n' +
  '    "religious": false,\n' +
  '    "political": false,\n' +
  '    "racist": false,\n' +
  '    "sexist": false,\n' +
  '    "explicit": false\n' +
  '  },\n' +
  '  "id": 22,\n' +
  '  "safe": true,\n' +
  '  "lang": "en"\n' +
  '}');

const JOKE = JSON.parse('{\n' +
  '  "error": false,\n' +
  '  "category": "Christmas",\n' +
  '  "type": "twopart",\n' +
  '  "setup": "What kind of motorbike does Santa ride?",\n' +
  '  "delivery": "A Holly Davidson!",\n' +
  '  "flags": {\n' +
  '    "nsfw": false,\n' +
  '    "religious": false,\n' +
  '    "political": false,\n' +
  '    "racist": false,\n' +
  '    "sexist": false,\n' +
  '    "explicit": false\n' +
  '  },\n' +
  '  "id": 244,\n' +
  '  "safe": true,\n' +
  '  "lang": "en"\n' +
  '}');

const data = JOKE;

const setupTooltipOptions: TooltipOptions = {
  value: 'Click to refresh joke',
  pt: {
    arrow: { style: { borderBottomColor: 'black' } },
    text: '!bg-black !bg-opacity-70 !text-gray-100',
  },
};

const tags = ['Christmas', 'nsfw', 'religious', 'sexist'];

const isPunchlineShown = ref(false);

watch(props.selectedCategories, (value) => console.log(value), { deep: true });
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
