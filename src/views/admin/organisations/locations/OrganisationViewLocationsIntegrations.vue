<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.locations.integrations.title") }}
    </h1>
    <h2 class="font-bold font-size-sm color-light-gray">
      {{ $t("pages.admin.organisations.view.locations.integrations.subtitle") }}
    </h2>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
          <ion-label>{{
            $t(
              "pages.admin.organisations.view.locations.integrations.selectLocation"
            )
          }}</ion-label>
          <AdminSelect v-model="selectedLocation" :options="locations" />
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button class="font-size-sm" @click="saveChanges()">
            {{
              $t(
                "pages.admin.organisations.view.locations.integrations.saveBtn"
              )
            }}
          </ion-button>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button
            class="font-size-sm text-lowercase delete-button"
            fill="clear"
          >
            {{
              $t(
                "pages.admin.organisations.view.locations.integrations.clearBtn"
              )
            }}
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonIcon,
} from "@ionic/vue";
import { onBeforeMount, ref } from "vue";
import { chevronForwardOutline } from "ionicons/icons";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Locations } from "@/stores/adminLocations";
import { SelectItem } from "@/types/index";
import { storeToRefs } from "pinia";

const Location = Locations();
const { locations } = storeToRefs(Location);

const selectedLocation = ref({} as SelectItem);

const saveChanges = () => {
  // TO DO: Add API for integration location
  // Location.updateIntegrationLocation(selectedLocation.value.id)
};

onBeforeMount(() => {
  Location.getLocations();
});
</script>

<style scoped>
h1 {
  margin-bottom: 38px;
}
h2 {
  margin-bottom: 21px;
}
ion-select {
  max-height: 48px;
}
ion-button {
  width: 246px;
}
.delete-button {
  color: var(--av-red);
}
.add-button {
  margin-top: 500px;
}
</style>
