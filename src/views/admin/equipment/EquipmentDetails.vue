<template>
    <h1 class="font-bold font-size-lg color-light-gray">NUC7iDNKE</h1>
    <ion-row>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-item>
          <ion-label color="light" >Manufacturer</ion-label>
          <ion-input label="Manufacturer" color="light"></ion-input>
        </ion-item> 
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-item>
          <ion-label color="light">Model</ion-label>
          <ion-input color="light" label="Model"></ion-input>
        </ion-item> 
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-item>
          <ion-label color="light">Serial number</ion-label>
          <ion-input color="light" label="Serial number"></ion-input>
        </ion-item> 
      </ion-col>
    </ion-row>
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
    IonButton
  } from "@ionic/vue";
  import { ref } from "vue";
  import { chevronForwardOutline } from "ionicons/icons";
  
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
</script>
  
<style scoped>

</style>
  