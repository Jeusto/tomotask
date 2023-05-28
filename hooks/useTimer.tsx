import type { TimerMode } from '../utils/types';
import { useSound } from './useSound';
import { useNotification } from './useNotification';
import { useTodoList } from '../stores/todolistStore';

import { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

interface TimerState {
  countdown: number;
  mode: TimerMode;
  isRunning: boolean;
}

const FOCUS_TIME_MINUTES = 25 * 60 * 1000;
const BREAK_TIME_MINUTES = 5 * 60 * 1000;
const LONG_BREAK_TIME_MINUTES = 15 * 60 * 1000;

const TIMER_MODES: Record<
  TimerMode,
  { duration: number; nextMode: TimerMode }
> = {
  Focus: {
    duration: FOCUS_TIME_MINUTES,
    nextMode: 'Short Break',
  },
  'Short Break': {
    duration: BREAK_TIME_MINUTES,
    nextMode: 'Long Break',
  },
  'Long Break': {
    duration: LONG_BREAK_TIME_MINUTES,
    nextMode: 'Focus',
  },
};

const alarmSoundFile = require('../assets/audio/alarm-kitchen.mp3');

export const useTimer = () => {
  const { playSound, stopSound } = useSound(alarmSoundFile);
  const { scheduleNotification, cancelNotification } = useNotification();
  const { incrementPomodoroCount } = useTodoList();

  const leaveAppTimestamp = useRef<number | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timerState, setTimerState] = useState<TimerState>({
    countdown: FOCUS_TIME_MINUTES,
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
      stopCountdown();

      const currentMode = TIMER_MODES[timerState.mode];
      const nextMode = currentMode.nextMode;

      setTimerState({
        ...timerState,
        mode: nextMode,
        countdown: TIMER_MODES[nextMode].duration,
        isRunning: false,
      });
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
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
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
    if (timerState.mode === 'Focus') incrementPomodoroCount();
    setTimerMode(currentMode.nextMode);
  };

  const setTimerMode = (mode: TimerMode) => {
    const newMode = TIMER_MODES[mode];

    setTimerState({
      ...timerState,
      mode,
      countdown: newMode.duration,
      isRunning: false,
    });

    stopCountdown();
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
