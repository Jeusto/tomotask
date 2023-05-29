import { AppSettings } from '@/models';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AppSettingsState {
  settings: AppSettings;
  setSettings: (newSettings: AppSettings) => void;
}

export const useAppSettingsStore = create(
  persist<AppSettingsState>(
    (set) => ({
      settings: {
        pomodoro: {
          focusDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          longBreakInterval: 4,
        },
        todolist: {
          showCompleted: true,
        },
        sound: {
          alarmEnabled: true,
          alarmSound: 'default',
        },
        notifications: {
          enabled: true,
        },
      },
      setSettings: (newSettings) => {
        set(() => ({
          settings: newSettings,
        }));
      },
    }),
    {
      name: 'app-settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
