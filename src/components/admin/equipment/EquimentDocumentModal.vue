<template>
    <ion-button  class="font-size-sm text-lowercase add-button" @click="state.modalOpen = true">
      Add new Document +
    </ion-button>

    <ion-modal 
    :is-open="state.modalOpen"  
    @willDismiss="handleDismiss"
    :initial-breakpoint="0.9" 
    :breakpoints="[0, 0.9]">
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
                  Add new Document +
                </h1>
                <p class="issues-panel__comment color-light-gray font-size-xs">
                  You can upload a document and document type using the form below.
                </p>
                </div>
            </ion-header>
            <ion-content :scroll-y="false" class="form-admin--group_field">
              <p class="issues-panel__comment color-light-gray font-size-xs">
                Upload document
              </p>
              <div 
              class="issues-panel__section issues-panel__select-equipment upload-icons" 
              onclick="document.getElementById('fileInput').click()">
                <input
                  class="file-input"
                  type="file"
                  accept=".*"
                  style="display:none"
                  id="fileInput"
                  v-on:change="yourVueMethod()"
                />
                  <ion-icon 
                  :icon="cloudDownloadOutline" 
                  size="small" 
                  color='light' 
                  class="align-icon"/>
                  <span class="issues-panel__comment color-light-gray font-size-xs">
                    Click to browse device
                  </span>
              </div>
              <div class="issues-panel__select-equipment form-admin">
                <!-- <ion-input id="click-trigger" :disabled="true"/>
                <ion-popover trigger="click-trigger" trigger-action="click" size="cover" >
                  <div class="ion-padding select-content">Option 1</div>
                  <div class="ion-padding select-content">Option 2</div>
                </ion-popover> -->
                <AdminSelect 
                label="Document Type"
                v-model="state.selected" 
                :options="state.selectOptions"/>
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
    IonModal,
    IonIcon,
    IonInput,
    IonPopover
  } from "@ionic/vue";
  import {close, cloudDownloadOutline} from 'ionicons/icons'
  import AdminSelect from '@/components/admin/AdminSelect.vue'
  const state = reactive({
    organisation: "",
    modalOpen: false,
    selected: '',
    selectOptions: ['opt1', 'opt2', 'opt3']
  });

  const handleDismiss = () => {
    state.modalOpen = false;
  };
  const yourVueMethod = () => {
    console.log('yourVueMethod')
  }
  </script>
  
  <style scoped>
  ion-content::part(background) {
    background: #181818;
  }
  ion-popover {
    --background: var(--av-light-gray);
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
    --color: white;
    --width: 300px;
  }
  ion-popover::part(backdrop) {
    background-color: rgb(6, 14, 106);
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
    height: 80%;
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
  height: 80%;
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
  border-style: dotted;
  cursor: pointer;
  border-color: var(--av-darkest-gray);
  height: 100px;
}
.upload-icons {
  text-align: center;
  display: grid
}
.align-icon {
  margin-left: 48%;
  margin-top: 20px
}
  
  </style>
  