import { useTodoList } from '@/stores/todolistStore';
import { NewTask } from '@/models';

import { StyleSheet, TextInput, Text } from 'react-native';
import { Dialog } from '@rneui/themed';
import { useState } from 'react';

interface Props {
  dialogVisible: boolean;
  hideDialog: () => void;
}

export const AddTaskDialog = ({ dialogVisible, hideDialog }: Props) => {
  const { addTask } = useTodoList();
  const [error, setError] = useState('');

  const [newTaskDetails, setNewTaskDetails] = useState<NewTask>({
    title: '',
    note: '',
    pomodoroEstimate: 0,
  });
  const resetTaskDetails = () => {
    setNewTaskDetails({ title: '', note: '', pomodoroEstimate: 0 });
    setError('');
  };

  const validateTaskDetails = () => {
    if (newTaskDetails.title === '') {
      setError('Task title cannot be empty');
      return false;
    }
    return true;
  };

  const addNewTask = () => {
    if (validateTaskDetails()) {
      addTask(newTaskDetails);
      hideDialog();
      resetTaskDetails();
    }
  };

  return (
    <Dialog isVisible={dialogVisible} onBackdropPress={hideDialog}>
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
      {error && <Text style={styles.errorMessage}>Error: {error}</Text>}
      <Dialog.Actions>
        <Dialog.Button
          title="ADD"
          onPress={() => {
            addNewTask();
          }}
        />
        <Dialog.Button title="CANCEL" onPress={hideDialog} />
      </Dialog.Actions>
    </Dialog>
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
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginVertical: 5,
  },
});
