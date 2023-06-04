import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { TimerMode } from '@/models';
import { theme } from '@/style/theme';
import { useTimer } from './TimerContext';

/**
 * Custom hook to handle color animation depending on the current mode
 * @param mode Current mode
 * @returns Animated color
 */
export const useAnimatedModeColor = (_mode: TimerMode) => {
  const [animatedColor] = useState(new Animated.Value(0));
  const { mode } = useTimer();

  useEffect(() => {
    let toValue = 1;

    if (mode === 'Short Break') {
      toValue = 0;
    } else if (mode === 'Long Break') {
      toValue = 2;
    }

    Animated.timing(animatedColor, {
      toValue,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [mode]);

  const interpolatedColor = animatedColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      theme.color.shortBreak,
      theme.color.focus,
      theme.color.longBreak,
    ],
  });

  return interpolatedColor;
};
