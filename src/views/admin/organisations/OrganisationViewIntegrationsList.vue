<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      Integration
    </h1>
    <ion-item
      v-for="item in integrations.integrations.value"
      :key="item.id"
      button
      :router-link="redirect(String(item.id))"
      router-direction="root"
    >
      <ion-label>
        <h2>{{ item.name }}</h2>
        <p>Integration</p>
      </ion-label>
      <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
    </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonLabel, IonItem } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

import { Integrations } from "@/stores/adminIntegrations";

const store = Integrations();
const integrations = storeToRefs(store);
const route = useRoute();

const organisationId = route.params.id as string;
//store.getSingleIntegration()
const redirect = (id: string) => {
  return {
    name: "OrganisationViewIntegrations",
    params: {
      id: organisationId,
      integrationId: id,
    },
  };
};
onBeforeMount(() => {
  store.getIntegrations(organisationId);
});
</script>

<style scoped>
p {
  margin-left: 3%;
  font-family: "Akkurat-Mono";
  font-size: var(--av-font-xs);
}
h1 {
  margin-bottom: 38px;
}
</style>
