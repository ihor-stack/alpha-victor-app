import { ref, Ref } from 'vue';

interface LoadingObject {
  isLoading?: boolean;
  message?: string;
  duration?: number;
}

export interface LoadingService {
  loading: Ref<LoadingObject>;
  show: (message: string, duration?: number) => void;
  close: () => void;
}

const loading: Ref<LoadingObject> = ref({});

const show = (message: string, duration = 3000) => {
  loading.value = {
    isLoading: true,
    message,
    duration,
  };
};

const close = () => {
  if (loading.value) {
    loading.value.isLoading = false;
  }
};

const loadingService: LoadingService = {
  loading,
  show,
  close
};

export default loadingService;