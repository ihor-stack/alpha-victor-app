<template>
  <div>
    <span class="text-button font-mono font-size-xs" @click="modalOpen = true">Add new location +</span>
    <ion-modal 
    :is-open="modalOpen"  
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
                @click="modalOpen = false"/>
                <div class="modal-panel__header">
                <h1 class="modal-panel__title color-light-gray font-bold font-size-normal">
                    Add new location
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                    You can create a new location via the form below.
                </p>
                </div>
            </ion-header>
            <ion-content class="form-admin--group_field">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-row class="form-admin--group">
                  <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-input
                      class="font-size-sm"
                      color="light"
                      placeholder="Location Name"
                      :value="newLocationDetails.name"
                      @ion-input="newLocationDetails.name=String($event.target.value)"
                    ></ion-input>
                  </ion-col>

                  <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-input
                      class="font-size-sm"
                      color="light"
                      placeholder="Location Prefix"
                      :value="newLocationDetails.prefix"
                      @ion-input="newLocationDetails.prefix=String($event.target.value)"
                    ></ion-input>
                  </ion-col>
                </ion-row>
              </div>
            </ion-content>
            <ion-footer>
                <ion-button 
                class="font-size-sm text-lowercase"
                expand="block"
                @click="saveNewLocation()">
                Add new location +
                </ion-button>
            </ion-footer>
            </div>
          </div>
        </ion-page>
    </ion-modal>
  </div>
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
  import { storeToRefs } from 'pinia'
  import { Locations } from '@/stores/adminLocations'
  
  const Location = Locations();
  const { newLocationDetails } = storeToRefs(Location);

  const modalOpen = ref(false)
  
  const handleDismiss = () => {
    modalOpen.value = false;
  };
  
  const saveNewLocation = () => {
    Location.saveLocation()
    modalOpen.value = false
  }
</script>
  
<style scoped>
  .text-button {
    margin-top: 20px;
    display: block;
  }
  ion-content::part(background) {
    background: #181818;
  }
  .close-button{
    width: 20px;
    margin-left: 95%;
    cursor: pointer;
  }
</style>
  