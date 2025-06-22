import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../styles/theme';
import { GameContext } from '../context/GameContext';
import TaskItem from '../components/TaskItem';

export default function TasksScreen() {
  const { tasks } = useContext(GameContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={<Text style={styles.title}>Досягнення</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Виконуйте дії в грі, щоб відкрити досягнення!</Text>}
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
    paddingTop: theme.spacing.small,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
  }
});