import { Stack } from './components/layout/Stack';
import { ColorfulView } from './components/layout/ColorfulView';
import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/pomodoro/TimerDisplay';
import { TimerModeSelection } from './components/pomodoro/TimerModeSelection';
import { TimerActionSection } from './components/pomodoro/TimerActionSection';
import { useTodoList } from './hooks/useTodoList';
import { TodoHeader } from './components/todolist/TodoHeader';
import { TodoItem } from './components/todolist/TodoItem';
import { AddTodoButton } from './components/todolist/AddTodoButton';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';

export default function App() {
  const {
    countdown,
    mode,
    isRunning,
    toggleTimer,
    setNextTimerMode,
    setTimerMode,
  } = useTimer();

  const { todos, checkTodo } = useTodoList();

  return (
    <ColorfulView timerMode={mode}>
      <StatusBar style="auto" />
      <Text>Tomotask 🍅</Text>
      <Stack spacing="xs" style={staticStyles.pomodoroSection}>
        <TimerModeSelection timerMode={mode} setTimerMode={setTimerMode} />
        <TimerDisplay countdown={countdown} />
        <TimerActionSection
          isTimerRunning={isRunning}
          timerMode={mode}
          toggleTimer={toggleTimer}
          setNextTimerMode={setNextTimerMode}
        />
      </Stack>
      <Stack spacing="xs" style={staticStyles.todolistSection}>
        <TodoHeader />
        {todos.map((todo) => (
          <TodoItem key={todo.id} check={checkTodo} {...todo} />
        ))}
        <AddTodoButton />
      </Stack>
    </ColorfulView>
  );
}

const staticStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  pomodoroSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 30,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  todolistSection: {},
});
