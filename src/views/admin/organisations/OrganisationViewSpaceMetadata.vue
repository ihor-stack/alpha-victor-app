<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
        <ion-col size-xs="6" class="form-admin--group_field">
          <SpaceTypeModal />
        </ion-col>
        <ion-col size-xs="6" class="form-admin--group_field">
          <SpaceFeatureModal />
        </ion-col>
    </ion-row>
    <ion-row class="form-admin--group">
        <ion-col size-xs="6" class="form-admin--group_field">
          <ion-label color="light">Space Types</ion-label>
          <div v-for="(data,index) in metaData.spaceTypes" :key="index">
            <ItemField
            :id="data.spaceTypeId"
            v-model="data.name"
            @save="(value: any) => {SaveDocument(value, data)}"
            @remove="(value: any) => {Remove(value)}"
            />
          </div>
        </ion-col>
        <ion-col size-xs="6" class="form-admin--group_field">
          <ion-label color="light">Space Features</ion-label>
          <div v-for="(data,index) in metaData.spaceFeatures" :key="index">
            <ItemField :id="data.spaceFeatureId" :modelValue="data.name"/>
          </div>
        </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import {
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import ItemField from '@/components/admin/ItemField.vue'
import SpaceTypeModal from '@/components/admin/space-metadata/SpaceTypeModal.vue'
import SpaceFeatureModal from '@/components/admin/space-metadata/SpaceFeatureModal.vue'
import {onBeforeMount, ref} from 'vue'
import {MetaData} from '@/stores/adminMetaData'
import { storeToRefs } from 'pinia'
import { spaceType } from "@/types";

const router = useRouter();

const Spaces = MetaData()
const { metaData } = storeToRefs(Spaces);

onBeforeMount(() => {
  Spaces.getMetaData()
})
const SaveDocument = (value: string, doc: spaceType) => {
  const currentItem = doc
  currentItem.name = value
  Spaces.editSpaceType(currentItem)
}
const Remove = (item: spaceType) => {
  console.log('Remove')
  Spaces.removeSpaceType(item)
};
</script>

<style scoped>
ion-label {
  font-size: 14px;
}
ion-row {
  margin-top: 30px;
  height: 100%;
}
ion-thumbnail {
  --size: 100%;
}
</style>
