import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Не вдалося отримати дозвіл на push-сповіщення!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  
  return token;
}

export async function scheduleTaskNotification(task) {
  const trigger = new Date(task.reminderTime);
  
  if (trigger.getTime() <= Date.now()) {
    console.log('Час нагадування вже минув. Сповіщення не заплановано.');
    return null;
  }

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔔 Нагадування про завдання!",
        body: task.title,
        data: { taskId: task.id },
      },
      trigger,
    });
    return notificationId;
  } catch (error) {
    console.error('Не вдалося запланувати сповіщення:', error);
    return null;
  }
}