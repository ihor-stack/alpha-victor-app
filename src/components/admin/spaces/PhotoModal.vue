<template>
  <ion-chip color="light" @click="modalOpen = true">
    <ion-icon :icon="addOutline" ></ion-icon>
    <ion-label>Add New Photo</ion-label>
  </ion-chip>
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
                Add New Photo
              </h1>
            </div>
          </ion-header>
          <ion-content :scroll-y="false" class="form-admin--group_field">
            <div class="issues-panel__section issues-panel__select-equipment">
              <ion-input
                class="font-size-sm"
                color="light"
                :disabled="true"
              >
              <div>
                <input
                  class="file-input"
                  type="file"
                  accept="*/"
                  :v-model="image"
                  @change="uploadFile" 
                />
              </div>
              </ion-input>
              <ion-label color="light">Featured Photo</ion-label>
              <ion-toggle :checked="featured" />
            </div>
          </ion-content>
          <ion-footer>
            <ion-button 
            class="font-size-sm text-lowercase"
            expand="block"
            @click="saveNewPhoto()">
              Save
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
  </template>
  
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonFooter, 
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
  IonChip,
  IonLabel
} from "@ionic/vue";
import {close} from 'ionicons/icons'
import {Organisations} from '@/stores/adminOrganisations'
import {Spaces} from '@/stores/adminSpaces'

import {addOutline} from 'ionicons/icons'
import { storeToRefs } from "pinia";
import { SelectItem } from "@/types";

const Org = Organisations()
const Space = Spaces()
const selectedDocType = ref({} as SelectItem) 

const modalOpen = ref(false)
const handleDismiss = () => {
  modalOpen.value = false;
};
const featured = ref(false as boolean )
const image = ref()
const uploadedPhoto = ref()
const fileName = computed(() => uploadedPhoto.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 0));
const fileMimeType = computed(() => uploadedPhoto.value?.type);
const uploadFile = (event: any) => {
  uploadedPhoto.value = event.target.files[0];
};
const saveNewPhoto = () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadedPhoto.value);
  reader.onload = async () => {
    if (typeof reader.result === 'string') {
      const encodedFile = reader.result?.split(",")[1];
      uploadedPhoto.value.logo = fileName.value
      uploadedPhoto.value.logoFileName = fileName.value
      uploadedPhoto.value.logoContentType = fileExtension.value
      uploadedPhoto.value.logoBase64Payload = encodedFile

      const data = {
        base64Payload: encodedFile,
        fileName: fileName.value,
        contentType: fileMimeType.value,
        order: '0',
        featuredPhoto: String(featured.value)
      }
      try {
        Space.addSpacesPhoto(data)
        return data;
      }
      catch (error) {
        console.error(error);
      }
    }
  }
}

onBeforeMount(()=>{
  Org.getOrgDocumentTypes()
})
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
height: 60%;
width: 60%;
margin-left: 20%;
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
