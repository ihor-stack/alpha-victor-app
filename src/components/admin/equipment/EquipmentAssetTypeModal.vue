<template>
    <ion-button class="button-wide" @click="state.modalOpen = true">
      Add new Asset Type +
    </ion-button>
    <ion-modal 
    :is-open="state.modalOpen"  
    @willDismiss="handleDismiss"
    :initial-breakpoint="0.8" 
    :breakpoints="[0, 0.8]">
        <ion-page>
        <div class="modal-panel">
            <div class="modal-panel-container">
            <ion-header>
                <ion-icon 
                color='light' 
                :icon="close" 
                size="small" 
                class="close-button" 
                @click="state.modalOpen = false"/>
                <div class="modal-panel__header">
                <h1 class="modal-panel__title color-light-gray font-bold font-size-normal">
                  Add new Asset Type
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                    You can create a new asset type via the form below.
                </p>
                </div>
            </ion-header>
            <ion-content :scroll-y="false" class="form-admin--group_field">
                <div class="modal-panel__section modal-panel__select-equipment">
                    <ion-input color="light" placeholder="e.g. meeting room"/>
                </div>
            </ion-content>
            <ion-footer>
                <ion-button 
                class="font-size-sm text-lowercase"
                expand="block"
                @click="state.modalOpen = false">
                Add new Asset Type +
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
  .modal-panel {
    height: 70%;
    width: 60%;
    margin-left: 20%;
    border-radius: 40px 40px 40px 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #181818;
  }
  
  .modal-panel {
  height: 70%;
  width: 60%;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}

.modal-panel__header {
  margin-bottom: 20px;
}

.modal-panel__title {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
}

  </style>
  