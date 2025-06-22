import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import { theme } from './src/styles/theme';
import { 
  registerForPushNotificationsAsync, 
  scheduleTaskNotification,
  cancelTaskNotification,
  setupNotificationListeners,
} from './src/services/notificationService';
import AddTaskForm from './src/components/AddTaskForm';
import TaskItem from './src/components/TaskItem';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    registerForPushNotificationsAsync();
    const removeNotificationListeners = setupNotificationListeners();

    return () => {
      removeNotificationListeners();
    };
  }, []);

  const handleAddTask = async (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      notificationId: null,
    };
    
    const notificationId = await scheduleTaskNotification(newTask);
    if (notificationId) {
        newTask.notificationId = notificationId;
    }

    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  const handleDeleteTask = async (taskToDelete) => {
    await cancelTaskNotification(taskToDelete.notificationId);
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskToDelete.id));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>To-Do Reminder</Text>
        <AddTaskForm onAddTask={handleAddTask} />
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskItem item={item} onDelete={handleDeleteTask} />}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={<Text style={styles.emptyListText}>Список завдань порожній</Text>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: theme.typography.h1,
    fontWeight: 'bold',
    padding: theme.spacing.medium,
    textAlign: 'center',
    color: theme.colors.text,
  },
  list: {
    flex: 1,
    paddingHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});