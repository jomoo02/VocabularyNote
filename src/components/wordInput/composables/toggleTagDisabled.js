import { toValue, watchEffect } from 'vue';

function useToggleTagsDisabled(targetTags, booleanValue) {
  function toggleTagsDisabled() {
    targetTags.forEach((targetTag) => {
      if (targetTag.value) {
        targetTag.value.disabled = toValue(booleanValue);
      }
    });
  }

  watchEffect(() => toggleTagsDisabled());
}

export default useToggleTagsDisabled;
