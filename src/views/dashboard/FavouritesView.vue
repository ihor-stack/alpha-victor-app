<template>
  <ion-page id="favourites">
    <app-header title="Favourites">
      <template #start>
        <ion-button fill="clear" color="light" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear">
          <img src="@/theme/icons/nav-menu.svg" class="nav-menu" alt="Nav Menu Button" />
        </ion-menu-button>
      </template>
    </app-header>
    <ion-content>
      <ul class="favourites-list">
        <li v-for="favourite in spaces" :key="favourite.shortCode">
          <router-link to="/space" class="favourite">
            <div class="favourite__image">
              <img src="@/theme/img/space-the-henderson-square.png" />
            </div>
            <div class="favourite__info">
              <div class="favourite__info__top">
                <h6 class="category color-dark-gray">
                  {{ favourite.spaceType }}
                </h6>
              </div>
              <div class="favourite__info__bottom">
                <h5 class="name font-bold color-light-gray">
                  {{ favourite.spaceName }}
                </h5>
              </div>
            </div>
          
            <div class="favourite-cta">
              <ion-button fill="clear" size="small" class="favourite-button">
                <img src="@/theme/icons/favourited.svg" class="nav-menu" alt="Nav Menu Button" />
              </ion-button>
            </div>
          </router-link>
        </li>
      </ul>
    </ion-content>
    <ion-footer class="ion-padding">
      <ion-button expand="block">Explore Spaces</ion-button>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent, IonButton, IonMenuButton, IonFooter } from "@ionic/vue";
  import AppHeader from "@/components/shared/AppHeader.vue";
  import { Space } from "@/types";
  import { useRouter } from "vue-router";
  const router = useRouter();

  const spaces: Space[] = [
    {
      shortCode: 1,
      spaceType: 'Conference Room',
      spaceName: 'The Johnson',
      occupied: true,
      capacity: 10,
      imageUrl: 'space-the-johnson.jpg',
      spaceFeatures: [],
      issues: []
    },
    {
      shortCode: 2,
      spaceType: 'Conference Room',
      spaceName: 'The Henderson',
      occupied: false,
      capacity: 10,
      imageUrl: 'space-the-henderson.jpg',
      spaceFeatures: [],
      issues: []
    },
    {
      shortCode: 3,
      spaceType: 'Meeting Room',
      spaceName: 'The Red Room',
      occupied: true,
      capacity: 8,
      imageUrl: 'space-the-red-room.jpg',
      spaceFeatures: [],
      issues: []
    },
    {
    shortCode: 3,
    spaceType: 'Meeting Room',
    spaceName: 'The Red Room',
    occupied: true,
    capacity: 8,
    imageUrl: 'space-the-red-room.jpg',
    spaceFeatures: [],
    issues: []
    }
  ]
</script>

<style scoped>
.favourites-list {
  list-style-type: none;
  margin: 0;
  padding: 20px 30px;
}
.favourite {
  height: 80px;
  width: 100%;
  margin-bottom: 32px;
  background: #181818;
  border: 0.75px solid #313131;
  border-radius: 4px;
  display: flex;
}
.favourite__image {
  width: 80px;
  height: 80px;
}
.favourite__image img {
  display: inline-block;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
.favourite__info {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.favourite__info .name {
  font-size: 18px;
  margin-left: 10px;
}

.favourite__info .category {
  font-size: 10px;
  margin-bottom: 4px;
}
</style>