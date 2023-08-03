<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.locations.wifi.title") }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.wifi.network")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="wifi.wifiName"
            @ion-input="
              wifi.wifiName = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.wifi.password")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="wifi.wifiPassword"
            @ion-input="
              wifi.wifiPassword = $event.target.value
                ? String($event.target.value)
                : undefined;
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>

        <ion-col size-xs="12" class="form-admin--group_field">
          <AdminSelect
            label="Wifi security type"
            v-model="securityTypeSelected"
            :options="securityTypesList"
            idPrefix="security-type-select"
            :handleChange="() => confirmToLeaveService.setEditing(true)"
          />
        </ion-col>

        <ion-col size-xs="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.wifi.show")
          }}</ion-label>
          <ion-input class="form-toggle" :disabled="true">
            <ion-label text-wrap="true">{{
              $t("pages.admin.organisations.view.locations.wifi.showSpace")
            }}</ion-label>
            <ion-toggle
              color="primary"
              :checked="wifi.showWifiPassword"
              @ionChange="
                wifi.showWifiPassword = $event.detail.checked;
                confirmToLeaveService.setEditing(true);
              "
            />
          </ion-input>
        </ion-col>

        <ion-col size-xs="12">
          <ion-button class="button-wide" @click="saveChanges">
            {{ $t("pages.admin.organisations.view.locations.wifi.saveBtn") }}
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
  IonLabel,
  IonToggle,
  IonItem,
  IonIcon,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const Space = Spaces();
const route = useRoute();
const spaceId = route.params.spaceId as string;

enum SecurityTypes {
  None = 0,
  WEP = 1,
  WPA = 2,
  WPA2 = 3,
  WPA3 = 4,
}

const securityTypesList = Object.keys(SecurityTypes)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({ id: SecurityTypes[key as any], title: key }));

const { wifi, securityTypeSelected, editSpacesWifi } = storeToRefs(Space);
securityTypeSelected.value = securityTypesList.find(
  (item) => item.id === wifi.value.wifiSecurityType
);

async function saveChanges() {
  wifi.value.wifiSecurityType = securityTypeSelected.value.id;
  await Space.editSpacesWifi(spaceId);
}

onBeforeMount(() => {
  Space.getSpaceDetailsWifi(spaceId);
});
</script>

<style scoped>
ion-button {
  margin-top: 50px;
}
</style>
