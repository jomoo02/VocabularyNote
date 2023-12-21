import { toValue, watchEffect } from 'vue';

function useToggleTagsDisabled(targetTags, booleanValue) {
  const setTargetTag = (targetTag) => {
    if (targetTag.value) {
      targetTag.value.disabled = toValue(booleanValue);
    }
  };

  watchEffect(() => targetTags.forEach(setTargetTag));
}

export default useToggleTagsDisabled;
