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
            :disabled="!selectedLocation || !route.query.spaceIntegrationId"
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
            :disabled="!route.query.spaceIntegrationId"
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
import { useRoute } from "vue-router";

const route = useRoute();

const organisationId = route.params.id as string;
const spaceId = route.params.spaceId as string;
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
  if (route.query.spaceIntegrationId) {
    spaceStore.updateIntegration(
      spaceId,
      route.query.spaceIntegrationId as string,
      {
        ubiqisenseLocationId: selectedLocation.value,
      }
    );
  }
};

const handleDelete = () => {
  spaceStore.deleteIntegration(
    spaceId,
    route.query.spaceIntegrationId as string
  );
};

onBeforeMount(() => {
  Location.getUbiqisenses(organisationId);
  spaceStore
    .getIntegration(spaceId, route.query.spaceIntegrationId as string)
    .then((res) => {
      selectedLocation.value = res?.ubiqisenseSpaceId || "";
    });
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
