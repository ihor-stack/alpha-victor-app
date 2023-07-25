<template>
  <ion-grid class="form-admin ion-no-padding">
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.locations.beacon.title") }}
    </h1>
    <ion-row class="form-admin--group">
      <ion-col size-xs="6" v-if="Space.beacon.beaconId">
        <ion-label>{{
          $t("pages.admin.organisations.view.locations.beacon.minorLabel")
        }}: </ion-label>
        <ion-label>{{
          Space.beacon.minor
        }}</ion-label>
      </ion-col>

      <ion-col size-xs="6" v-if="Space.beacon.beaconId">
        <ion-label>{{
          $t("pages.admin.organisations.view.locations.beacon.majorLabel")
        }}: </ion-label>
        <ion-label>{{
          Space.beacon.major
        }}</ion-label>
      </ion-col>
    </ion-row>

    <ion-row class="form-admin--group">
      <ion-col size-xs="12" class="form-admin--group_field" v-if="!Space.beacon.beaconId">
        <ion-select
          interface="action-sheet"
          :placeholder="
            $t('pages.admin.organisations.view.locations.beacon.placeholder')
          "
          :value="state.selectedBeacon"
          @ionChange="onBeaconSelected"
        >
          <ion-select-option
            v-for="(option, idx) in state.availableBeacons"
            :key="idx"
            :value="idx"
          >
            Beacon: {{ option.minor }} min / {{ option.major }} maj
          </ion-select-option>
        </ion-select>
      </ion-col>
      <ion-col size-xs="12" class="button-pair">
        <!-- <ion-button class="button-wide" @click="saveSelectedBeacon()">
          {{
            $t("pages.admin.organisations.view.locations.beacon.updateBtn")
          }}
        </ion-button> -->
        <ion-button class="button-wide button-red button-outline" fill="outline" @click="removeSelectedBeacon()" v-if="Space.beacon.beaconId">
          {{
            $t("pages.admin.organisations.view.locations.beacon.removeBtn")
          }}
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { SpaceBeaconAvailableResponse } from "@/types/index";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { onBeforeMount, onBeforeUnmount, reactive, ref } from "vue";
import { Beacon, IBeacon } from "@ionic-native/ibeacon";
import { Capacitor } from "@capacitor/core";
import { useRoute } from "vue-router";
import toastService from "@/services/toastService";

const route = useRoute();
const spaceId = route.params.spaceId as string;

const Space = Spaces();
const major = ref("");
const minor = ref("");
const { beacon } = storeToRefs(Space);

interface State {
  observedBeacons: Beacon[];
  availableBeacons: SpaceBeaconAvailableResponse[];
  selectedBeacon?: number;
}

const state: State = reactive({
  observedBeacons: [],
  availableBeacons: [],
  selectedBeacon: undefined,
});

let beaconRegion: any = null;

const startRangingBeacons = async () => {
  await IBeacon.requestAlwaysAuthorization();
  const delegate = IBeacon.Delegate();

  delegate.didRangeBeaconsInRegion().subscribe((data) => {
    if (data.beacons.length > 0) {
      data.beacons.forEach((b) => {
        if (
          state.observedBeacons.filter(
            (ob) => ob.minor == b.minor && ob.major == b.major
          ).length == 0
        ) {
          state.observedBeacons.push(b);
          Space.getSpaceDetailsBeaconAvailable(spaceId, b.minor, b.major).then(
            (r) => {
              if (!r) return;

              if (!r.available) return;

              state.availableBeacons.push(r);
            }
          );
        }
      });
    }
  });

  // TODO: Assuming for now we'll always be using the one Beacon with the same UUID. Extracted when originally testing.
  beaconRegion = IBeacon.BeaconRegion(
    "spaceBeacon",
    "f7826da6-4fa2-4e98-8024-bc5b71e0893e"
  );

  await IBeacon.startRangingBeaconsInRegion(beaconRegion);
};

const onBeaconSelected = (e: CustomEvent) => {
  const selectedValue = e.detail.value;
  if (selectedValue !== undefined) {
    state.selectedBeacon = Number(selectedValue);
    saveSelectedBeacon(); // Call the saveSelectedBeacon method when an item is selected
  }
};

const saveSelectedBeacon = async () => {
  const selectionIdx = state.selectedBeacon ?? -1;

  const selectedBeaconModel = state.availableBeacons[selectionIdx];

  if (!selectedBeaconModel) return;

  Space.editSpaceDetailsBeacon(
    spaceId,
    selectedBeaconModel.minor,
    selectedBeaconModel.major
  );
};

const removeSelectedBeacon = async () => {
  Space.unlinkSpaceBeacon(spaceId);
};

onBeforeMount(() => {
  Space.getSpaceDetailsBeacon(spaceId);

  if (Capacitor.getPlatform() !== "web") {
    startRangingBeacons();
  }
});

onBeforeUnmount(() => {
  if (beaconRegion !== null) {
    IBeacon.stopRangingBeaconsInRegion(beaconRegion);
  }

  state.observedBeacons.splice(0, state.observedBeacons.length);
});
</script>
