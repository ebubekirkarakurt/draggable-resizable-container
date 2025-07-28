# 📐 Draggable Resizable Container

A modern, responsive, and resizable container component built with React.  
Provides interactive UI for dragging, resizing, and dynamic data display — ideal for sensor panels, dashboards, or modular UIs.

---

## 🚀 Features

- ⚛️ Built with React
- 🖱️ Drag & resize from bottom-right corner
- 📱 **Fully responsive** layout
- 🔔 Optional sound alert integration
- 🎯 Custom click handling via `onBoxClick`
- 📦 Published on NPM — easy to install
- 🌐 CDN version coming soon...

---

## 📦 Installation

Install via npm:

```bash
npm install draggable-resizable-container
```

---

# 🔧 Usage

## React

```tsx
import DraggableResizableContainer from 'draggable-resizable-container';

function App() {
  return (
    <>
      <audio id="alarmSound" src="/sound.mp3" preload="auto"></audio>

      <DraggableResizableContainer
        data={[
          { id: 1, title: "Sensor 1", alarmStatus: 1 },
          { id: 2, title: "Sensor 2", alarmStatus: 0 },
          { id: 3, title: "Sensor 3", alarmStatus: 1 },
          { id: 4, title: "Sensor 4", alarmStatus: 0 },
          { id: 5, title: "Sensor 5", alarmStatus: 1 }
        ]}
        soundSrc="/sound.mp3"
        onBoxClick={(id: number | string) => console.log("Clicked ID:", id)}
      />
    </>
  );
}

export default App;
```
## Vanilla Js

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/draggable-resizable-container@latest/dist/draggable-resizable-component.css"
/>
<audio id="alarmSound" src="/sound.mp3" preload="auto"></audio>
<div id="alarmContainer"></div>

<script src="https://cdn.jsdelivr.net/npm/draggable-resizable-container@latest/dist/draggable-resizable-component.js"></script>
<script>
  new DraggableResizableContainer({
    containerId: "alarmContainer",
    data: [
      { id: 1, title: "Sensor 1", alarmStatus: 1 },
      { id: 2, title: "Sensor 2", alarmStatus: 0 },
      { id: 3, title: "Sensor 3", alarmStatus: 1 },
      { id: 4, title: "Sensor 4", alarmStatus: 0 },
      { id: 5, title: "Sensor 5", alarmStatus: 1 },
    ],
    soundSrc: "/sound.mp3",(or)"https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    onBoxClick: (id) => console.log("Clicked box ID:", id),
  });
</script>
```

---

## 🧱 Props

| Prop         | Type                 | Description                                      |
|--------------|----------------------|--------------------------------------------------|
| `data`       | `Array<{ id, title, alarmStatus }>` | Data to render inside each box                  |
| `soundSrc`   | `string`             | Path to the alert sound (optional)              |
| `onBoxClick` | `(id: number \| string) => void` | Callback when a box is clicked             |

---

## 📐 Responsive & Resizable

- You can resize the component from the **bottom-right corner**.
- Automatically adapts to different screen sizes.
- Suitable for mobile and desktop usage.

---

## 🧪 Live Demo

🌐 **Live URL:**  
🔗 [draggable-resizable-container.vercel.app](https://draggable-resizable-container.vercel.app)


---

## 📁 Project Structure

```
draggable-resizable-container/
│
├── dist/               # Compiled version (to be added for CDN)
├── src/                # Main source code
│   └── DraggableResizableContainer.tsx
├── example/            # Usage examples
├── package.json
└── README.md
```

---

## ✅ TODO

- [x] Horizontal and vertical resizing
- [x] Responsive layout
- [x] Sound integration on animation/alarm
- [x] Box click handler
- [x] CDN support
- [x] Live demo page (coming soon)

---

## 📜 License

MIT License. Contributions are welcome!

---

Made with ❤️ by [@ebubekirkarakurt](https://github.com/ebubekirkarakurt)