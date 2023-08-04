<template>
  <ion-page>
    <div class="modal-panel">
      <div class="modal-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-bold font-size-md">
                {{ state.issue.title }}
              </h2>
              <p class="font-size-sm">
                {{ state.issue.description }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-row class="form-admin--group" v-if="!isGuestUser">
            <ion-col size-xs="12" class="form-admin--group_field">
              <ion-label text-wrap="true" class="font-size-xs font-bold">
                {{$t('components.modals.issuesModal.addCommentLabel')}}
              </ion-label> 
              <ion-textarea
                class="font-size-xs"
                :placeholder="$t('components.modals.issuesModal.addCommentPlaceholder')"
                v-model="state.comment"
              ></ion-textarea>
            </ion-col>
            <ion-col>
              <ion-button
                expand="block"
                :disabled="state.comment?.length < 1"
                @click="handleAddComment"
                >{{$t('components.modals.issuesModal.addCommentLabel')}}</ion-button
              >
            </ion-col>
          </ion-row>

          <div
            class="modal-panel__section modal-panel__set-status"
            v-if="false"
          >
            <h2 class="font-size-xs font-bold modal-panel__heading">
              {{ $t('components.modals.issuesModal.selectStatusHeader') }}
            </h2>
            <div class="modal-panel__status">
              <div class="modal-panel__status__radio">
                <input
                  type="radio"
                  name="status"
                  id="low-impact"
                  :value="0"
                  v-model="state.issue.status"
                  @change="handleChangeStatus(0)"
                />
                <label
                  for="low-impact"
                  class="modal-panel__status__radio__label"
                >
                  <span class="dot dot--low-impact"></span>
                  {{$t('components.modals.issuesModal.lowImpactLabel')}}
                </label>
              </div>
              <div class="modal-panel__status__radio">
                <input
                  type="radio"
                  name="status"
                  id="high-impact"
                  :value="1"
                  v-model="state.issue.status"
                  @change="handleChangeStatus(1)"
                />
                <label
                  for="high-impact"
                  class="modal-panel__status__radio__label"
                >
                  <span class="dot dot--high-impact"></span>
                  {{$t('components.modals.issuesModal.highImpactLabel')}}
                </label>
              </div>
              <div class="modal-panel__status__radio">
                <input
                  type="radio"
                  name="status"
                  id="resolved"
                  :value="2"
                  v-model="state.issue.status"
                  @change="handleChangeStatus(2)"
                />
                <label for="resolved" class="modal-panel__status__radio__label">
                  <span class="dot dot--resolved"></span>
                  {{ $t('components.modals.issuesModal.statusHeader') }}
                </label>
              </div>
            </div>
          </div>

          <div class="modal-panel__log">
            <h3 class="modal-panel__log__heading font-mono font-size-xxs">
              {{ $t('components.modals.issuesModal.statusHeader') }}
            </h3>

            <ul class="modal-panel__log__list">
              <li
                class="modal-panel__log__list__item"
                v-for="(log, index) in state.issue.actionHistory"
                :key="index"
              >
                <p
                  class="modal-panel__log__list__item__text font-size-xs font-regular"
                >
                  {{ log.comment }}
                </p>
                <p
                  class="modal-panel__log__list__item__logged color-dark-gray font-mono font-size-xxs"
                >
                  {{ getAgoTime(log.updated) }}
                </p>
              </li>
            </ul>
          </div>
        </ion-content>
        <ion-footer> </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, computed } from "vue";
import moment from "moment";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonTextarea,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { publicAPI } from "@/axios";
import { Issue } from "@/types";
import { Account as useAccountStore } from "@/stores/publicAccount";

interface State {
  issue: Issue;
  comment: string;
}

const props = defineProps(["issueId", "spaceId"]);
const state: State = reactive({
  issue: {} as Issue,
  comment: "",
});

const accountStore = useAccountStore();

const isGuestUser = computed(() => accountStore.userPermission.isGuest);

const getAgoTime = (date: string) => {
  return moment(date).fromNow();
};

const handleAddComment = () => {
  const loadId = loadingService.show("Loading...");
  publicAPI
    .post(`/Issue/AddIssueComment/${props.issueId}`, {
      comment: state.comment,
    })
    .then(() => {
      state.comment = "";
      getIssueDetails();
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

const handleChangeStatus = (status: number) => {
  const loadId = loadingService.show("Loading...");
  publicAPI
    .post(`/Issue/ChangeIssueStatus/${props.issueId}`, {
      status,
    })
    .then(() => {
      getIssueDetails();
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

const getIssueDetails = () => {
  const loadId = loadingService.show("Loading...");
  publicAPI
    .get(`/Issue/${props.spaceId}/Issue/${props.issueId}`)
    .then((res) => {
      state.issue = res.data;
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};
onBeforeMount(() => {
  getIssueDetails();
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

.modal-panel__header {
  margin-bottom: 0;
}

.modal-panel__header p {
  margin-top: 10px;
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

.modal-panel__status__radio input:checked ~ label {
  border: 0.75px solid #ffffff;
  color: #ffffff;
}

.modal-panel__log {
  margin-top: 20px;
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
</style>
