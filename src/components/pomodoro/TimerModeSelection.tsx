import type { TimerMode } from '@/models';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Group } from '@/components/layout/Group';

type Props = {
  timerMode: TimerMode;
  setTimerMode: (mode: TimerMode) => void;
};

export const TimerModeSelection = ({ timerMode, setTimerMode }: Props) => {
  return (
    <Group spacing="xs">
      <TouchableOpacity
        onPress={() => setTimerMode('Focus')}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: undefined }}
        style={[
          staticStyles.modeButton,
          timerMode === 'Focus' && staticStyles.activeModeButton,
        ]}
      >
        <Text style={staticStyles.modeButtonText}>Focus</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTimerMode('Short Break')}
        hitSlop={{ top: 30, bottom: 30, left: undefined, right: undefined }}
        style={[
          staticStyles.modeButton,
          timerMode === 'Short Break' && staticStyles.activeModeButton,
        ]}
      >
        <Text style={staticStyles.modeButtonText}>Short Break</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTimerMode('Long Break')}
        hitSlop={{ top: 30, bottom: 30, left: undefined, right: 30 }}
        style={[
          staticStyles.modeButton,
          timerMode === 'Long Break' && staticStyles.activeModeButton,
        ]}
      >
        <Text style={staticStyles.modeButtonText}>Long Break</Text>
      </TouchableOpacity>
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
