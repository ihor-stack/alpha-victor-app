<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      Document Types
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            placeholder="Add new decision tree"
            v-model="state.newDecisionTreeName"
          >
          </ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button
            @click="addNewDecisionTree"
            :disabled="!state.newDecisionTreeName"
          >
            Add new +
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" class="form-admin--group_field">
          <h3
            class="font-bold font-size-md color-light-gray"
            v-if="organisationDetails.decisionTrees?.length > 0"
          >
            Current Decision Trees
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
            <ion-label>
              {{ decisionTree.name }}
            </ion-label>
            <ion-label
              slot="end"
              class="decision-view-icon font-size-xs font-mono"
              >>> view</ion-label
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
