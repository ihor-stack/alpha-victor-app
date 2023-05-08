<template>
    <ion-button  class="font-size-sm text-lowercase add-button" @click="modalOpen = true">
        Add New Space Type +
    </ion-button>
    <ion-modal 
    :is-open="modalOpen"  
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
                @click="modalOpen = false"/>
                <div class="issues-panel__header">
                <h1 class="issues-panel__title color-light-gray font-bold font-size-normal">
                    Add new space Type
                </h1>
                <p class="issues-panel__comment color-light-gray font-size-xs">
                    You can create a new space Type via the form below.
                </p>
                </div>
            </ion-header>
            <ion-content :scroll-y="false" class="form-admin--group_field">
                <div class="issues-panel__section issues-panel__select-equipment">
                    <ion-input 
                    color="light" 
                    placeholder="e.g. meeting room" 
                    :value="newType"
                    @input="newType=$event.target.value" />
                </div>
            </ion-content>
            <ion-footer>
                <ion-button 
                class="font-size-sm text-lowercase"
                expand="block"
                @click="saveNewType()">
                Add new space Type +
                </ion-button>
            </ion-footer>
            </div>
        </div>
        </ion-page>
    </ion-modal>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
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
  import {MetaData} from '@/stores/adminMetaData'
  
  const Spaces = MetaData()
  const modalOpen = ref(false)
  const newType = ref('')
  const handleDismiss = () => {
    modalOpen.value = false;
  };
  const saveNewType = () => {
    console.log(newType.value)
    Spaces.saveSpaceType(newType.value)
    modalOpen.value = false
  }
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
    width: 60%;
    margin-left: 20%;
    border-radius: 40px 40px 40px 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #181818;
  }
  
  .issues-panel {
  height: 70%;
  width: 60%;
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
  