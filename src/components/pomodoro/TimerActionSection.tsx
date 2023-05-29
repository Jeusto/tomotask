import type { TimerMode } from '@/utils/types';
import { modeColors } from '@/utils/theme';
import { useSound } from '@/hooks/useSound';

import Feather from '@expo/vector-icons/Feather';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const buttonSoundFile = require('@/../assets/audio/button-press.wav');

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
  const { playSound } = useSound(buttonSoundFile);

  const dynamicStyles = StyleSheet.create({
    buttonText: {
      color: modeColors[timerMode],
    },
  });

  return (
    <View style={staticStyles.actionSection}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={staticStyles.button}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => {
          playSound();
          toggleTimer();
        }}
      >
        <Text style={[staticStyles.buttonText, dynamicStyles.buttonText]}>
          {isTimerRunning ? 'Pause' : 'Start'}
        </Text>
      </TouchableOpacity>
      {isTimerRunning && (
        <TouchableOpacity
          style={staticStyles.skipButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => setNextTimerMode(timerMode)}
        >
          <Feather name="skip-forward" size={32} color="white" />
        </TouchableOpacity>
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
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
