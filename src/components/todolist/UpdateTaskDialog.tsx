import { useTodoList } from '@/stores/todolistStore';
import { NewTask } from '@/models';

import Feather from 'react-native-vector-icons/Feather';
import { StyleSheet, TextInput } from 'react-native';
import { Dialog, Button } from '@rneui/themed';
import { useEffect, useState } from 'react';

interface Props {
  hideDialog: () => void;
  dialogVisible: {
    visible: boolean;
    taskId: number;
  };
}

export const UpdateTaskDialog = ({ hideDialog, dialogVisible }: Props) => {
  const { updateTask, deleteTask, tasks } = useTodoList();
  const task = tasks.find((t) => t.id === dialogVisible.taskId);

  const [newTaskDetails, setNewTaskDetails] = useState<NewTask>({
    title: '',
    note: '',
    pomodoroEstimate: -1,
  });

  useEffect(() => {
    setNewTaskDetails({
      title: task?.title || '',
      note: task?.note || '',
      pomodoroEstimate: task?.pomodoroEstimate || 0,
    });
  }, [task]);

  return (
    <Dialog isVisible={dialogVisible.visible} onBackdropPress={hideDialog}>
      <Dialog.Title title="Update task" />
      <TextInput
        placeholder="Task title"
        style={styles.input}
        value={newTaskDetails.title}
        onChangeText={(value) => {
          setNewTaskDetails({ ...newTaskDetails, title: value });
        }}
      />
      <TextInput
        placeholder="Details/notes"
        style={styles.input}
        value={newTaskDetails.note}
        onChangeText={(value) => {
          setNewTaskDetails({ ...newTaskDetails, note: value });
        }}
      />
      <TextInput
        placeholder="Number of pomodoros to complete"
        style={styles.input}
        keyboardType="numeric"
        value={newTaskDetails.pomodoroEstimate.toString()}
        onChangeText={(value) => {
          setNewTaskDetails({ ...newTaskDetails, pomodoroEstimate: +value });
        }}
      />
      <Button
        color="#e06c75"
        onPress={() => {
          deleteTask(dialogVisible.taskId);
          hideDialog();
        }}
      >
        <Feather
          name="trash-2"
          size={16}
          color="white"
          style={styles.trashIcon}
        />
        Delete task
      </Button>
      <Dialog.Actions>
        <Dialog.Button
          title="UPDATE TASK"
          onPress={() => {
            updateTask(dialogVisible.taskId, newTaskDetails);
            hideDialog();
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
  trashIcon: {
    marginRight: 5,
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
