import { Group, Center } from '@/components/layout';

import Feather from '@expo/vector-icons/Feather';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  showAddDialog: () => void;
}

export const AddTaskButton = ({ showAddDialog }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={showAddDialog}>
      <Center>
        <Group style={styles.container} spacing="xs" justify="center">
          <Feather name="plus-circle" size={20} color="#D1D1D1" />
          <Text style={styles.name}>Add new task</Text>
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
