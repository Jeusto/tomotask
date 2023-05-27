export type TimerMode = 'Focus' | 'Short Break' | 'Long Break';

export type TodoItem = {
  id: number;
  name: string;
  note: string;
  pomodoroCount: number;
  checked: boolean;
};
