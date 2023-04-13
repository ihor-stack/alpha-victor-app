<template>
  <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
  <ion-grid>
    <ion-row class="form-admin--group" >
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Enter new Document Type"
          :value="newDocument"
          @ionInput="newDocument = $event.target.value;">
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-button @click="AddDocument()">Add new +</ion-button>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Current Document Types</ion-label >
          <ion-item v-for="doc in documents" v-bind:key="doc.id">
            <ion-input
              class="font-size-sm"
              color="light"
              placeholder="Document Type"
              :value="doc.name"
              @ionInput="editedDocument = $event.target.value;"
              @ion-focus="SetCurrecntDocument(doc)"
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
      </ion-col>
    </ion-row> 
  </ion-grid>
  
  </template>
  
  <script setup lang="ts">
  
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonInput
  } from "@ionic/vue";
  import { ref } from "vue";

  const documents = ref([
    { id: 1, name: 'User Manual' },
    { id: 2, name: 'Quick Start Guide' },
    { id: 3, name: 'Schematics' },
  ]);
  const newDocument = ref()
  const currentDocument = ref();
  const editedDocument = ref();

  const AddDocument = () => {
    documents.value.push({id: documents.value.length + 1, name: newDocument.value})
    newDocument.value = null
  };
  const SetCurrecntDocument = (obj:{id: number , name: string}) => {
    currentDocument.value = obj
  }
  const RemoveDocument = (id: number) => {
    documents.value = documents.value.filter(function( item ) {
      return item.id !== id;
    });
  };
  const SaveDocument = (id: number) => {
    const index = documents.value.findIndex(item => item.id === id);
    documents.value[index].name = editedDocument.value
    currentDocument.value = null
    editedDocument.value = null
  }
  const EnableEdit = (id: number) => {
    const check = currentDocument?.value?.id === id ? true : false
    return check
  }
  const ResetDocuments = (id: number) => {
    const index = documents.value.findIndex(item => item.id === id);
    documents.value[index] = currentDocument.value
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
  