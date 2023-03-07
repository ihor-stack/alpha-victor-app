<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <app-header>
        <template #app-header-left>
          <ion-button fill="clear" color="light" @click="goBack">
            <span class="font-mono font-size-xs">&lt;&lt; back</span>
          </ion-button>
        </template>
        <template #app-header-title>Known Issues</template>
      </app-header>
      <ion-content>
        <div class="container">
          <div v-for="(issuesGroup, index) in issues" :key="index" class="issues-list">
            <div class="issues-list__header">
              <h4 class="font-mono color-light-gray font-size-xxs">{{ useDotify(issuesGroup.title) }}</h4>
            </div>
            <ul class="issues-list__list">
              <li v-for="(issue, index) in issuesGroup.issues" :key="index" class="issues-list__item"
                @click="handleClick(issue)">
                <div class="issues-list__item__info">
                  <p class="color-light-gray font-bold font-size-xs">{{ issue.title }}</p>
                  <status-dot :status="issue.status" />
                </div>
                <div class="issues-list__item__link">
                  <span class="color-light-gray font-mono font-size-xxs">&gt;&gt; view</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </ion-content>
    </ion-content>
    <ion-modal :is-open="state.modalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismiss">
      <issues-modal :issue="state.selectedIssue" />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonModal } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import IssuesModal from "@/components/space/IssuesModal.vue";
import StatusDot from "@/components/shared/StatusDot.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useDotify } from "@/composables/utilities";
const router = useRouter();

interface State {
  modalOpen: boolean
  selectedIssue: { [key: string]: any } | null
}

const state: State = reactive({
  modalOpen: false,
  selectedIssue: null,
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const handleClick = (item: any) => {
  state.selectedIssue = item;
  state.modalOpen = !state.modalOpen;
};

const goBack = () => {
  router.back();
};

const issues = [
  {
    title: 'Open Issues',
    issues: [
      {
        title: "Podium lighting broken",
        comments: [
          "The lighting above the podium desk isn’t working. When turned on it flickers non stop."
        ],
        status: 1
      },
      {
        title: "Computer OS needs update",
        comments: [
          "Our presentation software won't work with current OS version"
        ],
        status: 0
      }
    ]
  },
  {
    title: 'Closed Issues',
    issues: [
      {
        title: "WiFi network password doesn't work",
        comments: [
          "The WiFi password we were given isn't working"
        ],
        status: 2
      }
    ]
  },
];
</script>

<style scoped>
ion-modal {
  --max-height: 80vh;
}

.container {
  padding: 0px 30px 20px;
}

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
