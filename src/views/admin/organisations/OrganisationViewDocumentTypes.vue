<template>
  <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
  <ion-grid>
    <ion-row class="form-admin--group" >
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Enter new Document Type"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-button>Add new +</ion-button>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Current Document Types</ion-label >
          <ion-item v-for="doc in documents" v-bind:key="doc.id">
            <ion-input
              class="font-size-sm doc-list-input"
              color="light"
              placeholder="Document Type"
              :value="doc.name"
              @click="check('click')"
              @ion-focus="SetCurrecntDocument(doc)"
              @ion-blur="check('blur')"
            ></ion-input>
            <ion-button 
              @click="RemoveDocument(doc.id)"
              color="light" 
              slot="end"  
              fill="clear"
              size="small"
              class="remove-button">
              >> remove
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
  const currentDocument = ref();
  const check = (data: any) => {
  console.log(data)
  }
  const SetCurrecntDocument = (obj:{id: number , name: string}) => {
    currentDocument.value = obj
  }
  const RemoveDocument = (id: number) => {
  documents.value = documents.value.filter(function( item ) {
    return item.id !== id;
  });
  console.log('remove')
  };
  const AddDocument = () => {
  // function to add selected document
  };
  const ResetDocuments = () => {
  // function to add reset document
  };
  </script>
  
  <style scoped>
  .doc-list-input {
    z-index: 1;
  }
  .remove-button {
    margin-left: -20%;
    z-index: 2;
  }
  </style>
  