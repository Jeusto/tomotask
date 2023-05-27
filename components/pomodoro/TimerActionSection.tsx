import type { TimerMode } from '../../utils/types';
import { modeColors } from '../../utils/theme';

import { Text, Pressable, View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type Props = {
  isTimerRunning: boolean;
  timerMode: TimerMode;
  toggleTimer: () => void;
  setNextTimerMode: (mode: TimerMode) => void;
};

export const TimerActionSection = ({
  isTimerRunning,
  timerMode,
  toggleTimer,
  setNextTimerMode,
}: Props) => {
  const dynamicStyles = StyleSheet.create({
    buttonText: {
      color: modeColors[timerMode],
    },
  });

  return (
    <View style={staticStyles.actionSection}>
      <Pressable
        style={staticStyles.button}
        onPress={() => {
          toggleTimer();
        }}
      >
        <Text style={[staticStyles.buttonText, dynamicStyles.buttonText]}>
          {isTimerRunning ? 'Pause' : 'Start'}
        </Text>
      </Pressable>
      {isTimerRunning && (
        <Pressable
          style={staticStyles.skipButton}
          onPress={() => setNextTimerMode(timerMode)}
        >
          <Feather name="skip-forward" size={32} color="white" />
        </Pressable>
      )}
    </View>
  );
};

const staticStyles = StyleSheet.create({
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
  actionSection: {
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    right: -50,
    top: '30%',
  },
});
