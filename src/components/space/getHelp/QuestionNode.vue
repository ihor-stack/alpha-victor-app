<template>
  <div class="decision-wrapper">
    <div class="logo-wrapper">
      <img
        v-if="theme?.logo"
        :src="theme.logo"
        class="logo"
        :alt="$t('components.space.getHelp.questionNode.AlphaVictorLogoAlt')"
      />
      <img
        v-else
        src="@/theme/img/logo/logo-without-name.svg"
        class="logo"
        :alt="$t('components.space.getHelp.questionNode.AlphaVictorLogoAlt')"
      />
    </div>
    <div class="answers-list-wrapper">
      <IonList class="answers-list" lines="none">
        <ion-list-header class="answers-wrapper-title">
          <template v-if="nodeData.type === DecisionTreeNodeType.Question">
            {{ nodeData.text }}
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Article">
            {{
              $t(
                "components.space.getHelp.questionNode.articleTemplateDescription"
              )
            }}
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Video">
            {{
              $t(
                "components.space.getHelp.questionNode.videoTemplateDescription"
              )
            }}
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Document">
            {{
              $t(
                "components.space.getHelp.questionNode.documentTemplateDescription"
              )
            }}
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Email">
            {{
              $t(
                "components.space.getHelp.questionNode.appreciateDetailsDescription"
              )
            }}
          </template>
          <template v-else-if="nodeData.type === DecisionTreeNodeType.Phone">
            {{ $t("components.space.getHelp.questionNode.callDescription") }}
          </template>
        </ion-list-header>
        <template v-if="nodeData.type === DecisionTreeNodeType.Question">
          <IonItem
            class="answer-item-wrapper"
            v-for="node in nodeData.children"
            :key="node.id"
            button
            :disabled="!isAvailable"
            :detail="true"
            @click="
              selectAnswerHandler(
                node,
                nodeData.type === DecisionTreeNodeType.Question
                  ? nodeData.text
                  : undefined
              )
            "
          >
            <span class="answers-list--text">{{ node.text }}</span>
          </IonItem>
        </template>
        <IonItem
          class="answer-item-wrapper"
          v-else
          button
          :detail="true"
          @click="handleClickDestination"
        >
          <span class="answers-list--text">{{ nodeData.text }}</span>
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
import { IonList, IonItem, IonListHeader } from "@ionic/vue";
import { IDecisionTreeNode, DecisionTreeNodeType } from "@/types/decisionTree";
import { storeToRefs } from "pinia";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const organisationStore = useOrganisationStore();
const { theme } = storeToRefs(organisationStore);

interface Props {
  nodeData: IDecisionTreeNode;
  isAvailable: boolean;
  selectAnswerHandler: (
    answer: IDecisionTreeNode,
    question?: string | null
  ) => void;
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
ion-item::part(detail-icon) {
  opacity: 1;
}
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
  background: #f7fbff !important;
  border-radius: 20px;
  padding: 15px 12px;
  margin-left: 0 !important;
}
.answers-list--text {
  font-size: 14px;
}
.question-bubble {
  position: absolute;
  top: 0;
  left: -5px;
  width: 16.5px;
  height: 17px;
}

.answer-item-wrapper {
  --background: #ffffff !important;
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
  padding: 0;
  align-items: center;
}
</style>
