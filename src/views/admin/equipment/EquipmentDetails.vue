<template>
    <h1 class="font-bold font-size-lg color-light-gray">NUC7iDNKE</h1>
    <ion-grid>
      <ion-row>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item>
            <ion-label color="light" slot="start">Manufacturer</ion-label>
            <ion-input label="Manufacturer" color="light"></ion-input>
          </ion-item> 
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item>
            <ion-label color="light" slot="start">Model</ion-label>
            <ion-input color="light" label="Model"></ion-input>
          </ion-item> 
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item>
            <ion-label color="light" slot="start">Serial number</ion-label>
            <ion-input color="light" label="Serial number"></ion-input>
          </ion-item> 
        </ion-col>
        <ion-col size-xs="12" class="form-admin--group_field">
          
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <DocumentField />
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <DocumentField />
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
  import DocumentField from '@/components/admin/DocumentField.vue'
  
  const manufacturers = ref([
    { id: 1, name: 'opt 1' },
    { id: 2, name: 'opt 2' },
    { id: 3, name: 'opt 3' },
  ]);
  const assets = ref([
    { id: 1, name: 'opt 1' },
    { id: 2, name: 'opt 2' },
    { id: 3, name: 'opt 3' },
  ]);
  const equipments = ref([
    { id: 1, name: 'NUC7iDNKE', detail: 'intel.small.form.factor.pc' },
    { id: 2, name: '1770342 USB Extender TX',  detail: 'extron.usb.extender'},
    { id: 3, name: '65E8501', detail: 'sony.screen' },
    { id: 4, name: '98 Inch QM98N', detail: 'samsung.screen' },
  ]);
  const documents = ref([
    { id: 1, name: 'User Manual' },
    { id: 2, name: 'Quick Start Guide' },
    { id: 3, name: 'Schematics' },
  ]);
  const newDocument = ref()
  const currentDocument = ref();
  const editedDocument = ref();

  const AddDocument = () => {
    documents.value.push({id: documents.value.length + 1, name: newDocument.value})
    newDocument.value = null
  };
  const SetCurrecntDocument = (obj:{id: number , name: string}) => {
    currentDocument.value = obj
  }
  const RemoveDocument = (id: number) => {
    documents.value = documents.value.filter(function( item ) {
      return item.id !== id;
    });
  };
  const SaveDocument = (id: number) => {
    const index = documents.value.findIndex(item => item.id === id);
    documents.value[index].name = editedDocument.value
    currentDocument.value = null
    editedDocument.value = null
  }
  const EnableEdit = (id: number) => {
    const check = currentDocument?.value?.id === id ? true : false
    return check
  }
  const ResetDocuments = (id: number) => {
    const index = documents.value.findIndex(item => item.id === id);
    documents.value[index] = currentDocument.value
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
  