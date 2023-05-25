import { ref, Ref } from 'vue';

interface ToastObject {
  isOpen?: boolean;
  header?: string;
  message?: string;
  position?: string;
  status?: 'generic' | 'success' | 'problem' | 'error';
  duration?: number;
}

export interface ToastService {
  toast: Ref<ToastObject>;
  show: (header: string, message: string, status: 'generic' | 'success' | 'problem' | 'error', position: string, duration?: number) => void;
  close: () => void;
}

const toast: Ref<ToastObject> = ref({});

const show = (header: string, message: string, status: 'generic' | 'success' | 'problem' | 'error', position: string, duration = 3000) => {
  toast.value = {
    isOpen: true,
    header,
    message,
    position,
    status,
    duration,
  };

  setTimeout(() => {
    close();
  }, duration);
};

const close = () => {
  if (toast.value) {
    toast.value.isOpen = false;
  }
};

const toastService: ToastService = {
  toast,
  show,
  close
};

export default toastService;