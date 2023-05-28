import { Group } from '../layout/Group';
import { Center } from '../layout/Center';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface Props {}

export const AddTodoButton = ({}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <Center>
        <Group style={styles.container} spacing="xs" justify="center">
          <Feather name="plus-circle" size={20} color="#D1D1D1" />
          <Text style={styles.name}>Add task</Text>
        </Group>
      </Center>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    padding: 8,
    margin: 8,
    borderRadius: 8,
    width: 350,
    height: 50,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#D1D1D1',
  },
});
