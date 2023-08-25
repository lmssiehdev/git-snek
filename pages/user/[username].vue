<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { type Output, parse, Input, safeParse } from "valibot";
import useReducer from "~/composables/use-reducer";
import { TOKEN, query, ApiResponseSchema } from "~/helpers/fetchUser";
import { type State, reducerFunction } from "~/helpers/reducer";
import { Mock } from "~/mockResponse";

const route = useRoute();
const userName = route.params.username ?? "lmssiehDev";

type ApiResponse = Input<typeof ApiResponseSchema>;

const { data } = await useFetch<ApiResponse>("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({
    query,
    variables: `{ "userName": "${userName}" }`,
  }),
});

if (!data.value?.data.user) {
  throw createError({
    statusCode: 400,
    statusMessage: `${userName} is not a valid GitHub username. Please provide a valid username.`,
  });
}

/*

  TODO: find a better way to catch a parse error, instead of using safeParse

*/

const parsedResponse = safeParse(ApiResponseSchema, data.value);

if (!parsedResponse.success) {
  throw createError({
    statusCode: 400,
    statusMessage: `Invalid data received from the API. Please try again later.`,
    cause: "yay",
  });
}

const { weeks, avatarUrl, bio } = parsedResponse.output;

const initialState = {
  snake: ["2023-04-27", "2023-04-28", "2023-04-29"],
  weeks: weeks,
  lastSkipped: false,
  score: 1,
  speed: 5,
  size: 6,
  gameOver: false,
  direction: "left",
} as State;

const [state, dispatch] = useReducer(reducerFunction, initialState);

const FRAMES_PER_SECOND = 1000 / 7;
const { pause, resume, isActive } = useIntervalFn(
  () =>
    dispatch({
      type: "TICK",
    }),
  FRAMES_PER_SECOND
);

watch(
  () => state.value.gameOver,
  (v) => (v ? pause() : resume())
);
</script>

<template>
  <NuxtErrorBoundary @error="console.log">
    <div class="flex flex-col gap-4 justify-center items-center">
      <div class="flex gap-4 max-w-[400px] my-10">
        <div class="h-20 w-20 rounded-full overflow-hidden shrink-0">
          <img
            class="w-full h-full object-cover"
            :src="avatarUrl"
            :alt="`${userName}'savatar'`"
          />
        </div>
        <div>
          <h2 class="font-bold text-lg">
            {{ `@${userName}` }}
          </h2>
          <p>
            {{ bio }}
          </p>
        </div>
      </div>
      <div v-if="state.gameOver">
        Game Over
        {{ state.gameOver }}
        <button
          @click="
            dispatch({
              type: 'RESET',
            })
          "
        >
          Play Again
        </button>
      </div>
      <div v-else class="flex flex-col">
        <span class="text-xs text-opacity-70">SCORE: {{ state.score }}</span>
        <ContributionGraph :weeks="weeks" :snake="state.snake" />
        <Keyboard
          :right="() => dispatch({ type: 'MOVE_RIGHT' })"
          :left="() => dispatch({ type: 'MOVE_LEFT' })"
          :up="() => dispatch({ type: 'MOVE_UP' })"
          :down="() => dispatch({ type: 'MOVE_DOWN' })"
        />
      </div>
    </div>
    <template #error="{ error }"> error: {{ error }} </template>
  </NuxtErrorBoundary>
</template>
