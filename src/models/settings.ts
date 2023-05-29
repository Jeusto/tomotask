export type AppSettings = {
  pomodoro: {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
  };
  todolist: {
    showCompleted: boolean;
  };
  sound: {
    alarmEnabled: boolean;
    alarmSound: string;
  };
  notifications: {
    enabled: boolean;
  };
};
