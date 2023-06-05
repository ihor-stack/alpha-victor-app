<template>
  <ion-page>
    <app-header title="Known Issues">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          @click="() => router.back()"
          class="back"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <known-issues-list
          :open-issues="state.issues"
          :closed-issues="[]"
          :click-handler="handleIssueClick"
        />
      </div>
      <custom-toast
        :status="state.toastData.toastStatus"
        :header="state.toastData.toastHeader"
        :message="state.toastData.toastMessage"
        :is-open="true"
        :duration="state.toastData.toastDuration"
        v-on:did-dismiss="hideToast"
      />
    </ion-content>
    <ion-footer>
      <div class="known-issues__report-issue">
        <ion-button expand="block" @click="handleReportIssueClick"
          >Report Issue</ion-button
        >
      </div>
    </ion-footer>
    <ion-modal
      :is-open="state.issueModalOpen"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @willDismiss="handleDismissIssueModal"
    >
      <issues-modal :issue="state.selectedIssue" />
    </ion-modal>
    <ion-modal
      :is-open="state.reportIssueModalOpen"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @willDismiss="state.reportIssueModalOpen = false"
    >
      <report-issue-modal
        :spaceId="spaceId"
        :handleReportIssue="handleReportIssue"
      />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  IonContent,
  IonFooter,
  IonPage,
  IonButton,
  IonModal,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import IssuesModal from "@/components/modals/IssuesModal.vue";
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";
import KnownIssuesList from "@/components/space/KnownIssuesList.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import { IssueListItem, ToastStatus } from "@/types";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { publicAPI } from "@/axios";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";

const router = useRouter();
const route = useRoute();

const spaceId: string = route.params.spaceId as string;
const spacesStore = useSpacesStore();

interface Props {
  reportIssueModalOpen: boolean;
}

interface ToastData {
  toastOpen: boolean;
  toastMessage: string;
  toastHeader: string;
  toastStatus: ToastStatus;
  toastDuration?: number;
}

interface State {
  issueModalOpen: boolean;
  reportIssueModalOpen: boolean;
  selectedIssue: IssueListItem | null;
  toastData: ToastData;
  issues: IssueListItem[];
}

const props = defineProps<Props>();
const state: State = reactive({
  issueModalOpen: false,
  reportIssueModalOpen: props.reportIssueModalOpen,
  selectedIssue: null,
  toastData: {
    toastOpen: false,
    toastHeader: "",
    toastMessage: "",
    toastStatus: "generic",
  },
  issues: [],
});

const handleDismissIssueModal = () => {
  state.issueModalOpen = false;
};

const handleIssueClick = (item: IssueListItem) => {
  state.selectedIssue = item;
  state.issueModalOpen = !state.issueModalOpen;
};

const handleReportIssueClick = () => {
  state.issueModalOpen = false;
  state.reportIssueModalOpen = true;
};

const hideToast = () => {
  console.log("hiding toast");
  state.toastData.toastOpen = false;
};

const handleReportIssue = () => {
  state.reportIssueModalOpen = false;
  state.toastData = {
    toastHeader: "Thank you",
    toastMessage: "Your issue report has been sent",
    toastStatus: "success",
    toastOpen: true,
  };
  getIssues();
};

const getIssues = () => {
  loadingService.show("Loading...");
  publicAPI
    .get(`/Issue/${spaceId}/IssueList`)
    .then((response) => {
      state.issues = response.data;
    })
    .catch((error) => {
      state.issues = [];
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close();
    });
};

onBeforeMount(() => {
  if (spacesStore.currentSpace?.id !== spaceId)
    spacesStore.getSpaceDevices(spaceId);
  getIssues();
});
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
