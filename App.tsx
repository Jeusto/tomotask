import { Stack } from './components/layout/Stack';
import { Group } from './components/layout/Group';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Animated, StyleSheet, Text, View, Pressable } from 'react-native';

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
const LONG_BREAK_TIME_MINUTES = 0.1 * 60 * 1000;

type TimerModes = 'Focus' | 'Short Break' | 'Long Break';

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [timerMode, setTimerMode] = useState<TimerModes>('Focus');
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

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
    buttonText: {
      color:
        timerMode === 'Focus'
          ? '#ba4949'
          : timerMode === 'Short Break'
          ? '#38858a'
          : '#397097',
    },
  });

  return (
    <Animated.View style={[staticStyles.container, dynamicStyles.container]}>
      <StatusBar style="auto" />
      <Text style={staticStyles.modeButtonText}>Tomotask 🍅</Text>
      <Stack style={staticStyles.timerSection} spacing="xs">
        <Group spacing="xs">
          <Pressable
            onPress={() => setTimerMode('Focus')}
            style={[
              staticStyles.modeButton,
              timerMode === 'Focus' && staticStyles.activeModeButton,
            ]}
          >
            <Text style={staticStyles.modeButtonText}>Focus</Text>
          </Pressable>
          <Pressable
            onPress={() => setTimerMode('Short Break')}
            style={[
              staticStyles.modeButton,
              timerMode === 'Short Break' && staticStyles.activeModeButton,
            ]}
          >
            <Text style={staticStyles.modeButtonText}>Short Break</Text>
          </Pressable>
          <Pressable
            onPress={() => setTimerMode('Long Break')}
            style={[
              staticStyles.modeButton,
              timerMode === 'Long Break' && staticStyles.activeModeButton,
            ]}
          >
            <Text style={staticStyles.modeButtonText}>Long Break</Text>
          </Pressable>
        </Group>
        <Text style={staticStyles.timerText}>10:50</Text>
        <View style={staticStyles.actionSection}>
          <Pressable
            style={staticStyles.button}
            onPress={() => {
              setIsTimerRunning(!isTimerRunning);
            }}
          >
            <Text style={[staticStyles.buttonText, dynamicStyles.buttonText]}>
              {isTimerRunning ? 'Pause' : 'Start'}
            </Text>
          </Pressable>
          <Pressable style={staticStyles.skipButton}>
            <Feather name="skip-forward" size={32} color="white" />
          </Pressable>
        </View>
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
  button: {
    borderWidth: 0,
    borderRadius: 4,
    shadowColor: 'rgb(235, 235, 235)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    fontSize: 22,
    height: 55,
    color: 'rgb(186, 73, 73)',
    fontWeight: 'bold',
    width: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 6 }],
  },
  buttonText: {
    fontSize: 22,
  },
  timer: {
    fontSize: 40,
    color: 'white',
  },
  timerText: {
    fontSize: 100,
    color: 'white',
    fontWeight: '500',
  },
  modeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  activeModeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modeButtonText: {
    color: 'white',
  },
  timerSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 30,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  actionSection: {
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    right: -50,
    top: '30%',
  },
});
