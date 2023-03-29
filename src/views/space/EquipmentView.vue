<template>
  <ion-page>
    <app-header title="Room Equipment">
      <template #start>
        <ion-button fill="clear" color="light" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <div class="space-equipment-container">
        <ul class="space-equipment-menu">
          <li v-for="item in roomEquipment" :key="item.id" class="space-equipment-menu__item"
            @click="handleClick(item)">
            <div class="space-equipment-menu__item__info">
              <div class="space-equipment-menu__item__icon">
                <img :src="useEquipmentIcon(item.category)" />
              </div>
              <div class="space-equipment-menu__item__name">
                <p class="label font-bold font-size-sm color-light-gray">
                  {{ item.name }}
                </p>
                <p v-if="item.technical?.manufacturer"
                  class="manufacturer font-mono font-size-xxs color-dark-gray text-lowercase">
                  {{ item.technical?.manufacturer }}
                </p>
              </div>
            </div>
            <span class="arrow-right"></span>
          </li>
        </ul>
      </div>
    </ion-content>
    <ion-modal :is-open="state.modalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismiss">
      <room-equipment-modal :selectedEquipment="state.selectedEquipment" />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonModal } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import RoomEquipmentModal from "@/components/modals/RoomEquipmentModal.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useEquipmentIcon } from "@/composables/utilities";
const router = useRouter();

interface State {
  modalOpen: boolean
  selectedEquipment: { [key: string]: any } | null
}

const state: State = reactive({
  modalOpen: false,
  selectedEquipment: null,
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const handleClick = (item: any) => {
  state.selectedEquipment = item;
  state.modalOpen = !state.modalOpen;
};

const roomEquipment = [
  {
    id: 1,
    name: "Screen",
    category: "screen",
    technical: {
      manufacturer: 'Samsung',
      model: 'NUC7iDNKE',
      serialNumber: '0122712118',
      warrantyExpiry: '08.12.2024',
      thingOne: '1',
      thingTwo: '1',
      thingThree: '1',
      thingFour: '1',
      thingFive: '1',
      thingSix: '1',
      thingSeven: '1',
      thingEight: '1',
      thingNine: '1',
      thingTen: '1',
      thingEleven: '1',
      thingTwelve: '1',
      thingThirteen: '1',
    },
    installation: {
      installer: 'Install Solutions Ltd',
      installDate: '08.12.2022',
    },
  },
  {
    id: 2,
    name: "Wireless presentation",
    category: "wifi",
    technical: {
      manufacturer: 'Barco',
      model: 'NUC7iDNKE',
      serialNumber: '0122712118',
      warrantyExpiry: '08.12.2024',
    },
    installation: {
      installer: 'Install Solutions Ltd',
      installDate: '08.12.2022',
    },
  },
  {
    id: 3,
    name: "Integrated Conference Phone",
    category: "phone",
    technical: {
      manufacturer: 'Nureva',
      model: 'NUC7iDNKE',
      serialNumber: '0122712118',
      warrantyExpiry: '08.12.2024',
    },
    installation: {
      installer: 'Install Solutions Ltd',
      installDate: '08.12.2022',
    },
  },
  {
    id: 4,
    name: "Small form factor PC",
    category: "computer",
    technical: {
      manufacturer: 'Samsung',
      model: 'NUC7iDNKE',
      serialNumber: '0122712118',
      warrantyExpiry: '08.12.2024',
    },
    installation: {
      installer: 'Install Solutions Ltd',
      installDate: '08.12.2022',
    }
  },
  {
    id: 5,
    name: "Camera",
    category: "camera",
    technical: {
      manufacturer: 'Huddly',
      model: 'NUC7iDNKE',
      serialNumber: '0122712118',
      warrantyExpiry: '08.12.2024',
    },
    installation: {
      installer: 'Install Solutions Ltd',
      installDate: '08.12.2022',
    },
  },
  {
    id: 6,
    name: "Media controller",
    category: "controller",
    technical: {
      manufacturer: 'Crestron',
      model: 'NUC7iDNKE',
      serialNumber: '0122712118',
      warrantyExpiry: '08.12.2024',
    },
    installation: {
      installer: 'Install Solutions Ltd',
      installDate: '08.12.2022',
    },
  }
];
</script>

<style scoped>
.space-equipment-container {
  padding: 0px 30px 20px;
}
.space-equipment-menu {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.space-equipment-menu__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
}
.space-equipment-menu__item:not(:first-of-type) {
  border-top: 0.75px solid #313131;
}
.space-equipment-menu__item__info {
  display: flex;
  align-items: center;
}
.space-equipment-menu__item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.space-equipment-menu__item__name {
  display: flex;
  align-items: center;
  position: relative;
}
.space-equipment-menu__item__name .manufacturer {
  position: absolute;
  top: 100%;
  margin-top: 8px;
  margin-left: 10px;
}
.space-equipment-menu__item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

ion-modal {
  --max-height: 80vh;
}
</style>
