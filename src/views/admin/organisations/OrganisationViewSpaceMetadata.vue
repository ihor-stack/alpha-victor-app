<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      Space Metadata
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="6" class="form-admin--group_field">
          <SpaceTypeModal :organisationId="organisationId" />
          <hr class="form-admin--divider" />
          <ion-label class="font-bold" v-if="metaData.spaceTypes">Space Types</ion-label>
          <div v-for="(data, index) in metaData.spaceTypes" :key="index">
            <ItemField
              :modelValue="data.name"
              :data="data"
              icon=""
              :id="data.spaceTypeId"
              placeholder="Space type"
              @update:modelValue="
                (value) => updateTypeValue({ ...data, name: value })
              "
              @remove="removeType"
            />
          </div>
        </ion-col>
        <ion-col size-xs="6" class="form-admin--group_field">
          <SpaceFeatureModal :organisationId="organisationId" />
          <hr class="form-admin--divider" />
          <ion-label class="font-bold" v-if="metaData.spaceFeatures">Space Features</ion-label>
          <div v-for="(data, index) in metaData.spaceFeatures" :key="index">
            <ItemField
              :modelValue="data.name"
              :data="data"
              :icon="data.icon"
              :id="data.spaceFeatureId"
              placeholder="Space feature"
              @update:modelValue="
                (value) => updateFeatureValue({ ...data, name: value })
              "
              @remove="removeFeature"
            />
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { IonLabel, IonCol, IonGrid, IonRow } from "@ionic/vue";
import { useRoute } from "vue-router";

import ItemField from "@/components/admin/ItemField.vue";
import SpaceTypeModal from "@/components/admin/space-metadata/SpaceTypeModal.vue";
import SpaceFeatureModal from "@/components/admin/space-metadata/SpaceFeatureModal.vue";
import { onBeforeMount } from "vue";
import { MetaData } from "@/stores/adminMetaData";
import { storeToRefs } from "pinia";
import { spaceType } from "@/types";
import { spaceFeature } from "@/types";

const route = useRoute();
const Spaces = MetaData();
const { metaData } = storeToRefs(Spaces);
const organisationId = route.params.id as string;

onBeforeMount(() => {
  Spaces.getMetaData(organisationId);
});

const updateTypeValue = (updatedItem: spaceType) => {
  Spaces.editSpaceType(organisationId, updatedItem);
};

const removeType = (item: spaceType) => {
  Spaces.removeSpaceType(organisationId, item);
};

const updateFeatureValue = (updatedItem: spaceFeature) => {
  Spaces.editSpaceFeature(organisationId, updatedItem);
};

const removeFeature = (item: spaceFeature) => {
  Spaces.removeSpaceFeature(organisationId, item);
};
</script>

<style scoped>
ion-thumbnail {
  --size: 100%;
}
ion-label {
  margin-bottom: 10px;
  display: block;
}
</style>
