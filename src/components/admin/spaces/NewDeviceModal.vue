<template>
  <ion-button class="font-size-sm text-lowercase" @click="modalOpen = true">
      Add new device +
  </ion-button>
  <ion-modal 
  :is-open="modalOpen"  
  @willDismiss="handleDismiss"
  :initial-breakpoint="1" 
  :breakpoints="[0, 1]">
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
                Add New Device
              </h1>
            </div>
          </ion-header>
          <ion-content :scroll-y="false" class="form-admin--group_field">
            <ion-row class="form-admin--group">
              <ion-col size-xs="11" class="form-admin--group_field">
                <ion-label color="light">Serial number</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="newDevice.serialNumber"
                @ion-input="newDevice.serialNumber = String($event.target.value)"
                ></ion-input>
              </ion-col>
              <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Installer</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="newDevice.installer"
                @ion-input="newDevice.installer = String($event.target.value)"
                ></ion-input>
              </ion-col>
              <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="newDevice.name"
                @ion-input="newDevice.name = String($event.target.value)"
                ></ion-input>
              </ion-col>
              <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Install date</ion-label>
                <ion-datetime-button datetime="datetime1"></ion-datetime-button>
                <ion-modal :keep-contents-mounted="true">
                    <ion-datetime 
                    id="datetime1" 
                    :value="newDevice.installDate"
                    @ion-change="(e)=>{(newDevice.installDate = String(e.target.value))}"
                    />
                </ion-modal>
              </ion-col>
              <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Warranty expiry date</ion-label>
                <ion-datetime-button datetime="datetime2"></ion-datetime-button>
                <ion-modal :keep-contents-mounted="true">
                    <ion-datetime 
                    id="datetime2" 
                    display-format="DD/MM/YYYY HH:mm:ss"
                    picker-format="DD MMM YYYY HH:mm:ss"
                    :value="newDevice.warrantyExpiryDate"
                    @ion-change="(e)=>{(newDevice.warrantyExpiryDate = String(e.target.value))}"
                    />
                </ion-modal>
              </ion-col>
              <ion-col size-xs="12" class="form-admin--group_field">
                <ion-label color="light">Description</ion-label>
                <ion-textarea
                class="font-size-sm"
                color="light"
                fill="solid"
                :value="newDevice.description"
                @ion-input="newDevice.description = String($event.target.value)"
                ></ion-textarea>
              </ion-col>
              <ion-col size-xs="12" class="form-admin--group_field">
                <ion-button class="font-size-sm text-lowercase" @click="saveNewDevice()">
                    Save
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-content> 
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
  IonRow, 
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
  IonCol,
  IonLabel,
  IonTextarea,
  IonDatetime,
  IonDatetimeButton
} from "@ionic/vue";
import {close} from 'ionicons/icons'
import {Spaces} from '@/stores/adminSpaces'
import { SpaceDevices } from "@/types";

const Space = Spaces()
const newDevice = ref({} as SpaceDevices) 

const modalOpen = ref(false)

const handleDismiss = () => {
  modalOpen.value = false;
};
const saveNewDevice = () => {
  console.log(newDevice.value)
  Space.saveSpacesDevices(newDevice.value)
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
height: 90%;
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
