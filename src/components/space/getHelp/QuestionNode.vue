<template>
  <div class="decision-wrapper">
    <div class="logo-wrapper">
      <img
        src="@/theme/img/logo/logo-without-name.svg"
        class="logo"
        alt="AlphaVictor logo"
      />
    </div>
    <div class="answers-list-wrapper">
      <IonList class="answers-list" lines="none">
        <ion-list-header class="answers-wrapper-title">
          <template v-if="nodeData.type === DecisionTreeNodeType.Question">
            {{ nodeData.text }}
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Article">
            I've found the following article that I think you'll find useful
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Video">
            I've found the following video that I think you'll find useful
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Document">
            I've found the following document that I think you'll find helpful
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Email">
            We'd really appreciate some more details - click below to send us an
            email
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Phone">
            I think it's best you speak to someone - click below to place a call
          </template>
        </ion-list-header>
        <template v-if="nodeData.type === DecisionTreeNodeType.Question">
          <IonItem
            class="answer-item-wrapper"
            v-for="node in nodeData.children"
            :key="node.id"
            button
            :disabled="!isAvailable"
            @click="selectAnswerHandler(node)"
          >
            <span>{{ node.text }}</span>
            <ion-icon
              slot="end"
              :icon="chevronForwardOutline"
              color="#000000"
            />
          </IonItem>
        </template>
        <IonItem
          class="answer-item-wrapper"
          v-else
          button
          @click="handleClickDestination"
        >
          <span>{{ nodeData.text }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="#000000" />
        </IonItem>
      </IonList>
      <span class="question-bubble">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 6.5C4.49857 3.49141 1.66667 0.666666 0 0C6.4 0 10.5 2.16667 11.5 3.5L16.5 2L16 17H5.5V15V13V12.5C5.5 11.5 5.5 9.5 5 6.5Z"
            fill="#F7FBFF"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonList, IonItem, IonListHeader, IonIcon } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";

import { IDecisionTreeNode, DecisionTreeNodeType } from "@/types/decisionTree";

interface Props {
  nodeData: IDecisionTreeNode;
  isAvailable: boolean;
  selectAnswerHandler: (answer: IDecisionTreeNode) => void;
}
const props = defineProps<Props>();

const handleClickDestination = () => {
  if (props.nodeData.type === DecisionTreeNodeType.Question) {
    return;
  } else {
    props.selectAnswerHandler(props.nodeData);
  }
};
</script>

<style scoped>
.logo-wrapper {
  background: #181818;
  border: 0.75px solid #313131;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  transform: translateY(-50%);
}

.decision-wrapper {
  display: flex;
  gap: 12px;
}

.answers-list-wrapper {
  position: relative;
  max-width: 350px;
}
.answers-list {
  background: #f7fbff;
  border-radius: 20px;
  padding: 15px 12px;
}

.question-bubble {
  position: absolute;
  top: 0;
  left: -5px;
  width: 16.5px;
  height: 17px;
}

.answer-item-wrapper {
  --background: #ffffff;
  --color: #000000;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}

.answer-item-wrapper {
  margin-bottom: 10px;
}
.answer-item-wrapper.item-disabled {
  opacity: 1;
}

.answers-wrapper-title {
  --color: #000000;
  font-size: 15px;
  line-height: 1.25;
}
</style>
