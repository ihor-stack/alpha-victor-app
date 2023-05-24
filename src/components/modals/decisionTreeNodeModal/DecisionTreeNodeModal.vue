<template>
  <ion-modal
    :is-open="isOpen"
    @didDismiss="handleDismiss"
    :showBackdrop="false"
  >
    <v-container v-if="state.step === 0">
      <SelectArticle
        v-if="editTreeNode?.type === 0"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <SelectVideo
        v-else-if="editTreeNode?.type === 1"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <EditDestination
        v-else-if="editTreeNode?.type === 2"
        :editTreeNode="editTreeNode"
        :type="editTreeNode?.type"
        :handleDismiss="() => handleDismiss()"
        :handleClickNext="handleClickNext"
        :handleClickBack="handleClickBack"
      />
      <EditAnswer
        v-else-if="editTreeNode?.type === 3"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
      />
      <AddEmail
        v-else-if="editTreeNode?.type === 4"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <AddPhone
        v-else-if="editTreeNode?.type === 5"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <SelectDocument
        v-else-if="editTreeNode?.type === 6"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
    </v-container>
    <v-container v-else-if="state.step === 1">
      <SelectArticle
        v-if="editTreeNode?.type === 0"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <SelectVideo
        v-else-if="editTreeNode?.type === 1"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <AddEmail
        v-else-if="editTreeNode?.type === 4"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <AddPhone
        v-else-if="editTreeNode?.type === 5"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
      <SelectDocument
        v-else-if="editTreeNode?.type === 6"
        :editTreeNode="editTreeNode"
        :handleDismiss="() => handleDismiss()"
        :handleClickConfirm="handleClickConfirm"
        :handleClickBack="handleClickBack"
      />
    </v-container>
    <EditDestination
      v-else
      :editTreeNode="editTreeNode"
      :type="editTreeNode.type"
      :handleDismiss="() => handleDismiss()"
      :handleClickNext="handleClickNext"
    />
  </ion-modal>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { IonModal } from "@ionic/vue";
import { Article, Video } from "@/types/index";
import { DecisionTreeNodeType } from "@/types/decisionTree";
import EditDestination from "./EditDestination.vue";
import SelectArticle from "./SelectArticle.vue";
import SelectVideo from "./SelectVideo.vue";
import EditAnswer from "./EditAnswer.vue";
import AddEmail from "./AddEmail.vue";
import AddPhone from "./AddPhone.vue";
import SelectDocument from "./SelectDocument.vue";

interface IQuestion {
  text: string;
  outcomeLabel: string;
  type: DecisionTreeNodeType;
}

interface ITreeNodeData {
  article?: Article;
  video?: Video;
  email?: string;
  phone?: string;
  text?: string;
}

const props = defineProps([
  "editTreeNode",
  "isOpen",
  "handleDismiss",
  "handleClickNext",
  "handleClickConfirm",
]);
const state = reactive({
  step: 0,
});

const handleClickNext = (questionData: IQuestion) => {
  props.handleClickNext(questionData);
  if (questionData.type === DecisionTreeNodeType.Question) {
    props.handleDismiss();
  } else {
    state.step = 1;
  }
};

const handleClickConfirm = (treeNodeData: ITreeNodeData) => {
  props.handleClickConfirm(treeNodeData);
};

const handleClickBack = () => {
  state.step = 2;
};
</script>
