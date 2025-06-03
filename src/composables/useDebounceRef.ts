import { ref, watch, type Ref } from 'vue';
import debounce from 'lodash/debounce';

export function useDebouncedRef<T>(source: Ref<T>, delay = 400) {
  const debounced = ref(source.value) as Ref<T>;
  const updater = debounce((val: T) => (debounced.value = val), delay);

  watch(source, (val) => updater(val));

  return debounced;
}
