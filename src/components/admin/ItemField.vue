<template>
  <ion-item>
    <ion-input
      class="font-size-sm"
      color="light"
      placeholder="Document Type"
      :value="modelValue"
      @ionInput="editedDocument = $event.target.value;"
      @ion-focus="currentDocument = props.modelValue, edit = true"
      @keydown.esc="$emit('update:modelValue', currentDocument), edit = false"
    ></ion-input>
    <!-- @ion-blur="$emit('update:modelValue', currentDocument), edit = false" -->
    <ion-button
      @click="$emit('save', editedDocument)"
      class="save-button text-lowercase"
      slot="end"
      fill="clear"
      size="small"
      v-if=edit
      > &gt;&gt; save
    </ion-button>
    <ion-button
      @click="$emit('remove')"
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
import {adminDocuments} from '@/stores/adminStore'

const store = adminDocuments()

interface Props {
  id: string;
  modelValue: string;
}
const props = defineProps<Props>();

const currentDocument = ref();
const editedDocument = ref();
const edit = ref(false)

const SaveDocument = (id: string) => {
  // const index = store.documentsArray.findIndex(item => item.id === id);
  // store.edit(index, editedDocument.value)
  // currentDocument.value = null
  // editedDocument.value = null
}
const RemoveDocument = (id: string) => {
  // store.remove(id)
};

const ResetDocuments = () => {
  
  // console.log(editedDocument.value, currentDocument.value)
  // editedDocument.value = currentDocument.value
  // currentDocument.value = null
  // const index = store.documentsArray.findIndex(item => item.id === id);
  // store.reset(index, currentDocument.value)
  // currentDocument.value = null
};

// onBeforeMount(async () => {
//   store.set()
// })

</script>

<style scoped>
.remove-button {
  color: var(--av-red);
  font-family: "Akkurat-Mono";
}
.save-button {
  color: var(--av-green);
  font-family: "Akkurat-Mono";
}
ion-item {
  margin-bottom: 20px;
}
</style>
