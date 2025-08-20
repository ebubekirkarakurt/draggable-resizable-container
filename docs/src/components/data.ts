export const data = `data: {
  containers: [
    {
      id: "container-1",
      label: "Motor",
      labelStyle: {
        backgroundColor: "#f0f0f0",  
        border: "1px solid #ccc",     
        borderRadius: "8px",       
        padding: "6px 12px",         
        textStyle: {
          color: "#d32f2f",           
          fontSize: "18px",           
          fontWeight: "bold",        
        }
      },
      buttons: [
        {
          id: "btn-1-1",
          label: "Start",
          currentStage: 0,
          buttonStyle: {
            borderRadius: "4px",
            fontWeight: "bold"
          },
          stages: [
            { color: "#44A148", clickable: true },
            { color: "red", blinked: true, clickable: true },
            { color: "#c4b400", blinked: true, clickable: true }
          ]
        },
        {
          id: "btn-1-2",
          label: "Stop",
          currentStage: 1,
          buttonStyle: {},
          stages: [
            { color: "#44A148", clickable: true },
            { color: "red", blinked: false, clickable: true },
            { color: "#c4b400", blinked: false, clickable: true }
          ]
        }
      ]
    }
  ]
}
`

export const reactCode = `import DraggableResizableContainer from 'draggable-resizable-container';

function App() {
  return (
    <DraggableResizableContainer
      data={data.containers}
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