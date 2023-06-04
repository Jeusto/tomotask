import { useAnimatedModeColor } from '@/hooks';
import { TimerMode } from '@/models';
import { Animated, StyleProp, StyleSheet, ViewProps } from 'react-native';
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

  const interpolatedColor = useAnimatedModeColor(mode);
  const dynamicStyles = StyleSheet.create({
    container: { backgroundColor: interpolatedColor as any },
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
