<template>
    <ion-item v-for="doc in store.documentsArray" v-bind:key="doc.id">
        <ion-thumbnail slot="start">
        <img :alt="$t('components.admin.locations.adminFloorsField.silhouetteOfMountainsAlt')" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
        </ion-thumbnail>
      <ion-input
        class="font-size-sm"
       
        :placeholder="$t('components.admin.locations.adminFloorsField.documentTypeInputPlaceholder')"
        :value="doc.title"
        @ionInput="editedDocument = $event.target.value;"
        @ion-focus="currentDocument = doc"
        @ion-blur="ResetDocuments(doc.id)"
        @keydown.esc="ResetDocuments(doc.id)"
      ></ion-input>
      <ion-button 
        @click="SaveDocument(doc.id)"
        class="save-button text-lowercase"
        slot="end"  
        fill="clear"
        size="small"
        v-if=EnableEdit(doc.id)
        > {{$t('components.admin.locations.adminFloorsField.saveButton')}}
      </ion-button>
      <ion-button 
        @click="RemoveDocument(doc.id)"
        class="remove-button text-lowercase"
        slot="end"  
        fill="clear"
        size="small"
        v-else
        >
        {{ $t('components.admin.locations.adminFloorsField.removeButton') }}
      </ion-button>
    </ion-item>
  </template>
  
  <script setup lang="ts">
  import {
    IonItem,
    IonInput,
    IonButton,
    IonThumbnail
  } from "@ionic/vue";
  import { ref } from "vue";
  import {adminDocuments} from '@/stores/adminDocumentTypes'
  const store = adminDocuments()
  
  interface Document {
    id: number;
    title: string;
    dateUploaded: string;
  }
  
  const currentDocument = ref();
  const editedDocument = ref();
  
  
  const SaveDocument = (id: number) => {
    const index = store.documentsArray.findIndex(item => item.id === id);
    store.edit(index, editedDocument.value)
    currentDocument.value = null
    editedDocument.value = null
  }
  const RemoveDocument = (id: number) => {
    store.remove(id)
  };
  const EnableEdit = (id: number) => {
    const check = currentDocument?.value?.id === id ? true : false
    return check
  }
  const ResetDocuments = (id: number) => {
    const index = store.documentsArray.findIndex(item => item.id === id);
    store.reset(index, currentDocument.value)
    currentDocument.value = null
  };
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
  