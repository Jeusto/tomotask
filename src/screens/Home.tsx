import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Header } from '@/components/Header';
import { Stack } from '@/components/layout';
import { TimerActionSection } from '@/components/pomodoro/TimerActionSection';
import { TimerDisplay } from '@/components/pomodoro/TimerDisplay';
import { TimerModeSelection } from '@/components/pomodoro/TimerModeSelection';
import { AddTaskButton } from '@/components/todolist/AddTaskButton';
import { AddTaskDialog } from '@/components/todolist/AddTaskDialog';
import { TodoHeader } from '@/components/todolist/TodoHeader';
import { TodoItem } from '@/components/todolist/TodoItem';
import { UpdateTaskDialog } from '@/components/todolist/UpdateTaskDialog';
import { useTimer } from '@/hooks';
import { useAppSettingsStore } from '@/stores/settingsStore';
import { useTodolistStore } from '@/stores/todolistStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { RootStackParamList } from '../../App';
import { ColorfulPanGestureView } from '@/components/ColorfulPanGestureView';

interface HomeViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export function Home({ navigation }: HomeViewProps) {
  const { tasks, checkTask, selectTask } = useTodolistStore();
  const { settings } = useAppSettingsStore();
  const {
    countdown,
    mode,
    isRunning,
    toggleTimer,
    setNextTimerMode,
    setTimerMode,
  } = useTimer();

  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const showAddDialog = () => setAddDialogVisible(true);
  const hideAddDialog = () => setAddDialogVisible(false);

  const [updateDialogVisible, setUpdateDialogVisible] = useState({
    visible: false,
    taskId: -1,
  });
  const showUpdateDialog = (taskId: number) => {
    setUpdateDialogVisible({ visible: true, taskId });
  };
  const hideUpdateDialog = () => {
    setUpdateDialogVisible({ visible: false, taskId: -1 });
  };

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <StatusBar />
      <ColorfulPanGestureView mode={mode} onGesture={setNextTimerMode}>
        <Stack>
          <Header />
          <Stack spacing="xs" style={styles.pomodoroSection}>
            <TimerModeSelection timerMode={mode} setTimerMode={setTimerMode} />
            <TimerDisplay countdown={countdown} />
            <TimerActionSection
              isTimerRunning={isRunning}
              timerMode={mode}
              toggleTimer={toggleTimer}
              setNextTimerMode={setNextTimerMode}
            />
          </Stack>
          <Stack spacing="xs">
            <TodoHeader
              completedTaskCount={tasks.filter((t) => t.checked).length}
              totalTaskCount={tasks.length}
            />
            <ScrollView>
              {tasks
                .filter((t) =>
                  settings.todolist.showCompleted ? true : !t.checked,
                )
                .map((task) => (
                  <TodoItem
                    key={task.id}
                    check={checkTask}
                    select={selectTask}
                    showUpdateDialog={showUpdateDialog}
                    {...task}
                  />
                ))}
              <AddTaskButton showAddDialog={showAddDialog} />
            </ScrollView>
          </Stack>
        </Stack>
        <FloatingActionButton
          showAddDialog={showAddDialog}
          navigateToSettings={() => navigation.navigate('Settings')}
        />
        <AddTaskDialog
          dialogVisible={addDialogVisible}
          hideDialog={hideAddDialog}
        />
        <UpdateTaskDialog
          dialogVisible={updateDialogVisible}
          hideDialog={hideUpdateDialog}
        />
      </ColorfulPanGestureView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoroSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 30,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
});
