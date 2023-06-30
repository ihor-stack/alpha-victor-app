<template>
  <div>
    <swiper :slidesPerView="'auto'" :spaceBetween="10" class="space-features">
      <swiper-slide v-for="feature in features" :key="feature.name">
        <ion-item lines="none" :detail="false">
          <div class="space-equipment-menu__item__icon">
            <img :src="useEquipmentIcon(feature.icon || '')" />
          </div>
          <ion-label class="font-size-xxs font-bold">
            {{ feature.name }}
          </ion-label>
        </ion-item>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { IonLabel, IonItem } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { SpaceFeature } from "@/types";
import { useEquipmentIcon } from "@/composables/utilities";

interface Props {
  features: SpaceFeature[];
}

defineProps<Props>();
</script>

<style scoped>
.space-features {
  margin: 20px 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: auto;
  height: 37px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: var(--ion-color-light);
  border: 0.75px solid #313131;
}

ion-item {
  --min-height: 37px;
}
</style>
