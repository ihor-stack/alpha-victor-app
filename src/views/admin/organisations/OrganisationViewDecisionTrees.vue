<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.decisionTrees.title") }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            :placeholder="
              $t('pages.admin.organisations.view.decisionTrees.placeholder')
            "
            v-model="state.newDecisionTreeName"
            @ion-input="confirmToLeaveService.setEditing(true)"
          >
          </ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button
            @click="addNewDecisionTree"
            :disabled="!state.newDecisionTreeName"
          >
            {{ $t("pages.admin.organisations.view.decisionTrees.addNew") }}
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" class="form-admin--group_field">
          <h3
            class="font-bold font-size-md color-light-gray"
            v-if="organisationDetails.decisionTrees?.length > 0"
          >
            {{ $t("pages.admin.organisations.view.decisionTrees.current") }}
          </h3>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item
            v-for="decisionTree in organisationDetails.decisionTrees"
            :key="decisionTree.id"
            class="decision-tree-item"
            button
            :router-link="{
              name: 'OrganisationViewDecisionTreeDetails',
              params: {
                organisationId: organisationDetails.id,
                decisionTreeId: decisionTree.id,
              },
            }"
          >
            <ion-label text-wrap="true">
              {{ decisionTree.name }}
            </ion-label>
            <ion-label
              text-wrap="true"
              slot="end"
              class="decision-view-icon font-size-xs font-mono"
              >{{
                $t("pages.admin.organisations.view.decisionTrees.view")
              }}</ion-label
            >
            <ion-label
              text-wrap="true"
              slot="end"
              class="decision-view-icon font-size-xs font-mono remove-button"
              @click="deleteDecisionTree($event, decisionTree.id)"
              >{{
                $t("pages.admin.organisations.view.decisionTrees.remove")
              }}</ion-label
            >
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  IonItem,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
} from "@ionic/vue";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";
import { DecisionTree, DecisionTreeNodeType } from "@/types/decisionTree";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const route = useRoute();
const organisationsStore = useOrganisationsStore();
const organisationId = route.params.id as string;

onBeforeMount(() => {
  if (organisationsStore.organisationDetails?.id !== organisationId) {
    organisationsStore.setId(organisationId);
    organisationsStore.getOrgDetails(organisationId);
  }
});

const organisationDetails = computed(
  () => organisationsStore.organisationDetails
);

const state = reactive({
  newDecisionTreeName: "",
});

const addNewDecisionTree = () => {
  const newDecisionTree: DecisionTree = {
    name: state.newDecisionTreeName,
    root: {
      type: DecisionTreeNodeType.Question,
      text: "New Question",
      xPosition: 0,
      yPosition: 0,
      children: [],
    },
  };
  organisationsStore.createDecisionTree(newDecisionTree);
  state.newDecisionTreeName = "";
};

const deleteDecisionTree = (event: CustomEvent, id?: string) => {
  event.stopPropagation();
  if (id) {
    organisationsStore.deleteDecisionTree(id, organisationId);
  }
};
</script>

<style scoped>
.decision-tree-list {
  background: transparent;
}
.decision-tree-item {
  --background: transparent;
  border: 0.75px solid #313131;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}
.decision-view-icon {
  font-size: 10px;
}
.bold-text {
  font-weight: 700;
}

.remove-button {
  color: var(--av-red) !important;
}
</style>
