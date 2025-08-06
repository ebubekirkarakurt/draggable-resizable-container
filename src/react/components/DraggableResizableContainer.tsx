import React, { useEffect, useRef, useState } from "react";
import { DraggableResizableContainerProps, ContainerItem } from "./DraggableResizableAlarmContainerProps";
import '../styles/styles.css';

const DraggableResizableContainer: React.FC<DraggableResizableContainerProps> = ({
  data,
  pollingInterval = 1000,
  containerClassName,
  onButtonStageChanged,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ContainerItem[]>([]);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      const isResizeHandle =
        e.offsetX > container.clientWidth - 15 &&
        e.offsetY > container.clientHeight - 15;

      if (!isResizeHandle) {
        isDragging.current = true;
        offset.current = {
          x: e.clientX - container.getBoundingClientRect().left,
          y: e.clientY - container.getBoundingClientRect().top,
        };
        container.style.cursor = "grabbing";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      container!.style.left = `${e.clientX - offset.current.x}px`;
      container!.style.top = `${e.clientY - offset.current.y}px`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      if (container) container.style.cursor = "move";
    };

    container.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const fetchData = async () => {
    try {
      let incoming = data;
      if (typeof incoming === "function") {
        incoming = await incoming();
      }
      if (Array.isArray(incoming)) {
        setItems(incoming);
      }
    } catch (err) {
      console.error("Veri alma hatası:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollingInterval);
    return () => clearInterval(interval);
  }, [data]);

  const handleStageClick = (
    btn: ContainerItem["buttons"][number],
    containerId: string | number
  ) => {
    btn.currentStage = (btn.currentStage + 1) % btn.stages.length;

    if (onButtonStageChanged) {
      onButtonStageChanged({
        containerId,
        buttonId: btn.id,
        stageIndex: btn.currentStage,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerClassName || "resizable-container"}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="small-box"
        >
          <span id="list-title">{item.title}</span>
          <div className="multiStageBtn-container">
            {item.buttons.map((btn) => {
              const stage = btn.stages[btn.currentStage];
              return (
                <div
                  key={btn.id}
                  className={`multiStageBtn ${stage.blinked ? "blink" : ""}`}
                  style={{
                    flex: `${btn.width || 50}%`,
                    backgroundColor: stage.color,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStageClick(btn, item.id);
                  }}
                >
                  <span id="multiStageBtn-title">{btn.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraggableResizableContainer;
