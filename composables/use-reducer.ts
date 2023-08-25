import { computed, ref, type Ref } from "vue";

type Reducer<S, A> = (prevState: S, action: A) => S;

export default function useReducer<TReducerFunc, TInitialValue>(
  reducer: Reducer<TInitialValue, TReducerFunc>,
  initialValue: TInitialValue
) {
  const state = ref<TInitialValue>(initialValue) as Ref<TInitialValue>;

  const computedState = computed(() => state.value);

  const dispatch = (action: TReducerFunc) => {
    const result = reducer(state.value, action);
    state.value = result;
  };

  return [computedState, dispatch] as const;
}
