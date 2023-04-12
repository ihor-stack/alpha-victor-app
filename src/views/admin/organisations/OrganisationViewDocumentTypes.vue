<template>
  <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
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
    </ion-row> 
  </ion-grid>
  </template>
  
  <script setup lang="ts">
  import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput
  } from "@ionic/vue";
  import { ref } from "vue";
  import { chevronForwardOutline } from "ionicons/icons";
  
  const organisations = ref([
    { id: 1, name: 'Organisation 1' },
    { id: 2, name: 'Organisation 2' },
    { id: 3, name: 'Organisation 3' },
  ]);
  </script>
  
  <style scoped>
  .organisations-list-menu {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  
  .organisations-list-menu-item ion-item {
    --background: none;
    --color: #FFFFFF;
    --padding-start: 0;
    --padding-end: 0;
    --inner-padding-end: 0;
    --inner-padding-top: 8px;
    --inner-padding-bottom: 8px;
    --border-color: #222222;
    cursor: pointer;
  }
  
  .organisations-list-menu-item ion-item ion-icon {
    margin-right: 0;
  }
  
  .organisations-list-menu-item img {
    margin-right: 20px;
  }
  
  .organisations-list-menu-item .link-text {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
  }
  
  .organisations-list-menu-item .arrow-right {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url("@/theme/icons/arrow-right.svg");
    background-repeat: no-repeat;
    background-size: 8px 12px;
    background-position: center;
  }
  
  .organisations-list-menu-item .with-counter {
    display: flex;
    align-items: center;
  }
  
  .organisations-list-menu-item .counter {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: #37b14c;
    border-radius: 50%;
    margin-left: 10px;
  }
  
  .organisations-list-menu-item .counter span {
    font-weight: 700;
    font-size: 11px;
    line-height: 11px;
    color: #ffffff;
  }
  </style>
  