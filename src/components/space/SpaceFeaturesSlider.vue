<template>
  <div>
    <swiper
      :slidesPerView="'auto'"
      :spaceBetween="20"
      class="mySwiper"
    >
      <swiper-slide v-for="feature in features" :key="feature.name">
        <router-link :to="{ }">
          <div class="feature">
            <div class="feature-icon">
              <img :src="featureIcon(feature.category)" />
            </div>
            <p class="font-size-xxs font-bold color-light-gray">{{ feature.name }}</p>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { SpaceFeature } from "@/types";

interface Props {
  features: SpaceFeature[]
}

defineProps<Props>();

function featureIcon(feature: string) {
  switch(feature) {
    case 'screen':
      return require('@/theme/icons/smart-tv.svg');
    case 'wifi':
      return require('@/theme/icons/wifi.svg');
    case 'phone':
      return require('@/theme/icons/phone.svg');
    case 'presenting':
      return require('@/theme/icons/whiteboard.svg');
    default:
      return undefined;
  }
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 108px;
  height: 37px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: #181818;
  border: 0.75px solid #313131;
}

.feature {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
}

.feature-icon {
  width: 34px;
  height: 25px;
  background-image: url('@/theme/backgrounds/space-feature-background.svg');
  background-size: contain;
  background-position: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>