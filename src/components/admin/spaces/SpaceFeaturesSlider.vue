<template>
  <div>
    <swiper :slidesPerView="'auto'" :spaceBetween="10" class="space-features">
      <swiper-slide v-for="feature in features" :key="feature.id">
        <div
          class="feature"
          :class="{
            'selected-feature': feature.selected,
          }"
          @click="updateFeatureValue($event, feature)"
        >
          <div class="check-icon-wrapper" v-if="feature.selected">
            <ion-icon :icon="checkmark" :size="24" />
          </div>
          <p class="font-size-xxs font-bold color-light-gray">
            {{ feature.name }}
          </p>
          <ion-icon
            :icon="close"
            :size="10"
            color="light"
            class="close"
            v-if="feature.selected"
            @click="updateFeatureValue($event, feature)"
          ></ion-icon>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonIcon } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRoute } from "vue-router";
import "swiper/css";
import { checkmark, close } from "ionicons/icons";
import { SpaceFeature } from "@/types";
import { Spaces } from "@/stores/adminSpaces";

const SpaceStore = Spaces();
const route = useRoute();

const spaceId = route.params.spaceId as string;

interface Props {
  features: SpaceFeature[];
}
defineProps<Props>();

const updateFeatureValue = (event: MouseEvent, feature: SpaceFeature) => {
  event.stopPropagation();
  SpaceStore.updateSpaceFeature(
    `spaceFeatureId=${
      feature.id
    }&spaceId=${spaceId}&enabled=${!feature.selected}`,
    spaceId
  );
};
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
  position: relative;
  overflow: hidden;
}

.feature {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  background: #181818;
  border-radius: 4px;
  border: 0.75px solid #313131;
  cursor: pointer;
}

.selected-feature {
  background: rgba(55, 177, 76, 0.2);
  border-color: #37b14c;
}

.close {
  margin-left: 14px;
  display: block;
}

.check-icon-wrapper {
  width: 24px;
  height: 24px;
  background: rgba(55, 177, 76, 0.5);
  border-radius: 50%;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-icon-wrapper ion-icon {
  color: #ffffff;
  --ionicon-stroke-width: 60px;
}
</style>
