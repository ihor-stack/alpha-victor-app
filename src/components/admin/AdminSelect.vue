<template>
  <div>
    <ion-label v-if="label" color="light">
      {{ label }}
    </ion-label>
    <ion-input
      :id="`${props.idPrefix}-click-trigger`"
      readonly
      :value="props.modelValue ? props.modelValue.title : ''"
      @click="presentPopover($event)"
    />
    <ion-popover :trigger="`${props.idPrefix}-click-trigger`" trigger-action="click" size="cover" :dismiss-on-select="true" v-if="props.options.length > 0">
      <ul class="admin-select">  
        <li 
          class="admin-select--item"
          v-for="(option) in props.options" :key="option.id"
          @click="onOptionClick(option)"
        >
        {{ option.title }}
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
  import { defineProps, withDefaults, defineEmits } from 'vue'

  interface Props {
    label?: string,
    idPrefix: string,
    modelValue?: SelectItem,
    options: SelectItem[]
  }

  const props = withDefaults(defineProps<Props>(), { 
    options: () => []
  })

  const emit = defineEmits(['update:modelValue'])

  function onOptionClick(option: SelectItem) {
    emit('update:modelValue', option)
  }

  function presentPopover(event: Event) {
  const popover = document.querySelector(`#${props.idPrefix}-popover`)
    if(popover) {
      popover.present(event)
    } else {
      console.warn(`No element found with id '${props.idPrefix}-popover'`)
    }
  }
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