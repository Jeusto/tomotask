import type { SingleTodo } from '../../utils/types';
import { Group } from '../layout/Group';
import { useSound } from '../../hooks/useSound';

import { Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

interface Props extends SingleTodo {
  check: (id: number) => void;
}

const checkAudioFile = require('../../assets/audio/check.mp3');

export const TodoItem = ({
  id,
  name,
  pomodoroCount,
  checked,
  check,
}: Props) => {
  const playSound = useSound(checkAudioFile);

  return (
    <Group justify="space-between" style={styles.container}>
      <Group spacing="xs">
        <Checkbox
          style={styles.checkbox}
          color={checked ? '#e06c75' : '#eee'}
          value={true}
          onValueChange={() => {
            playSound();
            check(id);
          }}
        />
        <Text style={[styles.name, checked && styles.checkedName]}>{name}</Text>
      </Group>
      <Text>{pomodoroCount}</Text>
    </Group>
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
});
