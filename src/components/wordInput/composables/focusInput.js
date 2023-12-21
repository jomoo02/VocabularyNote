import { onMounted, onUnmounted } from 'vue';

function useFocusInput(target, closest) {
  const EVENT = 'click';

  function outFocusInput(e) {
    if (!e.target.closest(closest)) {
      target.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener(EVENT, outFocusInput);
  });

  onUnmounted(() => {
    window.removeEventListener(EVENT, outFocusInput);
  });
}

export default useFocusInput;
