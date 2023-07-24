<template>
  <ion-page class="ion-bg" id="admin">
    <div id="pageContainer">
      <div id="container" ref="container">
        <div class="button-container left bg-white">
          <button class="back-button" @click="cancel()">
            {{
              $t("pages.admin.organisations.view.decisionTrees.details.back")
            }}
          </button>
          <div class="divider"></div>
          <h1 class="title">{{ decisionTree?.name }}</h1>
        </div>
        <div class="button-container right">
          <!-- <button class="button-action bg-white">
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
          </button> -->
          <ion-button :disabled="!dirty" @click="save">
            {{
              $t("pages.admin.organisations.view.decisionTrees.details.saveBtn")
            }}
          </ion-button>
        </div>
        <canvas ref="canvas" id="canvas"></canvas>
      </div>
    </div>
    <DecisionTreeNodeModal
      v-if="destinationVisible"
      :isOpen="destinationVisible"
      :editTreeNode="editTreeNode"
      :handleDismiss="
        () => {
          destinationVisible = false;
        }
      "
      :handleClickNext="handleClickNextOnEdit"
      :handleClickConfirm="handleClickConfirm"
    />
  </ion-page>
</template>

<script>
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { closeCircle, informationCircle, create, search } from "ionicons/icons";
import { isPlatform, onIonViewDidEnter, IonPage, IonButton } from "@ionic/vue";

import DecisionTreeNodeModal from "@/components/modals/decisionTreeNodeModal/DecisionTreeNodeModal.vue";
import { DecisionTreeNode } from "@/types/decisionTree";

import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const organisationsStore = useOrganisationsStore();

