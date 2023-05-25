<template>
  <ion-page>
    <app-header title="Known Issues">
      <template #start>
        <ion-button fill="clear" color="light" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <known-issues-list :open-issues="openIssues" :closed-issues="closedIssues" :click-handler="handleIssueClick" />
      </div>
      <custom-toast :status="state.toastData.toastStatus" :header="state.toastData.toastHeader" :message="state.toastData.toastMessage" :is-open="true" :duration="state.toastData.toastDuration" v-on:did-dismiss="hideToast" />
    </ion-content>
    <ion-footer>
      <div class="known-issues__report-issue">
        <ion-button expand="block" @click="handleReportIssueClick">Report Issue</ion-button>
      </div>
    </ion-footer>
    <ion-modal :is-open="state.issueModalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismissIssueModal">
      <issues-modal :issue="state.selectedIssue" />
    </ion-modal>
    <ion-modal :is-open="state.reportIssueModalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismissReportIssueModal">
      <report-issue-modal />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import { useRouter } from "vue-router";
import { IonContent, IonFooter, IonPage, IonButton, IonModal } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import IssuesModal from "@/components/modals/IssuesModal.vue";
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";
import KnownIssuesList from "@/components/space/KnownIssuesList.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import { Issue, ToastStatus } from "@/types";

const router = useRouter();

interface Props {
  reportIssueModalOpen: boolean
}

interface ToastData {
  toastOpen: boolean;
  toastMessage: string;
  toastHeader: string;
  toastStatus: ToastStatus;
  toastDuration?: number; 
}

const props = defineProps<Props>();

interface State {
  issueModalOpen: boolean;
  reportIssueModalOpen: boolean;
  selectedIssue: Issue | null;
  toastData: ToastData;
}

const state: State = reactive({
  issueModalOpen: false,
  reportIssueModalOpen: props.reportIssueModalOpen,
  selectedIssue: null,
  toastData: {
    toastOpen: false,
    toastHeader: '',
    toastMessage: '',
    toastStatus: 'generic'
  }
});


const handleDismissIssueModal = () => {
  state.issueModalOpen = false;
};

const handleDismissReportIssueModal = () => {
  state.reportIssueModalOpen = false;
  state.toastData = {
    toastHeader: 'Thank you',
    toastMessage: 'Your issue report has been sent',
    toastStatus: 'success',
    toastOpen: true
  }
}

const handleIssueClick = (item: any) => {
  state.selectedIssue = item;
  state.issueModalOpen = !state.issueModalOpen;
};

const handleReportIssueClick = () => {
  state.issueModalOpen = false;
  state.reportIssueModalOpen = true;
}

const hideToast = () => {
  console.log('hiding toast');
  state.toastData.toastOpen = false;
}

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

ion-footer {
  background: #000000;
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
