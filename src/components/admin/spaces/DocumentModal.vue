<template>
  <div>
    <ion-chip class="font-size-xs font-mono" color="light" @click="modalOpen = true">
      <ion-label>Add New Document</ion-label>
      <ion-icon :icon="addOutline"></ion-icon>
    </ion-chip>
    <ion-modal 
    :is-open="modalOpen"  
    @willDismiss="handleDismiss"
    :initial-breakpoint="1" 
    :breakpoints="[0, 1]">
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
                  Add New Document
                </h1>
              </div>
            </ion-header>
            <ion-content :scroll-y="false" class="form-admin--group_field">
                <div class="modal-panel__section modal-panel__select-equipment">
                    <ion-input 
                    color="light" 
                    placeholder="Document Name"
                    :value="newDocument"
                    @input="newDocument=$event.target.value" />
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
                    <AdminList v-model="selectedDocType" :options="documentTypes"/>
                </div>
            </ion-content>
            <ion-footer>
                <ion-button 
                class="font-size-sm text-lowercase"
                expand="block"
                @click="saveNewDocumentType()">
                  Save
                </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
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
import AdminList from '@/components/admin/AdminList.vue'
import { SelectItem } from "@/types";

const Org = Organisations()
const Space = Spaces()
const {documentTypes} = storeToRefs(Org)
const selectedDocType = ref({} as SelectItem) 

const modalOpen = ref(false)
const newDocument = ref('')
const handleDismiss = () => {
  modalOpen.value = false;
};
const image = ref()
const uploadedDoc = ref()
const fileName = computed(() => uploadedDoc.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 0));
const fileMimeType = computed(() => uploadedDoc.value?.type);
const uploadFile = (event: any) => {
  uploadedDoc.value = event.target.files[0];
};
const saveNewDocumentType = () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadedDoc.value);
  reader.onload = async () => {
    if (typeof reader.result === 'string') {
      const encodedFile = reader.result?.split(",")[1];
      uploadedDoc.value.logo = fileName.value
      uploadedDoc.value.logoFileName = fileName.value
      uploadedDoc.value.logoContentType = fileExtension.value
      uploadedDoc.value.logoBase64Payload = encodedFile

      const data = {
        base64Payload: encodedFile,
        fileName: fileName.value,
        documentTypeId: selectedDocType.value.additionalInfo,
        contentType: fileMimeType.value,
      }
      try {
        Space.addSpacesDocument(data)
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
ion-chip {
  float:right;
}
.close-button{
width: 20px;
margin-left: 95%;
cursor: pointer;
}
.modal-panel {
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