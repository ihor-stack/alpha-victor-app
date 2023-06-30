<template>
  <ion-page class="ion-bg" id="admin">
    <ion-grid class="ion-no-padding">
      <ion-row class="ion-no-padding">
        <ion-col class="fixed-sidebar ion-padding">
          <desktop-nav />
        </ion-col>
        <ion-col>
          <ion-content>
            <div class="av-locations-layout">
              <div class="av-sidebar ion-padding">
                <div class="av-sidebar-cont">
                  <ion-button
                    class="ion-no-padding"
                    fill="clear"
                    color="dark"
                    @click="() => router.back()"
                  >
                    <span class="font-mono font-size-xs">&lt;&lt; back</span>
                  </ion-button>
                  <AdminLocationsNav />
                </div>
              </div>
              <div class="container ion-padding position-relative">
                <router-view />
              </div>
            </div>
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { reactive, watch } from "vue";
import DesktopNav from "@/components/shared/DesktopNav";
import AdminLocationsNav from "@/components/shared/AdminLocationsNav";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<style scoped>
ion-grid {
  width: 100%;
}

ion-row {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

ion-button {
  margin: 20px 0;
}

.av-locations-layout {
  display: flex;
}

.av-sidebar {
  background: var(--av-darkest-gray);
  color: #fff;
  width: 260px;
  min-height: 100vh;
  height: 100%;
  display: block;
  position: sticky;
  top: 0;
}
.av-sidebar-cont {
  width: 200px;
}

.fixed-sidebar {
  width: 30%;
  max-width: 270px;
}
</style>
