<template>
  <div>
    <swiper :slidesPerView="'auto'" :spaceBetween="10" class="space-features">
      <swiper-slide v-for="feature in selectedFeatures" :key="feature.name">
        <ion-item class="ion-no-padding" lines="none" :detail="false">
          <div class="space-equipment-menu__item__icon">
            <ion-icon :src="`/img/icons/${feature.icon}.svg`" />
          </div>
          <ion-label text-wrap="true" class="font-size-xs font-bold">
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
import { computed } from "vue";

interface Props {
  features: SpaceFeature[];
}

const props = defineProps<Props>();

const selectedFeatures = computed(() =>
  props.features ? props.features.filter((feature) => feature.selected) : []
);
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

.space-equipment-menu__item__icon {
  margin: 0 10px;
}

ion-item {
  --min-height: 37px;
}
</style>
