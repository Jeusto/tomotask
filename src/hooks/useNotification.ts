import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Custom hook to handle local notifications
 */
export const useNotification = () => {
  const [_expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? ''),
    );
  }, []);

  const scheduleNotification = async (title: string, delay: number | null) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
      },
      trigger: delay ? { seconds: delay } : null,
    });
  };

  const cancelNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return { scheduleNotification, cancelNotification };
};

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  // TODO: Use React Native Notifications after ejecting
  try {
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: 'fcacc142-5947-4fea-a934-2c053a5c7108',
      })
    ).data;
    return token;
  } catch (e) {
    return '';
  }
}
