import { Group } from '../layout/Group';
import { Center } from '../layout/Center';
import { useTodoList } from '../../stores/todolistStore';

import Feather from '@expo/vector-icons/Feather';
import { Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Dialog } from '@rneui/themed';
import { useState } from 'react';
import { NewTask } from '../../utils/types';

interface Props {}

export const AddTodo = ({}: Props) => {
  const { addTask } = useTodoList();

  const [newTaskDetails, setNewTaskDetails] = useState<NewTask>({
    title: '',
    note: '',
    pomodoroEstimate: 0,
  });
  const resetTaskDetails = () => {
    setNewTaskDetails({ title: '', note: '', pomodoroEstimate: 0 });
  };

  const [dialogVisible, setDialogVisible] = useState(false);
  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleDialog}>
        <Center>
          <Group style={styles.container} spacing="xs" justify="center">
            <Feather name="plus-circle" size={20} color="#D1D1D1" />
            <Text style={styles.name}>Add task</Text>
          </Group>
        </Center>
      </TouchableOpacity>
      <Dialog isVisible={dialogVisible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Add new task" />
        <TextInput
          placeholder="Task title"
          style={styles.input}
          onChangeText={(value) => {
            setNewTaskDetails({ ...newTaskDetails, title: value });
          }}
        />
        <TextInput
          placeholder="Details/notes"
          style={styles.input}
          onChangeText={(value) => {
            setNewTaskDetails({ ...newTaskDetails, note: value });
          }}
        />
        <TextInput
          placeholder="Number of pomodoros to complete"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => {
            setNewTaskDetails({ ...newTaskDetails, pomodoroEstimate: +value });
          }}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="ADD"
            onPress={() => {
              addTask(newTaskDetails);
              resetTaskDetails();
              toggleDialog();
            }}
          />
          <Dialog.Button title="CANCEL" onPress={toggleDialog} />
        </Dialog.Actions>
      </Dialog>
    </>
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
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
