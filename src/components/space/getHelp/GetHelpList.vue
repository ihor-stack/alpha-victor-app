<template>
  <div class="decisition-list-container">
    <QuestionNode
      v-if="decisionTree.root"
      :nodeData="decisionTree.root"
      :isAvailable="state.currentDecitionTreeNodes.length === 0"
      :selectAnswerHandler="handleClickNode"
    ></QuestionNode>

    <div
      v-for="(treeNode, index) in state.currentDecitionTreeNodes"
      :key="treeNode.id"
    >
      <AnswerNode
        v-if="treeNode.type === DecisionTreeNodeType.Answer"
        :nodeData="treeNode"
        :handleCancelAndAskAgain="handleCancelAndAskAgain"
      ></AnswerNode>
      <QuestionNode
        v-else
        :nodeData="treeNode"
        :isAvailable="index === state.currentDecitionTreeNodes.length - 1"
        :selectAnswerHandler="handleClickNode"
      ></QuestionNode>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";

import QuestionNode from "./QuestionNode.vue";
import AnswerNode from "./AnswerNode.vue";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";
import { IDecisionTreeNode, DecisionTreeNodeType } from "@/types/decisionTree";

const route = useRoute();
const router = useRouter();
const organisationsStore = useOrganisationsStore();
const decisionTree = computed(() => organisationsStore.decisionTree);

interface State {
  currentDecitionTreeNodes: IDecisionTreeNode[];
}

const state: State = reactive({
  currentDecitionTreeNodes: [],
});

const handleClickNode = (node: IDecisionTreeNode) => {
  if (node.type === DecisionTreeNodeType.Answer) {
    state.currentDecitionTreeNodes = [
      ...state.currentDecitionTreeNodes,
      node,
      ...node.children,
    ];
  }
};

const handleCancelAndAskAgain = (ask: IDecisionTreeNode) => {
  const index = state.currentDecitionTreeNodes.findIndex(
    (node) => node.id === ask.id
  );
  state.currentDecitionTreeNodes = state.currentDecitionTreeNodes.slice(
    0,
    index
  );
};

onBeforeMount(() => {
  const decisionTreeId: string = route.params.decisionTreeId as string;
  organisationsStore.getDecisionDetails(decisionTreeId);
});
</script>

<style scoped>
.decisition-list-container {
  background: #000000;
  padding: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 50px;
}
</style>
