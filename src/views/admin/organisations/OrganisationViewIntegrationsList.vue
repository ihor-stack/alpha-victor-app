<template>
  <h1 class="font-bold font-size-lg color-light-gray">Integration</h1>
  <ion-item 
  v-for="item in integrations.integrations.value" 
  :key="item.id" 
  button
  :router-link="redirect(String(item.id))"
  router-direction="root">
    <ion-label color="light" >
      <h2>{{item.name}}</h2>
      <p>Integration</p>
    </ion-label>
    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
  </ion-item>
</template>
  
<script setup lang="ts">
  
import {
  IonIcon,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { chevronForwardOutline } from 'ionicons/icons';
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useCookies } from "vue3-cookies";
import { Integrations } from "@/stores/adminIntegrations";

const store = Integrations()
const integrations = storeToRefs(store)
const { cookies } = useCookies();
//store.getSingleIntegration()
const redirect = (id: string) => {
  cookies.set('integrationId', id)
  if( cookies.get('integrationId') && cookies.get('orgId')){
    return { 
      name: 'OrganisationViewIntegrations', 
      params: { id: cookies.get('orgId'),integrationId: cookies.get('integrationId')} 
    }
  }
}
onBeforeMount(() => {
  store.getIntegrations()
})
</script>
  
  <style scoped>
  p {
    margin-left: 3%;
    font-family: "Akkurat-Mono";
    font-size: var(--av-font-xs);
  }
  h1{
    margin-bottom: 38px;
  }
  
  </style>
  