<template>
  <h1 class="title-admin font-bold font-size-lg color-light-gray">
    Decision Trees
  </h1>

  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col
        size-xs="12"
        size-md="8"
        size-lg="6"
        size-xl="4"
        class="form-admin--group_field"
      >
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Add new decision tree"
          v-model="state.newDecisionTreeName"
        ></ion-input>
      </ion-col>
      <ion-col
        size-xs="12"
        size-md="4"
        size-lg="4"
        size-xl="2"
        class="form-admin--group_field"
      >
        <ion-button
          expand="block"
          @click="addNewDecisionTree"
          :disabled="!state.newDecisionTreeName"
          >Add new +</ion-button
        >
      </ion-col>
    </ion-row>
    <ion-row v-if="organisationDetails.decisionTrees?.length > 0">
      <ion-col
        class="form-admin--group_field"
        size-xs="12"
        size-md="8"
        size-lg="6"
        size-xl="4"
      >
        <ion-list class="decision-tree-list" lines="none">
          <ion-list-header class="bold-text">
            <ion-label>Current decisions trees</ion-label>
          </ion-list-header>
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
            <ion-label>
              {{ decisionTree.name }}
            </ion-label>
            <ion-label slot="end" class="decision-view-icon">>> view</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
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
  IonList,
  IonLabel,
  IonListHeader,
} from "@ionic/vue";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";
import { DecisionTree, DecisionTreeNodeType } from "@/types/decisionTree";

const route = useRoute();
const organisationsStore = useOrganisationsStore();

onBeforeMount(() => {
  const organisationId = route.params.id as string;
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
</style>
