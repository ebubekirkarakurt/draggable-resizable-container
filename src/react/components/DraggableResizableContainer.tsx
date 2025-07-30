import React, { useEffect, useRef, useState } from "react";
import { DraggableResizableAlarmContainerProps, AlarmItem } from "./DraggableResizableAlarmContainerProps";
import '../styles/styles.css';

const DraggableResizableContainer: React.FC<DraggableResizableAlarmContainerProps> = ({
  data,
  alarmAudioId = "alarmSound",
  pollingInterval = 1000,
  containerClassName,
  onBoxClick,
  soundSrc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<AlarmItem[]>([]);
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Dragging setup
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

  useEffect(() => {
    if (!alarmSoundRef.current) {
      const audio = document.createElement("audio");
      audio.id = alarmAudioId;
      if (soundSrc) audio.src = soundSrc;
      document.body.appendChild(audio);
      alarmSoundRef.current = audio;
    }

    const anyAlarm = items.some((item) => item.alarmStatus === 1);

    if (anyAlarm && !alarmIntervalRef.current) {
      alarmIntervalRef.current = setInterval(() => {
        if (alarmSoundRef.current) {
          alarmSoundRef.current.currentTime = 0;
          alarmSoundRef.current.play().catch(() => {});
        }
      }, 1000);
    } else if (!anyAlarm && alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  }, [items, soundSrc]);

  return (
    <div
      ref={containerRef}
      className={containerClassName || "resizable-container"}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="small-box"
          onClick={() => onBoxClick?.(item.id)}
        >
          <span id="list-title" >
            {item.title}
          </span>
          <div
            className="top-right-box"
            style={{
              backgroundColor: item.alarmStatus === 1 ? "green" : "gray",
              animation:
                item.alarmStatus === 1 ? "blink-animation 1s infinite" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DraggableResizableContainer;
