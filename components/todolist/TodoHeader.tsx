import { Group } from '../layout/Group';
import { Stack } from '../layout/Stack';

import { Text, StyleSheet, View } from 'react-native';

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
      <View style={styles.dividerLine} />
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
  dividerLine: {
    width: 350,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 1,
  },
});
