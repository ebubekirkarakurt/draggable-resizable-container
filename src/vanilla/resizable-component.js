document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".resizable-container");
  const audio = document.getElementById("alarmSound");

  let alarmSoundInterval = null;
  let isDragging = false;
  let offsetX, offsetY;

  container.addEventListener('mousedown', (e) => {
    const isResizeHandle = e.offsetX > container.offsetWidth - 15 && 
                          e.offsetY > container.offsetHeight - 15;
    
    if (!isResizeHandle) {
      isDragging = true;
      container.classList.add('dragging');
      offsetX = e.clientX - container.getBoundingClientRect().left;
      offsetY = e.clientY - container.getBoundingClientRect().top;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      container.style.left = x + 'px';
      container.style.top = y + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      container.classList.remove('dragging');
      container.style.cursor = 'move';
    }
  });

  function fetchAndUpdate() {
    fetch('http://localhost:3000/data')
      .then(res => res.json())
      .then(data => {
        updateAlarms(data);
      })
      .catch(err => console.error("Fetch Hatası:", err));
  }

  function updateAlarms(data) {
    container.innerHTML = "";

    let anyAlarmActive = false;

    data.forEach(item => {
      const smallBox = document.createElement("div");
      smallBox.classList.add("small-box");
      smallBox.textContent = item.title;

      smallBox.addEventListener("click", () => {
        console.log(`Bolum no: ${item.title} (ID: ${item.id})`);
      });

      const topRightBox = document.createElement("div");
      topRightBox.classList.add("top-right-box");

      if (item.alarmStatus == 1) {
        anyAlarmActive = true;
        topRightBox.style.backgroundColor = "green";
        topRightBox.classList.add("blink");
      } else {
        topRightBox.style.backgroundColor = "gray";
        topRightBox.classList.remove("blink");
      }

      smallBox.appendChild(topRightBox);
      container.appendChild(smallBox);
    });

    if (anyAlarmActive) {
      if (!alarmSoundInterval) {
        alarmSoundInterval = setInterval(() => {
          audio.currentTime = 0;
          audio.play().catch(e => console.error("Ses oynatma hatası:", e));
        }, 1000);
      }
    } else {
      if (alarmSoundInterval) {
        clearInterval(alarmSoundInterval);
        alarmSoundInterval = null;
      }
    }
  }

  fetchAndUpdate();
  setInterval(fetchAndUpdate, 1000);
});