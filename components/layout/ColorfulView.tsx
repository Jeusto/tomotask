import React from 'react';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';

interface ColorfulViewProps extends ViewProps {
  timerMode: string;
  children: React.ReactNode;
}

export const ColorfulView = ({
  children,
  timerMode,
  style,
}: ColorfulViewProps) => {
  const backgroundColor = useState(new Animated.Value(0))[0];
  const focusColor = '#ba4949';
  const shortBreakColor = '#38858a';
  const longBreakColor = '#397097';

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [focusColor, shortBreakColor, longBreakColor],
  });

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: timerMode === 'Focus' ? 0 : timerMode === 'Short Break' ? 1 : 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [timerMode, backgroundColor]);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: interpolatedColor as any,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Animated.View style={[dynamicStyles.container, style]}>
      {children}
    </Animated.View>
  );
};
