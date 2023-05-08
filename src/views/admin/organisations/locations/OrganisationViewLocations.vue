<template>
    <AdminLocationsForm />
</template>

<script setup lang="ts"> 
import AdminLocationsForm from '@/components/admin/locations/AdminLocationsForm.vue'
import { onBeforeMount, ref } from "vue";
import {Locations} from '@/stores/adminLocations'
import { storeToRefs } from 'pinia'

const Location = Locations()
const { navigationThree } = storeToRefs(Location);


const component = AdminLocationsForm


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
