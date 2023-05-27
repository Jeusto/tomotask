import { useState, useEffect } from 'react';
import type { TimerMode } from '../utils/types';

const FOCUS_TIME_MINUTES = 25 * 60 * 1000;
const BREAK_TIME_MINUTES = 5 * 60 * 1000;
const LONG_BREAK_TIME_MINUTES = 15 * 60 * 1000;

interface TimerState {
  countdown: number;
  mode: TimerMode;
  isRunning: boolean;
}

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    countdown: FOCUS_TIME_MINUTES,
    mode: 'Focus',
    isRunning: false,
  });

  useEffect(() => {
    if (timerState.countdown === 0) {
      if (timerState.mode === 'Focus') {
        setTimerState({
          ...timerState,
          mode: 'Short Break',
          countdown: BREAK_TIME_MINUTES,
          isRunning: false,
        });
      } else {
        setTimerState({
          ...timerState,
          mode: 'Focus',
          countdown: FOCUS_TIME_MINUTES,
          isRunning: false,
        });
      }
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
    // setIntervalId(id);
  };

  const stopCountdown = () => {
    setTimerState({ ...timerState, isRunning: false });
    // if (intervalId) {
    //   clearInterval(intervalId);
    // }
    // setIntervalId(null);
  };

  const toggleTimer = () => {
    timerState.isRunning ? stopCountdown() : startCountdown();
  };

  const setNextTimerMode = () => {
    if (timerState.mode === 'Focus') {
      setTimerMode('Short Break');
    } else if (timerState.mode === 'Short Break') {
      setTimerMode('Long Break');
    } else {
      setTimerMode('Focus');
    }
  };

  const setTimerMode = (mode: TimerMode) => {
    if (mode === 'Focus') {
      setTimerState({
        ...timerState,
        mode: 'Focus',
        countdown: FOCUS_TIME_MINUTES,
      });
    } else if (mode === 'Short Break') {
      setTimerState({
        ...timerState,
        mode: 'Short Break',
        countdown: BREAK_TIME_MINUTES,
      });
    } else {
      setTimerState({
        ...timerState,
        mode: 'Long Break',
        countdown: LONG_BREAK_TIME_MINUTES,
      });
    }
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
