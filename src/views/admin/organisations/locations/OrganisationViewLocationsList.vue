<template>
    <h1 class="font-bold font-size-lg color-light-gray">Locations</h1>
    <ion-item 
    
    v-for="(location, index) in navigationThree[0].locations" 
    :key="index" 
    button
    :router-link="redirect(String(location.locationId))"
    router-direction="root">
      <ion-label color="light" >
        <h2>{{location.locationName}}</h2>
        <p>Location</p>
      </ion-label>
      <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
    </ion-item>
</template>
<script setup lang="ts"> 
import {
IonLabel,
IonItem,
IonIcon,

} from "@ionic/vue";
import { chevronForwardOutline } from 'ionicons/icons';
import { onBeforeMount, ref } from "vue";
import {Locations} from '@/stores/adminLocations'
import { storeToRefs } from 'pinia'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const Location = Locations()
const { navigationThree } = storeToRefs(Location);

const redirect = (id: string) => {
    console.log('locationId',id)
  cookies.set('locationId', id)
  if( cookies.get('locationId') && cookies.get('orgId')){
    return { 
      name: 'OrganisationViewLocations', 
      params: { id: cookies.get('orgId'),locationId: cookies.get('locationId')} 
    }
  }
}

onBeforeMount(() =>{
    Location.getNavigationThree()
})
</script>
    
<style scoped>
ion-content{
    margin: 0%;
}
ion-button {
    width: 246px
}
</style>
