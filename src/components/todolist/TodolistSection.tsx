import { Stack } from '@/components/layout';
import { AddTaskButton } from '@/components/todolist/AddTaskButton';
import { TodoHeader } from '@/components/todolist/TodoHeader';
import { TodoItem } from '@/components/todolist/TodoItem';
import { useAppSettingsStore } from '@/stores/settingsStore';
import { useTodolistStore } from '@/stores/todolistStore';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  toggleUpdateDialog: (taskId?: number) => void;
  toggleAddDialog: () => void;
}

export const TodolistSection = ({
  toggleUpdateDialog,
  toggleAddDialog,
}: Props) => {
  const { tasks, checkTask, selectTask } = useTodolistStore();
  const { settings } = useAppSettingsStore();

  return (
    <View style={styles.todoSection}>
      <Stack style={styles.todoSectionInner} spacing="xs">
        <TodoHeader
          completedTaskCount={tasks.filter((t) => t.checked).length}
          totalTaskCount={tasks.length}
        />
        <ScrollView style={styles.todoList}>
          {tasks
            .filter((t) =>
              settings.todolist.showCompleted ? true : !t.checked,
            )
            .map((task) => (
              <TodoItem
                key={task.id}
                check={checkTask}
                select={selectTask}
                showUpdateDialog={toggleUpdateDialog}
                {...task}
              />
            ))}
          <AddTaskButton showAddDialog={toggleAddDialog} />
        </ScrollView>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  todoSection: {
    flex: 10,
    marginTop: 15,
    overflow: 'visible',
  },
  todoSectionInner: {
    height: '100%',
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  todoList: {
    overflow: 'hidden',
    flex: 1,
  },
});
