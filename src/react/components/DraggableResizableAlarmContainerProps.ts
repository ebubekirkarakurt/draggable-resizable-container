export interface ContainerItem {
  id: number | string;
  label: string;
  buttons?: {
    id: string;
    label: string;
    width: number;
    currentStage: number;
    stages: {
      color: string;
      blinked?: boolean;
    }[];
  }[];
}


export interface DraggableResizableContainerProps {
  data: ContainerItem[] | (() => Promise<ContainerItem[]>);
  pollingInterval?: number;
  containerClassName?: string;
  onButtonStageChanged?: (event: {
    containerId: string | number;
    buttonId: string | number;
    stageIndex: number;
  }) => void;
}
