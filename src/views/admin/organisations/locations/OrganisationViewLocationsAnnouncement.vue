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
            <ion-datetime-button datetime="start"></ion-datetime-button>
          </div>
          <ion-modal :keep-contents-mounted="true">
          <ion-datetime
              id="start"
              display-format="DD/MM/YYYY HH:mm:ss"
              picker-format="DD MMM YYYY HH:mm:ss"
              :value="announcement.start"
              @ion-change="
                (e) => {
                  announcement.start = String(e.target.value);
                }
              "
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
            <ion-datetime-button datetime="end"></ion-datetime-button>
          </div>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime
                id="end"
                display-format="DD/MM/YYYY HH:mm:ss"
                picker-format="DD MMM YYYY HH:mm:ss"
                :value="announcement.end"
                @ion-change="
                  (e) => {
                    announcement.end = String(e.target.value);
                  }
                "
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
  IonButton,
  IonLabel,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const route = useRoute();

const Space = Spaces();
const { announcement } = storeToRefs(Space);
const spaceId = route.params.spaceId as string;

const submitAnnouncement = () => {
  Space.editSpacesAnnouncement(spaceId);
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