export interface ContainerItem {
  id: number | string;
  label: string;
  labelStyle?: {
    [key: string]: any; 
    textStyle?: {
      [key: string]: any; 
    };
  };
  buttons?: {
    id: string;
    label: string;
    width: number;
    currentStage: number;
    stages: {
      color: string;
      blinked?: boolean;
      clickable?: boolean;
    }[];
    buttonStyle?: {
      [key: string]: any;
    };
  }[];
}


export interface DraggableResizableContainerProps {
  data: ContainerItem[] | (() => Promise<ContainerItem[]>);
  containerClassName?: string;
  onButtonStageChanged?: (event: {
    containerId: string | number;
    buttonId: string | number;
    stageIndex: number;
  }) => void;
}
