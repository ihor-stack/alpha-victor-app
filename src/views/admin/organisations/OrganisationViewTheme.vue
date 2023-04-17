<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>

  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Logo</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          type="file"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Background image</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          type="file"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Dark mode</ion-label>
        <ion-toggle>Enable dark mode</ion-toggle>
      </ion-col>
    </ion-row>

    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Primary colour</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          type="color" 
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Secondary colour</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          type="color" 
        ></ion-input>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-button>Save changes</ion-button>
</template>

<script setup lang="ts">
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonLabel
  } from "@ionic/vue";
</script>

<style scoped>

</style>
