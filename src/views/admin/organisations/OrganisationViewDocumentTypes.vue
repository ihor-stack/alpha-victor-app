<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Document Types</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            color="light"
            placeholder="Enter new document type"
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
      </ion-row>

      <ion-row class="form-admin--group">
        <ion-col size-xs="12"  class="form-admin--group_field">
          <h3 class="font-bold font-size-md color-light-gray" v-if="documents.length">Current Document Types</h3>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <div v-for="doc in documents" :key="doc.id">
            <ItemField
              :modelValue="doc.name"
              :data="doc"
              icon=""
              :id="doc.id"
              placeholder="Document Type"
              @update:modelValue="value => updateTypeValue({ ...doc, name: value })"
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
  import { storeToRefs } from "pinia"
  import { AdminDocument } from "@/types"
  import ItemField from '@/components/admin/ItemField.vue'

  const DocTypes = adminDocuments();
  const { documents } = storeToRefs(DocTypes);

  onBeforeMount(() => {
    DocTypes.getDocumentTypes()
  })

  const newDocument = ref()

  const newDocumentType = () => {
    DocTypes.saveNewDocumentType(newDocument.value)
  }

  const updateTypeValue = (updatedDoc: AdminDocument) => {
    DocTypes.editDocumentType(updatedDoc);
  };

  const removeType = (data: AdminDocument) => {
    DocTypes.removeDocumentType(data.id);
  };
</script>