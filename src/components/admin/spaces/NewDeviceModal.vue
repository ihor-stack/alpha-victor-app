<template>
  <div>
    <ion-button class="button-wide" @click="modalOpen = true">
      {{$t('components.admin.spaces.newDeviceModal.addNewDeviceButton')}}
    </ion-button>
    <ion-modal
      :is-open="modalOpen"
      @willDismiss="handleDismiss"
      class="auto-height"
    >
      <ion-page>
        <div class="modal-panel">
          <div class="modal-panel-container">
            <ion-header>
              <ion-icon
                :icon="close"
                size="small"
                class="close-button"
                @click="modalOpen = false"
              />
              <div class="modal-panel__header">
                <h1
                  class="modal-panel__title color-light-gray font-bold font-size-lg"
                >
                {{$t('components.admin.spaces.newDeviceModal.addNewDeviceHeader')}}
                </h1>
              </div>
            </ion-header>
            <div class="form-admin">
              <ion-row class="form-admin--group">
                <ion-col size-xs="12" class="form-admin--group_field">
                  <AdminSelect
                    label="Equipment"
                    v-model="selectedEquipment"
                    :options="equipmentList"
                    idPrefix="equipment-select"
                    :isSearchable="true"
                  />
                </ion-col>
              </ion-row>
              <ion-row class="form-admin--group">
                <ion-col size-xs="12" size-md="6" class="form-admin--group_field">
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.nameLabel')}}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    :value="newDevice.name"
                    @ion-input="newDevice.name = String($event.target.value)"
                  ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-md="6" class="form-admin--group_field">
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.serialNumberLabel')}}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    :value="newDevice.serialNumber"
                    @ion-input="
                      newDevice.serialNumber = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>
              </ion-row>

              <ion-row class="form-admin--group">
                <ion-col size-xs="12" size-md="6" class="form-admin--group_field">
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.macAddressLabel')}}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    :value="newDevice.macAddress"
                    @ion-input="
                      newDevice.macAddress = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-md="6" class="form-admin--group_field">
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.installerLabel')}}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    :value="newDevice.installer"
                    @ion-input="
                      newDevice.installer = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>
              </ion-row>

              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.installDateLabel')}}</ion-label>
                  <div class="custom-input date-wrapper">
                    <ion-datetime-button
                      datetime="newDocInstallDate"
                    ></ion-datetime-button>
                  </div>
                  <ion-modal :keep-contents-mounted="true">
                    <ion-datetime
                      id="newDocInstallDate"
                      presentation="date"
                      display-format="DD/MM/YYYY HH:mm:ss"
                      picker-format="DD MMM YYYY HH:mm:ss"
                      :value="newDevice.installDate"
                      show-default-buttons
                      @ion-change="
                        (e) => {
                          newDevice.installDate = String(e.target.value);
                        }
                      "
                    />
                  </ion-modal>
                </ion-col>
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.warrantyExpiryDateLabel')}}</ion-label>
                  <div class="custom-input date-wrapper">
                    <ion-datetime-button
                      datetime="newDocWarrantyDate"
                    ></ion-datetime-button>
                  </div>
                  <ion-modal :keep-contents-mounted="true">
                    <ion-datetime
                      id="newDocWarrantyDate"
                      presentation="date"
                      display-format="DD/MM/YYYY HH:mm:ss"
                      picker-format="DD MMM YYYY HH:mm:ss"
                      max="2099-10-31"
                      :value="newDevice.warrantyExpiryDate"
                      :show-default-buttons="true"
                      @ion-change="
                        (e) => {
                          newDevice.warrantyExpiryDate = String(e.target.value);
                        }
                      "
                    />
                  </ion-modal>
                </ion-col>
              </ion-row>

              <ion-row class="form-admin--group">
                <ion-col size-xs="12" class="form-admin--group_field">
                  <ion-label>{{$t('components.admin.spaces.newDeviceModal.descriptionLabel')}}</ion-label>
                  <ion-textarea
                    class="font-size-sm"
                    fill="solid"
                    :value="newDevice.description"
                    @ion-input="
                      newDevice.description = String($event.target.value)
                    "
                  ></ion-textarea>
                </ion-col>
                <ion-col size-xs="12" class="ion-no-padding">
                  <ion-button
                    class="font-size-sm"
                    :disabled="
                      !newDevice.name || !selectedEquipment.additionalInfo
                    "
                    @click="saveNewDevice()"
                  >
                    {{$t('components.admin.spaces.newDeviceModal.addNewDeviceButton')}}
                  </ion-button>
                </ion-col>
              </ion-row>
            </div>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed, watch } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonRow,
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
  IonCol,
  IonLabel,
  IonTextarea,
  IonDatetime,
  IonDatetimeButton,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { Spaces } from "@/stores/adminSpaces";
import { Device, SelectItem } from "@/types";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Equipment as useEquipment } from "@/stores/adminEquipment";

const EquipmentStore = useEquipment();
const route = useRoute();

const spaceId = route.params.spaceId as string;
const { equipmentDropdownList } = storeToRefs(EquipmentStore);

const Space = Spaces();
const newDevice = ref({
  description: "",
  installDate: "",
  installer: "",
  macAddress: "",
  name: "",
  serialNumber: "",
  warrantyExpiryDate: "",
} as Device);
const selectedEquipment = ref({} as SelectItem);

const modalOpen = ref(false);
const equipmentList = computed(() =>
  equipmentDropdownList.value?.map((item, index) => {
    const selectItem: SelectItem = {
      id: index,
      additionalInfo: item.id,
      title: item.manufactureName + " " + item.name + " " + item.assetType,
    };
    return selectItem;
  })
);

const handleDismiss = () => {
  modalOpen.value = false;
  newDevice.value = {
    description: "",
    installDate: "",
    installer: "",
    macAddress: "",
    name: "",
    serialNumber: "",
    warrantyExpiryDate: "",
  } as Device;
};

const saveNewDevice = () => {
  Space.saveSpacesDevices(spaceId, {
    ...newDevice.value,
    installDate:
      newDevice.value.installDate && newDevice.value.installDate?.length > 0
        ? newDevice.value.installDate
        : new Date().toISOString(),
    warrantyExpiryDate:
      newDevice.value.warrantyExpiryDate &&
      newDevice.value.warrantyExpiryDate?.length > 0
        ? newDevice.value.warrantyExpiryDate
        : new Date().toISOString(),
    equipmentId: selectedEquipment.value.additionalInfo,
  });
};

watch(selectedEquipment, (newVal) => {
  const parts = newVal.title.split(" ");
  newDevice.value.name = parts[0] + " " + parts[2];
});

onBeforeMount(() => {
  if (equipmentDropdownList.value?.length < 1) {
    EquipmentStore.getEquipmentDropdownList();
  }
});
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
.date-wrapper {
  padding: 9px;
  margin-top: 5px;
  border-radius: 5px;
  margin-bottom: 0;
}

.date-wrapper ion-datetime-button {
  width: fit-content;
}
.date-wrapper ion-datetime-button::part(native) {
  background: transparent;
  padding-left: 0;
  width: 100%;
}
</style>
