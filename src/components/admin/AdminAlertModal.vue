<template>
    <ion-modal 
    :is-open="alert.getActive"  
    @willDismiss="alert.close()"
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
                @click="alert.close()"/>
                <div class="issues-panel__header">
                <h1 class="issues-panel__title color-light-gray font-bold font-size-normal">
                  ERROR
                </h1>
                <p class="issues-panel__comment color-light-gray font-size-xs">
                    {{ alert.getMessage }}
                </p>
                </div>
            </ion-header>
            <ion-footer>
                <ion-button 
                class="font-size-sm text-lowercase"
                expand="block"
                @click="alert.close()">
                    Close
                </ion-button>
            </ion-footer>
            </div>
        </div>
        </ion-page>
    </ion-modal>
  </template>
  
  <script setup lang="ts">
  import { reactive } from "vue";
  import { 
    IonPage, 
    IonHeader, 
    IonFooter, 
    IonButton,
    IonModal,
    IonIcon
  } from "@ionic/vue";
  import {close} from 'ionicons/icons'
  import {Alert} from '@/stores/adminStore'
  const alert = Alert()

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
    height: 40%;
    width: 40%;
    margin-left: 30%;
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
  