import { toValue, watchEffect } from 'vue';

function useToggleTagsDisabled(elementRefs, booleanValue) {
  const setTargetTag = (elementRef) => {
    if (elementRef.value) {
      elementRef.value.disabled = toValue(booleanValue);
    }
  };

  watchEffect(() => elementRefs.forEach(setTargetTag));
}

export default useToggleTagsDisabled;
