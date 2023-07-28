import { ref, Ref } from "vue";

interface ConfirmObject {
  isOpen: boolean;
  isEditing?: boolean;
  handleConfirm: () => void;
}

export interface ConfirmToLeaveService {
  confirm: Ref<ConfirmObject>;
  show: (handleConfirm: () => void) => void;
  close: () => void;
  setEditing: (value: boolean) => void;
}

const confirm: Ref<ConfirmObject> = ref({
  isOpen: false,
  isEditing: false,
  handleConfirm: () => undefined,
});

const show = (handleConfirm: () => void) => {
  confirm.value = {
    isOpen: true,
    isEditing: confirm.value.isEditing,
    handleConfirm,
  };
};

const close = () => {
  confirm.value.isOpen = false;
};

const setEditing = (value: boolean) => {
  confirm.value.isEditing = value;
};

const confirmToLeaveService: ConfirmToLeaveService = {
  confirm: confirm,
  show,
  close,
  setEditing,
};

export default confirmToLeaveService;
