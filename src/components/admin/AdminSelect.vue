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
      <ul class="admin-select">  
        <li 
          class="admin-select--item"
          v-for="(option) in props.options" :key="option.id"
          @click="$emit('update:modelValue', option)"
        >
        {{option.title}}
        </li>
      </ul>
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
  ion-popover .admin-select {
    padding: 0 20px;
    list-style: none;
  }
  ion-popover .admin-select--item {
    padding: 20px 0;
    border-bottom: 1px solid var(--av-mid-gray);
    cursor: pointer;
  }
  ion-popover .admin-select--item:hover {
    color: var(--av-mid-gray);
  }
  ion-popover .admin-select--item:last-of-type {
    border-bottom: none;
  }
</style>