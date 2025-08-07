export const data = `const data = {
        containers: [
        {
          id: "container-1",
          label: "Engine",
          buttons: [
            {
              id: "btn-1-1",
              label: "Overheat Alert",
              width: 40,
              currentStage: 1,
              stages: [
                { color: "green" },
                { color: "red", blinked: true },
                { color: "yellow", blinked: true }
              ]
            },
            {
              id: "btn-1-2",
              label: "Maintenance Needed",
              width: 60,
              currentStage: 0,
              stages: [
                { color: "green" },
                { color: "red", blinked: true },
                { color: "yellow", blinked: true }
              ]
            }
          ]
        },
      ...
    ];
  }
`

export const reactCode = `import DraggableResizableContainer from 'draggable-resizable-container';

function App() {
  return (
    <DraggableResizableContainer
      data={data}
      onButtonStageChanged={({ containerId, buttonId, stageIndex }) =>
        console.log("Button stage changed: \${containerId} > \${buttonId} > \${stageIndex}")
      }
    />
  );
}

export default App;`;

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