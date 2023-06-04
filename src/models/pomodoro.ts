export type TimerMode = 'Focus' | 'Short Break' | 'Long Break';

export interface TimerState {
  countdown: number;
  mode: TimerMode;
  isRunning: boolean;
}
