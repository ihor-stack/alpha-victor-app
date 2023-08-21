<template>
  <div class="dashboard-slider-container">
    <div class="dashboard-slider">
      <div class="dashboard-slider-header">
        <h2 class="title font-bold font-size-sm">
          {{ title }}
        </h2>
        <ion-button
          v-if="props.ctaUrl"
          fill="clear"
          size="small"
          color="dark"
          @click="handleCta"
          ><span class="font-mono font-size-xxs text-spaced"
            >{{ $t('components.dashboard.dashboardSlider.viewAllSpan') }}</span
          ></ion-button
        >
      </div>
      <div class="slider">
        <div class="swiper-container">
          <div>
            <swiper
              :slidesPerView="'auto'"
              :spaceBetween="20"
              :pagination="{
                clickable: true,
                el: 'div.swiper-bullets',
                type: 'bullets',
              }"
              :modules="[Pagination]"
              class="mySwiper"
            >
              <swiper-slide v-for="slide in slides" :key="slide.shortCode">
                <router-link :to="`/space/` + slide.id">
                  <space-card :space="slide" />
                </router-link>
              </swiper-slide>
              <div class="swiper-bullets"></div>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { IonButton } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Space } from "@/types";
import SpaceCard from "@/components/dashboard/SpaceCard.vue";

const router = useRouter();

interface Props {
  title: string;
  ctaUrl?: string | undefined;
  slides: Space[];
}

const props = defineProps<Props>();

const handleCta = () => {
  if (props.ctaUrl) {
    router.push({ path: props.ctaUrl });
  }
};
</script>

<style scoped>
.dashboard-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 22px 12px;
}

.dashboard-slider-header ion-button {
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
}

.swiper-container {
  padding: 0 0 0 20px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 260px;
  position: relative;
  overflow: hidden;
}

.swiper-slide__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.swiper-slide__image__gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
.swiper-slide__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide__info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  padding: 0 10px 12px;
}

.swiper-slide__info__top,
.swiper-slide__info__bottom {
  display: flex;
  justify-content: space-between;
}

.swiper-slide__info .name {
  margin-left: 10px;
  padding-right: 30px;
  word-break: break-all;
}

.swiper-slide__info .category {
  font-size: 10px;
  margin-bottom: 4px;
}

.swiper-slide__info .capacity {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.swiper-slide__info .capacity-icon {
  margin-right: 4px;
}

.swiper-bullets {
  margin-top: 10px;
}
</style>
