<template>
    <ion-button  class="font-size-sm text-lowercase add-button" @click="state.modalOpen = true">
        Add New Space Feature +
    </ion-button>
    <ion-content class="ion-padding">
    <ion-modal 
    :is-open="state.modalOpen"  
    @willDismiss="handleDismiss"
    :initial-breakpoint="0.8" 
    :breakpoints="[0, 0.8]">
        <ion-page>
        <div class="issues-panel">
            <div class="issues-panel-container">
            <ion-header>
                <ion-icon 
                color='light' 
                :icon="close" 
                size="small" 
                class="close-button" 
                @click="state.modalOpen = false"/>
                <div class="issues-panel__header">
                <h1 class="issues-panel__title color-light-gray font-bold font-size-normal">
                    Add new space feature
                </h1>
                <p class="issues-panel__comment color-light-gray font-size-xs">
                    You can create a new space feature via the form below.
                </p>
                </div>
            </ion-header>
            <ion-content :scroll-y="false" class="form-admin--group_field">
                <div class="issues-panel__section issues-panel__select-equipment">
                    <ion-input color="light" placeholder="e.g. meeting room"/>
                </div>
            </ion-content>
            <ion-footer>
                <ion-button 
                class="font-size-sm text-lowercase"
                expand="block"
                @click="state.modalOpen = false">
                Add new space feature +
                </ion-button>
            </ion-footer>
            </div>
        </div>
        </ion-page>
    </ion-modal>
</ion-content>
  </template>
  
  <script setup lang="ts">
  import { reactive } from "vue";
  import { 
    IonPage, 
    IonContent, 
    IonHeader, 
    IonFooter, 
    IonButton,
    IonInput,
    IonModal,
    IonIcon
  } from "@ionic/vue";
  import {close} from 'ionicons/icons'
  
  const state = reactive({
    organisation: "",
    modalOpen: false,
  });
  const handleDismiss = () => {
    state.modalOpen = false;
  };

  </script>
  
  <style scoped>
  ion-content::part(background) {
    background: #181818;
  }
  .add-button {
    margin-bottom: 5%;
    width: 246px;
    }
    .close-button{
        width: 20px;
        margin-left: 95%;
        cursor: pointer;
    }
  .issues-panel {
    height: 70%;
    width: 40%;
    margin-left: 30%;
    border-radius: 40px 40px 40px 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #181818;
  }
  
  .issues-panel {
  height: 70%;
  width: 40%;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.issues-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}

.issues-panel__header {
  margin-bottom: 20px;
}

.issues-panel__title {
  margin-bottom: 12px;
}

.issues-panel__section {
  margin-bottom: 20px;
}

  </style>
  