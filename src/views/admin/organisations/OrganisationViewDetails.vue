<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Organisation name</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Organisation Name"
          :value="organisationDetails.name"
          @ion-input="organisationDetails.name=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Contact name</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Joe Bloggs"
          :value="organisationDetails.contactName"
          @ion-input="organisationDetails.contactName=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Phone number</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="07762522515"
          :value="organisationDetails.phone"
          @ion-input="organisationDetails.phone=String($event.target.value) "
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Shortcode prefix</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LIN"
          :value="organisationDetails.prefix"
          @ion-input="organisationDetails.prefix=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Email address</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="joebloggs@email.com"
          :value="organisationDetails.email"
          @ion-input="organisationDetails.email=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Language</ion-label>
        <AdminSelect v-model="selectedLanguage" :options="languageOptions"/>
      </ion-col>
    </ion-row>
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Address line 1</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LinkedIn"
          :value="organisationDetails.addressLines ? organisationDetails.addressLines[0] : ''"
          @ion-input="organisationDetails.addressLines[0]=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Address line 2</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Joe Bloggs"
          :value="organisationDetails.addressLines ? organisationDetails.addressLines[1] : ''"
          @ion-input="organisationDetails.addressLines[1]=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">City</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="07762522515"
          :value="organisationDetails.city"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Area code</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LIN"
          :value="organisationDetails.postCode"
          @ion-input="organisationDetails.postCode=String($event.target.value)"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
        <ion-label color="light">Website / email domain(s)</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="ex: website.com"
          :value="newDomain"
          @ion-input="newDomain=String($event.target.value)"
          @keyup.enter="organisationDetails.website.push(newDomain)"
        />
        <ion-chip v-for="(domain, index) in organisationDetails.website" :key="index">
          <ion-label>{{ domain }}</ion-label>
          <ion-icon :icon="closeCircle" @click="removeDomain(index)"></ion-icon>
        </ion-chip>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-button class="font-size-sm text-lowercase" @click="saveChanges()">
    Save changes
  </ion-button>
</template>

<script setup lang="ts">
import { 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonInput, 
  IonLabel, 
  IonButton,
  IonIcon,
  IonChip
 } 
  from "@ionic/vue";
  import {Organisations} from '@/stores/adminOrganisations'
  import { storeToRefs } from 'pinia'
  import { onBeforeMount, ref } from "vue";
  import AdminSelect from  '@/components/admin/AdminSelect.vue'
  import {closeCircle} from 'ionicons/icons'
  import {SelectItem} from '@/types/index'

  const organisation = Organisations()
  const { organisationDetails } = storeToRefs(organisation);
  const languageOptions = [
    {id:0, title:'English'},
    {id:1, title:'Welsh'},
    {id:2, title:'French'},
    {id:3, title:'Spanish'},
    {id:4, title:'German'},
    {id:5, title:'Polish'}
  ]
  const selectedLanguage = ref({} as SelectItem)
  const newDomain = ref()
  const saveChanges = () => {
    organisation.updateOrgDetails(selectedLanguage.value.id)
  }
  const removeDomain = (index: number) => {
    if (index > -1) {
      organisationDetails.value.website.splice(index, 1);
    }
  }
  onBeforeMount(() =>{
    organisation.getOrgDetails()
  })
</script>

<style scoped>
  h1{
    margin-bottom: 38px;
  }
  ion-button {
    width: 246px
  }
  ion-chip {
  --background: var(--av-primary);
  --color: var(--av-light-gray);
  }
</style>
