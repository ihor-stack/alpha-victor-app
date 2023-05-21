<template>
  <ion-page class="ion-bg" id="admin">
    <ion-grid class="ion-no-padding">
      <ion-row class="ion-no-padding decission-tree-wrapper">
        <ion-col class="fixed-sidebar ion-padding">
          <desktop-nav />
        </ion-col>
        <ion-col>
          <ion-content>
            <ion-page>
              <ion-content :scroll-y="false" id="decisionTreeContent">
                <div id="pageContainer">
                  <div id="container" ref="container">
                    <div class="button-container left bg-white">
                      <button class="back-button" @click="cancel()">
                        &#60;&#60; back
                      </button>
                      <div class="divider"></div>
                      <h1 class="title">Teams Room Decision Tree</h1>
                    </div>
                    <div class="button-container right">
                      <button class="button-action bg-white">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7188 8L16.4688 5.25L13.7188 4L16.4688 2.75L17.7188 0L18.9688 2.75L21.7188 4L18.9688 5.25L17.7188 8ZM17.7188 22L16.4688 19.25L13.7188 18L16.4688 16.75L17.7188 14L18.9688 16.75L21.7188 18L18.9688 19.25L17.7188 22ZM7.71875 19L5.21875 13.5L-0.28125 11L5.21875 8.5L7.71875 3L10.2188 8.5L15.7188 11L10.2188 13.5L7.71875 19ZM7.71875 14.15L8.71875 12L10.8687 11L8.71875 10L7.71875 7.85L6.71875 10L4.56875 11L6.71875 12L7.71875 14.15Z"
                            fill="#0000FF"
                          />
                        </svg>
                        <span>Auto layout</span>
                      </button>
                      <button class="button-action bg-blue">
                        Save decision tree
                      </button>
                    </div>
                    <canvas ref="canvas" id="canvas"></canvas>
                  </div>
                </div>
              </ion-content>
            </ion-page>
            <ion-modal
              :is-open="modalOpen"
              :initial-breakpoint="0.75"
              :breakpoints="[0, 0, 0, 0]"
            >
              <onboarding-access-panel
                dotText="location.access"
                :ctaFunc="setOpen"
              >
                <template v-slot:image>
                  <img src="@/theme/img/onboarding-access-location.svg" />
                </template>
                <template v-slot:heading>
                  Enable <br />
                  location.
                </template>
                <template v-slot:info-text>
                  Please allow location access to allow us to see which room
                  you’re in.
                </template>
              </onboarding-access-panel>
            </ion-modal>
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-modal
      :is-open="destinationVisible"
      @didDismiss="destinationVisible = false"
      :showBackdrop="false"
    >
      <common-modal
        :title="
          editDestination.step === 1
            ? `Select ${editDestination.type}`
            : 'Edit destination'
        "
        :description="
          editDestination.step === 1
            ? `You can select an ${editDestination.type} to be presented via the list below.`
            : 'You can adjust the destination and outcomes via the form below.'
        "
        :handleDismiss="
          () => {
            destinationVisible = false;
          }
        "
      >
        <ion-content :scroll-y="false">
          <v-container v-if="editDestination.step === 1">
            <v-container v-if="editDestination.type === 'Article'">
              <ion-row>
                <ion-col size="12">
                  <input-with-icon
                    iconPosition="start"
                    color="light"
                    type="search"
                    placeholder="Search for an article"
                    v-model="searchTerm"
                    :icon="search"
                  ></input-with-icon>
                </ion-col>
              </ion-row>
              <ul>
                <li class="list-item">
                  <p
                    class="primaryText font-bold font-size-sm color-light-gray"
                  >
                    Teams Room
                  </p>
                  <div class="font-size-xs">
                    <span>>> select</span>
                  </div>
                </li>
                <li class="list-item">
                  <p
                    class="primaryText font-bold font-size-sm color-light-gray"
                  >
                    Board Room
                  </p>
                  <div class="font-size-xs">
                    <span>>> select</span>
                  </div>
                </li>
              </ul>
            </v-container>
            <ion-button
              class="ion-text-capitalize"
              fill="outline"
              expand="block"
              color="light"
              @click="destinationVisible = false"
            >
              Add new article +</ion-button
            >
            <ion-button
              class="ion-text-capitalize"
              expand="block"
              @click="destinationVisible = false"
            >
              Confirm Selection</ion-button
            >
          </v-container>
          <v-container v-else>
            <ion-row>
              <ion-col size="12" class="form-admin--group_field">
                <ion-label color="light">Question title</ion-label>
                <ion-input
                  color="light"
                  placeholder="Enter new question"
                ></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12" class="form-admin--group_field">
                <ion-label color="light">Outcome label</ion-label>
                <ion-input
                  color="light"
                  placeholder="Enter new outcome"
                ></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12" class="form-admin--group_field">
                <ion-label color="light">Outcome type</ion-label>
                <ion-select
                  interface="action-sheet"
                  placeholder="Select type"
                  v-model="editDestination.type"
                >
                  <ion-select-option value="Question"
                    >Question</ion-select-option
                  >
                  <ion-select-option value="Article">Article</ion-select-option>
                  <ion-select-option value="Video">Video</ion-select-option>
                  <ion-select-option Document="Video"
                    >Document</ion-select-option
                  >
                </ion-select>
              </ion-col>
            </ion-row>
            <ion-button
              class="ion-text-capitalize"
              expand="block"
              @click="editDestination.step = 1"
            >
              Next</ion-button
            >
          </v-container>
        </ion-content>
      </common-modal>
    </ion-modal>
  </ion-page>
