  <template>
    <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group" >
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            class="font-size-sm"
            color="light"
            placeholder="Enter new Document Type"
            :value="newDocument"
            @ionInput="newDocument = $event.target.value;">
          </ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button 
          :disabled="newDocument ? false : true"
          class="font-size-xs text-lowercase"
          @click="newDocumentType()">
            Add new +
          </ion-button>
        </ion-col>
        <ion-col size-xs="12"  class="form-admin--group_field">
          <h3 class="font-bold font-size-md color-light-gray">Current Document Types</h3>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <div v-for="(document, index) in documentTypes.documents.value" :key="index">
            <DocumentField 
            :id="document.id"
            :modelValue="document.name"
            @save="(args: string) => {updateDocumentType(args, document.id)}"
            @remove="RemoveDocumentType(document.id)"
            />
          </div>
        </ion-col>
      </ion-row> 
    </ion-grid>
  </template>
  
  <script setup lang="ts">
  
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput
  } from "@ionic/vue";
  import DocumentField from '@/components/admin/DocumentField.vue'
  import { onBeforeMount, ref } from "vue";
  import {adminDocuments} from '@/stores/adminDocumentTypes'
  import { storeToRefs } from "pinia";

  const store = adminDocuments()
  const documentTypes = storeToRefs(store)
  const newDocument = ref()

  const newDocumentType = () => {
    store.saveNewDocument(newDocument.value)
  }
  const updateDocumentType = (newDocumentType: string, id: string) => {
    store.editDocument({id: id, name: newDocumentType})
  }
  const RemoveDocumentType = (id: string) => {
    store.deleteDocument(id)
  }
  onBeforeMount(() =>{
    store.getDocuments()
  })
  </script>
  
  <style scoped>
  ion-button {
    width: 30%;
    text-transform: capitalize;
  }
  </style>
  