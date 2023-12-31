<template>
  <ion-item>
    <div class="item-icon" v-if="props.icon">
      <ion-icon :src="`/img/icons/${props.icon}.svg`" />
    </div>
    <ion-input
      :placeholder="props.placeholder"
      :value="currentField"
      :class="`font-size-${props.fontSize}`"
      @ion-input="currentField = $event.target.value"
      @ion-focus="onInputFocus"
      @keydown.esc="cancelEdit"
    >
    </ion-input>
    <ion-button
      @click="saveField"
      class="color-green"
      slot="end"
      fill="clear"
      size="small"
      :disabled="!currentField"
      v-if="editMode"
    >
      {{ $t("components.admin.itemField.saveButton") }}
    </ion-button>
    <ion-button
      @click="removeField"
      class="color-red"
      slot="end"
      fill="clear"
      size="small"
      v-if="!hideRemove && !editMode"
    >
      {{ $t("components.admin.itemField.removeButton") }}
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

interface Props {
  modelValue: string;
  icon?: string;
  placeholder: string;
  data: any;
  hideRemove?: boolean;
  fontSize?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "remove"]);

const currentField = ref(props.modelValue);
const editMode = ref(false);
const localData = ref({ ...props.data });

const onInputFocus = () => {
  editMode.value = true;
};

const cancelEdit = () => {
  currentField.value = props.modelValue;
  editMode.value = false;
};

const saveField = () => {
  if(props.modelValue !== currentField.value) {
    emit("update:modelValue", currentField.value);
  }
  editMode.value = false;
};

const removeField = () => {
  emit("remove", localData.value);
};

// This watcher updates the localData and currentField when props.data changes.
watch(props.data, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    localData.value = { ...newVal };
    currentField.value = newVal.name;
  }
});
</script>

<style scoped>
ion-item {
  border: 1px solid #313131;
  border-radius: 5px;
  margin: 20px 0;
  --background: transparent;
}
ion-item:first-of-type {
  margin-top: 0;
}
ion-input {
  padding: 0;
  margin: 0;
  border: none;
  --background: transparent;
}
ion-button {
  position: absolute;
  z-index: 9999;
  right: 20px;
}
.item-icon {
  width: 20px;
  height: 20px;
  overflow: hidden;
  margin-right: 10px;
}
.item-icon img {
  width: 20px;
  height: 20px;
}
</style>
