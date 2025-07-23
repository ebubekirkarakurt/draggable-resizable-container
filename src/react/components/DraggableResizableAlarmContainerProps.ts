export interface AlarmItem {
  id: number | string;
  title: string;
  alarmStatus: number;
}

export interface DraggableResizableAlarmContainerProps {
  data: AlarmItem[] | (() => Promise<AlarmItem[]>);
  alarmAudioId?: string;
  pollingInterval?: number;
  containerClassName?: string;
  onBoxClick?: (id: string | number) => void;
  soundSrc?: string;
}
