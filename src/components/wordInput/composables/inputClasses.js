import { computed, toValue } from 'vue';

const INPUT_WORD = '단어를 입력해주세요';
const CAN_NOT_INPUT_WORD = '단어를 입력할 수 없습니다';

function useInputClasses(mode) {
  const bgColor = computed(() => (toValue(mode) ? 'bg-white' : 'bg-[#cbd5e1]'));
  const placeHolderText = computed(() =>
    toValue(mode) ? INPUT_WORD : CAN_NOT_INPUT_WORD,
  );

  return {
    bgColor,
    placeHolderText,
  };
}

export default useInputClasses;
