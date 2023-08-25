<script lang="ts" setup>
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps<{
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
}>();

const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = useMagicKeys();

watch(ArrowLeft, (pressed) => pressed && props.left());
watch(ArrowRight, (pressed) => pressed && props.right());
watch(ArrowUp, (pressed) => pressed && props.up());
watch(ArrowDown, (pressed) => pressed && props.down());
</script>

<!-- use a loop? -->
<template>
  <div class="w-fit mx-auto mt-20">
    <div class="flex justify-center my-1">
      <button
        class="p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center"
        :class="[ArrowUp ? 'bg-purple-600/30' : 'hover:bg-purple-600/10']"
        @click="up"
      >
        <ChevronUpIcon class="h-6 w-6 text-purple-900" />
      </button>
    </div>
    <div class="flex justify-center my-1 gap-1">
      <button
        class="p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center"
        :class="[ArrowLeft ? 'bg-purple-600/30' : 'hover:bg-purple-600/10']"
        @click="left"
      >
        <ChevronLeftIcon class="h-6 w-6 text-purple-900" />
      </button>
      <button
        class="p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center"
        :class="[ArrowDown ? 'bg-purple-600/30' : 'hover:bg-purple-600/10']"
        @click="down"
      >
        <ChevronDownIcon class="h-6 w-6 text-purple-900" />
      </button>
      <button
        class="p-4 border-2 border-purple-600 rounded-sm bg-purple-600/10 hover:bg-purple-600/30 cursor-pointer w-16 h-16 flex items-center justify-center"
        :class="[ArrowRight ? 'bg-purple-600/30' : 'hover:bg-purple-600/10']"
        @click="right"
      >
        <ChevronRightIcon class="h-6 w-6 text-purple-900" />
      </button>
    </div>
  </div>
</template>
