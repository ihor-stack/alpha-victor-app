<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>

  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Logo</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          :disabled="true"
        >
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
          />
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Background image</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          :disabled="true"
        >
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
          />
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Dark mode</ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            :disabled="true"
          >
            <ion-label color="light">Enable dark mode</ion-label>
            <ion-toggle class='custom-toggle' color="light"/>
          </ion-input>
      </ion-col>
    </ion-row>

    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Primary colour</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          :disabled="true"
        >
          <input
          type="color"
          />
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Secondary colour</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          :disabled="true"
        >
          <input
          type="color"
          />
        </ion-input>
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
    IonLabel,
    IonToggle,
    IonItem
  } from "@ionic/vue";

</script>

<style scoped>
h1{
    margin-bottom: 38px;
  }
p{
  background-color: aliceblue;
}
.custom-toggle{
  margin-left: 60%;
}
</style>
