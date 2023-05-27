import { Text, StyleSheet, Pressable } from 'react-native';
import type { TimerMode } from '../../utils/types';
import { Group } from '../layout/Group';

type Props = {
  timerMode: TimerMode;
  setTimerMode: (mode: TimerMode) => void;
};

export const TimerModeSelection = ({ timerMode, setTimerMode }: Props) => {
  return (
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
  );
};

const staticStyles = StyleSheet.create({
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
});
