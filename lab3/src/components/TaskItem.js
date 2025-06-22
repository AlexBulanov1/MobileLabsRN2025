import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TaskItem({ task }) {
  const isCompleted = task.current >= task.target;
  const iconName = isCompleted ? 'checkmark-circle' : 'ellipse-outline';
  const iconColor = isCompleted ? theme.colors.success : theme.colors.disabled;
  const textStyle = isCompleted ? styles.taskTextCompleted : styles.taskText;
  const progressText = (task.target > 1) ? ` (${task.current}/${task.target})` : '';

  return (
    <View style={styles.taskItemContainer}>
      <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={textStyle}>{task.text}{progressText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    borderRadius: 8,
    marginBottom: theme.spacing.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    marginRight: theme.spacing.medium,
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  taskTextCompleted: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});