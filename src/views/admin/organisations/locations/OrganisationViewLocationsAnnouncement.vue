<template>
    <div>
        <h1 class="title-admin font-bold font-size-lg color-light-gray">Announcement</h1>
        <ion-grid class="form-admin">
            <ion-row class="form-admin--group">
                <ion-col size-xs="12" class="form-admin--group_field">
                    <ion-label color="light">Title</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    type="text"
                    :value="announcement.announcementTitle"
                    @ion-input="announcement.announcementTitle = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" class="form-admin--group_field">                
                    <ion-label color="light">Content</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    type="text"
                    :value="announcement.announcementContent"
                    @ion-input="announcement.announcementContent = String($event.target.value)"
                    ></ion-input>
                </ion-col>
            </ion-row>
            <ion-row class="form-admin--group">
                <ion-col size-xs="12" >
                    <ion-button 
                    class="button-wide"
                    @click="Space.editSpacesAnnouncement()">
                        Save announcement
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script setup lang="ts">
    import {
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
        IonLabel,
        IonItem
    } from "@ionic/vue";
    import { storeToRefs } from "pinia";
    import {Spaces} from '@/stores/adminSpaces'
    import { onBeforeMount, ref } from "vue"

    const Space = Spaces()
    const { announcement } = storeToRefs(Space);

    onBeforeMount(() => {
        Space.getSpaceDetailsAnnouncement()
    })
</script>