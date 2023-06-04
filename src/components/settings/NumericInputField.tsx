import NumericInput from 'react-native-numeric-input';
import { Text, StyleSheet } from 'react-native';
import { Group } from '@/components/layout';

interface Props {
  value: number;
  onChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  label: string;
}

export const NumericInputField = ({
  value,
  onChange,
  minValue,
  maxValue,
  label,
}: Props) => {
  return (
    <Group justify="space-between" style={styles.settingContainer}>
      <Text>{label}</Text>
      <NumericInput
        value={value}
        onChange={onChange}
        totalWidth={75}
        totalHeight={30}
        iconSize={25}
        step={1}
        minValue={minValue}
        maxValue={maxValue}
        rounded
      />
    </Group>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    minWidth: '100%',
    maxWidth: '100%',
  },
});
