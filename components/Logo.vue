<script lang="ts" setup>
const logoArray = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [2, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0],
];
</script>

<template>
  <div
    v-for="(row, rowIndex) in logoArray"
    :key="rowIndex"
    class="flex justify-center"
  >
    <div v-for="(column, columnIndex) in row" :key="columnIndex" class="flex">
      <div
        class="h-3 w-3 m-[2px] rounded-sm inline-block"
        :style="[
          {
            backgroundColor:
              column === 1 ? 'purple' : column === 2 ? 'green' : '#ebedf0',
          },
        ]"
      />
    </div>
  </div>
</template>
