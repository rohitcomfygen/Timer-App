export type TimerStatus = 'running' | 'paused' | 'completed';

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  category: string;
  status: TimerStatus;
  halfwayAlertTriggered?: boolean;
  completedAt?: string;
}