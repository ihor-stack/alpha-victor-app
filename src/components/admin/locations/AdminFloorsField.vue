<template>
    <ion-item v-for="doc in store.documentsArray" v-bind:key="doc.id">
        <ion-thumbnail slot="start">
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
        </ion-thumbnail>
      <ion-input
        class="font-size-sm"
        color="light"
        placeholder="Document Type"
        :value="doc.title"
        @ionInput="editedDocument = $event.target.value;"
        @ion-focus="currentDocument = doc"
        @ion-blur="ResetDocuments(doc.id)"
        @keydown.esc="ResetDocuments(doc.id)"
      ></ion-input>
      <ion-button 
        @click="SaveDocument(doc.id)"
        class="save-button"
        slot="end"  
        fill="clear"
        size="small"
        v-if=EnableEdit(doc.id)
        > &gt;&gt; save 
      </ion-button>
      <ion-button 
        @click="RemoveDocument(doc.id)"
        class="remove-button"
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
    IonThumbnail
  } from "@ionic/vue";
  import { ref } from "vue";
  import {adminDocuments} from '@/stores/adminStore'
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
    --color: red;
  }
  .save-button {
    --color: green;
  }
  </style>
  