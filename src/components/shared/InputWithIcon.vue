<template>
  <div
    class="input-container"
    :style="{
      flexDirection: iconPosition === 'start' ? 'row' : 'row-reverse',
      padding:
        iconPosition === 'start' ? '0px 0px 0px 18px' : '0px 18px 0px 0px',
    }"
  >
    <ion-icon :icon="props.icon" color="dark" />
    <ion-input
      class="inner-input"
      :color="color"
      :type="type"
      :placeholder="props.placeholder"
      :name="props.name"
      :value="modelValue"
      @ion-change="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { IonInput, IonIcon } from "@ionic/vue";
import { defineProps, defineEmits, DefineComponent } from "vue";

defineEmits(["update:modelValue"]);

interface Props {
  modelValue: string;
  placeholder: string;
  name: string;
  color: string;
  type: string;
  iconPosition: "start" | "end";
  icon: DefineComponent;
}

const props = defineProps<Props>();
</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #313131;
  margin-bottom: 12px;
}

.inner-input {
  --placeholder-color: #9ca0a6;
  --placeholder-opacity: 0.8;
  --padding-start: 12px;
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
