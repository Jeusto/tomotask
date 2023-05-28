import type { SingleTask } from '../../utils/types';
import { Group } from '../layout/Group';
import { useSound } from '../../hooks/useSound';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

interface Props extends SingleTask {
  check: (id: number) => void;
  select: (id: number) => void;
}

const checkAudioFile = require('../../assets/audio/check.mp3');

export const TodoItem = ({
  id,
  title: name,
  pomodoroCount,
  pomodoroEstimate,
  checked,
  selected,
  check,
  select,
}: Props) => {
  const { playSound } = useSound(checkAudioFile);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => select(id)}>
      <Group
        justify="space-between"
        style={[styles.container, selected && styles.selectedContainer]}
      >
        <Group spacing="xs">
          <Checkbox
            style={styles.checkbox}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            color={checked ? '#e06c75' : '#eee'}
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
        <Text style={styles.pomodoroCount}>
          {pomodoroCount}/{pomodoroEstimate}
        </Text>
      </Group>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
    color: 'green',
    backgroundColor: 'green',
  },
  container: {
    backgroundColor: '#fff',
    padding: 8,
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
  selectedContainer: {
    borderLeftColor: '#000000B9',
    borderLeftWidth: 4,
    paddingLeft: 4,
  },
});
