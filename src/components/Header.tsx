import { Group } from '@/components/layout';
import { Image, Text, StyleSheet, View } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <Group spacing="xs">
        <Image
          style={styles.logo}
          source={require('@/../assets/tomotask-icon.png')}
        />
        <Text style={styles.title}>Tomotask</Text>
      </Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
  logo: {
    width: 50,
    height: 50,
  },
});
