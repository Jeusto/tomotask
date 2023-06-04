import { TimerMode } from '@/models';
import { theme } from '@/style/theme';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const SWIPE_LEFT_THRESHOLD = -40;

interface Props extends ViewProps {
  mode: TimerMode;
  onGesture: () => void;
  children: React.ReactNode;
  style?: StyleProp<any>;
}

export const ColorfulPanGestureView = ({
  mode,
  onGesture,
  children,
  style,
}: Props) => {
  const handleGestureStateChange = (event: any) => {
    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationX < SWIPE_LEFT_THRESHOLD
    ) {
      onGesture();
    }
  };

  const backgroundColor = useState(new Animated.Value(0))[0];

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      theme.color.shortBreak,
      theme.color.focus,
      theme.color.longBreak,
    ],
  });

  useEffect(() => {
    let toValue = 1;

    if (mode === 'Short Break') {
      toValue = 0;
    } else if (mode === 'Long Break') {
      toValue = 2;
    }

    Animated.timing(backgroundColor, {
      toValue,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [mode]);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: interpolatedColor as any,
    },
  });

  return (
    <PanGestureHandler onHandlerStateChange={handleGestureStateChange}>
      <Animated.View
        style={[staticStyles.container, dynamicStyles.container, style]}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const staticStyles = StyleSheet.create({
  container: {
    paddingTop: 250,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
