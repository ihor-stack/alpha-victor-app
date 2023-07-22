<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.documentTypes.title") }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            placeholder="Enter new document type"
            :value="newDocument"
            @ionInput="newDocument = $event.target.value"
          >
          </ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button
            :disabled="newDocument ? false : true"
            class="button-wide"
            @click="newDocumentType()"
          >
            {{ $t("pages.admin.organisations.view.documentTypes.addNew") }}
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" class="form-admin--group_field">
          <h3
            class="font-bold font-size-md color-light-gray"
            v-if="documents.length"
          >
            {{ $t("pages.admin.organisations.view.documentTypes.current") }}
          </h3>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <div v-for="doc in documents" :key="doc.id">
            <ItemField
              :modelValue="doc.name"
              :data="doc"
              icon=""
              :id="doc.id"
              placeholder="Document Type"
              :hideRemove="doc.global ? doc.global : false"
              @update:modelValue="
                (value) => updateTypeValue({ ...doc, name: value })
              "
              @remove="removeType"
            />
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonGrid, IonRow, IonCol, IonInput } from "@ionic/vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { Organisations } from "@/stores/adminOrganisations";
import { AdminDocument } from "@/types";
import ItemField from "@/components/admin/ItemField.vue";

const route = useRoute();
const organisationId = route.params.id as string;
const organisation = Organisations();
const { documents } = storeToRefs(organisation);

onBeforeMount(() => {
  organisation.getOrgDocumentTypes(organisationId);
});

const newDocument = ref();

const newDocumentType = () => {
  organisation.saveNewOrgDocumentType(organisationId, newDocument.value);
};

const updateTypeValue = (updatedDoc: AdminDocument) => {
  organisation.editOrgDocumentType(organisationId, updatedDoc);
};

const removeType = (data: AdminDocument) => {
  organisation.removeOrgDocumentType(organisationId, data.id);
};
</script>
