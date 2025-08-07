import React, { useEffect, useRef, useState } from "react";
import {
  DraggableResizableContainerProps,
  ContainerItem
} from "./DraggableResizableAlarmContainerProps";
import "../styles/styles.css";

const DraggableResizableContainer: React.FC<DraggableResizableContainerProps> = ({
  data,
  containerClassName,
  onButtonStageChanged
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
          y: e.clientY - container.getBoundingClientRect().top
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
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const handleStageClick = (btn: ContainerItem["buttons"][number], containerId: string | number) => {
      setItems((prevItems) => {
        return prevItems.map((container) => {
          if (container.id !== containerId) return container;

          return {
            ...container,
            buttons: container.buttons.map((b) => {
              if (b.id !== btn.id) return b;
              const newStage = (b.currentStage + 1) % b.stages.length;

              if (onButtonStageChanged) {
                onButtonStageChanged({
                  containerId,
                  buttonId: b.id,
                  stageIndex: newStage
                });
              }

              return {
                ...b,
                currentStage: newStage
              };
            })
          };
        });
      });
    };



  return (
    <div
      ref={containerRef}
      className={containerClassName || "resizable-container"}
    >
      {items.map((item) => {
        const { textStyle, ...wrapperStyle } = item.labelStyle || {};

        return (
          <div key={item.id} className="small-box">
            <div className="title-wrapper" style={wrapperStyle}>
              <span id="list-title" style={textStyle || {}}>
                {item.label}
              </span>
            </div>

            <div className="multiStageBtn-container">
              {item.buttons.map((btn) => {
                const stage = btn.stages[btn.currentStage];
                const isClickable = stage.clickable !== false;

                return (
                  <div
                    key={btn.id}
                    className={`multiStageBtn ${stage.blinked ? "blink" : ""}`}
                    style={{ backgroundColor: stage.color, flexBasis: `${btn.width}%` }} 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isClickable) return;
                      handleStageClick(btn, item.id);
                    }}
                  >
                    <span id="multiStageBtn-title">{btn.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DraggableResizableContainer;
