<template>
<ion-grid>
    <ion-row>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
      <ion-label color="light">Documents</ion-label >
        <ion-item v-for="doc in props.documents" v-bind:key="doc.id">
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
    </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonGrid
} from "@ionic/vue";
import { ref } from "vue";
import { chevronForwardOutline } from "ionicons/icons";

interface Document {
  id: number;
  title: string;
  dateUploaded: string;
}
interface Props {
    documents: Document[]
}

const props = defineProps<Props>();

// const documents = ref([
//   { id: 1, name: 'User Manual' },
//   { id: 2, name: 'Quick Start Guide' },
//   { id: 3, name: 'Schematics' },
// ]);
const newDocument = ref()
const currentDocument = ref();
const editedDocument = ref();


const SetCurrecntDocument = (obj:{id: number , title: string}) => {
  currentDocument.value = obj
}
const RemoveDocument = (id: number) => {
    const filter = props.documents.filter(function( item ) {
    return item.id !== id;
  });
};
const SaveDocument = (id: number) => {
  const index = props.documents.findIndex(item => item.id === id);
  // props.documents[index].title = editedDocument.value
  currentDocument.value = null
  editedDocument.value = null
}
const EnableEdit = (id: number) => {
  const check = currentDocument?.value?.id === id ? true : false
  return check
}
const ResetDocuments = (id: number) => {
  const index = props.documents.findIndex(item => item.id === id);
  // props.documents[index] = currentDocument.value
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
