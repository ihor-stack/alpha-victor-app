<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t('pages.admin.documents.documentTypes.title')}}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            :placeholder="$t('pages.admin.documents.documentTypes.placeholder1')"
            v-model="state.newDocumentType"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button
            :disabled="!state.newDocumentType"
            class="button-wide"
            @click="newDocumentType()"
          >
            {{ $t('pages.admin.documents.documentTypes.add')}}
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" class="form-admin--group_field">
          <h3
            class="font-bold font-size-md color-light-gray"
            v-if="documents.length"
          >
            {{ $t('pages.admin.documents.documentTypes.current')}}
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
              :placeholder="$t('pages.admin.documents.documentTypes.placeholder2')"
              :hideRemove="false"
              @update:modelValue="
                (value: string) => updateTypeValue({ ...doc, name: value })
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
import { onBeforeMount, reactive } from "vue";
import { adminDocuments } from "@/stores/adminDocumentTypes";
import { storeToRefs } from "pinia";
import { AdminDocument } from "@/types";
import ItemField from "@/components/admin/ItemField.vue";

const DocTypes = adminDocuments();
const { documents } = storeToRefs(DocTypes);

onBeforeMount(() => {
  DocTypes.getDocumentTypes();
});

const state = reactive({
  newDocumentType: "",
});

const newDocumentType = () => {
  DocTypes.saveNewDocumentType(state.newDocumentType);
  state.newDocumentType = "";
};

const updateTypeValue = (updatedDoc: AdminDocument) => {
  DocTypes.editDocumentType(updatedDoc);
};

const removeType = (data: AdminDocument) => {
  DocTypes.removeDocumentType(data.id);
};
</script>
