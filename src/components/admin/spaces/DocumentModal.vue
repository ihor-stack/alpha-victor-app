<template>
  <ion-chip color="light" @click="modalOpen = true">
    <ion-icon :icon="addOutline" ></ion-icon>
    <ion-label>Add New Document</ion-label>
  </ion-chip>
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
                Add New Document
              </h1>
            </div>
          </ion-header>
          <ion-content :scroll-y="false" class="form-admin--group_field">
              <div class="issues-panel__section issues-panel__select-equipment">
                  <!-- <ion-input 
                  color="light" 
                  placeholder="e.g. meeting room"
                  :value="newFeature"
                  @input="newFeature=$event.target.value" />
                  <ion-input
                    class="font-size-sm"
                    color="light"
                    :disabled="true"
                  >
                  <div>
                    <input
                      class="file-input"
                      type="file"
                      accept="image/*"
                      :v-model="image"
                      @change="uploadFile" 
                    />
                  </div>
                  </ion-input> -->
                  <AdminSelect v-model="selectedDocType" :options="documentTypes"/>
              </div>
          </ion-content>
          <ion-footer>
              <!-- <ion-button 
              class="font-size-sm text-lowercase"
              expand="block"
              @click="saveNewFeature()">
              Add new space feature +
              </ion-button> -->
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
import {addOutline} from 'ionicons/icons'
import { storeToRefs } from "pinia";
import AdminSelect from '@/components/admin/AdminSelect.vue'
import { SelectItem } from "@/types";

const Org = Organisations()
const {documentTypes} = storeToRefs(Org)
const selectedDocType = ref({} as SelectItem) 

const modalOpen = ref(false)
const newFeature = ref('')
const handleDismiss = () => {
  modalOpen.value = false;
};
const image = ref()
const fileLogo = ref();
const fileName1 = computed(() => fileLogo.value?.name);
const fileExtension1 = computed(() => fileName1.value?.substr(fileName1.value?.lastIndexOf(".") + 1));
const fileMimeType1 = computed(() => fileLogo.value?.type);
const uploadFile = (event: any) => {
  fileLogo.value = event.target.files[0];
  //updateLogoState()
};
// const saveNewFeature = () => {
//   console.log(newFeature.value)
//   Spaces.saveSpaceFeature(newFeature.value)
//   modalOpen.value = false
// }
// const image = ref()
// const fileLogo = ref();
// const fileName1 = computed(() => fileLogo.value?.name);
// const fileExtension1 = computed(() => fileName1.value?.substr(fileName1.value?.lastIndexOf(".") + 1));
// const fileMimeType1 = computed(() => fileLogo.value?.type);
// const uploadFile = (event: any) => {
//   fileLogo.value = event.target.files[0];
//   updateLogoState()
// };
// const updateLogoState = () => {
// const reader1 = new FileReader();
// reader1.readAsDataURL(fileLogo.value);
// reader1.onload = async () => {
  // if (typeof reader1.result === 'string') {
  //   const encodedFile = reader1.result?.split(",")[1];
  //   theme.value.logo = fileName1.value
  //   theme.value.logoFileName = fileName1.value
  //   theme.value.logoContentType = fileExtension1.value
  //   theme.value.logoBase64Payload = encodedFile

  //   const data = {
  //     file: encodedFile,
  //     fileName: fileName1.value,
  //     fileExtension: fileExtension1.value,
  //     fileMimeType: fileMimeType1.value,
  //   }
  //   try {
  //     console.log(data)
  //     return data;
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }
// }
// }

onBeforeMount(()=>{
  Org.getOrgDocumentTypes()
  //console.log('documentTypes',documentTypes)
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
height: 90%;
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
