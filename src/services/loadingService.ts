import { ref, Ref } from 'vue';

interface LoadingObject {
  isLoading?: boolean;
  message?: string;
}

export interface LoadingService {
  loading: Ref<LoadingObject>;
  show: (message: string, delay?: number) => string;
  close: (loadId: string) => void;
}

const loading: Ref<LoadingObject> = ref({});
const loadingQueue: string[] = [];
const timeouts: Record<string, number> = {};

const show = (message: string, delay = 1000): string => {
  const loadId = Date.now().toString(); // generate unique loadId
  loadingQueue.push(loadId);

  // Start a timeout that will show the spinner if not cleared in delay ms
  timeouts[loadId] = window.setTimeout(() => {
    if (loadingQueue.includes(loadId)) {
      loading.value = {
        isLoading: true,
        message,
      };
    }
  }, delay);

  return loadId;
};

const close = (loadId: string) => {
  const index = loadingQueue.indexOf(loadId);
  if (index > -1) {
    loadingQueue.splice(index, 1);
  }

  // Clear the timeout if it's still pending
  if (timeouts[loadId]) {
    window.clearTimeout(timeouts[loadId]);
    delete timeouts[loadId];
  }

  // If no more loading requests are pending, close the loading spinner
  if (loadingQueue.length === 0) {
    if (loading.value) {
      loading.value.isLoading = false;
    }
  }
};

const loadingService: LoadingService = {
  loading,
  show,
  close,
};

export default loadingService;
