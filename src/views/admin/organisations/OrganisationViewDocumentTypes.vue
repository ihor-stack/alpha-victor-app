  <template>
    <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
    <ion-grid>
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
          <ion-button @click="AddDocument()">Add new +</ion-button>
        </ion-col>
        <ion-col>
          <DocumentField />
        </ion-col>
        <!-- <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Current Document Types</ion-label >
            <ion-item v-for="doc in documents" v-bind:key="doc.id">
              <ion-input
                class="font-size-sm"
                color="light"
                placeholder="Document Type"
                :value="doc.title"
                @ionInput="editedDocument = $event.target.value;"
                @ion-focus="SetCurrecntDocument(doc)"
                @keydown.esc="ResetDocuments(doc.id)"
              ></ion-input>
              <ion-button 
                @click="SaveDocument(doc.id)"
                class="save-button"
                slot="end"  
                fill="clear"
                size="small"
                v-if=EnableEdit(doc.id)
                > &gt;&gt; save 
              </ion-button>
              <ion-button 
                @click="RemoveDocument(doc.id)"
                class="remove-button"
                slot="end"  
                fill="clear"
                size="small"
                v-else
                >
                &gt;&gt; remove
              </ion-button>
            </ion-item>
        </ion-col> -->
      </ion-row> 
    </ion-grid>
  
  </template>
  
  <script setup lang="ts">
  
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonInput
  } from "@ionic/vue";
  import DocumentField from '@/components/admin/DocumentField.vue'
  import { ref, reactive } from "vue";
  let documents = reactive([
    { id: 1, title: 'User Manual', dateUploaded: '' },
    { id: 2, title: 'Quick Start Guide', dateUploaded: '' },
    { id: 3, title: 'Schematics', dateUploaded: '' },
  ]);
  const newDocument = ref()
  const currentDocument = ref();
  const editedDocument = ref();

  const AddDocument = () => {
    documents.push({id: documents.length + 1, title: newDocument.value, dateUploaded: new Date().toDateString()})
    newDocument.value = null
  };
  const SetCurrecntDocument = (obj:{id: number , title: string}) => {
    currentDocument.value = obj
  }
  const RemoveDocument = (id: number) => {
    documents = documents.filter(function( item ) {
      return item.id !== id;
    });
  };
  const SaveDocument = (id: number) => {
    const index = documents.findIndex(item => item.id === id);
    documents[index].title = editedDocument.value
    currentDocument.value = null
    editedDocument.value = null
  }
  const EnableEdit = (id: number) => {
    const check = currentDocument?.value?.id === id ? true : false
    return check
  }
  const ResetDocuments = (id: number) => {
    const index = documents.findIndex(item => item.id === id);
    documents[index] = currentDocument.value
    currentDocument.value = null
  };
  </script>
  
  <style scoped>
 
  .remove-button {
    --color: red;
  }
  .save-button {
    --color: green;
  }
  </style>
  