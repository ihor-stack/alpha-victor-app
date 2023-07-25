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
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import mixpanel from "mixpanel-browser";
import { DetailedSpace } from "@/types";

const route = useRoute();
const router = useRouter();
const organisationsStore = useOrganisationsStore();
const spacesStore = useSpacesStore();
const spaceId: string = route.params.spaceId as string;
const decisionTree = computed(() => organisationsStore.decisionTree);

const nodeTypes = [
  "Article",
  "Video",
  "Question",
  "Answer",
  "Email",
  "Phone",
  "Document",
];

interface State {
  currentDecitionTreeNodes: IDecisionTreeNode[];
  baseMixPanelProperties: {
    organisaLon?: string;
    location?: string;
    ﬂoor?: string;
    space?: string;
    decision_tree?: string;
  };
}

const state: State = reactive({
  currentDecitionTreeNodes: [],
  baseMixPanelProperties: {},
});

const handleClickNode = (node: IDecisionTreeNode, question?: string) => {
  if (node.type === DecisionTreeNodeType.Answer) {
    state.currentDecitionTreeNodes = [
      ...state.currentDecitionTreeNodes,
      node,
      ...node.children,
    ];
    if (question) {
      mixpanel.track("QuesLon Answered", {
        ...state.baseMixPanelProperties,
        question,
        answer: node.text,
      });
    }
  } else if (node.type === DecisionTreeNodeType.Phone) {
    mixpanel.track("Phone Call Placed", {
      ...state.baseMixPanelProperties,
      number: node.phone,
    });
    window.open(`tel:${node.phone}`, "_blank");
  } else if (node.type === DecisionTreeNodeType.Email) {
    mixpanel.track("Email Sent", {
      ...state.baseMixPanelProperties,
      email: node.email,
    });
    window.open(`mailto:${node.email}`, "_blank");
  } else if (node.type === DecisionTreeNodeType.Article) {
    mixpanel.track("Article Shown", {
      ...state.baseMixPanelProperties,
      description: node.article?.title,
    });
    router.push({ path: `/article/${node.article?.id}` });
  } else if (node.type === DecisionTreeNodeType.Video) {
    mixpanel.track("Video Shown", {
      ...state.baseMixPanelProperties,
      description: node.video?.title,
    });
    router.push({ path: `/video/${node.video?.id}` });
  } else if (node.type === DecisionTreeNodeType.Document) {
    mixpanel.track("Document Shown", {
      ...state.baseMixPanelProperties,
      description: node.document?.title,
    });
    router.push({ path: `/document-viewer/${node.document?.id}` });
  }
  if (
    node.type !== DecisionTreeNodeType.Answer &&
    node.type !== DecisionTreeNodeType.Question
  ) {
    mixpanel.track("DT Goal Reached", {
      ...state.baseMixPanelProperties,
      type: nodeTypes[node.type],
    });
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

onBeforeMount(async () => {
  let spaceDetails: DetailedSpace | null = spacesStore.currentSpace;
  if (spacesStore.currentSpace?.id !== spaceId) {
    spaceDetails = await spacesStore.getSpaceDetails(spaceId);
  }
  const decisionTreeId: string = route.params.decisionTreeId as string;
  organisationsStore.getDecisionDetails(decisionTreeId).then((res) => {
    state.baseMixPanelProperties = {
      organisaLon: spaceDetails?.organisationName,
      location: spaceDetails?.locationName,
      ﬂoor: spaceDetails?.floorName,
      space: spaceDetails?.name,
      decision_tree: res?.name,
    };
    mixpanel.track("Decision Tree Started", state.baseMixPanelProperties);
  });
});
</script>

<style scoped>
.decisition-list-container {
  padding: 0 10px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 50px;
}
</style>
