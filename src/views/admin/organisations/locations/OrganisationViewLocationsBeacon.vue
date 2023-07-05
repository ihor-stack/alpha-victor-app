<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Beacon</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12">
          <ion-label>Current Minor</ion-label>
          <ion-label v-if="Space.beacon.beaconId">{{ Space.beacon.minor  }}</ion-label>
          <ion-label>Current Major</ion-label>
          <ion-label v-if="Space.beacon.beaconId">{{ Space.beacon.major  }}</ion-label>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Selected beacon</ion-label>
          <ion-select
                    interface="action-sheet"
                    placeholder="Select manufacturer"
                    :value="state.selectedBeacon"
                    @ion-change="(e) => state.selectedBeacon = e.target.value"
                  >
                    <ion-select-option
                      v-for="(option, idx) in state.availableBeacons"
                      :key="idx"
                      :value="idx"
                    >
                      {{ option.minor }} {{ option.major  }}
                    </ion-select-option>
          </ion-select>
        </ion-col>
        <ion-col size-xs="12">
          <ion-button
            class="button-wide"
            @click="saveSelectedBeacon()"
          >
            Update selected beacon
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
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import {
  SpaceBeaconAvailableResponse,
} from "@/types/index";
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
  selectedBeacon?: number
}

const state: State = reactive({
  observedBeacons: [],
  availableBeacons: [],
  selectedBeacon: undefined
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
          Space.getSpaceDetailsBeaconAvailable(spaceId, b.minor, b.major).then(r => {

            if (!r) return; 

            if (!r.available) return;

            state.availableBeacons.push(r);

          });
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

const saveSelectedBeacon = async () => {

  const selectionIdx = state.selectedBeacon ?? -1;

  const selectedBeaconModel = state.availableBeacons[selectionIdx];

  if (!selectedBeaconModel) return;

  Space.editSpaceDetailsBeacon(spaceId, selectedBeaconModel.minor, selectedBeaconModel.major);

}

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
