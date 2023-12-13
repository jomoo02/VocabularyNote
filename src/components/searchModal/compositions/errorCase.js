import { ref } from 'vue';

function useErrorCase() {
  const ERROR_PHASE_1 = '에러가 발생했습니다.';
  const ERROR_PHASE_2 = '잠시 후 단어를 입력해 주세요';
  const errorPhase = ref(null);

  errorPhase.value = [ERROR_PHASE_1, ERROR_PHASE_2];
  return { errorPhase };
}

export default useErrorCase;
