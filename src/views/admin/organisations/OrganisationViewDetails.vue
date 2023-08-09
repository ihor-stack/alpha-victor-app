<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ organisationDetails.name }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.organisationName")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t(
                'pages.admin.organisations.view.details.placeholders.organisation'
              )
            "
            :value="organisationDetails.name"
            @ion-input="
              organisationDetails.name = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.shortcodePrefix")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.apl')
            "
            :value="organisationDetails.prefix"
            @ion-input="
              organisationDetails.prefix = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
            @ionBlur="transformToUpper"
            @keyup.enter="transformToUpper"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.contactName")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="organisationDetails.contactName"
            @ion-input="
              organisationDetails.contactName = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.email")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.email')
            "
            :value="organisationDetails.email"
            @ion-input="
              organisationDetails.email = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.phone")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.phone')
            "
            :value="organisationDetails.phone"
            @ion-input="
              organisationDetails.phone = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.language")
          }}</ion-label>
          <AdminSelect
            v-model="selectedLanguages"
            :options="languageOptions"
            :isMultiple="true"
            :handleChange="() => confirmToLeaveService.setEditing(true)"
          />
        </ion-col>

        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">
                {{
                  $t("pages.admin.organisations.view.details.visibilityToggle")
                }}
              </p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                $t(
                  "pages.admin.organisations.view.details.visibilityToggleText"
                )
              }}</span>
            </div>
            <ion-toggle
              v-model="organisationDetails.anonymousAccess"
              @ionChange="
                organisationDetails.anonymousAccess = $event.detail.checked;
                confirmToLeaveService.setEditing(true);
              "
            />
          </div>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.address1")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.address1')
            "
            :value="
              organisationDetails.addressLine0
                ? organisationDetails.addressLine0
                : ''
            "
            @ion-input="
              organisationDetails.addressLine0 = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.address2")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.address2')
            "
            :value="
              organisationDetails.addressLine1
                ? organisationDetails.addressLine1
                : ''
            "
            @ion-input="
              organisationDetails.addressLine1 = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.city")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.city')
            "
            :value="organisationDetails.city"
            @ion-input="
              organisationDetails.city = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.postCode")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :placeholder="
              $t('pages.admin.organisations.view.details.placeholders.postCode')
            "
            :value="organisationDetails.postCode"
            @ion-input="
              organisationDetails.postCode = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.details.website")
          }}</ion-label>
          <div class="chips-field">
            <ion-input
              class="font-size-sm"
              :placeholder="
                $t(
                  'pages.admin.organisations.view.details.placeholders.website'
                )
              "
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
            <ion-label text-wrap="true">{{ domain }}</ion-label>
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
  IonToggle,
  IonButton,
  IonIcon,
  IonChip,
} from "@ionic/vue";
import { Organisations } from "@/stores/adminOrganisations";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import AdminSelect from "@/components/admin/AdminSelect.vue";
import { closeCircle } from "ionicons/icons";
import toastService from "@/services/toastService";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const { t } = useI18n();
const route = useRoute();
const organisation = Organisations();
const { organisationDetails } = storeToRefs(organisation);
const organisationId = route.params.id as string;
const languageOptions = [
  { id: 0, title: t("pages.accountSettings.language.english") },
  { id: 1, title: t("pages.accountSettings.language.welsh") },
  { id: 2, title: t("pages.accountSettings.language.french") },
  { id: 3, title: t("pages.accountSettings.language.spanish") },
  { id: 4, title: t("pages.accountSettings.language.german") },
  { id: 5, title: t("pages.accountSettings.language.polish") },
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
  confirmToLeaveService.setEditing(true);
};

const removeDomain = (index: number) => {
  if (index > -1) {
    organisationDetails.value.website.splice(index, 1);
    confirmToLeaveService.setEditing(true);
  }
};

const transformToUpper = () => {
  organisationDetails.value.prefix = organisationDetails.value.prefix.toUpperCase();
};

const saveChanges = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postCodePattern = /^[A-Za-z]{1,2}\d{1,2}[A-Za-z\d]? ?\d[A-Za-z]{2}$/;
  const phoneNumberPattern = /^[0-9-]*$/;
  let isValid = true;

  if (
    !organisationDetails.value.prefix ||
    organisationDetails.value.prefix.length < 3
  ) {
    toastService.show(
      "Error",
      "Shortcode prefix must have at least 3 characters",
      "error",
      "bottom"
    );
    isValid = false;
  }

  // Validate the email
  if (
    organisationDetails.value.email &&
    !emailPattern.test(organisationDetails.value.email)
  ) {
    toastService.show(
      "Error",
      "Please enter a valid email address",
      "error",
      "top"
    );
    isValid = false;
  }

  // Validate the phone number
  if (
    organisationDetails.value.phone &&
    !phoneNumberPattern.test(organisationDetails.value.phone)
  ) {
    toastService.show(
      "Error",
      "Please enter a valid phone number",
      "error",
      "top"
    );
    isValid = false;
  }

  // Validate the postcode
  if (
    organisationDetails.value.postCode &&
    !postCodePattern.test(organisationDetails.value.postCode)
  ) {
    toastService.show("Error", "Please enter a valid postcode", "error", "top");
    isValid = false;
  }

  if (isValid) {
    // If all validations pass, then save the changes
    organisation.updateOrgDetails(organisationId);
  }
};

const selectedLanguages = computed({
  get() {
    return (
      organisationDetails.value?.selectedLanguages?.map((lang) =>
        languageOptions.find((option) => option.id === lang)
      ) || []
    );
  },
  set(newValue) {
    if (Array.isArray(newValue)) {
      organisationDetails.value.selectedLanguages = newValue.map(
        (val) => val?.id || 0
      );
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
