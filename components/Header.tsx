import { Group } from './layout/Group';
import { Image, Text, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <Group spacing="xs">
      <Image
        style={styles.logo}
        source={require('../assets/tomotask-icon.png')}
      />
      <Text style={styles.title}>Tomotask</Text>
    </Group>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: 'white',
  },
  logo: {
    width: 50,
    height: 50,
  },
});
