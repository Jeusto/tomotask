import { useAnimatedModeColor } from '@/hooks';
import { Animated, StyleProp, StyleSheet, ViewProps } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useTimer } from '@/hooks/TimerContext';

const SWIPE_LEFT_THRESHOLD = -40;

interface Props extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<any>;
}

export const ColorfulPanGestureView = ({ children, style }: Props) => {
  const { mode, setNextTimerMode } = useTimer();

  const handleGestureStateChange = (event: any) => {
    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationX < SWIPE_LEFT_THRESHOLD
    ) {
      setNextTimerMode();
    }
  };

  const interpolatedColor = useAnimatedModeColor(mode);
  const dynamicStyles = StyleSheet.create({
    container: { backgroundColor: interpolatedColor as any },
  });

  return (
    <PanGestureHandler onHandlerStateChange={handleGestureStateChange}>
      <Animated.View style={[dynamicStyles.container, style]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};
