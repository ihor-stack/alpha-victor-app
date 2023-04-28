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
        <div>
          <input
            class="file-input"
            type="file"
            accept=".*"
            :v-model="theme.logo"
          />
        </div>
          
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Background image</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          :disabled="true"
        >
        <div>
          <input
            class="file-input"
            type="file"
            accept=".*"
            :v-model="theme.backgroundImage"
          />
        </div>
          
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Dark mode</ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            :disabled="true"
          >
            <ion-label color="light" class="custom-label">Enable dark mode</ion-label>
            <ion-toggle class='custom-toggle' color="primary" v-model="theme.darkmodeEnabled"/>
          </ion-input>
      </ion-col>
    </ion-row>

    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Primary colour</ion-label>
          <ion-row>
          <ion-col size-sm="10">
            <ion-input
              class="font-size-lg"
              color="light"
              :disabled="true"
              v-model="theme.primaryColour"
            >
            </ion-input>
          </ion-col>
          <ion-col size-sm="1">
            <input
              class="color-input"
              type="color"
              v-model="theme.primaryColour"
              />
          </ion-col>
        </ion-row>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Secondary colour</ion-label>
        <ion-row>
          <ion-col size-sm="10">
            <ion-input
              class="font-size-lg"
              color="light"
              :disabled="true"
              v-model="theme.secondaryColour"
            >
          </ion-input>
          </ion-col>
          <ion-col size-sm="1">
            <input
              class="color-input"
              type="color"
              v-model="theme.secondaryColour"
            />
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-button class="font-size-sm text-lowercase" @click="organisation.saveThemes">
    Save changes
  </ion-button>
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
  } from "@ionic/vue";
import {onBeforeMount, ref} from 'vue'
import {Theme} from '@/stores/adminThemes'
import { storeToRefs } from 'pinia'

const organisation = Theme()
const { theme } = storeToRefs(organisation);

onBeforeMount(() => {
  organisation.getThemes()
})

</script>

<style scoped>
h1{
    margin-bottom: 38px;
}
div{
  width: 100%;
}
.file-input{
  width: 100%;
  min-height: 40px;
  cursor: pointer
}
.color-input{
  cursor: pointer;
  height: 50px;
  margin-left: 10%;
  margin-top: 5px;
}
.custom-toggle{
  margin-left: 50%;
}
.custom-label{
  margin-left: 3%;
}
ion-button {
  width: 246px;
  margin-top: 200px;
}

</style>
