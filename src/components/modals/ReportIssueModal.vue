<template>
  <ion-page>
    <div class="modal-panel">
      <div class="modal-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-md font-bold">{{ $t('components.modals.ReportIssueModal.reportIssueHeader') }}</h2>
              <p class="font-size-xs">
                {{$t('components.modals.ReportIssueModal.reportIssueParagraph')}}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-row class="form-admin--group">
            <ion-col size-xs="12" class="form-admin--group_field">
              <ion-label class="font-bold font-size-xs">
                {{$t('components.modals.ReportIssueModal.selectEquipmentLabel')}}
              </ion-label>
              <ion-select
                interface="action-sheet"
                :placeholder="$t('components.modals.ReportIssueModal.selectEquipmentPlaceholder')"
                v-model="state.deviceId"
                @ion-change="checkForInputs"
              >
                <ion-select-option
                  v-for="device in allDevices"
                  :key="device.id"
                  :value="device.id"
                >
                  {{ device.name }}
                </ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12" class="form-admin--group_field">
              <ion-label class="font-bold font-size-xs">{{ $t('components.modals.ReportIssueModal.addTitleLabel') }}</ion-label>
              <ion-input
                class="font-size-xs"
                :placeholder="$t('components.modals.ReportIssueModal.issueTitlePlaceholder')"
                v-model="state.title"
              ></ion-input>
            </ion-col>
          </ion-row>
          <ion-row class="form-admin--group">
            <ion-col size-xs="12" class="form-admin--group_field">
              <ion-label class="font-size-xs font-bold">
                {{$t('components.modals.ReportIssueModal.addCommentLabel')}}
              </ion-label>
              <ion-textarea
                :placeholder="$t('components.modals.ReportIssueModal.enterCommentPlaceholder')"
                v-model="state.comment"
                helper-text="Helper Text"
                @ion-change="checkForInputs"
              ></ion-textarea>
            </ion-col>
          </ion-row>
        </ion-content>
        <ion-footer>
          <ion-button
            expand="block"
            :disabled="!state.canSubmit"
            @click="handleSubmitIssue"
            >{{$t('components.modals.ReportIssueModal.submitIssueButton')}}</ion-button
          >
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonItem,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Device } from "@/types/index";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { publicAPI } from "@/axios";

const spacesStore = useSpacesStore();
const { devices } = storeToRefs(spacesStore);

const props = defineProps(["spaceId", "handleReportIssue"]);
const state = reactive({
  title: "",
  comment: "",
  deviceId: "0",
  canSubmit: false,
});

const otherDevice: Device = {
  id: '0',
  name: 'Other'
};

const allDevices = computed(() => {
  return [...devices.value, otherDevice];
});

const checkForInputs = () => {
  return state.title.length > 0 &&
    state.comment.length > 0 &&
    (state.deviceId.length > 0 && state.deviceId != null)
    ? (state.canSubmit = true)
    : (state.canSubmit = false);
};

const handleSubmitIssue = () => {
  const loadId = loadingService.show("Loading...");
  publicAPI
    .post(`/Issue/CreateIssue/${props.spaceId}`, {
      title: state.title,
      comment: state.comment,
      deviceId: state.deviceId,
    })
    .then(() => {
      props.handleReportIssue();
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

onMounted(async () => {
  await spacesStore.getSpaceDevices(props.spaceId);
});
</script>

<style scoped>
ion-item::part(native) {
  padding-left: 0px;
}
.modal-panel {
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 25px;
}
.modal-panel__title {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
}

.modal-panel__heading {
  margin-bottom: 5px;
}

.modal-panel__add-comment__textarea {
  appearance: none;
  resize: none;
  background: none;
  border: 0.75px solid #313131;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  min-height: 100px;
  color: var(--av-light-gray);
  font-size: 12px;
  line-height: 16px;
}

.modal-panel__select-equipment__select {
  appearance: none;
  background: none;
  border: 0.75px solid #313131;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  color: var(--av-light-gray);
  font-size: 12px;
  line-height: 16px;
}

.modal-panel__status {
  display: flex;
  justify-content: space-between;
}

.modal-panel__status__radio input {
  appearance: none;
}

.modal-panel__status__radio label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 26px;
  border: 0.75px solid #313131;
  border-radius: 100px;
  padding: 4px;
  font-family: "Akkurat-Mono";
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.015em;
  color: #313131;
}

.modal-panel__status__radio label .dot {
  margin-right: 4px;
}

.issues-panel__status__radio input:checked ~ label {
  border: 0.75px solid #ffffff;
  color: #ffffff;
}

.modal-panel__log__heading {
  padding-bottom: 8px;
  border-bottom: 0.75px solid #313131;
  margin-bottom: 18px;
}

.modal-panel__log__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.modal-panel__log__list__item {
  margin-bottom: 20px;
}

.modal-panel__log__list__item p:last-of-type {
  margin-left: 6px;
}

.form-admin--group_field {
  padding-right: 0;
  margin-bottom: 20px;
}
</style>
