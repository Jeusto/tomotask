import type { SingleTask } from '@/models';
import { Group } from '@/components/layout/Group';
import { useSound } from '@/hooks/useSound';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

interface Props extends SingleTask {
  check: (id: number) => void;
  select: (id: number) => void;
  showUpdateDialog: (taskId: number) => void;
}

const checkAudioFile = require('@/../assets/audio/check.mp3');

export const TodoItem = ({
  id,
  title: name,
  pomodoroCount,
  pomodoroEstimate,
  checked,
  check,
  showUpdateDialog,
}: Props) => {
  const { playSound } = useSound(checkAudioFile);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => showUpdateDialog(id)}>
      <Group justify="space-between" style={styles.container}>
        <Group spacing="xs">
          <Checkbox
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            color={checked ? '#ea5e57' : '#eee'}
            value={true}
            onValueChange={() => {
              playSound();
              check(id);
            }}
          />
          <Text style={[styles.name, checked && styles.checkedName]}>
            {name}
          </Text>
        </Group>
        {(pomodoroCount || pomodoroEstimate) > 0 && (
          <Text style={styles.pomodoroCount}>
            {pomodoroCount}/{pomodoroEstimate}
          </Text>
        )}
      </Group>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    width: 350,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  checkedName: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  pomodoroCount: {
    fontSize: 15,
    fontWeight: '500',
    color: '#888',
  },
});
