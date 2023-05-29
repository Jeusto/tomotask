import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotification = () => {
  const [_expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? ''),
    );
  }, []);

  const scheduleNotification = async (
    title: string,
    body: string,
    delay: number | null,
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { data: '' },
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
    console.warn('Failed to get push token for push notification!');
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
