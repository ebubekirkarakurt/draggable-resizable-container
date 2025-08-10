class DraggableResizableContainer {
  constructor({
    containerId = "resizableContainer",
    data,
    pollingInterval = 1000,
    onBoxClick,
    containerClassName = "resizable-container"
  }) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.pollingInterval = pollingInterval;
    this.onBoxClick = onBoxClick;
    this.containerClassName = containerClassName;

    this.items = [];
    this.interval = null;
    this.drag = { active: false, offsetX: 0, offsetY: 0 };

    if (!this.container) {
      console.error(`[DraggableResizableContainer] '${containerId}' id'li element bulunamadı.`);
      return;
    }

    this.init();
  }

  init() {
    this.container.classList.add(this.containerClassName);

    this.container.addEventListener("mousedown", (e) => {
      const isResizeHandle =
        e.offsetX > this.container.offsetWidth - 15 &&
        e.offsetY > this.container.offsetHeight - 15;

      if (!isResizeHandle) {
        this.drag.active = true;
        this.drag.offsetX = e.clientX - this.container.getBoundingClientRect().left;
        this.drag.offsetY = e.clientY - this.container.getBoundingClientRect().top;
        this.container.classList.add("dragging");
        this.container.style.cursor = "grabbing";
        e.preventDefault();
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (this.drag.active) {
        this.container.style.left = `${e.clientX - this.drag.offsetX}px`;
        this.container.style.top = `${e.clientY - this.drag.offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      if (this.drag.active) {
        this.drag.active = false;
        this.container.classList.remove("dragging");
        this.container.style.cursor = "move";
      }
    });

    this.fetchAndUpdate();
    this.interval = setInterval(() => this.fetchAndUpdate(), this.pollingInterval);
  }

  async fetchAndUpdate() {
    try {
      let result = typeof this.data === "function" ? await this.data() : this.data;
      if (Array.isArray(result)) {
        this.items = result[0]?.containers;
      } else if (result?.containers) {
        this.items = result.containers;
      }

      this.items = result.containers;
      this.updateUI();
    } catch (err) {
      console.error("Veri alma hatası:", err);
    }
  }

  updateUI() {
    this.container.innerHTML = "";
    this.buttonMap = {};

    this.items.forEach((item) => {
      const box = document.createElement("div");
      box.className = "small-box";

      const topRightBox = document.createElement("div");
      topRightBox.className = "top-right-box";

      topRightBox.classList.add("status--green");

      const buttonsRef = [];

      const titleWrapper = document.createElement("div");
      titleWrapper.className = "title-wrapper";

      const titleSpan = document.createElement("span");
      titleSpan.textContent = item.label;
      titleSpan.id = "list-title";

      if (item.labelStyle && typeof item.labelStyle === "object") {
        Object.assign(titleWrapper.style, item.labelStyle);
      }

      if (item.labelStyle?.textStyle && typeof item.labelStyle.textStyle === "object") {
        Object.assign(titleSpan.style, item.labelStyle.textStyle);
      }


      box.appendChild(titleWrapper);
      box.appendChild(topRightBox);
      titleWrapper.appendChild(titleSpan);

      const btnWrapper = document.createElement("div");
      btnWrapper.className = "multiStageBtn-container";

      function getActiveStage(btn) {
        const idx = btn.currentStage ?? 0;
        return btn.stages.find((s, i) => s.stageIndex === idx || i === idx);
      }

      function normColor(c) {
        return (c || "").toLowerCase().trim();
      }

      function updateIndicatorStatus(topRightBox, buttons) {
        const GREEN = "#44a148"; 
        const RED = "#FF000";     

        const allGreen = buttons.every(btn => {
        const st = getActiveStage(btn);
        return st && normColor(st.color) === GREEN;
      });

      const anyNotGreen = buttons.some(btn => {
        const st = getActiveStage(btn);
        return st && normColor(st.color) !== GREEN;
      });

      topRightBox.classList.remove("status--green", "status--red", "smooth-blink");

      if (allGreen) {
        topRightBox.classList.add("status--green");
      } else if (anyNotGreen) {
        topRightBox.classList.add("status--red", "smooth-blink");
      }
      }

      item.buttons.forEach((btn) => {
        const multiStageBtn = document.createElement("div");
        multiStageBtn.className = "multiStageBtn";
        multiStageBtn.style.flex = `${btn.width || 50}%`;
        multiStageBtn.setAttribute("data-button-id", btn.id);

        btn.currentStage = btn.currentStage ?? 0;
        
        buttonsRef.push(btn);

        this.buttonMap[btn.id] = {
          dom: multiStageBtn,
          stages: btn.stages,
          currentStage: btn.currentStage,
        };

        const applyStageByIndex = (btn, domElement) => {
          const stage = btn.stages.find(
            (s, i) => s.stageIndex === btn.currentStage || i === btn.currentStage
          );
          if (!stage) return;

          domElement.style.backgroundColor = stage.color;

          if (stage.blinked) {
            domElement.classList.remove("blink");
            void domElement.offsetWidth;
            domElement.classList.add("blink");
          } else {
            domElement.classList.remove("blink");
          }
          
          console.log(`Stage ${stage.clickable} applied to button ${btn.id}`);
          if (stage.clickable) {
            domElement.classList.add("click");
            domElement.style.pointerEvents = "auto";
          } else {
            domElement.classList.remove("click");
            domElement.style.pointerEvents = "none";
          }

        };

        applyStageByIndex(btn, multiStageBtn);
        updateIndicatorStatus(topRightBox, buttonsRef);
        

        const btnTitle = document.createElement("span");
        btnTitle.textContent = btn.label;
        btnTitle.id = "multiStageBtn-title";
        multiStageBtn.appendChild(btnTitle);

        multiStageBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          btn.currentStage = (btn.currentStage + 1) % btn.stages.length;
          applyStageByIndex(btn, multiStageBtn);

          if (this.onButtonStageChanged) {
            this.onButtonStageChanged({
              containerId: item.id,
              buttonId: btn.id,
              stageIndex: btn.currentStage,
            });
          }
        });

        btnWrapper.appendChild(multiStageBtn);
      });

      box.appendChild(btnWrapper);
      this.container.appendChild(box);
    });
  }
}

window.DraggableResizableContainer = DraggableResizableContainer;
