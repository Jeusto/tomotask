import { View, Text, StyleSheet } from 'react-native';

type Props = {
  countdown: number;
};

export const TimerDisplay = ({ countdown }: Props) => {
  const countDownDate = new Date(countdown);

  return (
    <View>
      <Text style={styles.timerText}>
        {countDownDate.getMinutes().toString().padStart(2, '0')}:
        {countDownDate.getSeconds().toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 100,
    color: 'white',
    fontWeight: '500',
  },
});
