<script lang="ts" setup>
import "@unocss/reset/tailwind.css";
</script>

<template>
  <div class="font-overpass max-h-screen min-h-screen container mx-auto">
    <NuxtPage />
  </div>
</template>

<style>
@font-face {
  font-family: "overpass";
  src: url("/font/Overpass-Regular.ttf");
  font-weight: 400;
  line-height: 1;
}

body {
  font-family: "overpass";
}
</style>