</template>

<script>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { closeCircle, informationCircle, create, search } from "ionicons/icons";
import {
  isPlatform,
  onIonViewDidEnter,
  IonContent,
  IonPage,
  IonButton,
  IonModal,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";

import DesktopNav from "@/components/shared/DesktopNav.vue";
import InputWithIcon from "@/components/shared/InputWithIcon.vue";
import CommonModal from "@/components/modals/CommonModal.vue";

export default {
  components: {
    DesktopNav,
    IonContent,
    IonPage,
    IonButton,
    IonModal,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    InputWithIcon,
    CommonModal,
  },

  setup() {
    const destinationWidth = 200;
    const outcomeWidth = 150;
    const outcomeHeight = 20;
    const iconSize = 20;
    const cornerRadius = 0;
    const padding = 10;
    const toolbarWidth = destinationWidth + 36;
    const toolbarDelta = (toolbarWidth - 24) / 4;

    const canvas = ref();
    const container = ref();

    let dragStart;
    let dragDestination;
    let newOutcome;
    const destinations = [];
    const outcomes = [];
    let c;

    const editDestination = ref();
    const editOutcome = ref();

    const deletedDestinationIDs = [];
    const deletedOutcomeIDs = [];

    const destinationVisible = ref(false);
    const newDestinationVisible = ref(false);

    const outcomeVisible = ref(false);
    const infoVisible = ref(false);
    const searchTerm = ref("");
    const dirty = ref(false);
    const modalOpen = ref(false);

    const toolbar = new Image();
    const deleteIcon = new Image();
    const addIcon = new Image();
    const editIcon = new Image();
    const lockIcon = new Image();

    toolbar.src = "/img/admin/decission-toolbar-background.svg";
    deleteIcon.src = "/img/icons/trash.svg";
    addIcon.src = "/img/icons/add.svg";
    editIcon.src = "/img/icons/edit.svg";
    lockIcon.src = "/img/icons/lock.svg";

    const router = useRouter();

    const demoTree = JSON.parse(
      '{"id":"8Lr3DC4U8qOcd0Zx99Iz","title":"Demo document nodes","rootID":"RG6PGksvBHpHPLHb6WzZ","destinations":{"19d71652-19cd-4db6-a4d3-fcb4f6fa269c":{"id":"19d71652-19cd-4db6-a4d3-fcb4f6fa269c","email":"","outcomeIDs":[],"phone":"","y":500,"x":960,"title":"Data Sheet","locked":true,"destinationID":{"documentTypeID":"ipUoDtUfVDB5CzWJHEi6","description":"Data Sheet","url":"https://firebasestorage.googleapis.com/v0/b/alpha-victor-prod.appspot.com/o/Models%2FJAsQhmX7euh2RSMSUhi0%2FX80J_X81J_X85J_SERIES_DATA_SHEET_PAGES2.pdf?alt=media&token=bfcbec15-0481-46c4-8e78-a39d846d5c4b","path":"Models/JAsQhmX7euh2RSMSUhi0/X80J_X81J_X85J_SERIES_DATA_SHEET_PAGES2.pdf"},"type":"Document"},"RG6PGksvBHpHPLHb6WzZ":{"id":"RG6PGksvBHpHPLHb6WzZ","y":360,"phone":"","destinationID":null,"type":"Question","locked":false,"email":"","outcomeIDs":["e88fe69e-4298-4bcd-a407-210cee28216b","3edda60c-e888-4635-9b9f-0fbd7f78b97d"],"title":"How can I help? 50","x":660},"V1kp6fSwzGxrcway30NV":{"id":"V1kp6fSwzGxrcway30NV","x":220,"title":"How can I help?","phone":"","locked":false,"type":"Question","email":"","destinationID":null,"y":500,"outcomeIDs":["951a57b5-79fb-46b6-a4f7-2fac7d42e678","17e4b960-a518-4829-8068-64101e135aee","944419d5-e883-4193-a0e6-1bc700dff41c"]},"bcf2b0ad-279b-4191-b3b3-8d31f457feeb":{"id":"bcf2b0ad-279b-4191-b3b3-8d31f457feeb","phone":"","outcomeIDs":[],"email":"","x":960,"type":"Document","locked":true,"title":"Manual","y":240,"destinationID":{"documentTypeID":"ooA1Rvhuu2MdfmZXZEp9","path":"Models/JAsQhmX7euh2RSMSUhi0/FWD-65X80J.pdf","description":"Manual","url":"https://firebasestorage.googleapis.com/v0/b/alpha-victor-prod.appspot.com/o/Models%2FJAsQhmX7euh2RSMSUhi0%2FFWD-65X80J.pdf?alt=media&token=452822d1-2849-45de-8f86-fdc3ef878d34"}}},"outcomes":{"3edda60c-e888-4635-9b9f-0fbd7f78b97d":{"id":"3edda60c-e888-4635-9b9f-0fbd7f78b97d","childID":"19d71652-19cd-4db6-a4d3-fcb4f6fa269c","label":"Show data sheet","parentID":"RG6PGksvBHpHPLHb6WzZ"},"944419d5-e883-4193-a0e6-1bc700dff41c":{"id":"944419d5-e883-4193-a0e6-1bc700dff41c","parentID":"V1kp6fSwzGxrcway30NV","label":"Answer 1","childID":"19d71652-19cd-4db6-a4d3-fcb4f6fa269c"},"e88fe69e-4298-4bcd-a407-210cee28216b":{"id":"e88fe69e-4298-4bcd-a407-210cee28216b","parentID":"RG6PGksvBHpHPLHb6WzZ","label":"Show manual","childID":"bcf2b0ad-279b-4191-b3b3-8d31f457feeb"}},"destinationsLoaded":true,"outcomesLoaded":true,"loaded":true}'
    );

    const decisionTree = ref(demoTree);

    const model = ref();
    const manufacturer = ref();
    const assetType = ref();

    onIonViewDidEnter(() => {
      onResize();
    });

    function getLines(ctx, text, maxWidth) {
      const workingText = text || "";
      const words = workingText.split(" ");
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    }

    class Destination {
      constructor(
        id,
        title,
        type,
        x,
        y,
        outcomeIDs,
        destinationID,
        locked = false
      ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.x = x;
        this.y = y;
        this.outcomeIDs = outcomeIDs;
        this.hover = false;
        this.destinationID = destinationID;
        this.locked = locked;
      }

      get lines() {
        return getLines(c, this.title, destinationWidth - 2 * padding);
      }

      get lineHeight() {
        return 15;
      }

      get totalHeight() {
        return this.lines.length * this.lineHeight + 2 * padding;
      }

      get bottom() {
        return this.y + this.totalHeight;
      }

      get right() {
        return this.x + destinationWidth;
      }

      get center() {
        return {
          x: this.x + destinationWidth / 2,
          y: this.y + this.totalHeight / 2,
        };
      }

      get connectors() {
        const bottomCenter = {
          x: this.center.x,
          y: this.bottom,
        };
        const bottomLeft = {
          x: this.x,
          y: this.bottom,
        };
        const topCenter = {
          x: this.center.x,
          y: this.y,
        };
        const centerRight = {
          x: this.right,
          y: this.center.y,
        };
        const centerLeft = {
          x: this.x,
          y: this.center.y,
        };
        return {
          bottomCenter: bottomCenter,
          bottomLeft: bottomLeft,
          topCenter: topCenter,
          centerRight: centerRight,
          centerLeft: centerLeft,
        };
      }

      get height() {
        return this.lines.length * this.lineHeight + 2 * padding;
      }

      get toolbarHeight() {
        return this.height + 35;
      }

      get toolbarY() {
        return this.y - this.height - 46;
      }

      get iconY() {
        return this.toolbarY + this.toolbarHeight / 2 - iconSize / 2;
      }

      draw() {
        let color = "#0000FF";
        let contrast = "white";

        if (
          this.x > canvas.value.width ||
          this.x < -destinationWidth ||
          this.y < -this.totalHeight ||
          this.y > canvas.value.height
        )
          return;

        switch (this.type) {
          case "Question":
            color = "#0000FF";
            contrast = "white";
            break;
          case "Video":
            color = "#0000FF";
            contrast = "white";
            break;
          default:
            break;
        }

        drawBox(
          this.x,
          this.y,
          destinationWidth,
          this.lineHeight,
          this.lines,
          2,
          color,
          color,
          contrast,
          this.lineHeight
        );
        if (this.hover) {
          const toolbarX = this.x - 18;

          c.drawImage(
            toolbar,
            toolbarX,
            this.toolbarY,
            toolbarWidth,
            this.toolbarHeight
          );
          c.drawImage(
            addIcon,
            this.x - 6 + toolbarDelta * 0.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
          c.drawImage(
            editIcon,
            this.x - 6 + toolbarDelta * 1.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
          c.drawImage(
            lockIcon,
            this.x - 6 + toolbarDelta * 2.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
          c.drawImage(
            deleteIcon,
            this.x - 6 + toolbarDelta * 3.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
        }
      }

      checkSelected(x, y) {
        if (y > this.toolbarY && y < this.toolbarY + this.toolbarHeight) {
          if (
            x > this.x - 6 + toolbarDelta * 0.5 - iconSize / 2 &&
            x < this.x - 6 + toolbarDelta * 0.5 + iconSize / 2
          ) {
            return "add";
          }
          if (
            x > this.x - 6 + toolbarDelta * 1.5 - iconSize / 2 &&
            x < this.x - 6 + toolbarDelta * 1.5 + iconSize / 2
          ) {
            return "edit";
          }
          if (
            x > this.x - 6 + toolbarDelta * 2.5 - iconSize / 2 &&
            x < this.x - 6 + toolbarDelta * 2.5 + iconSize / 2
          ) {
            return "lock";
          }
          if (
            x > this.x - 6 + toolbarDelta * 3.5 - iconSize / 2 &&
            x < this.x - 6 + toolbarDelta * 3.5 + iconSize / 2
          ) {
            return "delete";
          }
        }
        if (x > this.x && x < this.right && y > this.y && y < this.bottom)
          return "click";
        if (
          this.hover &&
          x > this.x &&
          x < this.right &&
          y > this.toolbarY &&
          y < this.bottom
        )
          return "hover";
        return null;
      }

      static getByID(id) {
        return destinations.find((d) => d.id == id);
      }

      delete() {
        if (destinations.length == 1) {
          return;
        }

        const destinationIndex = destinations.findIndex((d) => d.id == this.id);
        destinations.splice(destinationIndex, 1);
        deletedDestinationIDs.push(this.id);

        const linkedOutcomes = outcomes.filter(
          (o) => o.child.id == this.id || o.parent.id == this.id
        );
        linkedOutcomes.forEach((outcome) => outcome.delete());
        renderChart();
      }
    }

    class Outcome {
      constructor(id, parent, label, child, x, y) {
        this.id = id;
        this.parent = parent;
        this.child = child;
        this.label = label;
        this.x = x;
        this.y = y;
        this.hover = false;
      }

      get lines() {
        return getLines(c, this.label, outcomeWidth);
      }

      get lineHeight() {
        return 12;
      }

      get x1() {
        return this.parent?.connectors.bottomCenter.x;
      }

      get x2() {
        return this.child?.connectors.topCenter.x;
      }

      get y1() {
        return this.parent?.connectors.bottomCenter.y;
      }

      get y2() {
        return this.child?.connectors.topCenter.y;
      }

      get labelX() {
        return this.x1 + (this.x2 - this.x1 - outcomeWidth) / 2;
      }

      get labelY() {
        return this.y1 + (this.y2 - this.y1 - outcomeHeight) / 2;
      }

      drawConnector() {
        if (!this.parent && this.child) return;
        c.beginPath();

        const x1 = this.parent.connectors.centerRight.x;
        const y1 = this.parent.connectors.centerRight.y;
        const x2 = this.x || this.child.connectors.centerLeft.x;
        const y2 = this.y || this.child.connectors.centerLeft.y;
        c.moveTo(x1, y1);
        c.bezierCurveTo(x2 - (x2 - x1) / 2, y1, x1 + (x2 - x1) / 2, y2, x2, y2);

        c.lineWidth = 0.5;
        c.strokeStyle = "black";
        c.setLineDash([5, 2]);
        c.stroke();
        c.setLineDash([]);
      }

      drawLabel() {
        drawBox(
          this.labelX,
          this.labelY,
          outcomeWidth,
          this.lineHeight,
          this.lines,
          2,
          "white",
          "black",
          "#000000",
          this.lineHeight
        );
      }

      checkSelected(x, y) {
        if (
          x > this.labelX - iconSize / 3 &&
          x < this.labelX + (iconSize * 2) / 3 &&
          y > this.labelY - iconSize / 3 &&
          y < this.labelY + (iconSize * 2) / 3
        )
          return "delete";
        if (
          x > this.labelX &&
          x < this.labelX + destinationWidth &&
          y > this.labelY &&
          y < this.labelY + this.lines.length * this.lineHeight + 2 * padding
        )
          return "click";
        return null;
      }

      delete() {
        deletedOutcomeIDs.push(this.id);

        const linkedDestinations = destinations.filter((d) =>
          d.outcomeIDs.includes(this.id)
        );
        linkedDestinations.forEach((d) => {
          d.outcomeIDs.splice(
            d.outcomeIDs.findIndex((o) => o == this.id),
            1
          );
        });

        const outcomeIndex = outcomes.findIndex((o) => o.id == this.id);
        outcomes.splice(outcomeIndex, 1);

        renderChart();
      }
    }

    const initialiseData = async () => {
      const mappedDestinations = objectToArray(
        decisionTree.value?.destinations
      );
      const mappedOutcomes = objectToArray(decisionTree.value?.outcomes);

      for (const destination of mappedDestinations) {
        const newDestination = new Destination(
          destination.id,
          destination.title,
          destination.type,
          destination.x,
          destination.y,
          destination.outcomeIDs,
          destination.destinationID,
          destination.locked
        );
        destinations.push(newDestination);
      }

      if (decisionTree.value.destinations.length == 0) {
        const newDestination = new Destination(
          crypto.randomUUID(),
          "First Question",
          "Question",
          50,
          50,
          [],
          null
        );
        destinations.push(newDestination);
        decisionTree.value.rootID = newDestination.id;
      }

      for (const outcome of mappedOutcomes) {
        const parent = Destination.getByID(outcome.parentID);
        const child = Destination.getByID(outcome.childID);
        const newOutcome = new Outcome(
          outcome.id,
          parent,
          outcome.label,
          child
        );
        outcomes.push(newOutcome);
      }

      renderChart();
    };

    const renderChart = () => {
      if (!c) return;
      c.clearRect(0, 0, canvas.value.width, canvas.value.height);
      outcomes.forEach((o) => {
        o.drawConnector();
      });

      outcomes.forEach((o) => {
        o.drawLabel();
      });

      destinations.forEach((d) => {
        d.draw();
      });

      if (newOutcome) {
        newOutcome.drawConnector();
      }
    };

    const onMouseDown = (e) => {
      const mobile = isPlatform("mobile");
      const event = mobile ? e.targetTouches[0] : e;
      const clientX = event.clientX;
      const clientY = event.clientY;
      const top = event.target.getBoundingClientRect().top;
      const left = event.target.getBoundingClientRect().left;
      const x = clientX - left;
      const y = clientY - top;
      destinations.forEach((destination) => {
        const destinationHover = destination.checkSelected(x, y);
        if (
          destinationHover === "add" ||
          destinationHover === "edit" ||
          destinationHover === "lock" ||
          destinationHover === "delete"
        ) {
          return;
        }
        if (destinationHover === "click") {
          dragDestination = destination;
        }
      });
      dragStart = { x: x, y: y };
    };

    const onMouseUp = (e) => {
      if (dragDestination !== undefined && dragDestination !== null) {
        dragDestination.x = Math.round(dragDestination.x / 60) * 60;
        dragDestination.y = Math.round(dragDestination.y / 60) * 60;
      }

      for (const destination of destinations) {
        if (dragStart) {
          destination.x = Math.round(destination.x / 60) * 60;
          destination.y = Math.round(destination.y / 60) * 60;
        }
      }

      dragDestination = null;
      dragStart = null;
    };

    const onClick = async (e) => {
      e.stopPropagation();
      const top = e.target.getBoundingClientRect().top;
      const left = e.target.getBoundingClientRect().left;
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Used to flag whether the event has been handled to prevent multiple actions
      let eventHandled = false;

      /* Iterate through all destinations to check if an event has occurred
      within the bounds of that object or its buttons */
      destinations.forEach(async (destination) => {
        const action = destination.checkSelected(x, y);

        if (action === "add" && destination.type === "Question") {
          eventHandled = true;
          newOutcome = new Outcome(
            crypto.randomUUID(),
            destination,
            "Answer",
            null,
            x,
            y
          );
          destination.outcomeIDs.push(newOutcome.id);
          return;
        }

        if (action == "edit") {
          eventHandled = true;
          editDestination.value = { ...destination, step: 0 };
          destinationVisible.value = true;
        }

        if (action == "delete") {
          eventHandled = true;
          destination.delete();

          return;
        }

        // if (action == "click" && newOutcome) {
        //   eventHandled = true;

        //   // Destination - Existing destination has been clicked
        //   if (
        //     outcomes.some((o) => {
        //       return o.parent.id == newOutcome.parent.id && o.child.id == destination.id;
        //     })
        //   ) {
        //     newOutcome.parent.outcomeIDs.splice(
        //       newOutcome.parent.outcomeIDs.findIndex((o) => o.id == newOutcome.id),
        //       1
        //     );
        //     newOutcome = null;
        //     renderChart();
        //     return;
        //   }

        //   newOutcome.child = destination;
        //   newOutcome.x = null;
        //   newOutcome.y = null;
        //   outcomes.push(newOutcome);
        //   editOutcome.value = outcomes[outcomes.length - 1];
        //   outcomeVisible.value = true;
        //   // showMenu("outcomeMenu");
        //   newOutcome = null;
        //   dirty.value = true;
        //   renderChart();
        //   return;
        // }

        // if (action == "click") {
        //   console.log();
        // }
      });

      if (eventHandled) return;

      if (newOutcome) {
        // Create Destination object and push it to the destinations array
        const newDestination = new Destination(
          crypto.randomUUID(),
          "New question",
          "Question",
          x - destinationWidth / 2,
          y,
          []
        );
        destinations.push(newDestination);

        //Make the new destination the target of the active outcome
        newOutcome.x = null;
        newOutcome.y = null;
        newOutcome.child = newDestination;
        outcomes.push(newOutcome);
        newOutcome = null;
        renderChart();
        editDestination.value = destinations[destinations.length - 1];
        editOutcome.value = outcomes[outcomes.length - 1];
        destinationVisible.value = true;
      }
    };

    const onDrag = (e) => {
      const mobile = isPlatform("mobile");
      const event = mobile ? e.targetTouches[0] : e;
      const clientX = event.clientX;
      const clientY = event.clientY;
      const top = event.target.getBoundingClientRect().top;
      const left = event.target.getBoundingClientRect().left;
      const x = clientX - left;
      const y = clientY - top;

      if (newOutcome) {
        newOutcome.x = x;
        newOutcome.y = y;
        renderChart();
        return;
      }

      if (x < 0 || y < 0) dragDestination = null;

      if (dragDestination) {
        if (!dragDestination.locked) {
          dragDestination.x += x - dragStart.x;
          dragDestination.y += y - dragStart.y;
          dragDestination.x = Math.round(dragDestination.x);
          dragDestination.y = Math.round(dragDestination.y);
          dirty.value = true;
        }
      } else {
        for (const destination of destinations) {
          destination.hover = destination.checkSelected(x, y);
          if (dragStart) {
            destination.x += x - dragStart.x;
            destination.y += y - dragStart.y;
          }
        }
        for (const outcome of outcomes) {
          outcome.hover = outcome.checkSelected(x, y);
        }
      }

      if (dragStart) dragStart = { x: x, y: y };

      renderChart();
    };

    const onResize = () => {
      if (canvas.value && container.value) {
        canvas.value.height = container.value.clientHeight - 20;
        canvas.value.width = container.value.clientWidth - 20;
        renderChart();
      }
    };

    watch([() => decisionTree.value?.loaded, container, canvas], () => {
      if (!(decisionTree.value?.loaded && !!container.value && !!canvas.value))
        return;
      setTimeout(() => {
        canvas.value.width = container.value.clientWidth - 20;
        canvas.value.height = container.value.clientHeight - 20;

        c = canvas.value.getContext("2d");
        canvas.value.addEventListener("mousedown", onMouseDown);
        canvas.value.addEventListener("mouseup", onMouseUp);
        canvas.value.addEventListener("mousemove", onDrag);
        canvas.value.addEventListener("touchstart", onMouseDown);
        canvas.value.addEventListener("touchend", onMouseUp);
        canvas.value.addEventListener("touchmove", onDrag);
        canvas.value.addEventListener("click", onClick);
        window.addEventListener("focus", onResize);
        window.addEventListener("resize", onResize);
        initialiseData();
      }, 1);
    });

    const drawBox = (
      x,
      y,
      width,
      lineHeight,
      text,
      lineWidth = 2,
      fillStyle = "#ffffff",
      strokeStyle = "#000000",
      textStyle = "#000000",
      textSize = 10
    ) => {
      const height = text.length * lineHeight + 2 * padding;
      c.beginPath();
      c.moveTo(x + cornerRadius, y);
      c.lineTo(x + width - cornerRadius, y);
      c.arc(
        x + width - cornerRadius,
        y + cornerRadius,
        cornerRadius,
        -Math.PI / 2,
        0,
        false
      );
      c.lineTo(x + width, y + height - cornerRadius);
      c.arc(
        x + width - cornerRadius,
        y + height - cornerRadius,
        cornerRadius,
        0,
        Math.PI / 2,
        false
      );
      c.lineTo(x + cornerRadius, y + height);
      c.arc(
        x + cornerRadius,
        y + height - cornerRadius,
        cornerRadius,
        Math.PI / 2,
        Math.PI,
        false
      );
      c.lineTo(x, y + cornerRadius);
      c.arc(
        x + cornerRadius,
        y + cornerRadius,
        cornerRadius,
        Math.PI,
        (Math.PI * 3) / 2,
        false
      );
      c.closePath();
      c.strokeStyle = strokeStyle;
      c.lineWidth = lineWidth;
      c.stroke();
      c.fillStyle = fillStyle;
      c.fill();
      c.textBaseline = "top";
      c.textAlign = "center";
      c.font = `${textSize - 3}px Akkurat-Regular`;
      c.fontStyle = "normal";
      c.fontWeight = 400;
      c.fontSize = "14px";
      c.lineHeight = "14px";
      c.fillStyle = textStyle;
      for (let i = 0; i < text.length; i++) {
        c.fillText(
          text[i],
          x + width / 2,
          y + padding + lineHeight * i,
          width - 2 * padding
        );
      }
    };

    const save = async () => {
      dirty.value = false;
    };

    const cancel = async () => {
      decisionTree.value = decisionTree;
      router.back();
    };

    const objectToArray = (obj) => {
      if (!obj) return [];
      const keys = Object.keys(obj);
      const mapped = keys.map((k) => obj[k]);
      return mapped;
    };

    return {
      canvas,
      container,
      dirty,
      decisionTree,
      searchTerm,
      model,
      manufacturer,
      assetType,
      save,
      cancel,
      editDestination,
      editOutcome,
      outcomeVisible,
      newDestinationVisible,
      destinationVisible,
      infoVisible,
      closeCircle,
      informationCircle,
      create,
      search,
    };
  },
};
</script>

<style scoped>
.button-action {
  background-color: white;
  border-radius: 8px;
  padding: 10px 30px;
  color: #0000ff;
  margin-right: 25px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-action svg {
  margin-right: 15px;
}

.button-action span {
  margin-top: 5px;
}

.bg-blue {
  color: #ffffff;
  background-color: #0000ff !important;
}

.button-container {
  position: absolute;
  top: 27px;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Akkurat-Regular";
  font-style: normal;
  padding-left: 30px;
  padding-right: 30px;
  height: 55px;
}

.bg-white {
  color: #0000ff;
  background-color: #ffffff !important;
}

.divider {
  width: 31px;
  height: 0px;
  border-top: 1px solid #cdccd6;
  transform: rotate(90deg);
}

.back-button {
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.015em;
  color: #000000;
  background-color: #ffffff !important;
  margin-right: 10px;
}

.title {
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-left: 10px;
}

#canvas {
  background-image: linear-gradient(to right, #d1d5db 1px, transparent 1px),
    linear-gradient(to bottom, #d9d9d9 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: 0 0;
  background-color: #ededee;
  display: block;
  height: 100%;
  width: 100%;
}

.button-container.left {
  left: 27px;
  flex: content;
}

.button-container.right {
  right: 10px;
}

ion-grid {
  width: 100%;
}

ion-row.decission-tree-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

.fixed-sidebar {
  width: 30%;
  max-width: 300px;
}

#pageContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

#container {
  flex-grow: 1;
  overflow: hidden;
}

ion-modal {
  --border-radius: 20px;
}

ion-content::part(background) {
  background: #181818;
}

ion-select {
  --padding-end: 16px;
}

ion-button.button-outline {
  --border-width: 1px;
}
</style>
