<template>
  <section>
    <figure class="flex justify-center gap-4">
      <section
        class="flex items-start justify-center flex-initial transition-all transition-duration-300"
        :class="{
          'opacity-40': !isLoading,
          'opacity-0': isLoading,
        }"
      >
        <i class="fa-solid fa-quote-left text-4xl" />
      </section>

      <figcaption
        v-tooltip.top="SETUP_TOOLTIP_OPTIONS"
        class="text-4xl font-black text-center flex-auto select-none cursor-pointer"
        @click="getJoke"
      >
        <span v-if="isLoading">{{ getLoadingMessage() }}</span>
        <span v-else>{{ data?.joke ?? data?.setup }}</span>
      </figcaption>

      <section
        class="flex items-end justify-center flex-initial transition-all transition-duration-300"
        :class="{
          'opacity-40': !isLoading,
          'opacity-0': isLoading,
        }"
      >
        <i class="fa-solid fa-quote-right text-4xl" />
      </section>
    </figure>

    <section
      v-if="data?.type === JokeType.TWO_PART"
      class="flex items-center justify-center mt-8"
    >
      <Transition
        name="fade-slide"
        mode="out-in"
      >
        <figure
          v-if="!isPunchlineShown && !isLoading"
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
          v-else-if="isPunchlineShown"
          class="flex items-start justify-center gap-2 mt-2 select-none min-h-[54px]"
        >
          <figure class="line-through select-none">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </figure>

          <p class="text-muted-color-emphasis font-semibold text-2xl">
            {{ data?.delivery }}
          </p>
        </section>
      </Transition>
    </section>

    <Transition
      name="fade-slide"
      mode="out-in"
    >
      <section
        v-if="!isLoading"
        class="flex items-center justify-center mt-8 gap-4"
      >
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
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { TooltipOptions } from 'primevue';

import type { GetJokeResponse } from '@/lib/jokes/types';

import { JokeType } from '@/declarations';
import { jokesHttpClient } from '@/lib/jokes';

import { useLoading } from '@/composables/use-loading';

type JokeProps = {
  selectedCategories: string[];
}

const props = defineProps<JokeProps>();

const SETUP_TOOLTIP_OPTIONS: TooltipOptions = {
  value: 'Click to refresh joke',
  pt: {
    arrow: { style: { borderBottomColor: 'black' } },
    text: '!bg-black !bg-opacity-70 !text-gray-100',
  },
};

const LOADING_MESSAGES = [
  'Generating joke… Hope it’s not too funny!',
  'Loading joke… Get ready to laugh (or not).',
  'Hold on… AI is thinking of something hilarious.',
  'Fetching joke… 99% laughter guaranteed!',
  'Processing humor… Please stand by.',
  'Requesting from a comedian… Oh wait, it’s just a server.',
  'Funny bytes incoming!',
  'Loading… This one’s gonna be legendary!',
  'Humorization in progress…',
  'Connecting to the joke universe…',
  'Fetching dad joke… Expect groaning.',
  'Downloading 100% organic humor…',
  'Brace yourself… Punchline is coming!',
  'Optimizing joke for maximum laughter…',
  'Wait a sec… The joke is buffering.',
  'Trying to be funny… This may take a while.',
  'Compiling joke… This one’s a masterpiece.',
  'Searching for the meaning of humor…',
  'Spinning the comedy wheel…',
  'Waiting for the joke fairy to approve…',
];

const data = ref<GetJokeResponse | null>(null);
const isPunchlineShown = ref(false);

const isJokeLoading = defineModel<boolean>('loading', { default: false });
const { isLoading, setLoading } = useLoading();

const tags = computed(() => {
  if (!data.value) return [];

  const category = data.value.category;
  const flags = Object.entries(data.value.flags)
    .reduce<string[]>((result, [flagName, isEnabled]) => {
      if (isEnabled) result.push(flagName);
      return result;
    }, []);

  return [category, ...flags];
});

const getLoadingMessage = () => {
  const messageIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
  return LOADING_MESSAGES[messageIndex];
};

const getJoke = async () => {
  if (isLoading.value) return;

  setLoading(true);
  isPunchlineShown.value = false;

  const jokeData = await jokesHttpClient.getJoke(props.selectedCategories);
  if (!jokeData) throw new Error('Could not fetch joke');

  data.value = jokeData;
  setLoading(false);
};

watch(isLoading, (currentState) => {
  isJokeLoading.value = currentState;
});

watch(props.selectedCategories, getJoke, { deep: true });
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
