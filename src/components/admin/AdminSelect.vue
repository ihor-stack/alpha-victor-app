<template>
  <div>
    <ion-label v-if="label" color="light">
      {{ label }}
    </ion-label >
    <ion-input 
    id="click-trigger" 
    :disabled="true"
    :value="modelValue.title"
    />
    <ion-popover trigger="click-trigger" trigger-action="click" size="cover" :dismiss-on-select="true" v-if="props.options">
        <div 
        class="ion-padding select-content"
        v-for="(option) in props.options" :key="option.id"
        @click="$emit('update:modelValue', option)"
        >
        {{option.title}}
        </div>
    </ion-popover>
  </div>
</template>
  
  <script setup lang="ts">
  import { 
    IonLabel,
    IonInput,
    IonPopover
  } from "@ionic/vue";
  import {SelectItem} from '@/types/index'

  interface Props {
    label?: string,
    modelValue: SelectItem,
    options: SelectItem[]
    }

    const props = defineProps<Props>();

  </script>
  
  <style scoped>
  ion-popover {
    --background: #ffffff;
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
    --color: white;
    --width: 300px;
  }
  ion-popover::part(backdrop) {
    background-color: var(--av-darkest-gray);
  }
  ion-popover select-content {
    border-bottom: 1px solid #000;
  }
  </style>
  