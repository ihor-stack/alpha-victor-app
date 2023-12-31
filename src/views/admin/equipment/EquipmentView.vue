<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.equipment.view.title") }}
    </h1>

    <ion-row class="form-admin">
      <ion-col size-xs="12" class="form-admin--group_field">
        <ion-list class="equipment-list">
          <ion-item
            v-for="equipment in equipmentList.equipments"
            v-bind:key="equipment.equipmentId"
            button
            :router-link="{
              name: 'EquipmentDetails',
              params: { equipmentId: equipment.equipmentId },
            }"
            router-direction="root"
          >
            <ion-label text-wrap="true">
              <ion-icon :src="`/img/icons/${equipment.icon}.svg`" />
              <div>
                <h2>
                  {{ equipment.manufacturerName }}
                  {{ equipment.equipmentName }} {{ equipment.assetTypeName }}
                </h2>
                <span class="equipment-list--type">{{
                  equipment.typeName
                }}</span>
              </div>
            </ion-label>
            <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
          </ion-item>
        </ion-list>
        <EquipmentModal />
      </ion-col>
    </ion-row>

    <ion-row class="form-admin">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <h3 class="font-bold font-size-md color-light-gray">
          {{ $t('pages.admin.equipment.view.manufacturers')}}
        </h3>
        <div
          v-for="manufacturer in equipmentList.manufacturers"
          :key="manufacturer.manufacturerId"
        >
          <ItemField
            :modelValue="manufacturer.name"
            :data="manufacturer"
            icon=""
            :id="manufacturer.manufacturerId"
            :placeholder="$t('pages.admin.equipment.view.manufacturer')"
            @update:modelValue="
              (value: string) =>
                updateManufacturer(manufacturer.manufacturerId, value)
            "
            @remove="() => removeManufacturer(manufacturer.manufacturerId)"
          />
        </div>
        <EquipmentManufacturerModal />
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <h3 class="font-bold font-size-md color-light-gray">
          {{ $t("pages.admin.equipment.view.assetTypes")}}
        </h3>
        <div v-for="asset in equipmentList.assetTypes" :key="asset.assetId">
          <ItemField
            :modelValue="asset.name"
            :data="asset"
            :icon="asset.icon"
            :id="asset.assetId"
            :placeholder="$t('pages.admin.equipment.view.assetType')"
            @update:modelValue="
              (value: string) => updateAssetType(asset.assetId, value)
            "
            @remove="() => removeAssetType(asset.assetId)"
          />
        </div>
        <EquipmentAssetTypeModal />
      </ion-col>
    </ion-row>
  </div>
</template>

<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { onBeforeMount } from "vue";
import { chevronForwardOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import EquipmentModal from "@/components/admin/equipment/EquipmentModal.vue";
import EquipmentAssetTypeModal from "@/components/admin/equipment/EquipmentAssetTypeModal.vue";
import EquipmentManufacturerModal from "@/components/admin/equipment/EquipmentManufacturerModal.vue";
import ItemField from "@/components/admin/ItemField.vue";
import { Equipment as useEquipment } from "@/stores/adminEquipment";

const EquipmentStore = useEquipment();

const { equipmentList } = storeToRefs(EquipmentStore);

const updateManufacturer = (manufacturerId: string, name: string) => {
  EquipmentStore.updateManufacturer(manufacturerId, name);
};

const removeManufacturer = (id: string) => {
  EquipmentStore.removeManufacturer(id);
};

const updateAssetType = (assetTypeId: string, name: string) => {
  EquipmentStore.updateAssetType(assetTypeId, name);
};

const removeAssetType = (id: string) => {
  EquipmentStore.removeAssetType(id);
};

onBeforeMount(() => {
  EquipmentStore.getEquipments();
});
</script>

<style scoped>
h1 {
  margin-bottom: 3%;
}

h3 {
  margin: 30px 0 10px;
}

.equipment-list ion-label {
  display: flex;
}

.equipment-list ion-label div {
  display: block;
  margin-left: 20px;
}

.equipment-list--type {
  margin-left: 10px;
  font-family: "Akkurat-Mono";
  font-size: var(--av-font-xs);
  opacity: 0.5;
}

ion-select {
  margin-bottom: 3%;
}

ion-button {
  margin-bottom: 5%;
  width: 246px;
}

ion-list {
  background: transparent;
}

ion-item {
  --background: transparent;
}
</style>
