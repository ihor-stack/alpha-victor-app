<template>
  <div class="dashboard-slider-container">
    <div class="dashboard-slider">
      <div class="dashboard-slider-header">
        <h2 class="title font-bold color-light-gray font-size-sm">{{ title }}</h2>
        <ion-button fill="clear" size="small" @click="handleCta"><span class="color-primary font-mono font-size-xs">>> view.all</span></ion-button>
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
                type: 'bullets'
              }"
              :modules="[Pagination]"
              class="mySwiper"
            >
              <swiper-slide 
                v-for="slide in slides" 
                :key="slide.id"
              >
                <p>{{  slide.name  }}</p>
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

  const router = useRouter();

  interface Props {
    title: string,
    ctaUrl: string,
    slides: Space[]
  }

  const props = defineProps<Props>();

  const handleCta = () => {
    router.push({ path: props.ctaUrl });
  }
</script>

<style scoped>
.dashboard-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 32px 12px;
}

.dashboard-slider-header ion-button {
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
}

.swiper-container {
  padding: 0 0 0 32px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide {
  width: 260px;
  height: 160px;
  border-radius: 8px;
}

.swiper-bullets {
  margin-top: 10px;
}
</style>