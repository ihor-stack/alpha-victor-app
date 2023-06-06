<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">{{ organisationDetails.name }}</h1>
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
          <ion-label color="light">Language</ion-label>
          <AdminSelect v-model="selectedLanguage" :options="languageOptions"/>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

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
          <div class="chips-field">
            <ion-input
              class="font-size-sm"
              color="light"
              placeholder="ex: website.com"
              v-model="newDomain"
              @keyup.enter="addDomain()"
            />
            <p v-if="newDomain.length" class="color-light-gray chips-field--label font-mono font-size-sm">Press enter to add</p>
          </div>
          <ion-chip v-for="(domain, index) in organisationDetails.website" :key="index">
            <ion-label>{{ domain }}</ion-label>
            <ion-icon :icon="closeCircle" @click="removeDomain(index)"></ion-icon>
          </ion-chip>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-button class="button-wide" @click="saveChanges()">
      Save changes
    </ion-button>
  </div>
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
  import { onBeforeMount, ref, watchEffect } from "vue";
  import AdminSelect from  '@/components/admin/AdminSelect.vue'
  import {closeCircle} from 'ionicons/icons'
  import {SelectItem} from '@/types/index'
  import toastService from '@/services/toastService'

  const organisation = Organisations()
  const { organisationDetails } = storeToRefs(organisation);
  const languageOptions = [
    {id:0, title:'English'},
    {id:1, title:'Welsh'}
  ]
  const selectedLanguage = ref({} as SelectItem)
  const newDomain = ref('')

  const addDomain = () => {
    const regex = new RegExp(/^((?:www\.)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/);

    if (!regex.test(newDomain.value)) {
      toastService.show('Error', 'Please enter a valid website address', 'error', 'top');
      return;
    }

    if (organisationDetails.value.website) {
      organisationDetails.value.website.push(newDomain.value);
    } else {
      organisationDetails.value.website = [newDomain.value];
    }
    newDomain.value = '';
  }

  const removeDomain = (index: number) => {
    if (index > -1) {
      organisationDetails.value.website.splice(index, 1);
    }
  }

  const saveChanges = () => {
    organisation.updateOrgDetails(selectedLanguage.value.id)
  }

  onBeforeMount(() =>{
    organisation.getOrgDetails()
  })
</script>

<style scoped>
  ion-chip {
  --background: var(--av-primary);
  --color: var(--av-light-gray);
  }
</style>
