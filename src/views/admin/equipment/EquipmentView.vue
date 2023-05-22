<template>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Equipment</h1>
    <ion-row class="form-admin">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-select 
        placeholder="Select organisation" 
        class="custom-select"
        interface="popover"
        >
          <ion-select-option 
            value="english" v-for="(manufature, id) in manufacturers" 
            :key="id">
            {{manufature.name}}
          </ion-select-option>
        </ion-select>
        <EquimentManufacutrerModal />
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-select 
        placeholder="Select organisation" 
        class="custom-select"
        interface="popover"
        >
          <ion-select-option 
            value="english" v-for="(asset, id) in assets" 
            :key="id">
            {{asset.name}}
          </ion-select-option>
        </ion-select>
        <EquimentAssetTypeModal />
      </ion-col>
      <ion-col size-xs="12" class="form-admin--group_field">
        <h1 class="font-bold font-size-md color-light-gray">Equipment</h1>
        <ion-item 
        v-for="equipment in equipments" 
        v-bind:key="equipment.id" 
        button 
        :router-link="{ name: 'EquipmentDetails' }" 
        router-direction="root">
          <ion-label color="light" >
            <h2>{{equipment.name}}</h2>
            <p>{{equipment.detail}}</p>
          </ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
        </ion-item>
      </ion-col>
    </ion-row>
    
    
</template>
  
<script setup lang="ts">
  import {
    IonItem,
    IonLabel,
    IonIcon,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
  } from "@ionic/vue";
  import { ref } from "vue";
  import { chevronForwardOutline } from "ionicons/icons";
  import EquimentAssetTypeModal from "@/components/admin/equipment/EquimentAssetTypeModal.vue"
  import EquimentManufacutrerModal from "@/components/admin/equipment/EquimentManufacutrerModal.vue"

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
h1 {
  margin-bottom: 3%;
}
p {
  margin-left: 2%;
  font-family: "Akkurat-Mono";
  font-size: var(--av-font-xs);
}
ion-select {
  margin-bottom: 3%;
}
ion-button {
  margin-bottom: 5%;
  width: 246px;
}

</style>
  