import { ColorfulView } from '../components/layout/ColorfulView';
import { Stack } from '../components/layout/Stack';
import { Group } from '../components/layout/Group';
import { useTimer } from '../hooks/useTimer';
import { TimerDisplay } from '../components/pomodoro/TimerDisplay';
import { TimerModeSelection } from '../components/pomodoro/TimerModeSelection';
import { TimerActionSection } from '../components/pomodoro/TimerActionSection';
import { useTodoList } from '../hooks/useTodoList';
import { TodoHeader } from '../components/todolist/TodoHeader';
import { TodoItem } from '../components/todolist/TodoItem';
import { AddTodoButton } from '../components/todolist/AddTodoButton';

import { Image, ScrollView, StyleSheet, Text } from 'react-native';

export function Home() {
  const { todos, checkTask, selectTask } = useTodoList();
  const {
    countdown,
    mode,
    isRunning,
    toggleTimer,
    setNextTimerMode,
    setTimerMode,
  } = useTimer();

  return (
    <ColorfulView timerMode={mode} style={styles.background}>
      <Stack>
        <Group spacing="xs">
          <Image style={styles.logo} source={require('../assets/tomato.png')} />
          <Text style={styles.title}>Tomotask</Text>
        </Group>
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
        <Stack spacing="xs" style={styles.todolistSection}>
          <TodoHeader
            completedTaskCount={todos.filter((t) => t.checked).length}
            totalTaskCount={todos.length}
          />
          <ScrollView>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                check={checkTask}
                select={selectTask}
                {...todo}
              />
            ))}
            <AddTodoButton />
          </ScrollView>
        </Stack>
      </Stack>
    </ColorfulView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  background: {
    paddingTop: 250,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
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
