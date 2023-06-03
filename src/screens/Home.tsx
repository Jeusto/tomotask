import { ColorfulView, Stack } from '@/components/layout';
import { TimerDisplay } from '@/components/pomodoro/TimerDisplay';
import { TimerModeSelection } from '@/components/pomodoro/TimerModeSelection';
import { TimerActionSection } from '@/components/pomodoro/TimerActionSection';
import { TodoHeader } from '@/components/todolist/TodoHeader';
import { TodoItem } from '@/components/todolist/TodoItem';
import { AddTaskDialog } from '@/components/todolist/AddTaskDialog';
import { AddTaskButton } from '@/components/todolist/AddTaskButton';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { UpdateTaskDialog } from '@/components/todolist/UpdateTaskDialog';
import { Header } from '@/components/Header';
import { useTodolistStore } from '@/stores/todolistStore';
import { useTimer } from '@/hooks/useTimer';
import type { RootStackParamList } from '../../App';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

interface HomeViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export function Home({ navigation }: HomeViewProps) {
  const { tasks, checkTask, selectTask } = useTodolistStore();
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
      <ColorfulView mode={mode} setTimerMode={setTimerMode}>
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
              {tasks.map((task) => (
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
      </ColorfulView>
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
