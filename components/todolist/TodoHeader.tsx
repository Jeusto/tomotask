import { Group } from '../layout/Group';
import { Stack } from '../layout/Stack';

import { Text, StyleSheet } from 'react-native';

type Props = {
  completedTaskCount: number;
  totalTaskCount: number;
};

export const TodoHeader = ({ completedTaskCount, totalTaskCount }: Props) => {
  return (
    <Stack>
      <Group justify="space-between" style={styles.container}>
        <Text style={styles.sectionTitle}>
          {totalTaskCount > 0
            ? `Tasks done: ${completedTaskCount}/${totalTaskCount}`
            : 'Tasks:'}
        </Text>
      </Group>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
