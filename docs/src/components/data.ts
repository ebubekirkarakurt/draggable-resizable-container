export const reactCode = `import DraggableResizableContainer from 'draggable-resizable-container';

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

export default App;`

export const vanillaCode = `<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/draggable-resizable-container@latest/dist/draggable-resizable-component.css"
/>
<div id="resizableContainer"></div>

<script src="https://cdn.jsdelivr.net/npm/draggable-resizable-container@latest/dist/draggable-resizable-component.js"></script>
<script>
    const comp = new DraggableResizableContainer({
      containerId: "resizableContainer",
      data: {data},
      onButtonStageChanged: (e) => {
        comp.switchToNextStage(e.buttonId);
      }
    });
</script>`