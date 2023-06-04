import { Text, StyleSheet } from 'react-native';

type Props = {
  countdown: number;
};

export const TimerDisplay = ({ countdown }: Props) => {
  const countDownDate = new Date(countdown);

  return (
    <Text style={styles.timerText}>
      {countDownDate.getMinutes().toString().padStart(2, '0')}:
      {countDownDate.getSeconds().toString().padStart(2, '0')}
    </Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 100,
    color: 'white',
    fontWeight: '500',
  },
});
