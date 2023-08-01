<template>
  <div v-if="openIssues" class="issues-list">
    <div class="issues-list__header">
      <h4 class="font-mono font-size-xxs">
        {{ useDotify("Open Issues") }}
      </h4>
    </div>
    <ul class="issues-list__list">
      <li
        v-for="(issue, index) in props.openIssues"
        :key="index"
        class="issues-list__item"
        @click="props.clickHandler(issue)"
      >
        <div class="issues-list__item__info">
          <p class="font-bold font-size-xs">
            {{ issue.title }}
          </p>
          <status-dot :status="issue.status" />
        </div>
        <div class="issues-list__item__link">
          <span class="font-mono font-size-xxs">{{$t('components.space.documentsList.viewSpan')}}</span>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="closedIssues?.length" class="issues-list">
    <div class="issues-list__header">
      <h4 class="font-mono font-size-xxs">
        {{ useDotify("Closed Issues") }}
      </h4>
    </div>
    <ul class="issues-list__list">
      <li
        v-for="(issue, index) in props.closedIssues"
        :key="index"
        class="issues-list__item"
        @click="props.clickHandler(issue)"
      >
        <div class="issues-list__item__info">
          <p class="font-bold font-size-xs">
            {{ issue.title }}
          </p>
          <status-dot :status="issue.status" />
        </div>
        <div class="issues-list__item__link">
          <span class="font-mono font-size-xxs">{{$t('components.space.documentsList.viewSpan')}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import StatusDot from "@/components/shared/StatusDot.vue";
import { useDotify } from "@/composables/utilities";
import { Issue } from "@/types";

interface Props {
  openIssues: Issue[];
  closedIssues: Issue[];
  clickHandler: (issue: Issue) => void;
}
const props = defineProps<Props>();
</script>

<style scoped>
.issues-list {
  margin-bottom: 30px;
}

.issues-list__header {
  padding-bottom: 10px;
  border-bottom: 0.75px solid #313131;
  margin-bottom: 18px;
}

.issues-list__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.issues-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.issues-list__item__status {
  margin-left: 8px;
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.issues-list__item__info .status-dot {
  margin-left: 12px;
  margin-top: 5px;
}
</style>
