export interface ContainerItem {
  id: number | string;
  label: string;
  alarmStatus: number;
}

export interface DraggableResizableAlarmContainerProps {
  data: ContainerItem[] | (() => Promise<ContainerItem[]>);
  alarmAudioId?: string;
  pollingInterval?: number;
  containerClassName?: string;
  onBoxClick?: (id: string | number) => void;
  soundSrc?: string;
}


 {
            id: "container-1",
            label: "Motor",
            buttons: [
              {
                id: "btn-1-1",
                label: "İmdaat!!",
                width: 50,
                currentStage: 1,
                stages: [
                  { color: "green" },
                  { color: "red", blinked: true },
                  { color: "yellow", blinked: true }
                ]
              },
              {
                id: "btn-1-2",
                label: "Help ME!!",
                width: 50,
                currentStage: 0,
                stages: [
                  { color: "green" },
                  { color: "red", blinked: true },
                  { color: "yellow", blinked: true }
                ]
              }
            ]
          },