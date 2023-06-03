export type AppSettings = {
  pomodoro: {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
    autoStartNextRound: boolean;
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
