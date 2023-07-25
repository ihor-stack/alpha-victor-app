<template>
  <div class="answer-wrapper">
    <div>
      <div class="answer-content color-light-gray">
        {{ nodeData.text }}
        <span class="answer-bubble">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 10.5C12.0014 13.5086 14.8333 16.3333 16.5 17C10.1 17 6 14.8333 5 13.5L0 15L0.5 0H11V2V4V4.5C11 5.5 11 7.5 11.5 10.5Z"
              fill="#0000FF"
            />
          </svg>
        </span>
      </div>
      <div class="cancel-ask-button" @click="handleCancelAndAskAgain(nodeData)">
        Cancel and ask again
      </div>
    </div>
    <div class="profile-avatar-wrapper">
      <IonIcon :icon="person" color="primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { person } from "ionicons/icons";

import { IDecisionTreeNode } from "@/types/decisionTree";

interface Props {
  nodeData: IDecisionTreeNode;
  handleCancelAndAskAgain: (answer: IDecisionTreeNode) => void;
}

defineProps<Props>();
</script>

<style scoped>
.profile-avatar-wrapper {
  background: #ffffff;
  border: 0.75px solid #313131;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  transform: translateY(10px);
}

.answer-wrapper {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: flex-end;
}
.answer-content {
  position: relative;
  max-width: 220px;
  background: #0000ff;
  border-radius: 20px;
  padding: 7px 12px;
  line-height: 1.25;
}

.answer-bubble {
  position: absolute;
  bottom: 0;
  right: -5px;
  width: 16.5px;
  height: 17px;
}

.cancel-ask-button {
  text-align: right;
  color: #ff3737;
  font-size: 12px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
