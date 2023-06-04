import type { TimerMode, TimerState } from '@/models';
import { useSound } from '@/hooks/useSound';
import { useNotification } from '@/hooks/useNotification';
import { useTodolistStore } from '@/stores/todolistStore';

import { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useAppSettingsStore } from '@/stores/settingsStore';

const alarmSoundFile = require('@/../assets/audio/alarm-kitchen.mp3');

export const useTimer = () => {
  const { playSound, stopSound } = useSound(alarmSoundFile);
  const { scheduleNotification, cancelNotification } = useNotification();
  const { incrementPomodoroCount } = useTodolistStore();
  const { settings } = useAppSettingsStore();

  const TIMER_MODES: Record<
    TimerMode,
    { duration: number; nextMode: TimerMode }
  > = {
    Focus: {
      duration: settings.pomodoro.focusDuration * 60 * 1000,
      nextMode: 'Short Break',
    },
    'Short Break': {
      duration: settings.pomodoro.shortBreakDuration * 60 * 1000,
      nextMode: 'Focus',
    },
    'Long Break': {
      duration: settings.pomodoro.longBreakDuration * 60 * 1000,
      nextMode: 'Focus',
    },
  };

  const leaveAppTimestamp = useRef<number | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [currentPomodoroCount, setCurrentPomodoroCount] = useState<number>(0);
  const [timerState, setTimerState] = useState<TimerState>({
    countdown: TIMER_MODES.Focus.duration,
    mode: 'Focus',
    isRunning: false,
  });

  useEffect(() => {
    // Use the AppState to detect when the app goes in the background so that when it
    // comes back to the foreground, we can calculate how much time has passed and
    // update the countdown accordingly
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: string) => {
        if (nextAppState === 'background') {
          leaveAppTimestamp.current = Date.now();
        } else if (nextAppState === 'active') {
          calculateElapsedTime();
        }
      },
    );

    if (timerState.countdown <= 0) {
      playSound();
      setNextTimerMode();
    }

    return () => {
      subscription.remove();
    };
  }, [timerState.countdown]);

  const calculateElapsedTime = () => {
    if (leaveAppTimestamp.current && timerState.isRunning) {
      const currentTimestamp = Date.now();
      const elapsedMilliseconds = currentTimestamp - leaveAppTimestamp.current;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

      if (elapsedSeconds > 0) {
        setTimerState((prev) => ({
          ...prev,
          countdown: Math.max(0, prev.countdown - elapsedMilliseconds),
        }));

        leaveAppTimestamp.current = null;
      }
    }
  };

  const startCountdown = () => {
    const id = setInterval(
      () =>
        setTimerState((prev) => ({
          ...prev,
          countdown: prev.countdown - 1000,
        })),
      1000,
    );

    setTimerState({ ...timerState, isRunning: true });
    setIntervalId(id);
    scheduleNotification(
      `Time's up!`,
      `Time for the next mode: "${TIMER_MODES[timerState.mode].nextMode}"`,
      timerState.countdown / 1000,
    );
  };

  const stopCountdown = () => {
    if (intervalId) clearInterval(intervalId);
    cancelNotification();
  };

  const toggleTimer = () => {
    timerState.isRunning ? stopCountdown() : startCountdown();

    stopSound();
    setTimerState({
      ...timerState,
      isRunning: !timerState.isRunning,
    });
  };

  const setNextTimerMode = () => {
    const currentMode = TIMER_MODES[timerState.mode];
    const newPomodoroCount = currentPomodoroCount + 1;

    if (timerState.mode === 'Focus') {
      incrementPomodoroCount();
      setCurrentPomodoroCount(currentPomodoroCount + 1);
    }

    if (
      timerState.mode === 'Focus' &&
      newPomodoroCount === settings.pomodoro.longBreakInterval
    ) {
      setTimerMode('Long Break');
      setCurrentPomodoroCount(0);
    } else {
      setTimerMode(currentMode.nextMode);
    }
  };

  const setTimerMode = (mode: TimerMode) => {
    setTimerState({
      ...timerState,
      mode,
      countdown: TIMER_MODES[mode].duration,
      isRunning: settings.pomodoro.autoStartNextRound,
    });

    if (!settings.pomodoro.autoStartNextRound) {
      stopCountdown();
      startCountdown();
    }

    cancelNotification();
  };

  return {
    countdown: timerState.countdown,
    mode: timerState.mode,
    isRunning: timerState.isRunning,
    toggleTimer,
    setNextTimerMode,
    setTimerMode,
  };
};
