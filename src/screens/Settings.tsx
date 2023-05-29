import { Group, Stack } from '@/components/layout';
import { useAppSettingsStore } from '@/stores/settingsStore';
import type { RootStackParamList } from '../../App';

import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Switch } from '@rneui/themed';
import Feather from '@expo/vector-icons/Feather';

interface SettingsViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}

export function Settings({ navigation }: SettingsViewProps) {
  const { settings, setSettings } = useAppSettingsStore();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack align="flex-start">
        <Group spacing="xs">
          <Feather name="volume-2" size={24} />
          <Text style={styles.sectionTitle}>Sound</Text>
        </Group>
        <Group>
          <Text>Enable alarm</Text>
          <Switch
            accessibilityLabel="Enable alarm"
            onValueChange={(value) =>
              setSettings({
                ...settings,
                sound: { ...settings.sound, alarmEnabled: value },
              })
            }
            value={settings.sound.alarmEnabled}
          />
        </Group>
        <Group spacing="xs">
          <Feather name="bell" size={24} />
          <Text style={styles.sectionTitle}>Notifications</Text>
        </Group>
        <Group>
          <Text>Enable notifications</Text>
          <Switch
            accessibilityLabel="Enable notifications"
            onValueChange={(value) =>
              setSettings({ ...settings, notifications: { enabled: value } })
            }
            value={settings.notifications.enabled}
          />
        </Group>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
