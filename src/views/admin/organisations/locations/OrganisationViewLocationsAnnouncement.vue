<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.locations.announcement.title") }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group form-admin--group-full">
        <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
          <ion-label>{{
            $t(
              "pages.admin.organisations.view.locations.announcement.labelTitle"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            type="text"
            :value="announcement.title"
            @ion-input="
              announcement.title = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
      </ion-row>

      <ion-row class="form-admin--group form-admin--group-full">
        <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
          <ion-label>{{
            $t(
              "pages.admin.organisations.view.locations.announcement.labelContent"
            )
          }}</ion-label>
          <ion-textarea
            class="font-size-sm"
            type="text"
            :value="announcement.text"
            @ion-input="
              announcement.text = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-textarea>
        </ion-col>
      </ion-row>
      
      <ion-row class="form-admin--group form-admin--group-full">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t(
              "pages.admin.organisations.view.locations.announcement.labelStart"
            )
          }}</ion-label>

          <div class="custom-input date-wrapper">
            <ion-datetime-button datetime="from"></ion-datetime-button>
          </div>
          <ion-modal :keep-contents-mounted="true">
          <ion-datetime
              id="from"
              display-format="DD/MM/YYYY HH:mm:ss"
              picker-format="DD MMM YYYY HH:mm:ss"
              :value="announcement.from"
              @ionChange="setFromDate"
            ></ion-datetime>
          </ion-modal>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>{{
            $t(
              "pages.admin.organisations.view.locations.announcement.labelEnd"
            )
          }}</ion-label>

          <div class="custom-input date-wrapper">
            <ion-datetime-button datetime="to"></ion-datetime-button>
          </div>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime
                id="to"
                display-format="DD/MM/YYYY HH:mm:ss"
                picker-format="DD MMM YYYY HH:mm:ss"
                :value="announcement.to"
                @ionChange="setToDate"
              ></ion-datetime>
            </ion-modal>
        </ion-col>
      </ion-row>
      <ion-row class="form-admin--group">
        <ion-col size-xs="12">
          <ion-button class="button-wide" @click="submitAnnouncement()">
            {{
              $t(
                "pages.admin.organisations.view.locations.announcement.saveBtn"
              )
            }}
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonDatetimeButton,
  IonDatetime,
  IonButton,
  IonLabel,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const route = useRoute();

const Space = Spaces();
const { announcement } = storeToRefs(Space);
const spaceId = route.params.spaceId as string;

const submitAnnouncement = () => {
  Space.editSpacesAnnouncement(spaceId);
};

const modals = ref({ from: false, to: false });

const setFromDate = (e: CustomEvent) => {
  announcement.value.from = new Date(e.detail.value).toISOString();
  modals.value.from = false;
};

const setToDate = (e: CustomEvent) => {
  announcement.value.to = new Date(e.detail.value).toISOString();
  modals.value.to = false;
};

onBeforeMount(() => {
  Space.getSpaceDetailsAnnouncement(spaceId);
});
</script>

<style scoped>
.custom-input {
  margin-top: 5px;
}
.date-wrapper {
  padding: 12px;
}

.date-wrapper ion-datetime-button {
  width: fit-content;
}
.date-wrapper ion-datetime-button::part(native) {
  background: transparent;
}
</style>