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
          <ion-label text-wrap="true">{{
            $t(
              "pages.admin.organisations.view.locations.integrations.selectLocation"
            )
          }}</ion-label>
          <AdminSelect
            v-model="selectedLocation"
            :options="ubiqisenseOptions"
            valueKey="ubiqisenseSpaceId"
          />
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button
            class="font-size-sm"
            :disabled="!selectedLocation"
            @click="saveChanges()"
          >
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
            :disabled="!selectedLocation"
            @click="handleDelete"
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
import { IonGrid, IonRow, IonCol, IonLabel } from "@ionic/vue";
import { onBeforeMount, ref, computed } from "vue";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Locations } from "@/stores/adminLocations";
import { Spaces as useSpaceStore } from "@/stores/adminSpaces";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const organisationId = route.params.id as string;
const spaceId = route.params.spaceId as string;
const spaceIntegrationId = route.query.spaceIntegrationId as string;
const Location = Locations();
const spaceStore = useSpaceStore();
const { ubiqisenses } = storeToRefs(Location);

const selectedLocation = ref("");

const ubiqisenseOptions = computed(() => {
  return ubiqisenses.value?.map((option, index) => ({
    id: index,
    title: option.name,
    ubiqisenseSpaceId: option.id,
  }));
});

const saveChanges = () => {
  if (spaceIntegrationId) {
    spaceStore.updateIntegration(
      spaceId,
      route.query.spaceIntegrationId as string,
      {
        ubiqisenseLocationId: selectedLocation.value,
      }
    );
  } else {
    spaceStore.addIntegration(spaceId, selectedLocation.value);
  }
};

const handleDelete = () => {
  spaceStore.deleteIntegration(spaceId, spaceIntegrationId).then(() => {
    selectedLocation.value = "";
    router.push({
      name: "OrganisationViewLocationsSpaces",
      params: {
        id: organisationId,
        locationId: route.params.locationId,
        floorId: route.params.floorId,
        spaceId,
      },
    });
  });
};

onBeforeMount(() => {
  Location.getUbiqisenses(organisationId);
  if (spaceIntegrationId) {
    spaceStore.getIntegration(spaceId, spaceIntegrationId).then((res) => {
      selectedLocation.value = res?.ubiqisenseSpaceId || "";
    });
  }
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
