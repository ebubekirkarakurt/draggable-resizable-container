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
      if (!Array.isArray(result)) return;

      this.items = result;
      this.updateUI();
    } catch (err) {
      console.error("Veri alma hatası:", err);
    }
  }

  updateUI() {
    this.container.innerHTML = "";

    let alarmActive = false;

    this.items.forEach((item) => {
      const box = document.createElement("div");
      box.className = "small-box";
      const titleSpan = document.createElement("span");
      titleSpan.textContent = item.title;
      titleSpan.id = `list-title`; // title'a id veriyoruz

      box.appendChild(titleSpan);

      box.addEventListener("click", () => {
        if (this.onBoxClick) this.onBoxClick(item.id);
      });

      const indicator = document.createElement("div");
      indicator.className = "top-right-box";
      if (item.alarmStatus === 1) {
        indicator.style.backgroundColor = "green";
        indicator.classList.add("blink");
        alarmActive = true;
      } else {
        indicator.style.backgroundColor = "gray";
        indicator.classList.remove("blink");
      }

      box.appendChild(indicator);
      this.container.appendChild(box);
    });

    // Alarm sesi kontrolü
    if (alarmActive && !this.alarmInterval) {
      this.alarmInterval = setInterval(() => {
        this.audio.currentTime = 0;
        this.audio.play().catch(() => {});
      }, 1000);
    } else if (!alarmActive && this.alarmInterval) {
      clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
  }
}

window.DraggableResizableContainer = DraggableResizableContainer;
