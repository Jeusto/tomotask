export type TimerMode = 'Focus' | 'Short Break' | 'Long Break';

export type SingleTask = {
  id: number;
  title: string;
  note: string;
  pomodoroCount: number;
  pomodoroEstimate: number;
  checked: boolean;
  selected: boolean;
};
