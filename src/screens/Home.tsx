import { ColorfulPanGestureView } from '@/components/ColorfulPanGestureView';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Header } from '@/components/Header';
import { PomodoroSection } from '@/components/pomodoro/PomodoroSection';
import { AddTaskDialog } from '@/components/todolist/AddTaskDialog';
import { TodolistSection } from '@/components/todolist/TodolistSection';
import { UpdateTaskDialog } from '@/components/todolist/UpdateTaskDialog';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { RootStackParamList } from '../../App';
import { TimerContextProvider } from '@/hooks/TimerContext';

interface HomeViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export function Home({ navigation }: HomeViewProps) {
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState({
    visible: false,
    taskId: -1,
  });

  const toggleAddDialog = () => setAddDialogVisible(!addDialogVisible);

  const toggleUpdateDialog = (taskId?: number) => {
    setUpdateDialogVisible({
      visible: !updateDialogVisible.visible,
      taskId: taskId ? taskId : -1,
    });
  };

  return (
    <GestureHandlerRootView>
      <StatusBar />
      <TimerContextProvider>
        <ColorfulPanGestureView style={styles.rootView}>
          <Header />
          <PomodoroSection />
          <TodolistSection
            toggleUpdateDialog={toggleUpdateDialog}
            toggleAddDialog={toggleAddDialog}
          />

          <FloatingActionButton
            toggleAddDialog={toggleAddDialog}
            navigateToSettings={() => navigation.navigate('Settings')}
          />
          <AddTaskDialog
            dialogVisible={addDialogVisible}
            toggleDialog={toggleAddDialog}
          />
          <UpdateTaskDialog
            dialogVisible={updateDialogVisible}
            toggleDialog={toggleUpdateDialog}
          />
        </ColorfulPanGestureView>
      </TimerContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootView: {
    height: '100%',
    paddingTop: Constants.statusBarHeight,
  },
});
