<template>
  <ion-grid class="form-admin">
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ floor.name }}
    </h1>
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label>Floor name</ion-label>
        <ion-input
          class="font-size-sm"
          :value="floor.name"
          @ion-input="floor.name = String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label>Short name</ion-label>
        <ion-input
          class="font-size-sm"
          :value="floor.shortName"
          @ion-input="floor.shortName = String($event.target.value)"
        ></ion-input>
      </ion-col>

      <ion-col size-xs="12" class="button-pair">
        <ion-button
          class="button-wide"
          @click="Floor.updateFloor(organisationId, floor.id)"
        >
          Save floor
        </ion-button>
        <DeleteFloorModal :floorId="floor.id" />
      </ion-col>

      <hr class="form-admin--divider" />

      <ion-col size-xs="12" class="form-admin--group_field">
        <h4 class="font-bold font-size-normal color-light-gray">Spaces</h4>
        <ion-item
          v-for="(space, index) in floor.spaces"
          :key="index"
          button
          :router-link="redirect(String(space.spaceId))"
          router-direction="root"
          class="form-admin--group_field-item space-card ion-no-padding"
        >
          <img v-if="space.image" :src="space.image" :alt="space.name" />
          <ion-label class="space-card--info">
            {{ space.name }}
          </ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-item>
      </ion-col>

      <ion-col size-xs="12" class="button-pair">
        <NewSpaceModal />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/vue";
//import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import { Floors } from "@/stores/adminFloors";
import { storeToRefs } from "pinia";
import { onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { chevronForwardOutline } from "ionicons/icons";
import NewSpaceModal from "@/components/modals/NewSpaceModal.vue";
import DeleteFloorModal from "@/components/modals/DeleteFloorModal.vue";

const route = useRoute();
 
const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;
const floorId = route.params.floorId as string;

const Floor = Floors();
const { floor } = storeToRefs(Floor);

const redirect = (id: string) => {
  return {
    name: "OrganisationViewLocationsSpaces",
    params: {
      id: organisationId,
      locationId,
      floorId,
      spaceId: id,
    },
  };
};

watch(
  () => route.params?.floorId,
  (newValue) => {
    if (newValue) {
      Floor.getFloorDetails(newValue as string);
    }
  }
);

onBeforeMount(() => {
  Floor.getFloorDetails(floorId);
});
</script>

<style scoped>
h2 {
  margin-top: 30px;
  margin-bottom: 16px;
}
ion-button {
  width: 246px;
}
.space-card--info {
  margin-left: 20px;
}
.export-button {
  color: var(--av-light-gray);
  margin-left: 26px;
}
.button-div-margin {
  margin-top: 10%;
  width: 100%;
}
</style>
