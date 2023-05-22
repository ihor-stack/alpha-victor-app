<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Document Types</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group" >
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            color="light"
            placeholder="Enter New Document Type"
            :value="newDocument"
            @ionInput="newDocument = $event.target.value;">
          </ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button 
          :disabled="newDocument ? false : true"
          class="button-wide"
          @click="newDocumentType()">
            Add new +
          </ion-button>
        </ion-col>
        <ion-col size-xs="12"  class="form-admin--group_field">
          <h3 class="font-bold font-size-md color-light-gray">Current Document Types</h3>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <div v-for="(data, index) in documents" :key="index">
            <ItemField
              v-model="data.name"
              :data="data"
              icon=""
              :id="data.id"
              placeholder="Document Type"
              @update:modelValue="updateTypeValue"
              @remove="removeType"
            />
          </div>
        </ion-col>
      </ion-row> 
    </ion-grid>
  </div>
</template>
  
<script setup lang="ts">
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput
  } from "@ionic/vue";
  import { onBeforeMount, ref } from "vue";
  import { adminDocuments } from '@/stores/adminDocumentTypes'
  import { storeToRefs } from "pinia";
  import { AdminDocument } from "@/types";

  const DocTypes = adminDocuments();
  const { documents } = storeToRefs(DocTypes);

  onBeforeMount(() => {
    DocTypes.getDocuments()
  })

  const newDocument = ref()

  const newDocumentType = () => {
    DocTypes.saveNewDocument(newDocument.value)
  }

  const updateTypeValue = (value: string, data: AdminDocument) => {
    const updatedItem = { ...data, name: value };
    DocTypes.editDocumentType(updatedItem);
  };

  const removeType = (data: AdminDocument) => {
    DocTypes.removeDocumentType(data.id);
  };
</script>