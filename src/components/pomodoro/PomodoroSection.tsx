import { Stack } from '@/components/layout';
import { TimerActionSection } from '@/components/pomodoro/TimerActionSection';
import { TimerDisplay } from '@/components/pomodoro/TimerDisplay';
import { TimerModeSelection } from '@/components/pomodoro/TimerModeSelection';
import { useTimer } from '@/hooks/TimerContext';
import { StyleSheet } from 'react-native';

export const PomodoroSection = () => {
  const {
    mode,
    countdown,
    isRunning,
    toggleTimer,
    setTimerMode,
    setNextTimerMode,
  } = useTimer();

  return (
    <Stack style={styles.pomodoroSection} justify="center" spacing="xs">
      <TimerModeSelection timerMode={mode} setTimerMode={setTimerMode} />
      <TimerDisplay countdown={countdown} />
      <TimerActionSection
        isTimerRunning={isRunning}
        timerMode={mode}
        toggleTimer={toggleTimer}
        setNextTimerMode={setNextTimerMode}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  pomodoroSection: {
    flex: 6,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
});