export default {
  components: {
    IonPage,
    DecisionTreeNodeModal,
    IonButton,
  },

  mounted() {
    const route = useRoute();
    const organisationId = route.params.id;
    const decisionTreeId = route.params.decisionTreeId;
    if (organisationsStore.organisationDetails?.id !== organisationId) {
      organisationsStore.setId(organisationId);
      organisationsStore.getOrgDetails(organisationId);
    }
    if (organisationsStore.decisionTree?.id !== decisionTreeId) {
      organisationsStore.getDecisionDetails(decisionTreeId);
    }
    organisationsStore.getEquipments();
  },

  setup() {
    const destinationWidth = 200;
    const outcomeHeight = 20;
    const cornerRadius = 0;
    const padding = 10;
    const toolbarWidth = 253;
    const toolbarDelta = (toolbarWidth - 24) / 4;
    const toolbarHeight = 79;

    const gridSize = 20;
    const gridPosition = { x: 0, y: 0 };

    const canvas = ref();
    const container = ref();

    let dragStart;
    let dragDestination;
    let destinations = [];
    const originalDestinations = [];
    let c;

    const editTreeNode = ref();
    let newTreeNode = null;

    const destinationVisible = ref(false);

    const dirty = ref(false);

    const toolbar = new Image();
    const deleteIcon = new Image();
    const disabledDeleteIcon = new Image();
    const addIcon = new Image();
    const disabledAddIcon = new Image();
    const editIcon = new Image();
    const lockIcon = new Image();
    const disabledLockIcon = new Image();
    const unlockIcon = new Image();
    const disabledUnlockIcon = new Image();

    toolbar.src = "/img/admin/decission-toolbar-background.svg";
    toolbar.width = toolbarWidth;
    toolbar.height = toolbarHeight;
    deleteIcon.src = "/img/icons/trash.svg";
    deleteIcon.width = 14;
    deleteIcon.height = 18;
    disabledDeleteIcon.src = "/img/icons/trash-disabled.svg";
    disabledDeleteIcon.width = 14;
    disabledDeleteIcon.height = 18;

    addIcon.src = "/img/icons/add.svg";
    addIcon.width = 20;
    addIcon.height = 20;
    disabledAddIcon.src = "/img/icons/add-disabled.svg";
    disabledAddIcon.width = 20;
    disabledAddIcon.height = 20;

    editIcon.src = "/img/icons/edit.svg";
    editIcon.width = 20;
    editIcon.height = 20;

    lockIcon.src = "/img/icons/lock.svg";
    lockIcon.width = 16;
    lockIcon.height = 21;
    disabledLockIcon.src = "/img/icons/lock-disabled.svg";
    disabledLockIcon.width = 16;
    disabledLockIcon.height = 21;

    unlockIcon.src = "/img/icons/unlock.svg";
    unlockIcon.width = 16;
    unlockIcon.height = 21;
    disabledUnlockIcon.src = "/img/icons/unlock-disabled.svg";
    disabledUnlockIcon.width = 16;
    disabledUnlockIcon.height = 21;

    const router = useRouter();
    const route = useRoute();
    const { decisionTree } = storeToRefs(organisationsStore);

    onIonViewDidEnter(() => {
      onResize();
    });

    const handleClickNextOnEdit = (questionData) => {
      const currentTreeNode = Destination.getByID(editTreeNode.value.id);
      editTreeNode.value.text = questionData.text;
      editTreeNode.value.type = questionData.type;
      currentTreeNode.text = questionData.text;
      currentTreeNode.type = questionData.type;
      const answerNode = editTreeNode.value.parent;
      if (answerNode?.type === 3) {
        answerNode.text = questionData.outcomeLabel;
      }
      renderChart();
      dirty.value = true;
    };

    const handleClickConfirm = (treeNodeData) => {
      const currentTreeNode = Destination.getByID(editTreeNode.value.id);
      for (const key of Object.keys(treeNodeData)) {
        const value = treeNodeData[key];
        currentTreeNode[key] = value;
      }

      destinationVisible.value = false;
      renderChart();
      dirty.value = true;
    };

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

    class Destination extends DecisionTreeNode {
      constructor(initialData) {
        super(initialData);
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
        return this.parent?.connectors
          ? this.parent.connectors.bottomCenter.x
          : 0;
      }

      get x2() {
        return this.child?.connectors ? this.child.connectors.topCenter.x : 0;
      }

      get y1() {
        return this.parent?.connectors
          ? this.parent.connectors.bottomCenter.y
          : 0;
      }

      get y2() {
        return this.child?.connectors ? this.child.connectors.topCenter.y : 0;
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

      get toolbarY() {
        return this.realY - toolbarHeight - 12;
      }

      getIconY(iconHeight) {
        return this.toolbarY + toolbarHeight / 2 - iconHeight / 2;
      }

      draw() {
        let fillColor = "#0000FF";
        let strokeColor = "#0000FF";
        let textColor = "#FFFFFF";

        if (
          this.type !== 3 &&
          (this.x > canvas.value.width ||
            this.x < -destinationWidth ||
            this.y < -this.height ||
            this.y > canvas.value.height)
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

          c.drawImage(toolbar, toolbarX, this.toolbarY);
          c.drawImage(
            this.type === 2 ? addIcon : disabledAddIcon,
            toolbarX + 12 + toolbarDelta * 0.5 - addIcon.width / 2,
            this.getIconY(addIcon.height)
          );
          c.drawImage(
            editIcon,
            toolbarX + 12 + toolbarDelta * 1.5 - editIcon.width / 2,
            this.getIconY(addIcon.height)
          );
          c.drawImage(
            this.locked
              ? this.type === 3
                ? disabledLockIcon
                : lockIcon
              : this.type === 3
              ? disabledUnlockIcon
              : unlockIcon,
            toolbarX + 12 + toolbarDelta * 2.5 - lockIcon.width / 2,
            this.getIconY(addIcon.height)
          );
          c.drawImage(
            this.type === 3 ||
              decisionTree.value?.root?.id === this.id ||
              (this.child && this.child.type === 3)
              ? disabledDeleteIcon
              : deleteIcon,
            toolbarX + 12 + toolbarDelta * 3.5 - deleteIcon.width / 2,
            this.getIconY(addIcon.height)
          );
        }
      }

      drawConnector() {
        if (!this.parent && this.child) return;
        c.beginPath();

        const x1 = this.parent.connectors.centerRight.x;
        const y1 = this.parent.connectors.centerRight.y;
        const x2 = this.child?.connectors?.centerLeft?.x || this.x;
        const y2 = this.child?.connectors?.centerLeft?.y || this.y;
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
          y < this.toolbarY + toolbarHeight
        ) {
          if (x > this.realX - 6 && x < this.realX - 6 + toolbarDelta) {
            return "add";
          }
          if (
            x > this.realX - 6 + toolbarDelta &&
            x < this.realX - 6 + toolbarDelta * 2
          ) {
            return "edit";
          }
          if (
            x > this.realX - 6 + toolbarDelta * 2 &&
            x < this.realX - 6 + toolbarDelta * 3
          ) {
            return "lock";
          }
          if (
            x > this.realX - 6 + toolbarDelta * 3 &&
            x < this.realX - 6 + toolbarDelta * 4
          ) {
            return "delete";
          }
        }
        if (
          x > this.realX &&
          x < this.right &&
          y > this.realY &&
          y < this.bottom
        ) {
          return "click";
        }
        if (
          this.hover &&
          x > this.realX - 6 &&
          x < this.realX + toolbarWidth - 30 &&
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
        if (
          destinations.length == 1 ||
          decisionTree.value?.root?.id === this.id
        ) {
          return;
        }

        const deletedDestinationIDs = [this.id];

        const linkedOutcomes = destinations.filter(
          (o) =>
            o.type === 3 && (o.child?.id === this.id || o.parent?.id == this.id)
        );
        deletedDestinationIDs.push(...linkedOutcomes.map((o) => o.id));

        destinations = destinations.filter(
          (d) => !deletedDestinationIDs.includes(d.id)
        );

        destinations.map((d) => {
          d.children = d.children.filter(
            (child) => !deletedDestinationIDs.includes(child.id)
          );
          return d;
        });
        renderChart();
      }
    }

    const initialiseData = async () => {
      if (!decisionTree.value.root) {
        const rootNode = {
          id: crypto.randomUUID(),
          text: "New Question",
          xxPosition: canvas.value.width / 2 - destinationWidth / 2,
          yPosition: canvas.value.height / 2 - outcomeHeight / 2,
          children: [],
          type: 2,
        };
        decisionTree.value.root = rootNode;
      }

      if (
        decisionTree.value?.root &&
        decisionTree.value?.root.children.length < 1
      ) {
        decisionTree.value.root.xPosition =
          canvas.value.width / 2 - destinationWidth / 2;
        decisionTree.value.root.yPosition =
          canvas.value.height / 2 - outcomeHeight / 2;
      }

      getDestinations(decisionTree.value?.root);
    };

    const getDestinations = (node, parent) => {
      const newDestination = new Destination({
        id: node.id,
        text: node.text,
        type: node.type,
        x: node.xPosition,
        y: node.yPosition,
        parent: parent,
        children: node.children,
        article: node.article,
        video: node.video,
        email: node.email,
        document: node.document,
        phone: node.phone,
      });
      newDestination.x = Math.round(newDestination.x / gridSize) * gridSize;
      newDestination.y = Math.round(newDestination.y / gridSize) * gridSize;
      originalDestinations.push(newDestination);
      for (const child of node.children) {
        getDestinations(child, newDestination);
      }
      destinations = [...originalDestinations];
      renderChart();
    };

    const drawGrid = () => {
      c.strokeStyle = "#d1d5db";
      c.lineWidth = 1;

      for (let x = -10000 + gridPosition.x; x <= 10000; x += gridSize) {
        c.beginPath();
        c.moveTo(x, -10000);
        c.lineTo(x, 10000);
        c.stroke();
      }

      for (let y = -10000 + gridPosition.y; y <= 10000; y += gridSize) {
        c.beginPath();
        c.moveTo(-10000, y);
        c.lineTo(10000, y);
        c.stroke();
      }
    };

    const renderChart = () => {
      if (!c) return;
      c.clearRect(0, 0, canvas.value.width, canvas.value.height);
      drawGrid();
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
      if (newTreeNode) {
        newTreeNode.drawConnector();
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
        if (
          destinationHover === "click" &&
          destination.type !== 3 &&
          !destination.lock
        ) {
          dragDestination = destination;
        }
      });
      dragStart = { x: x, y: y };
    };

    const onMouseUp = (e) => {
      if (dragDestination !== undefined && dragDestination !== null) {
        dragDestination.x = Math.round(dragDestination.x / gridSize) * gridSize;
        dragDestination.y = Math.round(dragDestination.y / gridSize) * gridSize;
      }
      gridPosition.x = Math.round(gridPosition.x / gridSize) * gridSize;
      gridPosition.y = Math.round(gridPosition.y / gridSize) * gridSize;
      for (const destination of destinations) {
        if (dragStart) {
          destination.x = Math.round(destination.x / gridSize) * gridSize;
          destination.y = Math.round(destination.y / gridSize) * gridSize;
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

        if (action === "add" && destination.type === 2) {
          // Question
          eventHandled = true;
          newTreeNode = new Destination({
            id: crypto.randomUUID(),
            text: "Answer",
            type: 3,
            x,
            y,
            parent: destination,
            children: [],
            article: null,
            video: null,
            email: null,
            phone: null,
            document: null,
          });
          editTreeNode.value = newTreeNode;
          dirty.value = true;
          return;
        }

        if (action == "edit") {
          eventHandled = true;
          editTreeNode.value = { ...destination };
          destinationVisible.value = true;
        }

        if (action == "delete" && destination.type !== 3) {
          eventHandled = true;
          destination.delete();
          dirty.value = true;
          return;
        }

        if (action == "lock" && destination.type !== 3) {
          eventHandled = true;
          destination.locked = !destination.locked;
          return;
        }

        if (action == "click" && newTreeNode) {
          eventHandled = true;
          if (
            destination.type === 3 ||
            newTreeNode.parent?.id === destination.id
          ) {
            return;
          }
          if (
            destinations
              .filter((destination) => destination.type === 3)
              .some(
                (o) =>
                  o.parent.id === newTreeNode.parent.id &&
                  o.child.id === destination.id
              )
          ) {
            return;
          }
          newTreeNode.children = [{ id: destination.id }];
          destinations.push(newTreeNode);
          newTreeNode.parent.children = [
            ...newTreeNode.parent.children,
            newTreeNode,
          ];
          editTreeNode.value = newTreeNode;
          newTreeNode = null;
          dirty.value = true;
          renderChart();
          return;
        }
      });

      if (eventHandled) return;

      /* If click has occurred outside all destinations and outcomes, and there is a newOutcome active,
      create a new destination and make it the target of the new outcome */
      if (newTreeNode) {
        // Create Destination object and push it to the destinations array
        const newDestination = new Destination({
          id: crypto.randomUUID(),
          text: "New question",
          type: 2,
          x: x - destinationWidth / 2,
          y,
          parent: newTreeNode,
          children: [],
          article: null,
          video: null,
          email: null,
          phone: null,
          document: null,
        });
        newTreeNode.children = [
          {
            id: newDestination.id,
          },
        ];
        destinations.push(newTreeNode);
        newTreeNode.parent.children = [
          ...newTreeNode.parent.children,
          newTreeNode,
        ];
        destinations.push(newDestination);

        //Make the new destination the target of the active outcome
        newTreeNode = null;
        renderChart();
        editTreeNode.value = destinations[destinations.length - 1];
        destinationVisible.value = true;
        dirty.value = true;
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

      //If user is already creating a new outcome, update the connector line
      if (newTreeNode) {
        newTreeNode.x = x;
        newTreeNode.y = y;
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
          renderChart();
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
      if (dragStart) {
        if (!dragDestination) {
          gridPosition;
          gridPosition.y = gridPosition.y + y - dragStart.y;
          gridPosition.x = gridPosition.x + x - dragStart.x;
        }
        dragStart = { x: x, y: y };
        dirty.value = true;
      }
      renderChart();
    };

    const onResize = () => {
      if (canvas.value && container.value) {
        canvas.value.height = container.value.clientHeight;
        canvas.value.width = container.value.clientWidth;
        renderChart();
      }
    };

    const onKeydown = (e) => {
      if (e.keyCode == 27) {
        newTreeNode = null;
      }
    };

    watch([() => decisionTree.value?.loaded, container, canvas], () => {
      if (!(decisionTree.value?.loaded && !!container.value && !!canvas.value))
        return;
      setTimeout(() => {
        canvas.value.width = container.value.clientWidth;
        canvas.value.height = container.value.clientHeight;

        c = canvas.value.getContext("2d");
        canvas.value.addEventListener("mousedown", onMouseDown);
        canvas.value.addEventListener("mouseup", onMouseUp);
        canvas.value.addEventListener("mousemove", onDrag);
        canvas.value.addEventListener("touchstart", onMouseDown);
        canvas.value.addEventListener("touchend", onMouseUp);
        canvas.value.addEventListener("touchmove", onDrag);
        canvas.value.addEventListener("click", onClick);
        window.addEventListener("keydown", onKeydown);
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

    const getTreeNodeFromDestination = (destination) => {
      const treeNode = {
        id: destination.id,
        type: destination.type,
        text: destination.text,
        phone: destination.phone,
        email: destination.email,
        articleId: destination.article?.id,
        videoId: destination.video?.id,
        documentId: destination.document?.id,
        xPosition: destination.x,
        yPosition: destination.y,
      };
      const children = [];
      if (destination?.children) {
        for (const child of destination.children) {
          const childDestination = Destination.getByID(child.id);
          const childNode = getTreeNodeFromDestination(childDestination);
          children.push(childNode);
        }
      }
      treeNode.children = children;
      if (!destination.parent) {
        const decisionTreeId = route.params.decisionTreeId;
        organisationsStore.updateDecisionDetails(decisionTreeId, {
          root: treeNode,
          name: decisionTree.value?.name,
        });
      }
      return treeNode;
    };

    const save = async () => {
      const rootDestination = Destination.getByID(decisionTree.value?.root?.id);
      if (!rootDestination) return;
      getTreeNodeFromDestination(rootDestination);
      dirty.value = false;
    };

    const cancel = async () => {
      decisionTree.value = null;
      const organisationId = route.params.id;
      router.push({
        name: "OrganisationViewDecisionTrees",
        params: { id: organisationId },
      });
    };

    return {
      handleClickNextOnEdit,
      handleClickConfirm,
      canvas,
      container,
      dirty,
      decisionTree,
      save,
      cancel,
      editTreeNode,
      destinationVisible,
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
  z-index: 1;
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

ion-select {
  --padding-end: 16px;
}

ion-button.button-outline {
  --border-width: 1px;
}
</style>
