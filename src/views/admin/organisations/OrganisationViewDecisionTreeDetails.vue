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
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
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
import { DecisionTreeNodeType } from "@/types/index";

import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const organisationsStore = useOrganisationsStore();

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

  mounted() {
    const route = useRoute();
    const decisionTreeID = route.params.decisionTreeID;
    // organisationsStore.getDecisionDetails(decisionTreeID);
  },

  setup() {
    const destinationWidth = 200;
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
    const destinations = [];
    let c;

    const editDestination = ref();

    const deletedDestinationIDs = [];

    const destinationVisible = ref(false);
    const newDestinationVisible = ref(false);

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

    const { decisionTree } = storeToRefs(organisationsStore);

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
      constructor(id, text, type, x, y, parent, children, locked = false) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.children = children;
        this.hover = false;
        this.locked = locked;
      }

      get child() {
        return Destination.getByID(this.children?.[0]?.id);
      }

      get lines() {
        return getLines(c, this.text, destinationWidth - 2 * padding);
      }

      get lineHeight() {
        return 15;
      }

      get bottom() {
        return this.realY + this.height;
      }

      get right() {
        return this.realX + destinationWidth;
      }

      get center() {
        return {
          x: this.realX + destinationWidth / 2,
          y: this.realY + this.height / 2,
        };
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
        return this.x1 + (this.x2 - this.x1 - destinationWidth) / 2;
      }

      get labelY() {
        return this.y1 + (this.y2 - this.y1 - outcomeHeight) / 2;
      }

      get realX() {
        return this.type === 3 ? this.labelX : this.x;
      }

      get realY() {
        return this.type === 3 ? this.labelY : this.y;
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
        return this.realY - this.height - 46;
      }

      get iconY() {
        return this.toolbarY + this.toolbarHeight / 2 - iconSize / 2;
      }

      draw() {
        let fillColor = "#0000FF";
        let strokeColor = "#0000FF";
        let textColor = "#FFFFFF";

        if (
          this.x > canvas.value.width ||
          this.x < -destinationWidth ||
          this.y < -this.height ||
          this.y > canvas.value.height
        )
          return;

        switch (this.type) {
          case 3: // Answer
            fillColor = "#FFFFFF";
            strokeColor = "#000000";
            textColor = "#000000";
            break;
          default:
            break;
        }

        drawBox(
          this.realX,
          this.realY,
          destinationWidth,
          this.lineHeight,
          this.lines,
          2,
          fillColor,
          strokeColor,
          textColor,
          this.lineHeight
        );
        if (this.hover) {
          const toolbarX = this.realX - 18;

          c.drawImage(
            toolbar,
            toolbarX,
            this.toolbarY,
            toolbarWidth,
            this.toolbarHeight
          );
          c.drawImage(
            addIcon,
            this.realX - 6 + toolbarDelta * 0.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
          c.drawImage(
            editIcon,
            this.realX - 6 + toolbarDelta * 1.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
          c.drawImage(
            lockIcon,
            this.realX - 6 + toolbarDelta * 2.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
          c.drawImage(
            deleteIcon,
            this.realX - 6 + toolbarDelta * 3.5 - iconSize / 2,
            this.iconY,
            iconSize,
            iconSize
          );
        }
      }

      drawConnector() {
        if (!this.parent && this.child) return;
        c.beginPath();

        const x1 = this.parent.connectors.centerRight.x;
        const y1 = this.parent.connectors.centerRight.y;
        const x2 = this.child.connectors.centerLeft.x;
        const y2 = this.child.connectors.centerLeft.y;
        c.moveTo(x1, y1);
        c.bezierCurveTo(x2 - (x2 - x1) / 2, y1, x1 + (x2 - x1) / 2, y2, x2, y2);

        c.lineWidth = 0.5;
        c.strokeStyle = "black";
        c.setLineDash([5, 2]);
        c.stroke();
        c.setLineDash([]);
      }

      checkSelected(x, y) {
        if (
          this.hover &&
          y > this.toolbarY &&
          y < this.toolbarY + this.toolbarHeight
        ) {
          if (
            x > this.realX - 6 + toolbarDelta * 0.5 - iconSize / 2 &&
            x < this.realX - 6 + toolbarDelta * 0.5 + iconSize / 2
          ) {
            return "add";
          }
          if (
            x > this.realX - 6 + toolbarDelta * 1.5 - iconSize / 2 &&
            x < this.realX - 6 + toolbarDelta * 1.5 + iconSize / 2
          ) {
            return "edit";
          }
          if (
            x > this.realX - 6 + toolbarDelta * 2.5 - iconSize / 2 &&
            x < this.realX - 6 + toolbarDelta * 2.5 + iconSize / 2
          ) {
            return "lock";
          }
          if (
            x > this.realX - 6 + toolbarDelta * 3.5 - iconSize / 2 &&
            x < this.realX - 6 + toolbarDelta * 3.5 + iconSize / 2
          ) {
            return "delete";
          }
        }
        if (
          x > this.realX &&
          x < this.right &&
          y > this.realY &&
          y < this.bottom
        )
          return "click";
        if (
          this.hover &&
          x > this.realX &&
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

        const destinationIndex = destinations.findIndex(
          (d) => d.id === this.id
        );
        destinations.splice(destinationIndex, 1);
        deletedDestinationIDs.push(this.id);

        renderChart();
      }
    }

    const initialiseData = async () => {
      getDestinations(decisionTree.value?.root);
    };

    const getDestinations = (node, parent) => {
      const newDestination = new Destination(
        node.id,
        node.text,
        node.type,
        node.xPosition,
        node.yPosition,
        parent,
        node.children
      );
      destinations.push(newDestination);
      for (const child of node.children) {
        getDestinations(child, newDestination);
      }
      renderChart();
    };

    const renderChart = () => {
      if (!c) return;
      c.clearRect(0, 0, canvas.value.width, canvas.value.height);
      destinations
        .filter((d) => d.type === 3)
        .forEach((d) => {
          d.drawConnector();
          d.draw();
        });
      destinations
        .filter((d) => d.type !== 3)
        .forEach((d) => {
          d.draw();
        });
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
        if (destinationHover === "click" && destination.type !== 3) {
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
      });

      if (eventHandled) return;
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
