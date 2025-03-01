import { ref } from 'vue';

const useLoading = () => {
  const isLoading = ref(false);

  const setLoading = (state: boolean) => {
    isLoading.value = state;
  };

  return { isLoading, setLoading };
};

export { useLoading };
