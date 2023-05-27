import type { SingleTodo } from '../../utils/types';
import { Group } from '../layout/Group';

import { Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

interface Props extends SingleTodo {
  check: (id: number) => void;
}

export const TodoItem = ({
  id,
  name,
  pomodoroCount,
  checked,
  check,
}: Props) => {
  return (
    <Group justify="space-between">
      <Checkbox
        style={styles.checkbox}
        color={checked ? 'red' : '#eee'}
        value={true}
        onValueChange={() => check(id)}
      />
      <Text>{name}</Text>
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
});
