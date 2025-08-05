class DraggableResizableContainer {
  constructor({
    containerId = "alarmContainer",
    data,
    soundSrc = "/sound.mp3",
    pollingInterval = 1000,
    onBoxClick,
    containerClassName = "resizable-container"
  }) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.soundSrc = soundSrc;
    this.pollingInterval = pollingInterval;
    this.onBoxClick = onBoxClick;
    this.containerClassName = containerClassName;

    this.items = [];
    this.audio = null;
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

    this.audio = document.createElement("audio");
    this.audio.src = this.soundSrc;
    this.audio.id = "alarmSound";
    this.audio.preload = "auto";
    document.body.appendChild(this.audio);

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

      //console.log("Result: ", result.containers)
      this.items = result.containers;
      this.updateUI();
    } catch (err) {
      console.error("Veri alma hatası:", err);
    }
  }

  updateUI() {
    this.container.innerHTML = "";

    this.buttonMap = {}; // Butonları id ile eşle (switchToNextStage için)

    this.items.forEach((item) => {
      const box = document.createElement("div");
      box.className = "small-box";

      // Başlık
      const titleWrapper = document.createElement("div");
      titleWrapper.className = "title-wrapper";

      const titleSpan = document.createElement("span");
      titleSpan.textContent = item.label;
      titleSpan.id = "list-title";

      titleWrapper.appendChild(titleSpan);
      box.appendChild(titleWrapper);

      // Buton kapsayıcısı
      const btnWrapper = document.createElement("div");
      btnWrapper.className = "multiStageBtn-container";

      item.buttons.forEach((btn) => {
        const multiStageBtn = document.createElement("div");
        multiStageBtn.className = "multiStageBtn";
        multiStageBtn.style.flex = `${btn.width || 50}%`;
        multiStageBtn.setAttribute("data-button-id", btn.id);

        // currentStage başlat
        btn.currentStage = btn.currentStage ?? 0;

        // Stage DOM haritasına ekle
        this.buttonMap[btn.id] = {
          dom: multiStageBtn,
          stages: btn.stages,
          currentStage: btn.currentStage,
        };

        // Stage uygula fonksiyonu
        const applyStageByIndex = (btn, domElement) => {
          const stage = btn.stages.find(
            (s, i) => s.stageIndex === btn.currentStage || i === btn.currentStage
          );
          if (!stage) return;

          domElement.style.backgroundColor = stage.color;

          if (stage.blinked) {
            domElement.classList.remove("blink");
            void domElement.offsetWidth; // reflow
            domElement.classList.add("blink");
          } else {
            domElement.classList.remove("blink");
          }
        };

        // Başlangıçta stage uygula
        applyStageByIndex(btn, multiStageBtn);

        // Buton başlığı
        const btnTitle = document.createElement("span");
        btnTitle.textContent = btn.label;
        btnTitle.id = "multiStageBtn-title";
        multiStageBtn.appendChild(btnTitle);

        // Tıklama event
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