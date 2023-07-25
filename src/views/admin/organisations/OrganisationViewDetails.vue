<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ organisationDetails.name }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.organisationName")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="Organisation"
            :value="organisationDetails.name"
            @ion-input="organisationDetails.name = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.shortcodePrefix")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="APL"
            :value="organisationDetails.prefix"
            @ion-input="
              organisationDetails.prefix = String($event.target.value)
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.contactName")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="organisationDetails.contactName"
            @ion-input="
              organisationDetails.contactName = String($event.target.value)
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.email")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="youremail@domain.com"
            :value="organisationDetails.email"
            @ion-input="organisationDetails.email = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.phone")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="01245 000000"
            :value="organisationDetails.phone"
            @ion-input="organisationDetails.phone = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.language")
          }}</ion-label>
          <AdminSelect v-model="selectedLanguage" :options="languageOptions" />
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.address1")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="123 Main Street"
            :value="
              organisationDetails.addressLine0
                ? organisationDetails.addressLine0
                : ''
            "
            @ion-input="
              organisationDetails.addressLine0 = String($event.target.value)
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.address2")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder=""
            :value="
              organisationDetails.addressLine1
                ? organisationDetails.addressLine1
                : ''
            "
            @ion-input="
              organisationDetails.addressLine1 = String($event.target.value)
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.city")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="London"
            :value="organisationDetails.city"
            @ion-input="organisationDetails.city = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.zip")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            placeholder="S1 3LL"
            :value="organisationDetails.postCode"
            @ion-input="
              organisationDetails.postCode = String($event.target.value)
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
          <ion-label>{{
            $t("pages.admin.organisations.view.details.label")
          }}</ion-label>
          <div class="chips-field">
            <ion-input
              class="font-size-sm"
              placeholder="ex: website.com"
              v-model="newDomain"
              @keyup.enter="addDomain()"
            />
            <p
              v-if="newDomain.length"
              class="color-light-gray chips-field--label font-mono font-size-sm"
            >
              {{ $t("pages.admin.organisations.view.details.press") }}
            </p>
          </div>
          <ion-chip
            v-for="(domain, index) in organisationDetails.website"
            :key="index"
          >
            <ion-label>{{ domain }}</ion-label>
            <ion-icon
              :icon="closeCircle"
              @click="removeDomain(index)"
            ></ion-icon>
          </ion-chip>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-button class="button-wide" @click="saveChanges()">
      {{ $t("pages.admin.organisations.view.details.saveBtn") }}
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
  IonChip,
} from "@ionic/vue";
import { Organisations } from "@/stores/adminOrganisations";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";

import AdminSelect from "@/components/admin/AdminSelect.vue";
import { closeCircle } from "ionicons/icons";
import toastService from "@/services/toastService";

const route = useRoute();
const organisation = Organisations();
const { organisationDetails } = storeToRefs(organisation);
const organisationId = route.params.id as string;
const languageOptions = [
  { id: 0, title: "English" },
  { id: 1, title: "Welsh" },
];
const newDomain = ref("");

const addDomain = () => {
  const regex = new RegExp(/^((?:www\.)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/);

  if (!regex.test(newDomain.value)) {
    toastService.show(
      "Error",
      "Please enter a valid website address",
      "error",
      "top"
    );
    return;
  }

  if (organisationDetails.value.website) {
    organisationDetails.value.website.push(newDomain.value);
  } else {
    organisationDetails.value.website = [newDomain.value];
  }
  newDomain.value = "";
};

const removeDomain = (index: number) => {
  if (index > -1) {
    organisationDetails.value.website.splice(index, 1);
  }
};

const saveChanges = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postCodePattern = /^[a-zA-Z0-9\s-]*$/;
  const phoneNumberPattern = /^[0-9-]*$/;
  let isValid = true;

  // Validate the email
  if (!emailPattern.test(organisationDetails.value.email)) {
    toastService.show(
      "Error",
      "Please enter a valid email address",
      "error",
      "top"
    );
    isValid = false;
  }

  // Validate the phone number
  if (!phoneNumberPattern.test(organisationDetails.value.phone)) {
    toastService.show(
      "Error",
      "Please enter a valid phone number",
      "error",
      "top"
    );
    isValid = false;
  }

  // Validate the postcode
  if (!postCodePattern.test(organisationDetails.value.postCode)) {
    toastService.show("Error", "Please enter a valid postcode", "error", "top");
    isValid = false;
  }

  if (isValid) {
    // If all validations pass, then save the changes
    organisation.updateOrgDetails(organisationId);
  }
};

const selectedLanguage = computed({
  get() {
    return languageOptions.find(
      (language) => organisationDetails.value.selectedLanguage === language.id
    );
  },
  set(newValue) {
    if (newValue) {
      organisationDetails.value.selectedLanguage = newValue.id;
    }
  },
});

onBeforeMount(() => {
  organisation.getOrgDetails(organisationId);
});
</script>

<style scoped>
ion-chip {
  --background: var(--av-primary);
  --color: var(--av-light-gray);
  margin-top: 15px;
}
</style>
