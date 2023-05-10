<template>
  <ion-item>
    <ion-input
      class="font-size-sm"
      color="light"
      placeholder="Document Type"
      :value="modelValue"
      @ion-input="$emit('update:modelValue', $event.target.value)"
      @ion-focus="currentDocument = props.modelValue, edit = true"
    ></ion-input>
    <!-- @ion-blur="$emit('update:modelValue', currentDocument), edit = false" 
     @keydown.esc="$event.target.blur()"
      @ion-blur="$emit('update:modelValue', currentDocument), edit = false"-->
    <ion-icon
      @click="$emit('update:modelValue', currentDocument), edit = false"
      class="reset-button text-lowercase"
      :icon="syncOutline" 
      slot="end"
      fill="clear"
      size="small"
      />
    <ion-button
      @click="$emit('remove', editedDocument)"
      class="save-button text-lowercase"
      slot="end"
      fill="clear"
      size="small"
      v-if=edit
      > &gt;&gt; save
    </ion-button>
    <ion-button
      @click="$emit('remove', currentDocument)"
      class="remove-button text-lowercase"
      slot="end"
      fill="clear"
      size="small"
      v-else
      >
      &gt;&gt; remove
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/vue";
import { onBeforeMount, ref } from "vue";
import {adminDocuments} from '@/stores/adminDocumentTypes'
import {syncOutline} from 'ionicons/icons'

const store = adminDocuments()

interface Props {
  id: string;
  modelValue: string;
}
const props = defineProps<Props>();
defineEmits(['update:modelValue'])

const currentDocument = ref();
const editedDocument = ref();
const edit = ref(false)
const check = (value: any) => {
  console.log('value',value)
}

// onBeforeMount(async () => {
//   store.set()
// })

</script>

<style scoped>
.remove-button {
  color: var(--av-red);
  font-family: "Akkurat-Mono";
}
.reset-button {
  color: var(--av-orange);
  font-family: "Akkurat-Mono";
  cursor: pointer
}
.save-button {
  color: var(--av-green);
  font-family: "Akkurat-Mono";
}
ion-item {
  margin-bottom: 20px;
}
</style>
