<template>
  <div>
    <swiper :slidesPerView="'auto'" :spaceBetween="10" class="space-features">
      <swiper-slide v-for="feature in features" :key="feature.name">
        <router-link :to="{}">
          <div class="feature">
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
import { useEquipmentIcon } from "@/composables/utilities";

interface Props {
  features: SpaceFeature[]
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
</style>