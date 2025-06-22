import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
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
        title: "🔔 Нагадування: " + task.title,
        body: task.description || 'Час виконати завдання!',
        data: { taskId: task.id, title: task.title },
      },
      trigger,
    });
    return notificationId;
  } catch (error) {
    console.error('Не вдалося запланувати сповіщення:', error);
    return null;
  }
}

export async function cancelTaskNotification(notificationId) {
  if (!notificationId) {
    return;
  }
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Заплановане сповіщення скасовано:', notificationId);
  } catch (e) {
    console.error("Помилка скасування сповіщення:", e);
  }
}

export function setupNotificationListeners() {
  const subscription = Notifications.addNotificationResponseReceivedListener(response => {
    const taskData = response.notification.request.content.data;
    if (taskData?.taskId) {
      Alert.alert(
        `Нагадування виконано?`,
        `Ви натиснули на сповіщення для завдання: "${taskData.title}"`,
        [{ text: "OK" }]
      );
    }
  });

  return () => {
    Notifications.removeNotificationSubscription(subscription);
  };
}