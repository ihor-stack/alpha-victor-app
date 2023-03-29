<template>
  <div class="password-input-container">
    <ion-input 
      :type="state.showPassword ? 'text' : 'password'"
      class="password-input"
      :placeholder="props.placeholder" 
      :name="props.name"
      :value="modelValue"
      @ion-change="$emit('update:modelValue', $event.target.value)"
    />
    <ion-icon :icon="!state.showPassword ? eyeOutline : eyeOffOutline" @click="handleShowPassword" />
  </div>
</template>

<script setup lang="ts">
import { IonInput, IonIcon } from "@ionic/vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import { defineProps, reactive, defineEmits } from "vue";

defineEmits(['update:modelValue']);

interface Props {
  modelValue: string
  placeholder: string
  name: string,
}

interface State {
  showPassword: boolean
}

const props = defineProps<Props>();

const state: State = reactive({
  showPassword: false,
});

const handleShowPassword = () => {
  state.showPassword = !state.showPassword;
}
</script>

<style scoped>
.password-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 18px;
  border-radius: 8px;
  border: 1px solid #313131;
  margin-bottom: 12px;
}

.password-input {
  --color: #f4f7ff;
  --placeholder-color: #9ca0a6;
  --placeholder-opacity: 0.8;
  --padding-start: 24px;
  --padding-end: 12px;
  --padding-top: 18px;
  --padding-bottom: 18px;
  font-size: 15px;
}

ion-icon {
  color: var(--av-light-gray);
  font-size: 20px;
}
</style>