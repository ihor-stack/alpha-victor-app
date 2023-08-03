<template>
    <ion-label text-wrap="true" v-if="label">
      {{ label }}
    </ion-label >
    <ion-content>
      <ion-list :value="modelValue.title">
        <IonRadioGroup>
          <ion-item 
          
          v-for="(option) in props.options" 
          :key="option.id" 
          @click="$emit('update:modelValue', option)"
          >
            <ion-label text-wrap="true" >
              {{option.title}} 
            </ion-label>
            <ion-radio slot="end" :value="option.title"/>
          </ion-item>
        </IonRadioGroup>
      </ion-list>
    </ion-content>
  </template>
  
<script setup lang="ts">
import { 
  IonLabel,
  IonList,
  IonItem,
  IonRadio,
  IonRadioGroup,
  IonContent
} from "@ionic/vue";
import {SelectItem} from '@/types/index'
import { ref } from "vue";

interface Props {
  label?: string,
  modelValue: SelectItem,
  options: SelectItem[]
  }
  const props = defineProps<Props>();
  const radioValue = ref()
</script>
  
  <style scoped>
  ion-content {
    height: 150px;
    background-color: white;
  }
  </style>
  