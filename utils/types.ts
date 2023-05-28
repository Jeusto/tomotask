export type TimerMode = 'Focus' | 'Short Break' | 'Long Break';

export type SingleTodo = {
  id: number;
  name: string;
  note: string;
  pomodoroCount: number;
  pomodoroEstimate: number;
  checked: boolean;
  selected: boolean;
};
