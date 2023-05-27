import { useState, useEffect } from 'react';
import type { TimerMode } from '../utils/types';

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

export const useTimer = () => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timerState, setTimerState] = useState<TimerState>({
    countdown: FOCUS_TIME_MINUTES,
    mode: 'Focus',
    isRunning: false,
  });

  useEffect(() => {
    if (timerState.countdown === 0) {
      const currentMode = TIMER_MODES[timerState.mode];
      setTimerState({
        ...timerState,
        mode: currentMode.nextMode,
        countdown: currentMode.duration,
        isRunning: false,
      });
      stopCountdown();
    }
  }, [timerState.countdown]);

  const startCountdown = () => {
    setTimerState({ ...timerState, isRunning: true });
    const id = setInterval(
      () =>
        setTimerState((prev) => ({
          ...prev,
          countdown: prev.countdown - 1000,
        })),
      1000,
    );
    setIntervalId(id);
  };

  const stopCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
  };

  const toggleTimer = () => {
    timerState.isRunning ? stopCountdown() : startCountdown();
  };

  const setNextTimerMode = () => {
    const currentMode = TIMER_MODES[timerState.mode];
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
