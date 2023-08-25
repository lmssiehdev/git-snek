<script setup lang="ts">
import { Week } from "~/helpers/fetchUser";
import { formatedDate } from "~/helpers/utils";

defineProps<{
  weeks: Week[];
  snake: string[];
}>();
</script>

<template>
  <div class="flex">
    <div
      v-for="{ contributionDays } in weeks"
      key="{index}"
      class="flex flex-col"
    >
      <div
        v-for="{ color, date } in contributionDays"
        class="flex flex-col rounded-sm m-0.4"
        :style="{
          width: '11px',
          height: '11px',
          backgroundColor: snake.includes(formatedDate(date))
            ? '#a683c2'
            : color,
        }"
        :key="date"
        :title="date"
      ></div>
    </div>
  </div>
</template>
helpers/utils
