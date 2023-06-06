import { Group, Stack } from '@/components/layout';
import { useAppSettingsStore } from '@/stores/settingsStore';
import { NumericInputField } from '@/components/settings/NumericInputField';

import { Text, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Switch } from '@rneui/themed';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';

export function Settings() {
  const { settings: appSettings, setSettings: setAppSettings } =
    useAppSettingsStore();

  const [settings, setSettings] = useState(appSettings);

  useEffect(() => {
    setAppSettings(settings);
  }, [settings]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack align="flex-start" spacing="lg">
        <Stack align="flex-start" spacing="xs">
          <Group spacing="xs">
            <Feather name="clock" size={16} />
            <Text style={styles.sectionTitle}>Pomodoro</Text>
          </Group>
          <NumericInputField
            value={settings.pomodoro.focusDuration}
            onChange={(value) =>
              setSettings({
                ...settings,
                pomodoro: { ...settings.pomodoro, focusDuration: value },
              })
            }
            minValue={1}
            maxValue={60}
            label="Focus time duration"
          />
          <NumericInputField
            value={settings.pomodoro.shortBreakDuration}
            onChange={(value) =>
              setSettings({
                ...settings,
                pomodoro: { ...settings.pomodoro, shortBreakDuration: value },
              })
            }
            minValue={1}
            maxValue={60}
            label="Short break duration"
          />
          <NumericInputField
            value={settings.pomodoro.longBreakDuration}
            onChange={(value) =>
              setSettings({
                ...settings,
                pomodoro: { ...settings.pomodoro, longBreakDuration: value },
              })
            }
            minValue={1}
            maxValue={60}
            label="Long break duration"
          />
          <NumericInputField
            value={settings.pomodoro.longBreakInterval}
            onChange={(value) =>
              setSettings({
                ...settings,
                pomodoro: { ...settings.pomodoro, longBreakInterval: value },
              })
            }
            minValue={1}
            maxValue={60}
            label="Long break interval"
          />
          <Group justify="space-between" style={styles.settingContainer}>
            <Text>Auto start next round</Text>
            <Switch
              accessibilityLabel="Auto start next round"
              value={settings.pomodoro.autoStartNextRound}
              onValueChange={(value) =>
                setSettings({
                  ...settings,
                  pomodoro: { ...settings.pomodoro, autoStartNextRound: value },
                })
              }
            />
          </Group>
        </Stack>

        <Stack align="flex-start" spacing={0}>
          <Group spacing="xs">
            <Feather name="check-circle" size={16} />
            <Text style={styles.sectionTitle}>Todolist</Text>
          </Group>
          <Group justify="space-between" style={styles.settingContainer}>
            <Text>Show completed tasks</Text>
            <Switch
              accessibilityLabel="Show completed tasks"
              value={settings.todolist.showCompleted}
              onValueChange={(value) =>
                setSettings({
                  ...appSettings,
                  todolist: { ...settings.todolist, showCompleted: value },
                })
              }
            />
          </Group>
        </Stack>

        <Stack align="flex-start" spacing={0}>
          <Group spacing="xs">
            <Feather name="volume-2" size={16} />
            <Text style={styles.sectionTitle}>Sound</Text>
          </Group>
          <Group justify="space-between" style={styles.settingContainer}>
            <Text>Enable alarm</Text>
            <Switch
              accessibilityLabel="Enable alarm"
              value={settings.sound.alarmEnabled}
              onValueChange={(value) =>
                setSettings({
                  ...appSettings,
                  sound: { ...settings.sound, alarmEnabled: value },
                })
              }
            />
          </Group>
        </Stack>

        <Stack align="flex-start" spacing={0}>
          <Group spacing="xs">
            <Feather name="bell" size={16} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </Group>
          <Group justify="space-between" style={styles.settingContainer}>
            <Text>Enable notifications</Text>
            <Switch
              accessibilityLabel="Enable notifications"
              value={settings.notifications.enabled}
              onValueChange={(value) =>
                setSettings({
                  ...appSettings,
                  notifications: { ...settings.notifications, enabled: value },
                })
              }
            />
          </Group>
        </Stack>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  settingContainer: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
