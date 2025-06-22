import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../styles/theme';
import TaskItem from '../components/TaskItem';

const staticTasks = [
  { id: '1', text: 'Зробити 10 кліків', target: 10, current: 0 },
  { id: '2', text: 'Зробити подвійний клік 5 разів', target: 5, current: 0 },
  { id: '3', text: 'Утримувати об\'єкт 3 секунди', target: 1, current: 0 },
  { id: '4', text: 'Перетягнути об\'єкт', target: 1, current: 0 },
  { id: '5', text: 'Зробити свайп вправо', target: 1, current: 0 },
  { id: '6', text: 'Зробити свайп вліво', target: 1, current: 0 },
  { id: '7', text: 'Змінити розмір об\'єкта', target: 1, current: 0 },
  { id: '8', text: 'Отримати 100 очок', target: 100, current: 0 },
];

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={staticTasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={<Text style={styles.title}>Список Завдань</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
});