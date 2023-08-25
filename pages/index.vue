<script lang="ts" setup>
import Button from "~/components/common/Button.vue";

const router = useRouter();
const userName = ref("");

function handleFormSubmit() {
  router.push(`/user/${userName.value}`);
}
</script>

<template>
  <div class="max-w-sm mx-auto py-20">
    <div>
      <div class="my-10">
        <Logo />
      </div>
      <h1 class="text-purple-900/80 text-xl font-semibold text-center my-10">
        Turn your github contribution grpah into a playable snake game
      </h1>

      <form class="flex gap-4 items-center" @submit.prevent="handleFormSubmit">
        <input
          v-model.trim="userName"
          type="text"
          placeholder="username"
          class="flex w-full rounded-md border-2 bg-white px-3 py-2 ring-offset-white placeholder:text-opacity-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <Button> Play </Button>
      </form>
    </div>
  </div>
</template>
