import { Stack } from './components/layout/Stack';
import { TimerDisplay } from './components/pomodoro/TimerDisplay';
import { TimerModeSelection } from './components/pomodoro/TimerModeSelection';
import { TimerActionSection } from './components/pomodoro/TimerActionSection';
import { modeColors } from './utils/theme';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const FOCUS_TIME_MINUTES = 25 * 60 * 1000;
const BREAK_TIME_MINUTES = 5 * 60 * 1000;
const LONG_BREAK_TIME_MINUTES = 15 * 60 * 1000;

type TimerModes = 'Focus' | 'Short Break' | 'Long Break';

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [timerMode, setTimerMode] = useState<TimerModes>('Focus');
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === 'Focus') {
        setTimerMode('Short Break');
        setTimerCount(BREAK_TIME_MINUTES);
      } else {
        setTimerMode('Focus');
        setTimerCount(FOCUS_TIME_MINUTES);
      }
      stopCountdown();
    }
  }, [timerCount]);

  useEffect(() => {
    if (timerMode === 'Focus') {
      setTimerCount(FOCUS_TIME_MINUTES);
    } else if (timerMode === 'Short Break') {
      setTimerCount(BREAK_TIME_MINUTES);
    } else {
      setTimerCount(LONG_BREAK_TIME_MINUTES);
    }
  }, [timerMode]);

  const startCountdown = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setIntervalId(id);
  };

  const stopCountdown = () => {
    setIsTimerRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
  };

  const toggleTimer = () => {
    isTimerRunning ? stopCountdown() : startCountdown();
  };

  const nextTimerMode = () => {
    if (timerMode === 'Focus') {
      setTimerMode('Short Break');
    } else if (timerMode === 'Short Break') {
      setTimerMode('Long Break');
    } else {
      setTimerMode('Focus');
    }
  };

  const backgroundColor = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: timerMode === 'Focus' ? 0 : timerMode === 'Short Break' ? 1 : 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [timerMode, backgroundColor]);

  const focusColor = '#ba4949';
  const shortBreakColor = '#38858a';
  const longBreakColor = '#397097';

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [focusColor, shortBreakColor, longBreakColor],
  });

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: interpolatedColor as any,
    },
  });

  return (
    <Animated.View style={[staticStyles.container, dynamicStyles.container]}>
      <StatusBar style="auto" />
      <Text>Tomotask 🍅</Text>
      <Stack spacing="xs">
        <TimerModeSelection timerMode={timerMode} setTimerMode={setTimerMode} />
        <TimerDisplay countdown={timerCount} />
        <TimerActionSection
          isTimerRunning={isTimerRunning}
          timerMode={timerMode}
          toggleTimer={toggleTimer}
        />
      </Stack>
    </Animated.View>
  );
}

const staticStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
});
