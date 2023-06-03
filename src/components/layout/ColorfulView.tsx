import { TimerMode } from '@/models';
import { theme } from '@/style/theme';

import React from 'react';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface ColorfulViewProps extends ViewProps {
  mode: TimerMode;
  setTimerMode: (mode: TimerMode) => void;
  children: React.ReactNode;
}

export const ColorfulView = ({
  mode,
  setTimerMode,
  children,
  style,
}: ColorfulViewProps) => {
  const backgroundColor = useState(new Animated.Value(0))[0];

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      theme.color.focus,
      theme.color.shortBreak,
      theme.color.longBreak,
    ],
  });

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: mode === 'Focus' ? 0 : mode === 'Short Break' ? 1 : 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [mode, backgroundColor]);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: interpolatedColor as any,
      paddingTop: 250,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (event.nativeEvent.translationX > 100) {
        setTimerMode('Focus');
      } else if (event.nativeEvent.translationX < -100) {
        setTimerMode('Long Break');
      } else if (
        event.nativeEvent.translationX > -100 &&
        event.nativeEvent.translationX < 100
      ) {
        setTimerMode('Short Break');
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <Animated.View style={[dynamicStyles.container, style]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};
