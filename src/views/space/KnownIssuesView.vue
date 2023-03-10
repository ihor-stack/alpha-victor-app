<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="known-issues__container">
        <app-header title="Known Issues">
          <template #app-header-left>
            <ion-button fill="clear" color="light" @click="goBack">
              <span class="font-mono font-size-xs">&lt;&lt; back</span>
            </ion-button>
          </template>
        </app-header>
        <div class="container">
          <known-issues-list :open-issues="openIssues" :closed-issues="closedIssues" :click-handler="handleIssueClick" />
        </div>
        <div class="known-issues__report-issue">
          <ion-button expand="block" @click="handleReportIssueClick">Report Issue</ion-button>
        </div>
      </div>
      <ion-modal :is-open="state.issueModalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismissIssueModal">
        <issues-modal :issue="state.selectedIssue" />
      </ion-modal>
      <ion-modal :is-open="state.reportIssueModalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismissReportIssueModal">
        <report-issue-modal />
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import { useRouter } from "vue-router";
import { IonContent, IonPage, IonButton, IonModal } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import IssuesModal from "@/components/modals/IssuesModal.vue";
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";
import KnownIssuesList from "@/components/space/KnownIssuesList.vue";
import { Issue } from "@/types";

const router = useRouter();

interface Props {
  reportIssueModalOpen: boolean
}

const props = defineProps<Props>();

interface State {
  issueModalOpen: boolean
  reportIssueModalOpen: boolean
  selectedIssue: Issue | null
}

const state: State = reactive({
  issueModalOpen: false,
  reportIssueModalOpen: props.reportIssueModalOpen,
  selectedIssue: null,
});

const handleDismissIssueModal = () => {
  state.issueModalOpen = false;
};

const handleDismissReportIssueModal = () => {
  state.reportIssueModalOpen = false;
}

const handleIssueClick = (item: any) => {
  state.selectedIssue = item;
  state.issueModalOpen = !state.issueModalOpen;
};

const handleReportIssueClick = () => {
  state.issueModalOpen = false;
  state.reportIssueModalOpen = true;
}

const goBack = () => {
  router.back();
};

const closedIssues = [
  {
    title: "WiFi network password doesn't work",
    comment: "The WiFi password we were given isn't working",
    status: 2,
    log: [
      'Issue created by jp@uncoded.com',
      'Status changed from low to resolved',
      'Status changed from low to resolved',
      'Status changed from low to resolved',
    ]
  },
];

const openIssues = [
  {
    title: "Podium lighting broken",
    comment: "The lighting above the podium desk isn’t working. When turned on it flickers non stop.",
    status: 1,
    log: [
      'Issue created by jp@uncoded.com',
      'Status changed from low to high'
    ]
  },
  {
    title: "Computer OS needs update",
    comment: "Our presentation software won't work with current OS version",
    status: 0,
    log: [
      'Issue created by jp@uncoded.com',
      'Status set to low'
    ]
  }
];
</script>

<style scoped>
ion-modal {
  --max-height: 80vh;
}

.known-issues__container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.container {
  flex: 1;
  padding: 0px 30px;
}

.known-issues__report-issue {
  padding: 20px 30px;
}
</style>
